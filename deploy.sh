#!/bin/bash

# Create pper.zip for source code download
echo "Creating source code zip file..."
zip -r pper.zip . -x "node_modules/*" -x ".git/*" -x "frontend/dist/*" -x "backend/downloads/*"

# Build the frontend
echo "Building frontend..."
npm run build

# Create downloads directory if it doesn't exist
mkdir -p backend/downloads

echo "Deployment preparations complete!"
echo "You can now deploy to Render using the render.yaml configuration." 