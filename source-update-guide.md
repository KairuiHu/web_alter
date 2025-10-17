# Source Code Update Guide

## 🔄 How to Update Your Synvo Docs After Code Changes

### **When You Need to Rebuild**

You need to rebuild when you change:
- ✅ **React components** (`.tsx`, `.jsx` files)
- ✅ **Styles** (CSS, Tailwind classes)
- ✅ **Content** (`.md`, `.mdx` files)
- ✅ **Configuration** (`next.config.ts`, `package.json`)
- ✅ **Static assets** (images, icons)

You DON'T need to rebuild for:
- ❌ **Log files** changes
- ❌ **PM2 configuration** changes (just restart PM2)
- ❌ **Nginx configuration** changes (just reload Nginx)

## 🚀 **Quick Update Process**

### **Method 1: Simple Rebuild (Current Server)**
```bash
cd /home/jkyang/kai/eta-docs

# Stop the application
pm2 stop synvo-docs

# Pull latest changes (if using Git)
git pull origin main

# Install any new dependencies
npm install

# Rebuild the application
npm run build

# Restart the application
pm2 restart synvo-docs

# Check status
pm2 status
curl -I http://localhost
```

### **Method 2: Development Workflow**
```bash
cd /home/jkyang/kai/eta-docs

# Make your changes to source files
# Edit src/app/(home)/page.tsx, content/docs/*, etc.

# Test locally during development
npm run dev  # Runs on http://localhost:3000

# When satisfied, build for production
npm run build

# Restart production server
pm2 restart synvo-docs
```

## 🔧 **Automated Update Script**

Save this as `update-site.sh`:
```bash
#!/bin/bash

echo "🔄 Updating Synvo Docs..."

# Navigate to project directory
cd /home/jkyang/kai/eta-docs

# Stop application
echo "⏹️  Stopping application..."
pm2 stop synvo-docs

# Backup current build (optional)
if [ -d ".next" ]; then
    echo "💾 Backing up current build..."
    mv .next .next.backup.$(date +%Y%m%d_%H%M%S)
fi

# Pull latest changes (if using Git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull origin main
fi

# Install dependencies (in case package.json changed)
echo "📦 Installing dependencies..."
npm ci --production

# Build application
echo "🏗️  Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Restart application
    echo "🚀 Restarting application..."
    pm2 restart synvo-docs
    
    # Wait a moment for startup
    sleep 3
    
    # Test the application
    echo "🧪 Testing application..."
    if curl -s http://localhost >/dev/null; then
        echo "✅ Application is running successfully!"
        pm2 status
    else
        echo "❌ Application test failed!"
        echo "📋 Checking logs..."
        pm2 logs synvo-docs --lines 10
    fi
    
    # Clean up old backup
    find . -name ".next.backup.*" -mtime +7 -delete 2>/dev/null
    
else
    echo "❌ Build failed!"
    
    # Restore backup if available
    LATEST_BACKUP=$(ls -t .next.backup.* 2>/dev/null | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        echo "🔄 Restoring backup: $LATEST_BACKUP"
        mv "$LATEST_BACKUP" .next
        pm2 restart synvo-docs
    fi
    
    exit 1
fi

echo "🎉 Update completed successfully!"
```

Make it executable:
```bash
chmod +x update-site.sh
```

## 📝 **Content-Only Updates**

For quick content changes (markdown files):
```bash
cd /home/jkyang/kai/eta-docs

# Edit your content files
nano content/docs/1.0/intro/quickstart.md

# Quick rebuild (faster for content-only changes)
npm run build

# Restart
pm2 restart synvo-docs

# Test
curl -I http://localhost
```

## 🔍 **Development vs Production**

### **Development Mode:**
```bash
# For active development
npm run dev

# Features:
# - Hot reload (automatic updates)
# - Detailed error messages
# - Source maps
# - Runs on port 3000 by default
```

### **Production Mode:**
```bash
# For live deployment
npm run build  # Build optimized version
npm start      # Start production server

# Features:
# - Optimized bundles
# - Better performance
# - Minified code
# - Runs on configured port (8080 in your case)
```

## 🚨 **Troubleshooting Updates**

### **Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### **Application Won't Start:**
```bash
# Check PM2 logs
pm2 logs synvo-docs

# Check if port is available
netstat -tlnp | grep :8080

# Restart PM2 daemon
pm2 kill
pm2 start ecosystem.config.js
```

### **Changes Not Visible:**
```bash
# Clear Next.js cache
rm -rf .next

# Force rebuild
npm run build

# Hard restart PM2
pm2 delete synvo-docs
pm2 start ecosystem.config.js

# Clear browser cache or try incognito mode
```

## 🔄 **Git Workflow (Recommended)**

### **Setup Git Repository:**
```bash
cd /home/jkyang/kai/eta-docs

# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/your-username/synvo-docs.git
git push -u origin main
```

### **Update Workflow with Git:**
```bash
# Make changes locally
# Edit files...

# Commit changes
git add .
git commit -m "Update homepage content"
git push origin main

# Deploy to server
ssh user@server 'cd /var/www/synvo-docs && ./update-site.sh'
```

## 📊 **Update Checklist**

Before updating:
- [ ] Backup current working version
- [ ] Test changes locally (`npm run dev`)
- [ ] Commit changes to Git (if using)

During update:
- [ ] Stop application (`pm2 stop synvo-docs`)
- [ ] Pull/apply changes
- [ ] Install dependencies (`npm ci`)
- [ ] Build application (`npm run build`)
- [ ] Restart application (`pm2 restart synvo-docs`)

After update:
- [ ] Test local access (`curl http://localhost`)
- [ ] Test external access (browser)
- [ ] Check PM2 status (`pm2 status`)
- [ ] Monitor logs (`pm2 logs synvo-docs`)

## ⚡ **Quick Commands Reference**

```bash
# Quick update (current server)
./update-site.sh

# Manual update steps
pm2 stop synvo-docs
npm run build
pm2 restart synvo-docs

# Check status
pm2 status
curl -I http://localhost

# View logs
pm2 logs synvo-docs

# Monitor in real-time
pm2 monit
```

## 🎯 **Best Practices**

1. **Always test locally first** (`npm run dev`)
2. **Use Git for version control**
3. **Backup before major updates**
4. **Monitor logs after updates**
5. **Keep dependencies updated** (`npm audit`)
6. **Use staging environment** for major changes
7. **Document your changes** in commit messages
