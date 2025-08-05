#!/bin/bash

echo "🧹 Cleaning up ports..."

# Kill processes using common development ports
PORTS=(3000 3001 8080 9856 5000 8000)

for port in "${PORTS[@]}"; do
    echo "Checking port $port..."
    PID=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$PID" ]; then
        echo "Killing process $PID using port $port"
        kill -9 $PID 2>/dev/null
    fi
done

echo "✅ Port cleanup completed" 