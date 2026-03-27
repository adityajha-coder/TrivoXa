# ⚡ Vertex — Developer Toolkit

<div align="center">
  <img src="favicon.svg" alt="Vertex Logo" width="120" height="120">
</div>

> **Accelerate Your Workflow. Build Smarter.**
> The unified, high-contrast, offline-first developer toolkit designed for modern workflows.

Vertex consolidates scattered development utilities into a single powerful browser-based environment. From intelligent AI architectural scaffolding to 3D repository visualization, code generation, and direct filesystem snippet execution—Vertex is built for speed, clarity, and developer productivity. 

---

## ✨ Key Features

Vertex includes an extensive suite of interconnected tools, all styled with a professional, IDE-like dark UI:

*   🤖 **AI Hub / Command Center**: Chat with an integrated AI assistant (powered by Groq Llama 3.1) to brainstorm architectures, analyze stack configurations, debug complex errors, and generate framework-compliant logic instantly.
*   💻 **My Workspace (Monaco Engine)**: A native browser-based IDE using Microsoft's Monaco Editor. Write, edit, and execute JavaScript/TypeScript snippets directly in the browser and save your code securely via IndexedDB storage.
*   🪐 **GitHub Explorer (3D Force Graph)**: Transform any public GitHub repository into an interactive 3D universe. Visualize deeply nested file structures and repository relationships instantly.
*   🚀 **Code Generator**: Dynamically generate functional UI components with AI based on your chosen tech stack (React, Vue, Tailwind, etc.) and run them live in a preview window using WebContainers.
*   📦 **Package Scout**: Deep dive into NPM heuristics. Analyze download trends, bundle sizes, tree-shaking capabilities, and community metrics without opening a new tab.
*   🌐 **Free APIs Directory**: Ping and test over 55+ open, curated public endpoints directly within the Vertex UI. Perfect for prototyping and hackathons.
*   🛠️ **Tools Vault**: A curated directory of framework boilerplates, technical libraries, and essential VS Code extensions, ready to drastically reduce project setup time.
*   ⌨️ **Command Cheatsheets**: Blazing fast references for Git, Docker, npm, Node.js, and general terminal utilities.
*   📖 **Developer Docs Architect**: Instantly search MDN API documentation, framework specifications, and metadata offline.

---

## 🏗️ Technical Architecture

Vertex bypasses heavy build steps, opting for raw ES6+ modules and vanilla JavaScript to ensure zero-latency cold starts.

*   **Frontend Ecosystem**: Vanilla ES6+ Javascript, Vanilla CSS Variables (Dark/Glassmorphism UI).
*   **Routing**: Custom Hash-based single-page application (SPA) router handling dynamic script loading.
*   **Libraries Loaded on Demand**:
    *   `monaco-editor` (AMD Load) for the Workspace.
    *   `three.js` & `3d-force-graph` for the GitHub Explorer.
    *   `chart.js` for Package Scout metrics.
*   **Performance Strategy**: Service Worker caching with fully offline PWA capabilities (IndexedDB mapping) enabling near-instant loads.
*   **Backend / Proxy**: Node.js Proxy server (Express) using Optimistic concurrency to bypass CORS issues for GraphQL/REST requests to external APIs (like GitHub or NPM). Vercel Serverless Functions ready.

---

## 🚀 Getting Started

Follow these steps to set up Vertex locally.

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

3. **Environment Setup (Optional but recommended):**
   To utilize the AI features, you will need a Groq API Key. 
   Create a `.env` file in the root directory (or use the Setup CLI):
   ```bash
   npm run setup
   ```
   Or manually set:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Note: You can also enter the API key directly into the graphical UI settings of the AI Hub).*

4. **Launch the Application:**
   Start both the local proxy server (for API calls) and the static UI server concurrently:
   ```bash
   npm run both
   ```
   The application will be available at `http://localhost:8080`.

---

## 📁 Project Structure

```text
vertex-master/
├── api/             # Vercel Serverless API Functions (Production Groq Proxy)
├── core/            # Local Node.js Proxy Server logic (`groq-proxy.js`)
├── css/             # Modular CSS stylesheets (base, layout, components, pages)
├── devtools/        # Setup scripts and API testing utilities
├── icons/           # Application icons for PWA
├── js/
│   ├── components/  # Reusable UI components (Navbar, Loader)
│   ├── pages/       # Core app modules (AskAI, Workspace, GitHub Explorer, etc.)
│   ├── utils/       # Helpers, API wrappers, and localized IndexedDB logic
│   ├── app.js       # Main initialization logic and theme setup
│   ├── router.js    # SPA Hash Router
│   └── search.js    # Global Cmd+K Search Logic
├── index.html       # Entry point and shell schema
├── package.json     # Node scripts and dependencies
└── sw.js            # PWA Service Worker for offline caching
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
*Make sure to add your `GROQ_API_KEY` to your Vercel Project Environment Variables.*

---

## 📜 License

This project is distributed under the MIT License. See `LICENSE` for more information.

---

*Designed and Built by [Aditya Jha](https://github.com/adityajha-coder).*
