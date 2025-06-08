#!/bin/bash
# VidDown Render deployment script

echo "Starting VidDown deployment on Render..."

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Build frontend
echo "Building React frontend..."
npm run build

# Ensure the backend/dist directory exists
echo "Setting up backend static files directory..."
mkdir -p backend/dist

# Copy the built frontend to the backend/dist directory
echo "Copying frontend build to backend/dist..."
cp -r frontend/dist/* backend/dist/

# Install Python dependencies (should be handled by Render)
echo "Python dependencies will be installed by Render automatically."

# Debug information
echo "Deployment complete. Directory structure:"
find . -type d -maxdepth 3 | sort

echo "Files in backend/dist:"
ls -la backend/dist 