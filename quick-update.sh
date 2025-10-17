#!/bin/bash

echo "🔄 Quick Update for Synvo Docs"
echo "=============================="

cd /data/kairui/web_alter

# Check what changed
echo "📋 Checking for changes..."
if [ -d ".git" ]; then
    echo "Git status:"
    git status --short
fi

echo ""
echo "🛑 Stopping application..."
pm2 stop synvo-docs

echo "🔨 Building application..."
if npm run build; then
    echo "✅ Build successful!"
    
    echo "🚀 Restarting application..."
    pm2 restart synvo-docs
    
    echo "🧪 Testing application..."
    sleep 2
    if curl -s -I http://localhost:80 | head -1 | grep -q "200 OK"; then
        echo "✅ Application is running!"
        echo "🌐 Website: http://docs.synvo.ai"
        
        # Show PM2 status
        echo ""
        echo "📊 PM2 Status:"
        pm2 status
    else
        echo "❌ Application test failed!"
        echo "🔍 Check logs: pm2 logs synvo-docs"
    fi
else
    echo "❌ Build failed!"
    echo "🔄 Starting previous version..."
    pm2 start synvo-docs
    exit 1
fi

echo ""
echo "✅ Update completed successfully!"
