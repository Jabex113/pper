#!/bin/bash
# VidDown deployment script

echo "Starting VidDown deployment..."

# Make sure we're in the project root
cd "$(dirname "$0")"

# Build frontend
echo "Building React frontend..."
cd frontend
npm install
npm run build
cd ..

# Ensure the backend/dist directory exists
echo "Setting up backend static files directory..."
mkdir -p backend/dist

# Copy the built frontend to the backend/dist directory
echo "Copying frontend build to backend/dist..."
cp -r frontend/dist/* backend/dist/

# Run any backend setup needed
echo "Setting up backend..."
cd backend
pip install -r requirements.txt
cd ..

echo "Deployment preparation complete!"
echo "You can now run the app or deploy to Render."

# Make script executable
chmod +x deploy.sh