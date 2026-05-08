<div align="center">
  <img src="public/favicon.svg" alt="Vertex Logo" width="120" height="120">
  
  # Vertex Developer Toolkit
  
  **A Unified, High-Performance Workspace for Modern Engineers**
  
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
  [![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA-blue.svg)]()
  [![Stack](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20Node.js%20%7C%20MongoDB-lightgrey.svg)]()
</div>

<br>

Vertex is a professional grade, browser based developer toolkit designed to consolidate scattered utilities into a single, cohesive workspace. Engineered for speed and clarity.

Whether you're visualizing complex GitHub structures in 3D, generating full-stack boilerplates via AI, or managing secure code snippets, Vertex provides a unified, high-contrast monochrome interface optimized for deep work.

---

## Architecture & Technical Design

Vertex is built on a "Member-First" architecture, ensuring data persistence and secure access to premium AI features.

*   **Frontend Engine:** 
    *   **Vanilla JS (ES6+):** Modular application logic with zero framework bloat for maximum execution speed.
    *   **Custom CSS Design System:** A strict monochrome aesthetic built with CSS Variables, supporting fluid animations and responsive layouts.
    *   **Single Page Application (SPA):** A custom client-side router (`Router.js`) handles instantaneous page transitions without reloads.
*   **Backend Infrastructure:**
    *   **Node.js & Express:** A robust proxy and API server handling secure requests and business logic.
    *   **MongoDB (Mongoose):** High-availability persistence for user accounts, code snippets, AI history, and documentation research.
    *   **JWT Authentication:** Secure, stateless session management for member-only features.
*   **Performance & Offline:**
    *   **Progressive Web App (PWA):** Fully installable with service worker (`sw.js`) caching for instant loading and offline availability of core tools.
    *   **Asynchronous Loading:** Heavy dependencies like `Three.js`, and `3D-Force-Graph` are loaded on-demand to optimize initial bundle size.
*   **Integrations:**
    *   **Groq Cloud:** Leveraging Llama 3.1 models for ultra-high-speed AI inference.
    *   **GitHub API:** Real-time repository data and user profile exploration.
    *   **NPM Registry:** Live package heuristic analysis and download metrics.

---

## Core Modules

### AI Hub
An intelligent development suite powered by Groq's high-speed inference layer.
*   **AI Chat:** A stateful, context-aware assistant for debugging, refactoring, and architectural discussions.
*   **AI Architect:** Transform high-level requirements into complete terminal scaffolding scripts and JSON directory structures.
*   **Code Generator:** Dynamically synthesize UI components and boilerplate logic tailored to your specific tech stack.
*   **AI Stacks:** Explore and generate optimized technology combinations for new projects.

### Cheat Sheet Workspace
A professional IDE environment integrated directly into the browser.
*   **Execution Engine:** Safely run and validate JavaScript/TypeScript snippets in an isolated environment.
*   **Cloud Snippets:** Securely persist, edit, and organize reusable code blocks via MongoDB.
*   **Editor Experience:** Full VS Code-like experience with syntax highlighting, auto-completion, and multi-cursor support.

### GitHub Explorer
Spatial visualization of repository architectures.
*   **3D Repo Visualizer:** Traverse GitHub repositories rendered as 3D force-directed graphs. Comprehend directory depth and architectural scale at a glance.
*   **Git Insights:** Access remote repository metrics and local Git configuration details in a unified view.
*   **User Explorer:** Search and analyze GitHub profiles to understand contributor activity and repository ownership.

### Developer Utilities
A centralized suite of essential tools to minimize tab-switching.
*   **Package Scout:** Deep-dive into NPM package heuristics, download velocity, and bundle sizes.
*   **Free APIs Directory:** Filter and test over 55+ public REST endpoints directly within the interface.
*   **Tools Vault:** A curated directory of framework boilerplates, technical libraries, and system utilities.
*   **Commands Library:** Searchable reference for Git, Docker, Linux, and other essential CLI commands.
*   **Docs Search:** A centralized reference engine with persistent search history for technical research.

---

## 📂 Repository Structure

```text
vertex/
├── server/          # Node.js backend (index.js, routes, models, middleware)
├── scripts/         # Shell and Node utility scripts for testing/setup
├── css/             # Modular CSS enforcing the monochrome design system
├── js/
│   ├── core/        # SPA bootstrapper and routing engine
│   ├── components/  # Reusable UI components (Navbar, Loader)
│   ├── pages/       # Core application modules (AI, Workspace, Tools, Git)
│   ├── utils/       # Global helpers, API abstractions, and shared logic
├── public/          # Static assets (Favicon, Icons, Manifest, sw.js)
├── index.html       # Primary entry point and SPA shell
├── package.json     # Project dependencies and script definitions
└── vercel.json      # Production deployment configuration
```

---

<div align="center">
  <i>Designed and Engineered by <a href="https://github.com/adityajha-coder">Aditya Jha</a>.</i>
</div>
