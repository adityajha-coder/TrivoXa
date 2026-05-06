<div align="center">
  <img src="public/favicon.svg" alt="Vertex Logo" width="120" height="120">
  
  # Vertex Developer Toolkit
  
  **A Unified, High-Performance and Developer Utility Suite**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
  [![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA-blue.svg)]()
</div>

<br>

Vertex is a comprehensive, browser-based developer toolkit engineered to consolidate scattered utilities into a single, high-performance workspace. Built from the ground up with vanilla JavaScript and native CSS, it prioritizes absolute speed, clarity, and developer productivity over heavy framework overhead.

By integrating LLM-assisted development, 3D repository visualization, a Monaco-powered code editor, and decentralized cloud-synchronized state, Vertex allows engineers to transition seamlessly from architecture planning to code execution within a unified, high-contrast monochrome environment.

---

## Architecture & Technical Design

* **Frontend Engine:** Pure ES6+ modules and vanilla JavaScript, styled using strict CSS Variables for a consistent, distraction-free monochrome design system.
* **State & Persistence:** 
  * Real-time data synchronization (Snippets, AI History, User State) is handled via Firebase Firestore.
  * Local IndexedDB and LocalStorage provide an aggressive offline fallback layer for unauthenticated sessions.
* **Service Workers & PWA:** Vertex operates as a fully installable Progressive Web App (PWA). Intelligent Service Worker (`sw.js`) caching strategies ensure core assets load instantly and remain available completely offline.
* **Module Loading:** Heavy libraries are deferred and loaded asynchronously to prevent main-thread blocking:
  * `monaco-editor` for the Code Workspace.
  * `three.js` and `3d-force-graph` for GitHub Explorer rendering.
  * `chart.js` for Package Scout metrics.
* **Backend Integration:** A lightweight Node.js proxy server (`server/groq-proxy.js`) securely interfaces with the Groq API (Llama models), mitigating CORS restrictions and keeping API tokens out of the client bundle. This seamlessly translates to Vercel Serverless Functions in production.

---

## Core Modules

### AI Hub
An intelligent development assistant powered by Groq's high-speed inference layer (Llama 3.1). Interactions are statefully synced across devices using Firebase.
* **AI Chat:** Discuss system architecture, debug logical errors, and explore technical concepts with near-zero latency.
* **Architect:** Input high-level application requirements to generate raw terminal scaffolding scripts and complete JSON folder structures.
* **Code Generator:** Dynamically synthesize production-ready UI components, boilerplates, and application logic tailored to specific frameworks.

### Monaco Code Workspace
A fully native browser IDE leveraging Microsoft's Monaco Editor (the core engine behind VS Code).
* Safely write, execute, and validate JavaScript/TypeScript snippets directly in an isolated browser environment.
* **Cloud Snippets:** Securely persist boilerplate templates or experimental code via Firestore, ensuring your custom utility functions are accessible anywhere.

### GitHub Explorer
Transform standard repository navigation into an interactive, spatial experience.
* **3D File Visualization:** Traverse complex open-source GitHub repositories rendered as 3D force-directed graphs. Visually comprehend directory depth and architectural scale without cloning.
* **Git Insights:** Track local Git configurations alongside remote repository data.

### Developer Tools Suite
A collection of utilities designed to minimize tab-switching during development.
* **Package Scout:** Analyze NPM package heuristics. Inspect download velocity, bundle sizes, and community adoption metrics.
* **Free APIs Directory:** Discover, filter, and ping over 55 open public REST endpoints directly within the Vertex interface.
* **Tools Vault:** A categorized directory of essential framework boilerplates, technical libraries, and system utilities to accelerate project initialization.
* **Docs Search:** A centralized reference engine with persistent search history to document your technical research.

---

## Local Development & Setup

Start running Vertex natively in under a minute.

### Prerequisites
* Node.js (v16.x or newer recommended)
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityajha-coder/vertex-devloper-toolkit.git
   cd vertex-devloper-toolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup (Required for AI Modules):**
   The AI Hub requires a valid Groq API key to handle inference requests.
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Alternatively, the API key can be injected dynamically via the Vertex UI settings menu).*

4. **Launch the Application:**
   Initialize both the local API proxy server and the static development server concurrently:
   ```bash
   npm run both
   ```
   The application will mount immediately at `http://localhost:8080`.

---

## Repository Structure

```text
vertex/
├── server/          # Local Node.js proxy server and API logic (`groq-proxy.js`)
├── scripts/         # Shell and Node utility scripts for testing/setup
├── css/             # Modular CSS enforcing the monochrome design system
├── js/
│   ├── components/  # Reusable DOM components (Navbar, Loader)
│   ├── pages/       # Core application modules (AskAI, Workspace, Docs)
│   ├── utils/       # Global helpers, Firebase initialization, API abstractions
│   ├── core/        # Application bootstrapper and SPA router logic
├── public/          # Static assets (Favicon, Web Manifest)
├── index.html       # Primary entry point and SPA shell
├── package.json     # Dependency manifest and local execution scripts
└── sw.js            # PWA Service Worker for offline bridging and cache invalidation
```

---

## Production Deployment

Vertex is fundamentally designed for edge deployment and Serverless environments.

When deployed to platforms such as Vercel or Netlify, Vertex dynamically routes all API tunneling from local endpoints to properly configured Serverless Functions (e.g., `/api/groq`). 

**Important:** Ensure that your `GROQ_API_KEY` and Firebase SDK variables are explicitly defined in your hosting provider's Environment Variables dashboard prior to triggering a production build.

---

## License

This project is open-source and distributed under the **MIT License**. See the `LICENSE` file for detailed information.

---

<div align="center">
  <i>Engineered by <a href="https://github.com/adityajha-coder">Aditya Jha</a>.</i>
</div>
