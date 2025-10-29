# Cursor Context - Synvo API Documentation

## 🎯 Project Purpose
This is the official documentation website for Synvo API, a multimodal contextual memory system for AI agents. The site provides comprehensive API documentation, interactive examples, and a playground for developers.

## 🏗️ Architecture
- **Framework**: Next.js 14 with App Router
- **UI Library**: Fumadocs UI (specialized for documentation)
- **Styling**: Tailwind CSS with custom theme support
- **Content**: MDX files for documentation
- **Language**: TypeScript throughout

## 📁 Key Directories

### `/src/app/`
- `(home)/page.tsx` - Main homepage with theme-aware demo
- `(home)/playground/` - Interactive API playground
- `docs/` - Documentation pages (auto-generated from content)
- `api/` - API routes for search functionality

### `/src/components/`
- `theme-aware-image.tsx` - **NEW**: Switches between dark/light GIFs based on user theme
- `ui/` - Reusable UI components (buttons, etc.)
- `custom-api-page.tsx` - Custom API documentation components

### `/content/docs/1.0/`
- `synvo-api/` - All API endpoint documentation
- `intro/` - Getting started guides
- `quick-start.mdx` - Quick start tutorial

### `/public/assets/`
- `synvo_api_dark.gif` - Dark mode demo GIF
- `synvo_api_light.gif` - Light mode demo GIF
- `logo-only.svg` - Company logo

## 🎨 Theme System
The project implements automatic theme switching:
- **Dark Mode**: Uses `synvo_api_dark.gif` (black background, white elements)
- **Light Mode**: Uses `synvo_api_light.gif` (white background, dark elements)
- **Detection**: Uses `prefers-color-scheme` CSS media query
- **Component**: `ThemeAwareImage` handles automatic switching

## 🔧 Recent Implementation
Just implemented theme-aware GIF switching:
1. Created `ThemeAwareImage` component that detects user's theme preference
2. Updated homepage to use the new component instead of static `synvo_api.gif`
3. Component automatically switches between dark and light GIFs
4. Prevents hydration mismatches with proper mounting logic

## 📚 API Documentation Structure
The API docs are organized into logical sections:
- **File Management**: Upload, download, delete, search files
- **Context Generation Layer**: AI-powered search and context retrieval
- **Session Management**: Conversation history and feedback
- **Authentication**: API key management

## 🚀 Development Workflow
- Content changes in `/content/docs/` require rebuild
- Component changes in `/src/` require rebuild
- Use `npm run dev` for development
- Use `npm run build` for production

## 🎯 Current Focus
The project recently focused on improving the user experience with theme-aware components, ensuring the demo GIF matches the user's preferred theme (dark/light mode).

## 🔍 Key Features
- Responsive design with mobile support
- Interactive code examples
- Theme-aware components
- Search functionality
- API playground
- Comprehensive endpoint documentation
