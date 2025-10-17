# Server Migration Guide

## 🚀 How to Deploy Synvo Docs to a New Server

### **Prerequisites**
- ✅ New server with external HTTP access (tested with previous guide)
- ✅ SSH access to new server
- ✅ sudo/root privileges on new server

## 📦 **Method 1: Complete Migration (Recommended)**

### **Step 1: Prepare Migration Package**
On your current DGX server:
```bash
cd /home/jkyang/kai/eta-docs

# Create migration package
tar -czf synvo-docs-migration.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=logs \
  --exclude=*.log \
  .

# Check package size
ls -lh synvo-docs-migration.tar.gz

# Transfer to new server
scp synvo-docs-migration.tar.gz user@new-server-ip:/home/user/
```

### **Step 2: Setup New Server**
SSH into your new server:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx nodejs npm curl git

# Install PM2 globally
sudo npm install -g pm2

# Create deployment directory
mkdir -p /var/www/synvo-docs
cd /var/www/synvo-docs

# Extract migration package
tar -xzf ~/synvo-docs-migration.tar.gz

# Install dependencies
npm ci --production

# Build the application
npm run build
```

### **Step 3: Configure Services**
```bash
# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup

# Configure Nginx
sudo cp nginx-synvo-docs.conf /etc/nginx/sites-available/synvo-docs
sudo ln -s /etc/nginx/sites-available/synvo-docs /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### **Step 4: Test Deployment**
```bash
# Test local access
curl -I http://localhost

# Get server IP
NEW_IP=$(curl -s ifconfig.me)
echo "New server IP: $NEW_IP"

# Test external access (from your local machine)
curl -I http://$NEW_IP
```

## 📦 **Method 2: Fresh Deployment**

### **Step 1: Clone and Setup**
On new server:
```bash
# Clone your repository (if you have it in Git)
git clone https://github.com/your-repo/synvo-docs.git
cd synvo-docs

# OR create from scratch and copy files manually
mkdir synvo-docs && cd synvo-docs
# Then copy package.json, src/, content/, etc.
```

### **Step 2: Install and Build**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Create PM2 config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'synvo-docs',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/synvo-docs',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
EOF
```

## 🔧 **Automated Migration Script**

Save this as `migrate-to-server.sh`:
```bash
#!/bin/bash

# Usage: ./migrate-to-server.sh user@new-server-ip

if [ $# -eq 0 ]; then
    echo "Usage: $0 user@server-ip"
    exit 1
fi

SERVER=$1
echo "🚀 Migrating Synvo Docs to $SERVER"

# Create migration package
echo "📦 Creating migration package..."
tar -czf synvo-docs-migration.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=logs \
  --exclude=*.log \
  .

# Transfer to new server
echo "📤 Transferring files..."
scp synvo-docs-migration.tar.gz $SERVER:~/

# Setup script for remote server
cat > remote-setup.sh << 'EOF'
#!/bin/bash
set -e

echo "🔧 Setting up Synvo Docs on new server..."

# Install system packages
sudo apt update
sudo apt install -y nginx nodejs npm curl

# Install PM2
sudo npm install -g pm2

# Create deployment directory
sudo mkdir -p /var/www/synvo-docs
sudo chown $USER:$USER /var/www/synvo-docs
cd /var/www/synvo-docs

# Extract and setup
tar -xzf ~/synvo-docs-migration.tar.gz
npm ci --production
npm run build

# Start services
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configure Nginx
sudo cp nginx-synvo-docs.conf /etc/nginx/sites-available/synvo-docs
sudo ln -sf /etc/nginx/sites-available/synvo-docs /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and start Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Setup completed!"
echo "🌐 Test your site: http://$(curl -s ifconfig.me)"
EOF

# Transfer and run setup script
scp remote-setup.sh $SERVER:~/
ssh $SERVER 'chmod +x remote-setup.sh && ./remote-setup.sh'

echo "🎉 Migration completed!"
echo "🧪 Test your new deployment:"
echo "   ssh $SERVER 'curl -I http://localhost'"
```

## 🌐 **DNS Update**

After successful migration:
```bash
# Update DNS records to point to new server IP
# A record: docs.synvo.ai → NEW_SERVER_IP

# Test DNS propagation
nslookup docs.synvo.ai
curl -I http://docs.synvo.ai
```

## 🔒 **SSL Certificate Setup**

On new server:
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d docs.synvo.ai

# Test auto-renewal
sudo certbot renew --dry-run
```

## 🔍 **Troubleshooting Migration**

### **Common Issues:**

1. **Port conflicts:**
   ```bash
   # Check what's using port 80
   sudo netstat -tlnp | grep :80
   
   # Kill conflicting processes
   sudo systemctl stop apache2  # if Apache is running
   ```

2. **Permission issues:**
   ```bash
   # Fix ownership
   sudo chown -R $USER:$USER /var/www/synvo-docs
   
   # Fix PM2 permissions
   pm2 kill && pm2 start ecosystem.config.js
   ```

3. **Build failures:**
   ```bash
   # Clear cache and rebuild
   rm -rf .next node_modules
   npm install
   npm run build
   ```

4. **Nginx configuration errors:**
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Check logs
   sudo tail -f /var/log/nginx/error.log
   ```

## ✅ **Migration Checklist**

- [ ] Test new server firewall (external HTTP access)
- [ ] Transfer application files
- [ ] Install Node.js, npm, PM2, Nginx
- [ ] Build application
- [ ] Configure PM2 and Nginx
- [ ] Test local access
- [ ] Test external access
- [ ] Update DNS records
- [ ] Setup SSL certificate
- [ ] Monitor application (PM2 monit)

## 🎯 **Success Indicators**

Your migration is successful when:
- ✅ `curl -I http://new-server-ip` returns HTTP 200
- ✅ Browser shows Synvo Docs at new IP
- ✅ PM2 shows app running: `pm2 status`
- ✅ Nginx is active: `sudo systemctl status nginx`
- ✅ DNS resolves to new IP (after DNS update)
- ✅ SSL certificate works (after setup)
