#!/usr/bin/env python3
"""
Simplified TTS Backend Server for Łukasz Pietrzyk Website
Uses Transformers library with Microsoft SpeechT5 for Polish TTS
Avoids compilation issues with Coqui TTS
"""

import os
import io
import base64
import logging
import threading
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import numpy as np
import soundfile as sf
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
from transformers import pipeline
import tempfile

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

# Global TTS model variables
tts_pipeline = None
model_info = {}

def initialize_tts():
    """Initialize the TTS model using Transformers"""
    global tts_pipeline, model_info
    try:
        logger.info("Initializing TTS models using Transformers...")
        
        # Check available device
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Using device: {device}")
        
        # Try different TTS approaches
        tts_models = [
            {
                "name": "microsoft/speecht5_tts",
                "type": "speecht5",
                "description": "Microsoft SpeechT5 TTS"
            },
            {
                "name": "espnet/kan-bayashi_ljspeech_vits",
                "type": "vits",
                "description": "ESPnet VITS model"
            }
        ]
        
        for model_config in tts_models:
            try:
                logger.info(f"Trying to load model: {model_config['name']}")
                
                if model_config["type"] == "speecht5":
                    # Load SpeechT5 components
                    processor = SpeechT5Processor.from_pretrained(model_config["name"])
                    model = SpeechT5ForTextToSpeech.from_pretrained(model_config["name"])
                    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")
                    
                    # Move to device
                    model = model.to(device)
                    vocoder = vocoder.to(device)
                    
                    tts_pipeline = {
                        "processor": processor,
                        "model": model,
                        "vocoder": vocoder,
                        "type": "speecht5"
                    }
                    
                else:
                    # Try using pipeline
                    tts_pipeline = pipeline(
                        "text-to-speech",
                        model=model_config["name"],
                        device=0 if device == "cuda" else -1
                    )
                
                model_info = model_config
                model_info["device"] = device
                logger.info(f"Successfully loaded model: {model_config['name']}")
                return True
                
            except Exception as e:
                logger.warning(f"Failed to load {model_config['name']}: {e}")
                continue
        
        logger.error("Failed to load any TTS model")
        return False
        
    except Exception as e:
        logger.error(f"Error initializing TTS: {e}")
        return False

def generate_speech_speecht5(text):
    """Generate speech using SpeechT5"""
    try:
        processor = tts_pipeline["processor"]
        model = tts_pipeline["model"]
        vocoder = tts_pipeline["vocoder"]
        
        # Process text
        inputs = processor(text=text, return_tensors="pt")
        
        # Generate speaker embeddings (using default)
        # For better quality, you could load speaker embeddings
        speaker_embeddings = torch.zeros((1, 512))  # Default embedding
        
        # Move to device
        device = model.device
        inputs = {k: v.to(device) for k, v in inputs.items()}
        speaker_embeddings = speaker_embeddings.to(device)
        
        # Generate speech
        with torch.no_grad():
            speech = model.generate_speech(
                inputs["input_ids"], 
                speaker_embeddings, 
                vocoder=vocoder
            )
        
        # Convert to numpy and normalize
        speech = speech.cpu().numpy()
        speech = speech / np.max(np.abs(speech))  # Normalize
        
        return speech, 16000  # Sample rate
        
    except Exception as e:
        logger.error(f"Error generating speech with SpeechT5: {e}")
        return None, None

def generate_speech_pipeline(text):
    """Generate speech using transformers pipeline"""
    try:
        # Generate speech
        result = tts_pipeline(text)
        
        # Extract audio and sample rate
        audio = result["audio"]
        sample_rate = result["sampling_rate"]
        
        # Ensure it's a numpy array and normalize
        if isinstance(audio, torch.Tensor):
            audio = audio.cpu().numpy()
        
        audio = audio / np.max(np.abs(audio))  # Normalize
        
        return audio, sample_rate
        
    except Exception as e:
        logger.error(f"Error generating speech with pipeline: {e}")
        return None, None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": tts_pipeline is not None,
        "model_info": model_info,
        "cuda_available": torch.cuda.is_available()
    })

@app.route('/tts', methods=['POST'])
def text_to_speech():
    """Convert text to speech"""
    try:
        if not tts_pipeline:
            return jsonify({"error": "TTS model not initialized"}), 500
            
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
            
        # Clean and validate text
        text = text.strip()
        if len(text) > 500:  # Limit text length
            text = text[:500]
            
        logger.info(f"Generating speech for: {text[:50]}...")
        
        # Generate speech based on model type
        if model_info.get("type") == "speecht5":
            audio, sample_rate = generate_speech_speecht5(text)
        else:
            audio, sample_rate = generate_speech_pipeline(text)
        
        if audio is None:
            return jsonify({"error": "Failed to generate speech"}), 500
        
        # Save to temporary WAV file
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp_file:
            tmp_path = tmp_file.name
            
        try:
            # Write audio to file
            sf.write(tmp_path, audio, sample_rate)
            
            # Read the generated audio file
            with open(tmp_path, 'rb') as audio_file:
                audio_data = audio_file.read()
            
            # Convert to base64 for JSON response
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            
            logger.info(f"Successfully generated {len(audio_data)} bytes of audio")
            
            return jsonify({
                "success": True,
                "audio": audio_base64,
                "format": "wav",
                "model": model_info.get("name", "unknown"),
                "sample_rate": sample_rate
            })
            
        finally:
            # Clean up temp file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
        
    except Exception as e:
        logger.error(f"Error generating speech: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/available_models', methods=['GET'])
def available_models():
    """List available TTS models"""
    try:
        models = [
            {
                "name": "microsoft/speecht5_tts",
                "language": "multilingual",
                "description": "Microsoft SpeechT5 TTS"
            },
            {
                "name": "espnet/kan-bayashi_ljspeech_vits",
                "language": "english",
                "description": "ESPnet VITS model"
            }
        ]
        
        return jsonify({
            "models": models,
            "current_model": model_info
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting Simplified TTS Backend Server...")
    
    # Initialize TTS model in a separate thread to avoid blocking
    def init_model():
        if not initialize_tts():
            logger.error("Failed to initialize TTS model. Server will run but TTS won't work.")
        else:
            logger.info("TTS model initialized successfully!")
    
    # Start model initialization in background
    init_thread = threading.Thread(target=init_model)
    init_thread.daemon = True
    init_thread.start()
    
    logger.info("Starting Flask server on http://localhost:5001")
    logger.info("TTS model is initializing in the background...")
    
    app.run(host='0.0.0.0', port=5001, debug=False, threaded=True)
