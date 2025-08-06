#!/bin/bash

echo "🚀 Building and testing FCP performance..."

# Build the application
npm run build

# Start the production server in background
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 5

echo "📊 Running Lighthouse performance test..."

# Run lighthouse test (if available)
if command -v lighthouse &> /dev/null; then
    lighthouse http://localhost:3000 --only-categories=performance --output=json --output-path=./lighthouse-report.json
    echo "📈 Lighthouse report saved to lighthouse-report.json"
else
    echo "⚠️  Lighthouse not installed. Install with: npm install -g lighthouse"
fi

# Kill the server
kill $SERVER_PID

echo "✅ Performance test completed!"
