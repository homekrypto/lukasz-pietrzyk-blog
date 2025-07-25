#!/usr/bin/env python3
"""
Minimal TTS Backend Server for testing
Uses text-to-speech functionality without heavy ML models
"""

import os
import io
import base64
import logging
import subprocess
import tempfile
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

def use_macos_say(text, output_file):
    """Use macOS built-in 'say' command for TTS"""
    try:
        # Use macOS say command to generate speech
        cmd = ['say', '-o', output_file, text]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        
        if result.returncode == 0:
            return True
        else:
            logger.error(f"Say command failed: {result.stderr}")
            return False
            
    except Exception as e:
        logger.error(f"Error using say command: {e}")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "backend": "minimal_macos_say",
        "platform": "macOS"
    })

@app.route('/tts', methods=['POST'])
def text_to_speech():
    """Convert text to speech using macOS say command"""
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
            
        # Clean and validate text
        text = text.strip()
        if len(text) > 500:  # Limit text length
            text = text[:500]
            
        logger.info(f"Generating speech for: {text[:50]}...")
        
        # Create temporary file for audio output
        with tempfile.NamedTemporaryFile(suffix='.aiff', delete=False) as tmp_file:
            tmp_path = tmp_file.name
        
        try:
            # Generate speech using macOS say command
            if use_macos_say(text, tmp_path):
                # Read the generated audio file
                with open(tmp_path, 'rb') as audio_file:
                    audio_data = audio_file.read()
                
                # Convert to base64 for JSON response
                audio_base64 = base64.b64encode(audio_data).decode('utf-8')
                
                logger.info(f"Successfully generated {len(audio_data)} bytes of audio")
                
                return jsonify({
                    "success": True,
                    "audio": audio_base64,
                    "format": "aiff",
                    "backend": "macos_say"
                })
            else:
                return jsonify({"error": "Failed to generate speech"}), 500
                
        finally:
            # Clean up temp file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
        
    except Exception as e:
        logger.error(f"Error generating speech: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/synthesize', methods=['POST'])
def synthesize():
    """Alternative endpoint name for compatibility"""
    return text_to_speech()

if __name__ == '__main__':
    logger.info("Starting Minimal TTS Backend Server...")
    logger.info("Using macOS built-in 'say' command for TTS")
    logger.info("Starting Flask server on http://localhost:5001")
    
    app.run(host='0.0.0.0', port=5001, debug=True, threaded=True)
