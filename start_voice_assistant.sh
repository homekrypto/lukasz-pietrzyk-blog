#!/bin/bash

# Quick Start Script for Coqui TTS Voice Assistant
# This script starts both the backend server and frontend development server

echo "🎤 Starting Coqui TTS Voice Assistant"
echo "====================================="

# Check if backend virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "❌ Backend virtual environment not found. Please run the setup first:"
    echo "   cd backend && ./setup.sh"
    exit 1
fi

# Function to start backend
start_backend() {
    echo "🐍 Starting Coqui TTS Backend Server..."
    cd backend
    source venv/bin/activate
    python tts_server_enhanced.py &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "⚛️ Starting React Frontend..."
    npm run dev &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
}

# Start both servers
start_backend
sleep 5  # Give backend time to start
start_frontend

echo ""
echo "🚀 Both servers are starting..."
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "⚠️  First startup may take several minutes to download the TTS model"
echo "📋 Check backend logs for initialization progress"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup when script exits
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Wait for user to press Ctrl+C
wait
