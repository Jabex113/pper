#!/bin/bash

echo "Setting up combined frontend/backend deployment..."

# Build the frontend
echo "Building frontend..."
npm run build

# Create downloads directory if it doesn't exist
echo "Creating downloads directory..."
mkdir -p backend/downloads

# Add Git info
echo "Configuring Git..."
git config --global --add safe.directory /opt/render/project/src

echo "Deployment preparations complete!"
echo "Now you can deploy to Render using the render.yaml configuration."
echo "Your application will be available at https://viddown.onrender.com after deployment."