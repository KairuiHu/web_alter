#!/bin/bash

echo "🔒 Setting up SSL Certificate for docs.synvo.ai"
echo "=============================================="

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
echo "🔐 Getting SSL certificate..."
sudo certbot --nginx -d docs.synvo.ai --non-interactive --agree-tos --email admin@synvo.ai

# Test auto-renewal
echo "🔄 Testing auto-renewal..."
sudo certbot renew --dry-run

echo "✅ SSL setup completed!"
echo "🌐 Your site should now be available at: https://docs.synvo.ai:8081"
