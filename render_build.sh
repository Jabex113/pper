#!/bin/bash
# VidDown Render deployment script

echo "Starting VidDown deployment on Render..."
echo "Current directory: $(pwd)"

# Debug - list files and directories
echo "Initial directory structure:"
ls -la

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Build frontend
echo "Building React frontend..."
npm run build

# Debug - check if build was created
echo "Frontend build result (now built directly to backend/dist):"
ls -la backend/dist || echo "Backend/dist directory not found!"

# Ensure the backend/dist directory exists
echo "Setting up backend static files directory..."
mkdir -p backend/dist

# No need to copy files since we're now building directly to backend/dist
echo "Frontend now builds directly to backend/dist"
# Just make sure the directory exists
mkdir -p backend/dist

# Verify build succeeded
echo "Verifying frontend files in backend/dist:"
ls -la backend/dist || echo "Backend dist directory not found!"

# Additional debugging - check index.html content
if [ -f backend/dist/index.html ]; then
    echo "Backend dist/index.html exists. First 10 lines:"
    head -n 10 backend/dist/index.html
else
    echo "WARNING: backend/dist/index.html not found!"
fi

echo "Deployment complete. Final directory structure:"
find . -type d -maxdepth 3 | sort

echo "Files in backend/dist:"
ls -la backend/dist 