# Vertex — The All-in-One Toolkit for Developers

Vertex is a high-performance, AI-powered developer toolkit designed to supercharge your workflow. Whether you're a beginner exploring new tech stacks or a seasoned engineer looking for quick references, Vertex consolidates everything you need into a single, comprehensive dashboard.

## ✨ Key Features

- 🪄 **AI Hub (Chat & Architect)**: Powered by **Groq (Llama 3.1)**. Debug errors, explain code, or use the **AI Architect** to design entire project structures from a single prompt.
- ⚡ **AI Code Generator**: Generate framework components (React, Vue, HTML/CSS) and run them instantly via **StackBlitz WebContainers**.
- 💻 **Monaco-powered Workspace**: Edit and save snippets in a native VS Code-like environment (Microsoft Monaco Editor).
- 🌐 **Interactive 3D GitHub Explorer**: Visualize any repository as a 3D force-directed graph using `Three.js`.
- 🔍 **AI Code Analyzer**: Score your code's health, security, and complexity with instant AI-driven reviews.
- 📦 **Package Scout**: Deep dive into npm package analytics and GitHub community stats.
- 🛠️ **Developer Utilities**: Curated collections of Free APIs, Command References, and Framework Boilerplates.

## 📁 Project Structure

The project is organized into a clean, modular structure:

- **`/js`**: All frontend logic, split into `/pages`, `/components`, and `/utils`.
- **`/api`**: Vercel Serverless Functions for production API proxying.
- **`/core`**: Local backend proxy server and error logging.
- **`/devtools`**: Diagnostic tools and setup scripts.
- **`/config`**: Configuration data for models, compilers, and APIs.
- **`/css`**: Modular CSS design system (base, layout, components).

## 🚀 Getting Started

### 1. Local Development (Development Mode)
To use the AI features locally, you need to start the Groq Proxy:

```bash
# Install dependencies
npm install

# Start the Groq Proxy (runs on localhost:3001)
npm run proxy

# Start the Vertex frontend (runs on localhost:8080)
npm start
```

### 2. Production Deployment
Vertex is optimized for **Vercel**. 

- The app automatically detects when it's running in production.
- It switches from the local proxy to the **Vercel Serverless Proxy** (`/api/groq/chat`) automatically.
- No local node server is required after deployment.

### 🔌 API Configuration
Vertex uses the **Groq API** for high-speed interference.
- **Default Key**: A community key is included as a fallback.
- **Custom Key**: You can provide your own `gsk_` key in the **AI Hub Settings** or by setting a `GROQ_API_KEY` environment variable on Vercel.

##  Tech Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Glassmorphism)
- **Editor**: Microsoft Monaco Editor
- **3D Engine**: Three.js / 3d-force-graph
- **API**: Groq (Llama 3.1 8B/70B)
- **PWA**: Fully offline-capable with Service Workers and IndexedDB.

## 🤝 Contributing
Feel free to open PRs or issues. The project is designed to be easily extensible—just add a new module to `js/pages/`.

## 📜 License
MIT License
