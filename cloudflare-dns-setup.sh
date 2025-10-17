#!/bin/bash

echo "🌐 Cloudflare DNS Setup for docs.synvo.ai"
echo "========================================="

# You need to get these from Cloudflare dashboard:
# 1. Go to https://dash.cloudflare.com/profile/api-tokens
# 2. Create token with Zone:Edit permissions for synvo.ai
# 3. Get Zone ID from synvo.ai overview page

echo "📝 To use this script, you need:"
echo "   1. Cloudflare API Token (with Zone:Edit permission)"
echo "   2. Zone ID for synvo.ai domain"
echo ""
echo "🔗 Get them from:"
echo "   • API Token: https://dash.cloudflare.com/profile/api-tokens"
echo "   • Zone ID: https://dash.cloudflare.com/ → synvo.ai → Overview"
echo ""

read -p "Enter your Cloudflare API Token: " CF_TOKEN
read -p "Enter your Zone ID for synvo.ai: " ZONE_ID

if [ -z "$CF_TOKEN" ] || [ -z "$ZONE_ID" ]; then
    echo "❌ Missing API Token or Zone ID. Please try again."
    exit 1
fi

echo ""
echo "🚀 Creating DNS record..."

# Create A record for docs.synvo.ai
RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
     -H "Authorization: Bearer $CF_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{
       "type": "A",
       "name": "docs",
       "content": "54.206.138.202",
       "ttl": 300,
       "proxied": false
     }')

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ DNS record created successfully!"
    echo "🌐 docs.synvo.ai now points to 54.206.138.202"
    echo ""
    echo "⏳ DNS propagation may take 5-10 minutes..."
    echo "🧪 Test with: nslookup docs.synvo.ai"
else
    echo "❌ Failed to create DNS record"
    echo "Response: $RESPONSE"
fi
