<div align="center">
  <img src="public/favicon.svg" alt="Vertex Logo" width="120" height="120">
  
  # ⚡ Vertex Developer Toolkit
  
  **Accelerate Your Workflow. Build Smarter.**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
  [![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA-blue.svg)]()
</div>

<br>

**Vertex** is a comprehensive, browser-based developer toolkit designed to consolidate scattered utilities into a single, high-performance workspace. Built with a sleek, high-contrast monochrome aesthetic, Vertex prioritizes speed, clarity, and productivity.

It functions as a unified environment offering AI-assisted development, 3D repository visualization, Monaco-powered code workspaces, and cloud-synchronized history, allowing modern developers to move seamlessly from ideation to code execution without context switching.

---

## ✨ Core Features

Vertex is composed of specialized modules that seamlessly integrate to enhance your workflow.

### 🤖 AI Hub
Your intelligent development companion powered by Groq (Llama 3.1) for near-instant responses. The AI Hub utilizes **Firebase Cloud Sync** to remember your history across devices.
* **AI Chat:** Brainstorm architectures, debug complex logic, and explore concepts instantly.
* **Architect:** Input your app requirements to generate raw terminal setup commands and complete folder structures.
* **Code Generator:** Dynamically generate production-ready UI components and application logic based on your preferred tech stack.

### 💻 Monaco Code Workspace
A native, browser-based IDE powered by Microsoft's Monaco Editor (the engine behind VS Code).
* Safely write, edit, and execute JavaScript/TypeScript directly in the browser.
* **Cloud Snippets:** Securely save your boilerplate code via Firebase Firestore or locally via IndexedDB. Access your snippets anywhere by authenticating with Google.

### 🪐 GitHub Explorer
Transform complex codebases into interactive visual maps.
* **3D File Visualization:** Traverse entire public GitHub repositories rendered as 3D force-directed graphs. Visually understand repo scale and structure without manual cloning.
* **Git Insights:** Track localized Git configurations seamlessly alongside public repository queries.

### 🛠️ Developer Tools Suite
* **Package Scout:** Dive deep into NPM packages. Analyze download trends, bundle sizes, and community metrics instantly.
* **Free APIs Directory:** Discover and ping over 55+ open, curated public REST endpoints directly within the Vertex UI.
* **Tools Vault:** A categorized directory of framework boilerplates, technical libraries, and essential utilities to radically speed up setup time.
* **Docs Search:** A centralized reference search capability with auto-saving history to track your research over time.

---

## 🏗️ Technical Architecture

Vertex bypasses heavy build steps, utilizing raw ES6+ modules and vanilla JavaScript to ensure zero-latency cold starts.

* **Frontend:** Vanilla ES6+ Javascript with Native CSS Variables powering the strict Monochrome/Dark design system.
* **State & Persistence:** Firebase Firestore handles real-time syncing for Snippets and AI Interaction History. LocalStorage provides an automatic fallback for non-authenticated guests.
* **Service Workers & PWA:** Vertex is a fully installable Progressive Web App (PWA). Intelligent Service Worker (`sw.js`) caching ensures core assets load blazing fast and work offline.
* **Dynamic Libraries:**
  * `monaco-editor` for the Code Workspace.
  * `three.js` & `3d-force-graph` for GitHub Explorer.
  * `chart.js` for Package Scout metrics.
* **Backend Proxy:** A robust local Node.js server (`server/groq-proxy.js`) handles AI requests to external APIs securely, avoiding CORS issues and protecting your API keys.

---

## 🚀 Getting Started

Start building with Vertex natively on your local machine in under a minute.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.x or newer recommended)
* npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityajha-coder/vertex-devloper-toolkit.git
   cd vertex-devloper-toolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup (Mandatory for AI features):**
   You need a Groq API Key to utilize the AI Hub.
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Alternatively, you can enter the API key directly into the Vertex UI via the AI Hub settings).*

4. **Launch the Application:**
   Start both the local proxy server (backend) and the static UI server concurrently:
   ```bash
   npm run both
   ```
   The application will be instantly available at `http://localhost:8080`.

---

## 📁 Repository Map

```text
vertex/
├── server/          # Local Node.js Proxy Server logic (`groq-proxy.js`)
├── scripts/         # Utility scripts for testing and environment setup
├── css/             # Modular CSS stylesheets adhering to the monochrome design system
├── js/
│   ├── components/  # Reusable UI components (Navbar, Loader)
│   ├── pages/       # Core app modules (AskAI, Workspace, Docs, etc.)
│   ├── utils/       # Helpers, Firebase init, API wrappers, and localized IndexedDB logic
│   ├── core/        # Main initialization logic and SPA router
├── public/          # Static assets (Favicon, Manifest)
├── index.html       # Entry point and global single-page shell
├── package.json     # Node scripts and external dependencies
└── sw.js            # PWA Service Worker for caching and offline support
```

---

## 🌍 Production Deployment

Vertex is natively optimized for edge deployments.
- When shipped to platforms like Vercel, it dynamically routes API calls to **Serverless Functions** (if configured) or connects seamlessly to your deployed Node API.
- Ensure your `GROQ_API_KEY` and Firebase configurations are correctly added to your host's Environment Variables panel before building.

---

## 📜 License

This project is distributed under the **MIT License**. See the `LICENSE` file for more information.

---

<div align="center">
  <i>Designed and Built by <a href="https://github.com/adityajha-coder">Aditya Jha</a>.</i>
</div>
