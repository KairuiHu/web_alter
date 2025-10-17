#!/bin/bash

echo "🔄 Switching Synvo Docs to Port 80 (Standard HTTP)"
echo "=================================================="

echo "⚠️  WARNING: This will make your site accessible on standard port 80"
echo "    Make sure this doesn't conflict with other websites on this server!"
echo ""
read -p "Continue? (y/N): " confirm

if [[ $confirm != [yY] ]]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "🔧 Updating Nginx configuration..."

# Backup current config
sudo cp /etc/nginx/sites-available/synvo-docs /etc/nginx/sites-available/synvo-docs.backup

# Update Nginx to listen on port 80
sudo sed -i 's/listen 8081;/listen 80;/' /etc/nginx/sites-available/synvo-docs

echo "🧪 Testing Nginx configuration..."
if sudo nginx -t; then
    echo "✅ Configuration valid"
    
    echo "🔄 Restarting Nginx..."
    sudo systemctl restart nginx
    
    echo "🔓 Opening port 80 in firewall..."
    sudo ufw allow 80/tcp
    
    echo "✅ Setup completed!"
    echo ""
    echo "🌐 Your website is now accessible at:"
    echo "   • http://54.206.138.202 (no port needed)"
    echo "   • http://docs.synvo.ai (after DNS propagates)"
    echo ""
    echo "🧪 Test with:"
    echo "   curl -I http://localhost"
    
else
    echo "❌ Nginx configuration error"
    echo "🔄 Restoring backup..."
    sudo cp /etc/nginx/sites-available/synvo-docs.backup /etc/nginx/sites-available/synvo-docs
    sudo systemctl restart nginx
    echo "✅ Backup restored"
fi
