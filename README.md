# ⚡ Vertex — Developer Toolkit

<div align="center">
  <img src="favicon.svg" alt="Vertex Logo" width="120" height="120">
</div>

> **Accelerate Your Workflow. Build Smarter.**
> The unified, high-contrast monochrome developer toolkit designed for modern, cloud-synchronized workflows.

Vertex consolidates scattered development utilities into a single powerful browser-based environment. Evolving from a collection of utilities into a **fully-fledged browser IDE**, Vertex offers AI architectural scaffolding, 3D repository visualization, Monaco-powered code workspaces, and cloud-synchronized history persistence. Designed with a sleek, distraction-free black-and-white aesthetic, Vertex is built for absolute speed, clarity, and developer productivity.

---

## ✨ Core Modules & Features

Vertex features a meticulously organized suite of interconnected tools. Every module has been styled with a professional, IDE-like dark UI and synced securely for cross-device usage.

### 🤖 AI Hub / Command Center
The core AI environment powered by Groq (Llama 3.1) executing queries at near-instant speed. The AI Hub remembers your interactions using **Firebase Cloud Sync** via a dedicated History tab.
*   **Chat:** Brainstorm architectures and debug complex logic instantly.
*   **Architect:** Input app requirements to generate raw terminal setup commands and full JSON repository structures.
*   **Code Generator:** Dynamically generate functional UI components and application logic based on your chosen tech stack.
*   **Analyzer:** Paste any code to receive an automated Health Score, Complexity rating, and a Security vulnerability review.

### 💻 My Workspace (Monaco Engine)
A native browser-based IDE powered by Microsoft's Monaco Editor.
*   Write, edit, and safely test JavaScript/TypeScript snippets directly in the browser.
*   **Cloud Snippets:** Securely save your boilerplate code via Firebase Firestore or IndexedDB offline. Access your custom snippets anywhere by logging in securely with Google Auth.

### 🪐 GitHub Explorer (3D Force Graph)
Transform complex repositories into interactive visual maps. 
*   **3D File Visualization:** Traverse entire public GitHub repositories rendered as 3D constellations instantly without manual cloning.
*   **Git Status:** Keep track of your localized Git configurations (Branch, Remote, Unstaged/Staged file counts) seamlessly separated from public username queries.

### 📖 Developer Docs Architect
A centralized, offline-compatible reference search capability.
*   Search for language syntax, framework specifics, or algorithm examples.
*   Never lose a search: The **Search History grid** auto-saves past queries locally or in the cloud. Review or replay past searches in a single click from the organized tracking carousel.

### additional core tools
*   📦 **Package Scout**: Deep dive into NPM heuristics. Analyze download trends, bundle sizes, and community metrics without opening a new tab.
*   🌐 **Free APIs Directory**: Ping and test over 55+ open, curated public endpoints directly within the Vertex UI. 
*   🛠️ **Tools Vault**: A directory of framework boilerplates, technical libraries, and essential VS Code tools ready to radically speed up setup time.

---

## 🏗️ Technical Architecture

Vertex bypasses heavy build steps, opting for raw ES6+ modules and vanilla JavaScript to ensure zero-latency cold starts. 

*   **Frontend Ecosystem**: Vanilla ES6+ Javascript with Native CSS Variables powering the strict Monochrome/Dark aesthetic.
*   **State & Persistence (Firebase)**: Firebase Firestore handles real-time syncing for code Snippets, Docs History, and AI Interaction History. Google Auth restricts private queries to authenticated users. LocalStorage acts as an automatic fallback constraint for non-authenticated guests.
*   **Service Workers & PWA**: Vertex is a fully installable Progressive Web App. By utilizing intelligent Service Worker (`sw.js`) caching, core JS files heavily cache locally for blazing fast load speeds even offline.
*   **Libraries Loaded on Demand**:
    *   `monaco-editor` (AMD Load) for the Workspace.
    *   `three.js` & `3d-force-graph` for the GitHub Explorer.
    *   `chart.js` for Package Scout metrics.
*   **Backend / Proxy**: A robust local Node.js Proxy server (Express) using optimistic concurrency to bypass CORS issues for GraphQL/REST requests to external APIs (like GitHub, NPM, Groq). Capable of seamlessly switching to Vercel Serverless Functions in production environments.

---

## 🚀 Getting Started

Start building with Vertex natively on your local machine in under a minute.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16.x or newer recommended)
*   npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityajha-coder/vertex-devloper-toolkit.git
   cd vertex-devloper-toolkit
   ```

2. **Install proxy dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup (Mandatory for AI):**
   To utilize the AI features, you will need a Groq API Key. 
   Create a `.env` file in the root directory (or use the included setup CLI if provided):
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Note: You can also enter the API key directly into the graphical UI via the AI Hub dropdown if you don't use a `.env` file)*.

4. **Launch the Application:**
   Start both the local proxy server (for API calls) and the static UI server concurrently:
   ```bash
   npm run both
   ```
   The application will deploy instantly at `http://localhost:8080`.

---

## 📁 Repository Map

```text
vertex-master/
├── api/             # Vercel Serverless API Functions (Production Groq Proxy)
├── core/            # Local Node.js Proxy Server logic (`groq-proxy.js`)
├── css/             # Modular CSS stylesheets adhering to the monochrome design system
├── js/
│   ├── components/  # Reusable UI components (Navbar, Loader)
│   ├── pages/       # Core app modules (AskAI, Workspace, Docs, etc.)
│   ├── utils/       # Helpers, Firebase init, API wrappers, and localized IndexedDB logic
│   ├── app.js       # Main initialization logic and component mounting
│   └── router.js    # SPA Hash-based Routing architecture
├── index.html       # Entry point and global single-page shell
├── manifest.json    # Application metadata configuration for mobile/desktop PWA installs
├── package.json     # Node scripts and external dependencies
└── sw.js            # PWA Service Worker handling aggressive asset cacheing and offline bridging
```

---

## 🌍 Production Deployment

Vertex is natively optimized for edge deployments.
- The UI automatically detects production environments via hostname execution flow.
- When shipped to platforms like Vercel, it dynamically switches all local API tunneling to **Vercel Serverless Functions** (`/api/groq/*`).

Deploy seamlessly with the Vercel CLI:
```bash
npx vercel
```
*Tip: Ensure your `GROQ_API_KEY` and Firebase configurations are correctly translated into your host's Environment Variables panel before building.*

---

## 📜 License

This project is distributed under the MIT License. See `LICENSE` for more information.

---

*Designed and Built by [Aditya Jha](https://github.com/adityajha-coder).*
