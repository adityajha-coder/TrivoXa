# Vertex — The All-in-One Toolkit for New Developers

Vertex is the ultimate, high-performance developer toolkit carefully designed to supercharge your workflow. Whether you're a beginner exploring new tech stacks or a seasoned engineer looking for quick references, Vertex consolidates everything you need into a single, comprehensive, dynamic dashboard optimized for productivity, speed, and aesthetics.

## ✨ "Wow-Factor" Features

- 🪄 **AI Hub (Chat & Architect)**: Your personal programming assistant. Chat with Vertex AI to debug errors, explain confusing code, get tool recommendations, or use the **AI Architect** to design entire project architectures (complete with 2D file trees and one-line terminal setup scripts) straight from a simple prompt.
- ⚡ **Live StackBlitz Sandboxes**: Don't just read code—run it! Vertex integrates the StackBlitz WebContainers SDK, allowing you to instantly boot AI-generated architectures or personal saved snippets directly into a live, interactive browser-based development environment.
- 💻 **Monaco-Powered Workspace**: Ditch static text areas. Vertex's workspace and code generator are powered dynamically by the **Microsoft Monaco Editor** (the exact same engine that powers VS Code). Enjoy infinite syntax highlighting, code folding, minimaps, and autocompletion right inside your browser. Save snippets directly to IndexedDB.
- 🌐 **Interactive 3D GitHub Explorer**: Experience code visually! Transform any GitHub repository's file structure into an interactive 3D force-directed graph powered by `Three.js`. Review insights, stargazers, and analyze repos in an entirely new dimension.

## 🛠️ Core Toolkit

- **AI Code Generator**: Describe the component you want, specify your framework (React, Vue, Node, Python, etc.), and watch our AI model write production-ready code blocks inside a native VS Code-like environment.
- **Package Scout**: Deep dive into npm package analytics, including sizes, dependents, bundle optimizations, and GitHub community stats.
- **Tools Vault & Boilerplates**: A curated directory of industry-leading UI frameworks, CSS toolkits, design utilities, and easily accessible starting boilerplates for major stacks.
- **Free APIs Base**: A heavily categorized database of free-to-use, reliable public endpoints (Weather, Maps, Machine Learning, Anime, etc.).
- **Command Reference**: Never memorize terminal commands again. Easy-to-use search lists step-by-step workflows for Git, NPM, Docker, and general terminal utilities.
- **Global Search**: Hit <kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd> anywhere in the app to instantly search across tools, commands, APIs, and pages.

## 💻 Tech Stack

- **Frontend Core**: HTML5, Vanilla JavaScript, CSS3 (Modern minimalist styling, Glassmorphism, CSS Grid/Flexbox)
- **Editor Engine**: Microsoft Monaco Editor (via CDN)
- **3D Visualization**: `Three.js` & `3d-force-graph`
- **Live Sandboxes**: StackBlitz SDK (`@stackblitz/sdk`)
- **APIs Used**: Pollinations AI (Text generation), GitHub API, NPM Registry
- **Local Storage**: `IndexedDB` for saving workspace snippets natively on your device.

## 🚀 Installation

No complex build steps required! Vertex is a vanilla frontend app. Simply clone the repository and run it.

```bash
git clone https://github.com/adityajha-coder/Git-tool.git
cd Git-tool

# Serve it locally using your preferred HTTP server
npx serve .
# OR
python -m http.server 8080
# OR simply open index.html using Live Server in VS Code
```

## 🤝 Contributing
We welcome contributions to expand the toolkit! Feel free to modify the files located inside `js/pages/` to update commands, inject new APIs, tweak tool categories, or improve AI prompts.

## 📜 License
MIT License
