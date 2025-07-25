#!/usr/bin/env python3
"""
Coqui TTS Backend Server for Łukasz Pietrzyk Website
Provides high-quality Polish text-to-speech using Coqui TTS
"""

import os
import io
import base64
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from TTS.api import TTS
import tempfile
import wave
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

# Global TTS model variable
tts_model = None

def initialize_tts():
    """Initialize the TTS model"""
    global tts_model
    try:
        logger.info("Initializing Coqui TTS model...")
        
        # Use a Polish model - try multiple options
        polish_models = [
            "tts_models/pl/mai_female/vits",  # Polish female voice
            "tts_models/multilingual/multi-dataset/xtts_v2",  # Multi-lingual with Polish support
            "tts_models/multilingual/multi-dataset/your_tts"  # Another multi-lingual option
        ]
        
        for model_name in polish_models:
            try:
                logger.info(f"Trying to load model: {model_name}")
                device = "cuda" if torch.cuda.is_available() else "cpu"
                tts_model = TTS(model_name).to(device)
                logger.info(f"Successfully loaded model: {model_name}")
                return True
            except Exception as e:
                logger.warning(f"Failed to load {model_name}: {e}")
                continue
        
        logger.error("Failed to load any Polish TTS model")
        return False
        
    except Exception as e:
        logger.error(f"Error initializing TTS: {e}")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": tts_model is not None,
        "cuda_available": torch.cuda.is_available()
    })

@app.route('/tts', methods=['POST'])
def text_to_speech():
    """Convert text to speech"""
    try:
        if not tts_model:
            return jsonify({"error": "TTS model not initialized"}), 500
            
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
            
        logger.info(f"Generating speech for: {text[:50]}...")
        
        # Generate speech
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp_file:
            tmp_path = tmp_file.name
            
        try:
            # Generate TTS - adjust parameters based on model
            if hasattr(tts_model, 'tts_to_file'):
                tts_model.tts_to_file(
                    text=text,
                    file_path=tmp_path,
                    language="pl" if "multilingual" in str(tts_model) else None
                )
            else:
                # Fallback method
                wav = tts_model.tts(text=text, language="pl")
                # Save wav array to file
                with wave.open(tmp_path, 'wb') as wav_file:
                    wav_file.setnchannels(1)
                    wav_file.setsampwidth(2)
                    wav_file.setframerate(22050)
                    wav_file.writeframes((wav * 32767).astype(np.int16).tobytes())
            
            # Read the generated audio file
            with open(tmp_path, 'rb') as audio_file:
                audio_data = audio_file.read()
            
            # Convert to base64 for JSON response
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            
            return jsonify({
                "success": True,
                "audio": audio_base64,
                "format": "wav"
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
        # This would list available models
        return jsonify({
            "models": [
                "tts_models/pl/mai_female/vits",
                "tts_models/multilingual/multi-dataset/xtts_v2",
                "tts_models/multilingual/multi-dataset/your_tts"
            ]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting Coqui TTS Backend Server...")
    
    # Initialize TTS model
    if not initialize_tts():
        logger.error("Failed to initialize TTS model. Exiting.")
        exit(1)
    
    logger.info("TTS model initialized successfully!")
    logger.info("Starting Flask server on http://localhost:5000")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
