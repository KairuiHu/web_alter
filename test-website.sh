#!/bin/bash

echo "🧪 Testing Synvo Docs Website Access"
echo "===================================="

SERVER_IP="54.206.138.202"
PORT="8081"

echo "1. Testing local access..."
if curl -s -I http://localhost:$PORT | head -1 | grep -q "200 OK"; then
    echo "   ✅ Local access: Working"
else
    echo "   ❌ Local access: Failed"
fi

echo ""
echo "2. Testing external access..."
if timeout 10 curl -s -I http://$SERVER_IP:$PORT | head -1 | grep -q "200 OK"; then
    echo "   ✅ External access: Working"
    echo "   🌐 Website URL: http://$SERVER_IP:$PORT"
else
    echo "   ❌ External access: Failed"
    echo "   🚨 Check AWS Security Group - port $PORT needs to be open!"
fi

echo ""
echo "3. Testing DNS (if configured)..."
if nslookup docs.synvo.ai > /dev/null 2>&1; then
    echo "   ✅ DNS configured"
    if timeout 10 curl -s -I http://docs.synvo.ai:$PORT | head -1 | grep -q "200 OK"; then
        echo "   ✅ Domain access: Working"
        echo "   🌐 Domain URL: http://docs.synvo.ai:$PORT"
    else
        echo "   ❌ Domain access: Failed (DNS may still be propagating)"
    fi
else
    echo "   ⏳ DNS not configured yet"
fi

echo ""
echo "4. Service status..."
pm2 list | grep -q "online" && echo "   ✅ PM2: Running" || echo "   ❌ PM2: Not running"
systemctl is-active nginx > /dev/null && echo "   ✅ Nginx: Running" || echo "   ❌ Nginx: Not running"

echo ""
echo "📋 Summary:"
echo "   • Server IP: $SERVER_IP"
echo "   • Port: $PORT"
echo "   • If external access fails, check AWS Security Group!"
echo "   • Add inbound rule: TCP port $PORT from 0.0.0.0/0"
