#!/bin/bash

echo "Setting up combined frontend/backend deployment..."

# Build the frontend
echo "Building frontend..."
npm run build

# Create a test HTML file directly in the expected directories
echo "Creating test HTML files..."
mkdir -p frontend/dist
mkdir -p dist

echo '<html><body><h1>VidDown Frontend Test</h1><p>If you see this, the frontend serving is working!</p></body></html>' > frontend/dist/test.html
echo '<html><body><h1>VidDown Frontend Test</h1><p>If you see this, the frontend serving is working!</p></body></html>' > dist/test.html

# Create downloads directory if it doesn't exist
echo "Creating downloads directory..."
mkdir -p backend/downloads

# Add Git info
echo "Configuring Git..."
git config --global --add safe.directory /opt/render/project/src

echo "Deployment preparations complete!"
echo "Now you can deploy to Render using the render.yaml configuration."
echo "Your application will be available at https://viddown.onrender.com after deployment."
echo "To test if the frontend is being served, visit https://viddown.onrender.com/test.html"