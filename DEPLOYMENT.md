# Deployment Guide

This documentation site is configured to be deployed at `https://synvo.ai/docs/`.

## Build for Production

### Option 1: Static Export (Recommended)

```bash
# Install dependencies
pnpm install

# Build and export static files
pnpm run build

# The static files will be in the 'out' directory
```

The static files will be generated in the `out/` directory and can be served from any web server.

### Option 2: Server Deployment

```bash
# Build for production
pnpm run build

# Start production server
pnpm run start
```

## Deployment Options

### 1. Static Hosting (Recommended for `/docs/` path)

**For Nginx:**
```nginx
server {
    listen 80;
    server_name synvo.ai;
    
    # Serve docs from the /docs path
    location /docs/ {
        alias /path/to/eta-docs/out/;
        try_files $uri $uri/ $uri.html /docs/index.html;
        
        # Handle client-side routing
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Your main site
    location / {
        # Your main synvo.ai content
        root /path/to/main/site;
    }
}
```

**For Apache:**
```apache
# In your main synvo.ai .htaccess or virtual host
Alias /docs /path/to/eta-docs/out

<Directory "/path/to/eta-docs/out">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
    
    # Handle client-side routing
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /docs/index.html [L]
</Directory>
```

### 2. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Then configure a custom domain in Vercel dashboard to point to `synvo.ai/docs`.

### 3. Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `pnpm run build`
3. Set publish directory: `out`
4. Configure custom domain to `synvo.ai/docs`

### 4. GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## Configuration Notes

- **Base Path**: Configured for `/docs/` path
- **Asset Prefix**: All assets will be served from `/docs/`
- **Trailing Slash**: Enabled for better compatibility
- **Default Route**: Redirects to API Keys documentation

## Testing Locally

To test the production build locally:

```bash
# Build the site
pnpm run build

# Serve the static files (requires a static server)
npx serve out -s

# Or use Python
cd out && python -m http.server 3000
```

Then visit `http://localhost:3000` to see how it will look when deployed.

## Domain Setup

1. **DNS Configuration**: Point `synvo.ai` to your server
2. **SSL Certificate**: Ensure HTTPS is configured
3. **Path Routing**: Configure your web server to serve the docs from `/docs/`

## Post-Deployment

After deployment, the documentation will be available at:
- Main entry: `https://synvo.ai/docs/`
- API Keys (default): `https://synvo.ai/docs/1.0/synvo-api/api-keys-authentication/`
- Cookbook: `https://synvo.ai/docs/1.0/cookbook/`
- All other sections: `https://synvo.ai/docs/1.0/synvo-api/[section]/`
