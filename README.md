# Vertex — Developer Operations Toolkit

Vertex is a blazingly fast, deeply integrated developer toolkit built for modern workflows. It consolidates scattered utilities—from IDE extensions and standard documentation to 3D repository visualization and intelligent architectural scaffolding—into a single, high-contrast, keyboard-first environment. 

Designed with a brutalist, typography-focused aesthetic, Vertex prioritizes developer speed and clarity.

## ⚡ Core Systems

- **Workspace (Monaco Engine)**: A native browser-based IDE powered by Microsoft's Monaco Editor. Execute JavaScript/TypeScript locally, save snippets seamlessly, and interact with the filesystem.
- **Architecture & AI Hub**: Leverage Groq's high-speed Llama 3.1 models for instantaneous architectural scaffolding, stack synthesis, and component generation.
- **GitHub Force Explorer**: Transform standard static codebases into interactive 3D universe force-directed graphs using `Three.js` and `3d-force-graph`.
- **Command Cheatsheets**: Instant, categorized lookups for essential CLI tooling (Git, Docker, npm, Node.js).
- **Doc Architect**: Fast metadata search and index lookup for top-tier developer frameworks.
- **Package Intelligence**: Deep dive into NPM heuristics, download trends, bundle sizes, and community metrics without leaving the environment.

## 🛠️ Technical Architecture

Vertex bypasses heavy build steps, opting for raw ES6+ modules and vanilla JavaScript to ensure zero-latency cold starts.

- **Frontend**: ES6+ Vanilla JS, Vanilla CSS Variables (Monochrome/Linear aesthetic)
- **Vendors**: Monaco Editor (AMD Load), Three.js (WebGL), Chart.js
- **Network Strategy**: Service Worker caching with fully offline PWA capabilities (`IndexedDB`).
- **Data Fetching**: Optimistic concurrency via custom proxy handlers for GraphQL and REST APIs.

## 🚀 Installation & Deployment

### Local Development

To spin up the local diagnostic environment and proxy server:

```bash
# 1. Install dependencies
npm install

# 2. Start the development environment (concurrently local proxy + static server)
npm run both

# Alternatively, just start the static UI on port 8080:
npm run dev
```

### Production Deployment (Vercel)

Vertex is natively optimized for edge deployments.
- The UI automatically detects production environments via hostname execution flow.
- It dynamically switches all API tunneling to **Vercel Serverless Functions** (`/api/groq/*`).

## 🔌 API Configuration

Vertex ships with intelligent fallback handlers, but for power-user limits, setting up a primary API key is recommended:
- **Groq Interface**: Provide a `gsk_` key directly inside the AI Hub Settings panel, or set the `GROQ_API_KEY` environment variable prior to deployment.
- **GitHub Explorer**: Authenticated limits apply automatically.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
