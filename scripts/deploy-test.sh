#!/bin/bash

echo "🚀 Testing build for Railway deployment..."

# Clean up ports first
echo "🧹 Cleaning up ports..."
./scripts/cleanup-ports.sh

# Clean previous build
echo "📦 Cleaning previous build..."
npm run cleanup

# Install dependencies
echo "📥 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Test the build
echo "🧪 Testing build..."
if [ -f "dist/main.js" ]; then
    echo "✅ Build successful! dist/main.js exists"
    
    # Set environment variables for testing
    export NODE_ENV=production
    export PORT=0  # Use random available port
    # Disable Firebase for testing if not configured
    if [ -z "$FIREBASE_SERVICE_ACCOUNT_BASE64" ]; then
        echo "⚠️  Firebase not configured, continuing without Firebase..."
    fi
    
    # Test if the app can start
    echo "🚀 Testing app startup..."
    
    # Start app in background with timeout
    timeout 15s node dist/main.js > /tmp/app.log 2>&1 &
    PID=$!
    
    # Wait a bit for app to start
    sleep 5
    
    # Check if process is still running
    if kill -0 $PID 2>/dev/null; then
        echo "✅ App started successfully"
        echo "📋 App logs:"
        cat /tmp/app.log
        kill $PID 2>/dev/null
        echo "🎉 Ready for Railway deployment!"
    else
        echo "❌ App failed to start"
        echo "📋 Error logs:"
        cat /tmp/app.log
        exit 1
    fi
else
    echo "❌ Build failed! dist/main.js not found"
    exit 1
fi 