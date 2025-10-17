#!/bin/bash

echo "🔧 Starting Development Mode for Synvo Docs"
echo "==========================================="

cd /data/kairui/web_alter

echo "📋 Current production status:"
pm2 status | grep synvo-docs

echo ""
echo "🚀 Starting development server..."
echo "   • Development URL: http://localhost:3000"
echo "   • Production URL: http://localhost:8081"
echo ""
echo "💡 Tips:"
echo "   • Edit files in content/docs/ or src/"
echo "   • Changes auto-reload in development"
echo "   • Press Ctrl+C to stop development server"
echo "   • Run ./quick-update.sh to deploy changes to production"
echo ""

# Start development server
npm run dev
