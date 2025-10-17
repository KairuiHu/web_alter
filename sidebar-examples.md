# 📋 Sidebar Configuration Examples

## Current Structure
Your sidebar is controlled by `meta.json` files in each directory.

### Main Sidebar (`content/docs/1.0/meta.json`)
```json
{
  "title": "v1.0",
  "icon": "GitFork", 
  "root": true
}
```

### Section Sidebar (`content/docs/1.0/intro/meta.json`)
```json
{
  "defaultOpen": true
}
```

### API Section (`content/docs/1.0/synvo-api/meta.json`)
```json
{
  "title": "Synvo API",
  "defaultOpen": true
}
```

## How to Modify Sidebar

### Add New Section
1. Create directory: `content/docs/1.0/new-section/`
2. Add `meta.json`:
```json
{
  "title": "New Section",
  "defaultOpen": false
}
```

### Reorder Pages in Section
Edit the section's `meta.json`:
```json
{
  "title": "Synvo API",
  "defaultOpen": true,
  "pages": [
    "api-keys-authentication",
    "file-upload-management", 
    "query-retrieval",
    "new-feature"
  ]
}
```

### Add Icons to Sections
```json
{
  "title": "API Reference",
  "icon": "Code",
  "defaultOpen": true
}
```

Available icons: https://lucide.dev/icons/

## Page Frontmatter
Add metadata to your `.mdx` files:

```markdown
---
title: "Custom Page Title"
description: "Page description for SEO"
---

# Your content here
```
