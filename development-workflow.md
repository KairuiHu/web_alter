# 🔄 Development Workflow for Synvo Docs

## 📁 **Project Structure Overview**

```
/data/kairui/web_alter/
├── content/docs/1.0/          # 📝 Markdown content files
│   ├── intro/                 # Introduction pages
│   ├── synvo-api/            # API documentation
│   └── meta.json             # Sidebar configuration
├── src/
│   ├── app/                  # 🎨 Next.js app router pages
│   ├── components/           # ⚛️ React components
│   └── lib/                  # 🔧 Utility functions
├── public/                   # 🖼️ Static assets (images, etc.)
└── package.json              # 📦 Dependencies
```

## 🎯 **What Changes Require Rebuilding?**

### **✅ REBUILD REQUIRED:**
- **Content changes:** `.md`, `.mdx` files in `content/docs/`
- **Sidebar changes:** `meta.json` files
- **Component changes:** `.tsx`, `.jsx` files in `src/`
- **Styling changes:** CSS, Tailwind classes
- **Configuration:** `next.config.ts`, `package.json`
- **Static assets:** Images, icons in `public/`

### **❌ NO REBUILD NEEDED:**
- **PM2 config:** Just restart PM2
- **Nginx config:** Just reload Nginx
- **Environment variables:** Just restart PM2

## 🚀 **Development Workflows**

### **Method 1: Quick Content Updates (Markdown/MDX)**

For editing documentation content:

```bash
# 1. Edit your content
nano content/docs/1.0/intro/quickstart.md

# 2. Quick rebuild and restart
npm run build && pm2 restart synvo-docs

# 3. Test
curl -I http://localhost:8081
```

### **Method 2: Development Mode (For Major Changes)**

For component changes, styling, or extensive content updates:

```bash
# 1. Start development server (runs on port 3000)
npm run dev

# 2. Make your changes and test at http://localhost:3000
# 3. When satisfied, build for production
npm run build

# 4. Restart production server
pm2 restart synvo-docs
```

### **Method 3: Safe Production Update**

For important updates with backup:

```bash
# 1. Stop production
pm2 stop synvo-docs

# 2. Backup current build
cp -r .next .next.backup.$(date +%Y%m%d_%H%M%S)

# 3. Make your changes
# Edit files...

# 4. Build new version
npm run build

# 5. Test build locally
npm run start &
curl -I http://localhost:3000
kill %1

# 6. Restart production
pm2 start synvo-docs
```

## 📝 **Common Editing Scenarios**

### **1. Adding New Documentation Page**

```bash
# Create new markdown file
nano content/docs/1.0/synvo-api/new-feature.mdx

# Add to sidebar (meta.json)
nano content/docs/1.0/synvo-api/meta.json

# Rebuild
npm run build && pm2 restart synvo-docs
```

### **2. Editing Existing Content**

```bash
# Edit the markdown file
nano content/docs/1.0/intro/quickstart.md

# Quick rebuild
npm run build && pm2 restart synvo-docs
```

### **3. Changing Sidebar Structure**

```bash
# Edit meta.json files
nano content/docs/1.0/meta.json
nano content/docs/1.0/intro/meta.json

# Rebuild (sidebar changes require full rebuild)
npm run build && pm2 restart synvo-docs
```

### **4. Updating Components or Styling**

```bash
# Edit React components
nano src/components/page-actions.tsx

# Or edit app pages
nano src/app/(home)/page.tsx

# Full rebuild required
npm run build && pm2 restart synvo-docs
```

## 🔧 **Automated Scripts**

### **Quick Update Script**
