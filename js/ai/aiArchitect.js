const AiArchitectMixin = {
  bindArchitect() {
    const btn = document.getElementById("ai-arch-btn");
    const input = document.getElementById("ai-arch-prompt");
    const copyBtn = document.getElementById("ai-copy-cmd");
    const chips = document.getElementById("ai-arch-suggestions");

    if (!btn || !input || !copyBtn) {
      console.warn("[Architect] Missing elements, skipping");
      return;
    }

    btn.addEventListener("click", () => {
      // Auth gate
      if (!API.requireAuth()) return;
      this.generateArchitecture();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        // Auth gate
        if (!API.requireAuth()) return;
        this.generateArchitecture();
      }
    });
    copyBtn.addEventListener("click", () => {
      const cmd = document.getElementById("ai-arch-cmd");
      if (cmd) {
        Helpers.copyToClipboard(cmd.textContent);
        Toast.show("Command copied!", "success");
      }
    });

    if (chips) {
      chips.addEventListener("click", (e) => {
        const chip = e.target.closest(".ai-suggest-chip");
        if (chip) {
          // Auth gate
          if (!API.requireAuth()) return;
          input.value = chip.dataset.q;
          this.generateArchitecture();
        }
      });
    }

    const saveBtn = document.getElementById("ai-save-arch-btn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        if (!API.requireAuth()) return;
        if (!this.currentProjectState)
          return Toast.show("No architecture generated yet.", "warning");

        const prompt = input.value.trim() || "Custom Project";
        const folder = window.prompt(
          "Enter Collection folder name to save this blueprint to:",
          "Uncategorized",
        );
        if (folder === null) return;

        WorkspacePage.saveSnippet(
          `Blueprint: ${prompt}`,
          this.currentProjectState.setupCommand || "No command generated",
          "bash",
          folder.trim() || "Uncategorized",
          ["blueprint", "architecture", "command"],
          "command",
        );

        saveBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Bookmarked';
        Toast.show("Blueprint added to Collection!", "success");
      });
    }
  },

  async generateArchitecture() {
    const input = document.getElementById("ai-arch-prompt");
    const prompt = input.value.trim();
    if (!prompt) return Toast.show("Describe your project first.", "warning");

    const btn = document.getElementById("ai-arch-btn");
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Designing...';
    btn.disabled = true;

    try {
      const data = await this._fetchArchitecture(prompt);
      this.currentProjectState = data;
      this._renderResults(data);
      Toast.show("Architecture generated!", "success");

      if (typeof this.saveAiHistory === "function") {
        const summary = `<pre style="font-size:12px;font-family:var(--font-mono);overflow-x:auto;margin:0;"><strong>Command:</strong>\n${data.setupCommand}\n\n<strong>Structure:</strong>\n${JSON.stringify(data.tree || data.flatFiles, null, 2)}</pre>`;
        this.saveAiHistory("architect", prompt, summary);
      }
    } catch (err) {
      console.error("Architect error:", err);

      // try fallback
      try {
        const fallback = this._buildFallback(prompt);
        this.currentProjectState = fallback;
        this._renderResults(fallback);
        Toast.show("Used smart fallback template.", "info");
      } catch (e) {
        Toast.show("Failed to generate architecture.", "error");
      }
    } finally {
      btn.innerHTML =
        '<i class="fa-solid fa-wand-magic-sparkles"></i> Design Architecture';
      btn.disabled = false;
    }
  },

  async _fetchArchitecture(prompt) {
    const systemMsg = [
      "You are a JSON-only API. Return a single raw JSON object.",
      "No markdown, no explanation, no text outside the JSON.",
      'Schema: {"setupCommand":"single bash line","tree":{"src":{"index.js":"description"},"package.json":"config"},"flatFiles":{"package.json":"file contents","src/index.js":"file contents"}}',
      "setupCommand: one bash command to create all folders and files.",
      "tree: nested object representing folder structure. Leaf values are short descriptions.",
      "flatFiles: flat path keys with actual file content strings.",
    ].join("\n");

    const modelPref = localStorage.getItem("trivoxa_ai_model") || "mixtral";
    const modelMap = {
      mixtral: "groq/compound-mini",
      llama2: "groq/compound",
      gemma: "qwen/qwen3.6-27b"
    };
    const activeModel = modelMap[modelPref] || "groq/compound-mini";

    const res = await API.callGroqChat(
      [
        { role: "system", content: systemMsg },
        {
          role: "user",
          content: "Generate project architecture for: " + prompt,
        },
      ],
      activeModel,
      0.7,
    );

    let raw = res.choices[0]?.message?.content || "";

    // clean out markdown fences the AI sometimes wraps
    if (typeof AskAiPage !== "undefined" && AskAiPage.cleanAiResponse) {
      raw = AskAiPage.cleanAiResponse(raw);
    }
    raw = raw
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    // extract the JSON object
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("No JSON found in response");
    }

    let json = raw.slice(start, end + 1);

    // first try clean parse
    try {
      const data = JSON.parse(json);
      if (data.tree || data.flatFiles) return data;
    } catch (e) {
      // try fixing common issues
      json = json
        .replace(/[\x00-\x1F\x7F]/g, " ") // strip control chars
        .replace(/,\s*}/g, "}") // trailing commas
        .replace(/,\s*]/g, "]") // trailing commas in arrays
        .replace(/'/g, '"'); // single quotes

      try {
        const data = JSON.parse(json);
        if (data.tree || data.flatFiles) return data;
      } catch (e2) {
        // fall through
      }
    }

    // if parsing failed entirely, use fallback
    return this._buildFallback(raw);
  },

  _renderResults(data) {
    const treeEl = document.getElementById("ai-arch-tree");
    const cmdEl = document.getElementById("ai-arch-cmd");
    const resultsEl = document.getElementById("ai-arch-results");

    treeEl.innerHTML = this._renderTree(
      data.tree || { project: data.flatFiles || {} },
    );
    cmdEl.textContent = data.setupCommand || "echo 'No command generated'";
    resultsEl.style.display = "grid";
  },

  _renderTree(node, depth = 0) {
    if (typeof node !== "object" || node === null) return "";
    let html = '<ul class="folder-tree">';

    // sort: folders first, then files alphabetically
    const entries = Object.entries(node).sort((a, b) => {
      const aDir = typeof a[1] === "object" && a[1] !== null;
      const bDir = typeof b[1] === "object" && b[1] !== null;
      if (aDir !== bDir) return aDir ? -1 : 1;
      return a[0].localeCompare(b[0]);
    });

    for (const [name, val] of entries) {
      if (typeof val === "object" && val !== null) {
        const fi = Helpers.getFileIcon(name);
        html += `<li>
                    <div class="dir-label"><i class="fa-solid fa-folder" style="color:var(--primary-light);"></i> ${Helpers.escapeHtml(name)}/</div>
                    ${this._renderTree(val, depth + 1)}
                </li>`;
      } else {
        const fi = Helpers.getFileIcon(name);
        html += `<li>
                    <div class="file-label"><i class="${fi.icon}" style="color:${fi.color};"></i> ${Helpers.escapeHtml(name)}</div>
                </li>`;
      }
    }
    html += "</ul>";
    return html;
  },

  _buildFallback(prompt) {
    const p = (typeof prompt === "string" ? prompt : "").toLowerCase();
    const has = (...words) => words.some((w) => p.includes(w));

    if (has("react", "next")) {
      return {
        setupCommand:
          "npx create-react-app my-app && cd my-app && mkdir -p src/components src/pages src/hooks src/utils src/styles",
        tree: {
          src: {
            components: {
              "App.jsx": "root component",
              "Header.jsx": "nav header",
              "Footer.jsx": "footer",
            },
            pages: { "Home.jsx": "landing page", "About.jsx": "about page" },
            hooks: { "useAuth.js": "auth hook" },
            utils: { "api.js": "api helpers" },
            styles: { "globals.css": "global styles" },
            "index.jsx": "entry point",
          },
          public: { "index.html": "html template", "favicon.ico": "icon" },
          "package.json": "dependencies",
          ".gitignore": "ignores",
          "README.md": "docs",
        },
        flatFiles: {
          "package.json":
            '{"name":"app","scripts":{"start":"react-scripts start"},"dependencies":{"react":"^18","react-dom":"^18","react-scripts":"5"}}',
          "src/index.jsx":
            'import React from "react";\nimport {createRoot} from "react-dom/client";\nimport App from "./components/App";\ncreateRoot(document.getElementById("root")).render(<App/>);',
          "src/components/App.jsx":
            'import React from "react";\nexport default function App() {\n  return <div><h1>Hello World</h1></div>;\n}',
        },
      };
    }

    if (has("vue")) {
      return {
        setupCommand:
          "npm create vue@latest my-vue-app -- --default && cd my-vue-app && npm install",
        tree: {
          src: {
            components: { "HelloWorld.vue": "greeting component" },
            views: { "HomeView.vue": "main view" },
            router: { "index.js": "route config" },
            assets: { "main.css": "styles" },
            "App.vue": "root component",
            "main.js": "entry",
          },
          public: { "index.html": "template" },
          "package.json": "deps",
          "vite.config.js": "vite config",
        },
        flatFiles: {
          "package.json":
            '{"name":"vue-app","scripts":{"dev":"vite"},"dependencies":{"vue":"^3"}}',
        },
      };
    }

    if (has("python", "django", "flask")) {
      return {
        setupCommand:
          "mkdir -p app tests static/css templates && touch app/__init__.py app/main.py app/models.py app/routes.py app/config.py tests/test_main.py requirements.txt README.md .gitignore static/css/style.css templates/base.html templates/index.html",
        tree: {
          app: {
            "__init__.py": "init",
            "main.py": "entry",
            "models.py": "data models",
            "routes.py": "url routes",
            "config.py": "settings",
          },
          tests: { "test_main.py": "unit tests" },
          static: { css: { "style.css": "styles" } },
          templates: { "base.html": "layout", "index.html": "home" },
          "requirements.txt": "deps",
          "README.md": "docs",
          ".gitignore": "ignores",
        },
        flatFiles: null,
      };
    }

    if (has("node", "express", "api", "backend", "server")) {
      return {
        setupCommand:
          "mkdir -p src/routes src/controllers src/middleware src/models src/config tests && touch src/app.js src/server.js src/routes/index.js src/routes/users.js src/controllers/userController.js src/middleware/auth.js src/models/User.js src/config/db.js package.json .env.example .gitignore README.md tests/users.test.js",
        tree: {
          src: {
            routes: {
              "index.js": "main routes",
              "users.js": "user endpoints",
              "auth.js": "auth endpoints",
            },
            controllers: { "userController.js": "user logic" },
            middleware: {
              "auth.js": "jwt verify",
              "errorHandler.js": "error catcher",
            },
            models: { "User.js": "user schema" },
            config: { "db.js": "database connection" },
            "app.js": "express setup",
            "server.js": "server entry",
          },
          tests: { "users.test.js": "api tests" },
          "package.json": "deps",
          ".env.example": "env template",
          ".gitignore": "ignores",
          "README.md": "docs",
        },
        flatFiles: {
          "package.json":
            '{"name":"node-api","main":"src/server.js","scripts":{"start":"node src/server.js","dev":"node --watch src/server.js"},"dependencies":{"express":"^4.18.0"}}',
          "src/server.js":
            'const app = require("./app");\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`Server on port ${PORT}`));',
          "src/app.js":
            'const express = require("express");\nconst app = express();\napp.use(express.json());\napp.get("/", (req, res) => res.json({ message: "API running" }));\nmodule.exports = app;',
        },
      };
    }

    // generic fallback
    return {
      setupCommand:
        "mkdir -p src public tests && touch src/index.js src/utils.js public/index.html public/style.css tests/index.test.js package.json README.md .gitignore",
      tree: {
        src: { "index.js": "entry point", "utils.js": "utilities" },
        public: { "index.html": "html page", "style.css": "styles" },
        tests: { "index.test.js": "tests" },
        "package.json": "config",
        "README.md": "docs",
        ".gitignore": "ignores",
      },
      flatFiles: {
        "package.json":
          '{"name":"my-project","scripts":{"start":"node src/index.js"}}',
        "src/index.js": 'console.log("Hello from my project!");',
      },
    };
  },
};
