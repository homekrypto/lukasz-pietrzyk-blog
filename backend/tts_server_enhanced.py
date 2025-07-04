#!/usr/bin/env python3
"""
Enhanced Coqui TTS Backend Server for Łukasz Pietrzyk Website
Provides high-quality Polish text-to-speech using Coqui TTS
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
from TTS.api import TTS
import tempfile
import wave
import numpy as np
import soundfile as sf

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

# Global TTS model variable
tts_model = None
model_info = {}

def initialize_tts():
    """Initialize the TTS model"""
    global tts_model, model_info
    try:
        logger.info("Initializing Coqui TTS model...")
        
        # Check available device
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Using device: {device}")
        
        # Try Polish models in order of preference
        polish_models = [
            {
                "name": "tts_models/multilingual/multi-dataset/xtts_v2",
                "type": "multilingual",
                "description": "XTTS v2 - High quality multilingual including Polish"
            },
            {
                "name": "tts_models/pl/mai_female/vits", 
                "type": "polish_female",
                "description": "Polish female voice"
            },
            {
                "name": "tts_models/multilingual/multi-dataset/your_tts",
                "type": "multilingual_clone",
                "description": "YourTTS - Voice cloning capable"
            }
        ]
        
        for model_config in polish_models:
            try:
                logger.info(f"Trying to load model: {model_config['name']}")
                tts_model = TTS(model_config["name"]).to(device)
                model_info = model_config
                model_info["device"] = device
                logger.info(f"Successfully loaded model: {model_config['name']}")
                return True
            except Exception as e:
                logger.warning(f"Failed to load {model_config['name']}: {e}")
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
        "model_info": model_info,
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
            
        # Clean and validate text
        text = text.strip()
        if len(text) > 500:  # Limit text length
            text = text[:500]
            
        logger.info(f"Generating speech for: {text[:50]}...")
        
        # Generate speech
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp_file:
            tmp_path = tmp_file.name
            
        try:
            # Generate TTS based on model type
            if model_info.get("type") == "multilingual":
                # For multilingual models, specify language
                tts_model.tts_to_file(
                    text=text,
                    file_path=tmp_path,
                    language="pl"
                )
            else:
                # For Polish-specific models
                tts_model.tts_to_file(
                    text=text,
                    file_path=tmp_path
                )
            
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
                "model": model_info.get("name", "unknown")
            })
            
        finally:
            # Clean up temp file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
        
    except Exception as e:
        logger.error(f"Error generating speech: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/tts_stream', methods=['POST'])
def text_to_speech_stream():
    """Convert text to speech with streaming capability"""
    try:
        if not tts_model:
            return jsonify({"error": "TTS model not initialized"}), 500
            
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
            
        # For now, use the same method as regular TTS
        # In future, this could be enhanced with actual streaming
        return text_to_speech()
        
    except Exception as e:
        logger.error(f"Error in streaming TTS: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/available_models', methods=['GET'])
def available_models():
    """List available TTS models"""
    try:
        models = [
            {
                "name": "tts_models/multilingual/multi-dataset/xtts_v2",
                "language": "multilingual",
                "description": "XTTS v2 - High quality multilingual including Polish"
            },
            {
                "name": "tts_models/pl/mai_female/vits",
                "language": "polish",
                "description": "Polish female voice"
            },
            {
                "name": "tts_models/multilingual/multi-dataset/your_tts",
                "language": "multilingual",
                "description": "YourTTS - Voice cloning capable"
            }
        ]
        
        return jsonify({
            "models": models,
            "current_model": model_info
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting Coqui TTS Backend Server...")
    
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
    
    logger.info("Starting Flask server on http://localhost:5000")
    logger.info("TTS model is initializing in the background...")
    
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
