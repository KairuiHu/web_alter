#!/bin/bash

echo "🧪 Testing DNS Configuration for docs.synvo.ai"
echo "=============================================="

DOMAIN="docs.synvo.ai"
SERVER_IP="54.206.138.202"
PORT="80"

echo "1. Testing DNS resolution..."
DNS_IP=$(nslookup $DOMAIN 2>/dev/null | grep -A1 "Name:" | tail -1 | awk '{print $2}')

if [ "$DNS_IP" = "$SERVER_IP" ]; then
    echo "   ✅ DNS configured correctly"
    echo "   📍 $DOMAIN → $DNS_IP"
else
    echo "   ⏳ DNS not ready yet (may take 5-10 minutes to propagate)"
    echo "   📍 Expected: $SERVER_IP"
    echo "   📍 Current: ${DNS_IP:-"Not resolved"}"
    echo ""
    echo "   💡 If you just added the DNS record, wait a few minutes and try again"
    exit 0
fi

echo ""
echo "2. Testing website access via domain..."
if timeout 10 curl -s -I http://$DOMAIN:$PORT | head -1 | grep -q "200 OK"; then
    echo "   ✅ Website accessible via domain!"
    echo "   🌐 Your website: http://$DOMAIN:$PORT"
else
    echo "   ❌ Website not accessible via domain yet"
    echo "   ⏳ DNS may still be propagating..."
fi

echo ""
echo "3. Testing from different DNS servers..."
echo "   Google DNS (8.8.8.8):"
GOOGLE_DNS=$(nslookup $DOMAIN 8.8.8.8 2>/dev/null | grep -A1 "Name:" | tail -1 | awk '{print $2}')
echo "   📍 $DOMAIN → ${GOOGLE_DNS:-"Not resolved"}"

echo "   Cloudflare DNS (1.1.1.1):"
CF_DNS=$(nslookup $DOMAIN 1.1.1.1 2>/dev/null | grep -A1 "Name:" | tail -1 | awk '{print $2}')
echo "   📍 $DOMAIN → ${CF_DNS:-"Not resolved"}"

echo ""
echo "📋 Summary:"
echo "   • Domain: $DOMAIN"
echo "   • Target IP: $SERVER_IP"
echo "   • Port: $PORT"
echo "   • Full URL: http://$DOMAIN:$PORT"
echo ""
echo "💡 If DNS isn't working yet:"
echo "   1. Wait 5-10 minutes for propagation"
echo "   2. Check Cloudflare dashboard settings"
echo "   3. Ensure proxy is OFF (gray cloud, not orange)"
