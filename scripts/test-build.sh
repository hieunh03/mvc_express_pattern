#!/bin/bash

echo "🧪 Testing build process (similar to Dockerfile)..."

# Clean previous build
echo "📦 Cleaning previous build..."
npm run cleanup

# Install all dependencies
echo "📥 Installing all dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Test if build was successful
if [ -f "dist/main.js" ]; then
    echo "✅ Build successful!"
    
    # Check if views were copied
    if [ -d "dist/views" ]; then
        echo "✅ Views folder copied successfully"
    else
        echo "❌ Views folder not found in dist"
        exit 1
    fi
    
    # Test production dependencies
    echo "🧹 Testing production dependencies..."
    npm prune --production
    
    echo "🎉 Build process test completed successfully!"
    echo "📁 Build output:"
    ls -la dist/
else
    echo "❌ Build failed! dist/main.js not found"
    exit 1
fi 