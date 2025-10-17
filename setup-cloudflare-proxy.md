# 🌐 Cloudflare Proxy Setup (No Port Numbers Needed!)

## How it Works:
- **User visits:** http://docs.synvo.ai (no port)
- **Cloudflare receives:** Request on port 80
- **Cloudflare forwards to:** Your server on port 8081
- **Result:** Clean URLs without port numbers!

## Setup Steps:

### 1. In Cloudflare Dashboard:
1. Go to https://dash.cloudflare.com/
2. Select **synvo.ai** domain
3. Go to **DNS** → **Records**
4. Find your **docs** A record
5. **Turn ON the orange cloud** (Proxy status: Proxied)
6. Save changes

### 2. Add Page Rule (Optional but recommended):
1. Go to **Rules** → **Page Rules**
2. Click **"Create Page Rule"**
3. URL pattern: `docs.synvo.ai/*`
4. Settings: 
   - **Always Use HTTPS:** On
   - **Browser Cache TTL:** 4 hours
5. Save

## Result:
- ✅ **http://docs.synvo.ai** → Works (redirects to HTTPS)
- ✅ **https://docs.synvo.ai** → Works  
- ✅ No port numbers needed!
- ✅ Free SSL certificate from Cloudflare
- ✅ CDN acceleration

## Benefits:
- Clean URLs (no :8081)
- Free SSL/HTTPS
- DDoS protection
- Global CDN
- Analytics
