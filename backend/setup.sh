#!/bin/bash
# Setup script for Coqui TTS Backend

echo "🎤 Setting up Coqui TTS Backend for Łukasz Pietrzyk Website"
echo "=========================================================="

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check Python version
python_version=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "🐍 Python version: $python_version"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "📈 Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📥 Installing requirements..."
pip install -r requirements.txt

echo "✅ Setup complete!"
echo ""
echo "To start the TTS server:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Run the server: python tts_server_enhanced.py"
echo ""
echo "The server will run on http://localhost:5000"
echo "First startup will take a few minutes to download the TTS model."
