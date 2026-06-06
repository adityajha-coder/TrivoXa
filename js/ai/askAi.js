const AskAiPage = {
  recommendations: {
    weather: {
      reply: "Great choice! Here's what you need:",
      tools: [
        { name: "OpenWeather API", why: "Free weather data with forecasts" },
        {
          name: "React or Vanilla JS",
          why: "Build the UI and handle API calls",
        },
        { name: "Chart.js", why: "Visualize temperature trends" },
        { name: "Vercel", why: "Deploy for free with one click" },
      ],
    },
    todo: {
      reply: "A todo app is perfect for learning CRUD!",
      tools: [
        {
          name: "React + useState",
          why: "Component state for task management",
        },
        { name: "LocalStorage API", why: "Persist tasks without a backend" },
        { name: "CSS Modules or Tailwind", why: "Clean, scoped styling" },
        { name: "Netlify", why: "Free static hosting" },
      ],
    },
    portfolio: {
      reply: "A portfolio showcases your work!",
      tools: [
        {
          name: "Next.js or Astro",
          why: "SEO-friendly static site generation",
        },
        { name: "Framer Motion", why: "Smooth animations and transitions" },
        { name: "GitHub API", why: "Auto-fetch your latest projects" },
        { name: "Vercel", why: "Deploy directly from your repo" },
      ],
    },
    chat: {
      reply: "Real-time chat is a fantastic project!",
      tools: [
        { name: "Socket.io", why: "Real-time bidirectional communication" },
        { name: "Node.js + Express", why: "Handle WebSocket connections" },
        { name: "React", why: "Dynamic message UI" },
        { name: "MongoDB", why: "Store chat history and users" },
      ],
    },
    ecommerce: {
      reply: "E-commerce covers a lot of skills!",
      tools: [
        { name: "Next.js", why: "SSR for product pages" },
        { name: "Stripe API", why: "Secure payment processing" },
        { name: "Supabase or Firebase", why: "Database, auth, and storage" },
        { name: "Cloudinary", why: "Image optimization and hosting" },
      ],
    },
    blog: {
      reply: "Blogs are great for content-driven sites!",
      tools: [
        {
          name: "Astro or Next.js",
          why: "Static site generation with markdown",
        },
        { name: "Markdown", why: "Write content in simple format" },
        {
          name: "Contentlayer or MDX",
          why: "Transform markdown into components",
        },
        { name: "Vercel", why: "Free hosting with ISR support" },
      ],
    },
    game: {
      reply: "Game development is super fun!",
      tools: [
        { name: "Phaser.js", why: "Easy 2D HTML5 game framework" },
        { name: "Three.js", why: "3D graphics in the browser" },
        { name: "Howler.js", why: "Audio playback for sound effects" },
        { name: "GitHub Pages", why: "Free hosting for web games" },
      ],
    },
    api: {
      reply: "Building APIs teaches backend fundamentals!",
      tools: [
        { name: "Node.js + Express", why: "Fast, minimal server framework" },
        { name: "PostgreSQL", why: "Reliable relational database" },
        { name: "JWT", why: "Token-based authentication" },
        { name: "Swagger", why: "Auto-generate API docs" },
      ],
    },
    mobile: {
      reply: "Mobile apps reach billions of users!",
      tools: [
        { name: "React Native + Expo", why: "Cross-platform with hot reload" },
        { name: "Firebase", why: "Auth, Firestore, push notifications" },
        { name: "React Navigation", why: "Smooth screen transitions" },
        { name: "EAS Build", why: "Build and submit to stores" },
      ],
    },
    dashboard: {
      reply: "Dashboards are great for data viz!",
      tools: [
        { name: "React + Recharts", why: "Beautiful interactive charts" },
        { name: "REST API or GraphQL", why: "Fetch real-time data" },
        { name: "Tailwind CSS", why: "Responsive grid layouts" },
        { name: "Vercel", why: "Fast deployment" },
      ],
    },
    social: {
      reply: "Social apps cover many concepts!",
      tools: [
        { name: "Next.js", why: "SSR for fast page loads" },
        { name: "Supabase", why: "Auth, real-time DB, file storage" },
        { name: "Socket.io", why: "Live notifications" },
        { name: "Cloudinary", why: "Image/video uploads" },
      ],
    },
  },

  currentProjectState: null,
  currentFramework: "html",
  currentAiModel: localStorage.getItem("trivoxa_ai_model") || "mixtral",
  apiKey: localStorage.getItem("trivoxa_groq_key") || "",
  aiHistory: [],

  archSuggestions: [
    "Scalable Node.js Microservices",
    "React native chat app",
    "Python E-commerce with Django",
    "Vue 3 SSR blog",
    "Next.js Portfolio",
    "Express REST API template",
    "Fullstack SvelteKit store",
  ],
  async getAirforceModel(fallbackModelStr = null) {
    // Use Groq API models
    const activeModel = fallbackModelStr || this.currentAiModel || "mixtral";
    const modelMap = {
      mixtral: "llama-3.1-8b-instant",
      llama: "llama-3.1-8b-instant",
      gemma: "llama-3.1-8b-instant",
      claude: "llama-3.1-8b-instant",
      openai: "llama-3.1-8b-instant",
      mistral: "llama-3.1-8b-instant",
      llama: "llama2-70b-4096",
    };
    return modelMap[activeModel] || "llama-3.1-8b-instant";
  },

  cleanAiResponse(text) {
    if (!text) return "";
    // Remove common AI service ads and system messages
    const ads = [
      /Need proxies cheaper than the market\?[\s\S]*https:\/\/op\.wtf/gim,
      /This model requires [\s\S]* to enable it\./gim,
      /discord\.gg\/airforce/gim,
      /This model is only available for pay-as-you-go users/gim,
      /Powered by Airforce[\s\S]*/gim,
      /Generated by [\s\S]*Airforce[\s\S]*/gim,
      /This response was generated by[\s\S]*/gim,
      /For more information, visit[\s\S]*/gim,
      /Join our Discord[\s\S]*/gim,
      /airforce\.gg[\s\S]*/gim,
      /Generated by Pollinations[\s\S]*/gim,
      /Powered by Pollinations[\s\S]*/gim,
      /pollinations\.ai[\s\S]*/gim,
      /text\.pollinations\.ai[\s\S]*/gim,
    ];
    let cleaned = text;
    ads.forEach((ad) => {
      cleaned = cleaned.replace(ad, "");
    });
    return cleaned.trim();
  },

  render() {
    Navbar.renderTopbar("Ask AI");
    const content = document.getElementById("page-content");

    const archSuggestHtml = this.archSuggestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((s) => `<button class="ai-suggest-chip" data-q="${s}">${s}</button>`)
      .join("");

    content.innerHTML = `
            <div class="page-enter">
                <div class="page-header flex-between" style="align-items:flex-start; flex-wrap:wrap; gap:16px;">
                    <div>
                        <h1>AI <span class="text-gradient">Hub</span></h1>
                        <p>Chat with AI, design project architectures, analyze code, and explore curated tech stacks.</p>
                    </div>
                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        <div class="form-group" style="min-width: 160px;">
                            <label class="text-xs text-muted mb-xs" style="display:block;">Groq Model</label>
                            <select id="ai-model-select" class="input-field" style="padding: 8px 12px; font-size: 0.85rem; height:auto; background: #000; color: #fff; appearance: none; -webkit-appearance: none; cursor: pointer;">
                                <option value="mixtral" selected>Mixtral 8x7B (Recommended)</option>
                                <option value="llama2">Llama 2 70B</option>
                                <option value="gemma">Gemma 7B</option>
                            </select>
                        </div>
                        <div class="form-group" style="min-width: 200px; display:none;">
                            <label class="text-xs text-muted mb-xs" style="display:block;">Groq API Key</label>
                            <input type="text" id="ai-api-key" class="input-field" placeholder="gsk_..." value="${localStorage.getItem("trivoxa_groq_key") || this.apiKey}" autocomplete="off" data-form-type="other" data-lpignore="true" style="padding: 8px 12px; font-size: 0.85rem; height:auto; -webkit-text-security: disc; -moz-text-security: disc; text-security: disc;">
                        </div>
                    </div>
                </div>

                <div class="tabs mb-lg" id="ai-hub-tabs">
                    <button class="tab-item active" data-tab="chat"><i class="fa-solid fa-comments" style="margin-right:6px;"></i>AI Chat</button>
                    <button class="tab-item" data-tab="architect"><i class="fa-solid fa-code-merge" style="margin-right:6px;"></i>Architect</button>
                    <button class="tab-item" data-tab="history"><i class="fa-solid fa-clock-rotate-left" style="margin-right:6px;"></i>History</button>
                </div>

                <!-- ===== TAB 1: AI CHAT ===== -->
                <div id="ai-tab-chat">
                    <div class="glass-card-static ai-chat-section mb-lg">
                        <div class="ai-chat-header">
                            <div class="flex-gap">
                                <div class="ai-bot-avatar"><i class="fa-solid fa-robot"></i></div>
                                <div>
                                    <h3 style="font-size:0.95rem;font-weight:600;">TrivoXa AI Assistant</h3>
                                    <span class="text-xs text-muted">Ask anything — code help, tool recommendations, or explanations</span>
                                </div>
                            </div>
                            <button class="btn btn-ghost btn-xs" id="ai-clear-chat" title="Clear chat"><i class="fa-solid fa-broom"></i></button>
                        </div>
                        <div class="ai-bot-messages" id="ai-bot-messages" style="min-height:200px;max-height:500px;">
                            <div class="ai-msg bot-msg">
                                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                                <div class="msg-bubble">Hi! I'm your TrivoXa AI assistant. I can:<br>
                                    <strong>1.</strong> Recommend tools for any project idea<br>
                                    <strong>2.</strong> Explain code like you're a beginner<br>
                                    <strong>3.</strong> Debug errors and suggest fixes<br>
                                    <strong>4.</strong> Answer any programming question<br><br>
                                    Try asking something or click a quick action below! 👇
                                </div>
                            </div>
                        </div>
                        <div class="ai-bot-input-area" style="flex-direction: column; align-items: flex-end; gap: 8px;">
                            <textarea class="input-field" id="ai-bot-input" placeholder="</> Ask any concept..." style="width: 100%; min-height: 60px; resize: vertical; padding-right: 12px; font-family: inherit; line-height: 1.5; "></textarea>
                            <div class="flex-between" style="width: 100%;">
                                <div class="flex-gap">
                                    <button class="btn btn-ghost btn-sm" id="ai-bot-explain" style="color:var(--primary-light);">
                                        <i class="fa-solid fa-graduation-cap"></i> Explain Code
                                    </button>
                                    <button class="btn btn-ghost btn-sm" id="ai-bot-debug" style="color:var(--error);">
                                        <i class="fa-solid fa-bug"></i> Debug Error
                                    </button>
                                </div>
                                <button class="btn btn-primary" id="ai-bot-send" style="min-width: 45px;"><i class="fa-solid fa-paper-plane"></i></button>
                            </div>
                        </div>
                        <div class="ai-bot-suggestions">
                            <button class="ai-suggest-chip" data-q="I want to build a weather app">🌤 Weather App</button>
                            <button class="ai-suggest-chip" data-q="I want to build a portfolio website">💼 Portfolio</button>
                            <button class="ai-suggest-chip" data-q="I want to build a chat application">💬 Chat App</button>
                            <button class="ai-suggest-chip" data-q="I want to build an e-commerce store">🛒 E-commerce</button>
                            <button class="ai-suggest-chip" data-q="What is the difference between REST and GraphQL?">🔗 REST vs GraphQL</button>
                            <button class="ai-suggest-chip" data-q="How do I use Git branches?">🌿 Git Branching</button>
                        </div>
                    </div>
                </div>

                <!-- ===== TAB 2: AI ARCHITECT ===== -->
                <div id="ai-tab-architect" style="display:none;">
                    <div class="glass-card mb-lg">
                        <div class="flex-gap mb-sm" style="align-items:center;">
                            <div class="ai-bot-avatar" style="width:36px;height:36px;font-size:0.9rem;"><i class="fa-solid fa-folder-tree"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">AI Architecture Builder</h3>
                                <span class="text-xs text-muted">Describe your project and get a full folder structure + setup script</span>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; margin-top:16px;">
                            <span style="flex:1; min-width:280px;">
                                <input type="text" id="ai-arch-prompt" class="input-field" placeholder="e.g. A realtime chat app with Next.js, Tailwind, and a Node.js Socket.io backend..." style="width:100%;">
                            </span>
                            <button class="btn btn-primary" id="ai-arch-btn"><i class="fa-solid fa-wand-magic-sparkles"></i> Design Architecture</button>
                        </div>
                        <div class="ai-bot-suggestions mt-md" id="ai-arch-suggestions" style="justify-content:flex-start;">
                            ${archSuggestHtml}
                        </div>
                    </div>

                    <div class="grid-2" id="ai-arch-results" style="display:none; gap: 20px;">
                        <div class="glass-card flex-col">
                            <div class="flex-between mb-md">
                                <h3><i class="fa-solid fa-diagram-project" style="color:var(--primary-light); margin-right:8px;"></i> Generated Architecture</h3>
                                <button class="btn btn-ghost btn-sm" id="ai-save-arch-btn" title="Add to Workspace Collection" style="color:var(--primary-light);"><i class="fa-regular fa-bookmark"></i> Bookmark Blueprint</button>
                            </div>
                            <div id="ai-arch-tree" style="background:rgba(0,0,0,0.4); padding:16px; border-radius:var(--radius); border:1px solid var(--border); overflow-y:auto; flex:1; min-height:300px;"></div>
                        </div>
                        
                        <div class="flex-col" style="gap:20px;">
                            <div class="glass-card">
                                <h3 class="mb-sm"><i class="fa-solid fa-terminal" style="color:var(--success); margin-right:8px;"></i> Setup Script</h3>
                                <p class="text-xs text-muted mb-md">Run this single terminal command to scaffold the entire project.</p>
                                <div style="position:relative;">
                                    <div style="background:#0a0a0f; padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                                        <pre id="ai-arch-cmd" style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text); white-space:pre-wrap;"></pre>
                                    </div>
                                    <button class="btn btn-ghost btn-xs" id="ai-copy-cmd" style="position:absolute; top:8px; right:8px;"><i class="fa-solid fa-copy"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>

                <!-- ===== TAB 5: TECH STACKS ===== -->
                <div id="ai-tab-stacks" style="display:none;">
                    <div class="flex-between mb-md">
                        <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>What do you want to build?</h2>
                    </div>
                    <div class="role-cards-grid mb-lg" id="role-cards">
                        ${Object.entries(this.roleData)
                          .map(([key, data]) => {
                            const icons = {
                              web: "fa-solid fa-globe",
                              mobile: "fa-solid fa-mobile-screen",
                              ai: "fa-solid fa-brain",
                              backend: "fa-solid fa-server",
                              devops: "fa-solid fa-cloud-arrow-up",
                              game: "fa-solid fa-gamepad",
                              cloud: "fa-solid fa-cloud",
                              security: "fa-solid fa-user-shield",
                              data: "fa-solid fa-chart-line",
                            };
                            const colors = {
                              web: "rgba(212,168,67,0.08)",
                              mobile: "rgba(62,207,110,0.06)",
                              ai: "rgba(139,92,246,0.06)",
                              backend: "rgba(240,160,48,0.06)",
                              devops: "rgba(6,182,212,0.06)",
                              game: "rgba(236,72,153,0.06)",
                              cloud: "rgba(50,108,229,0.06)",
                              security: "rgba(62,207,110,0.06)",
                              data: "rgba(233,118,39,0.06)",
                            };
                            const iconColors = {
                              web: "var(--primary-light)",
                              mobile: "var(--success)",
                              ai: "#8b5cf6",
                              backend: "var(--warning)",
                              devops: "#06b6d4",
                              game: "#ec4899",
                              cloud: "#326ce5",
                              security: "var(--success)",
                              data: "#e97627",
                            };
                            return `<div class="role-card" data-role="${key}">
                                <div class="role-icon" style="background:${colors[key]};"><i class="${icons[key]}" style="color:${iconColors[key]};"></i></div>
                                <div class="role-info"><h3>${data.title}</h3><p>${data.stack
                                  .slice(0, 3)
                                  .map((s) => s.name)
                                  .join(", ")}</p></div>
                                <i class="fa-solid fa-chevron-right role-arrow"></i>
                            </div>`;
                          })
                          .join("")}
                    </div>

                    <div class="glass-card-static mb-lg" id="role-detail" style="display:none;padding:24px;">
                        <div class="flex-between mb-md">
                            <h3 id="role-detail-title" style="font-size:1rem;font-weight:600;"></h3>
                            <button class="btn btn-ghost btn-sm" id="role-close"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <p id="role-detail-desc" class="text-sm text-secondary mb-lg" style="line-height:1.6;"></p>
                        <div id="role-detail-stack"></div>
                    </div>
                </div>

                <!-- ===== TAB 6: HISTORY ===== -->
                <div id="ai-tab-history" style="display:none;">
                    <div class="flex-between mb-md">
                        <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-clock-rotate-left" style="color:var(--primary-light);margin-right:6px;"></i>Saved AI Output History</h2>
                        <button class="btn btn-ghost btn-sm" id="clear-ai-history"><i class="fa-solid fa-trash-can" style="margin-right:6px;"></i> Clear All</button>
                    </div>
                    <div id="ai-history-list" class="grid-2 mt-sm" style="gap:16px;"></div>
                    <div id="ai-history-empty" style="text-align:center; padding: 40px 0; display:none;">
                        <i class="fa-regular fa-folder-open text-muted mb-md" style="font-size:3rem; opacity:0.5;"></i>
                        <p class="text-muted">No AI history saved yet.</p>
                    </div>
                </div>
            </div>

            <style>
                .folder-tree { list-style: none; padding-left: 20px; font-family: var(--font-mono); font-size: 13px; line-height: 1.8; position: relative; }
                .folder-tree::before { content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background: rgba(255,255,255,0.1); }
                .folder-tree li { position: relative; padding-left: 15px; }
                .folder-tree li::before { content: ""; position: absolute; top: 12px; left: -20px; width: 30px; height: 1px; background: rgba(255,255,255,0.1); }
                .folder-tree .dir-label { font-weight: 600; color: var(--primary-light); display:flex; align-items:center; gap:6px; cursor:pointer; }
                .folder-tree .file-label { color: var(--text-secondary); display:flex; align-items:center; gap:6px; }
                .folder-tree i { font-size: 11px; opacity: 0.8; }
            </style>
        `;

    this.bindModelSelect();
    this.bindTabs();
    this.bindChat();
    this.bindArchitect();
    this.bindRoles();

    // Load history logic
    setTimeout(() => this.loadHistory(), 800);

    // Reactive Data Syncing
    if (!this._authBound) {
      window.addEventListener("auth_changed", () => {
        if (document.getElementById("ai-history-list")) {
          this.loadHistory();
        }
      });
      this._authBound = true;
    }
  },

  async loadHistory() {
    if (API.getAuthToken()) {
      try {
        this.aiHistory = await API.fetchAPI("/api/ai-history");
      } catch (e) {
        console.error("[AskAi] Failed to load history from DB:", e);
        this.aiHistory = JSON.parse(localStorage.getItem("ai_history") || "[]");
      }
    } else {
      this.aiHistory = JSON.parse(localStorage.getItem("ai_history") || "[]");
    }
    this.renderHistory();
  },

  async saveAiHistory(moduleType, prompt, response) {
    if (!prompt || !response) return;

    const item = {
      id: "ai_" + Date.now().toString(36),
      module: moduleType,
      prompt,
      response,
      timestamp: Date.now(),
    };

    this.aiHistory.unshift(item);
    if (this.aiHistory.length > 20) this.aiHistory.pop();

    this.renderHistory();

    if (API.getAuthToken()) {
      try {
        const saved = await API.fetchAPI("/api/ai-history", "POST", {
          module: moduleType,
          prompt,
          response,
        });
        item.id = saved._id; // Replace local id with MongoDB id
      } catch (e) {
        console.error("[AskAi] Failed to save history to DB:", e);
      }
    } else {
      localStorage.setItem("ai_history", JSON.stringify(this.aiHistory));
    }
  },

  async deleteAiHistory(id) {
    this.aiHistory = this.aiHistory.filter((h) => h.id !== id);
    this.renderHistory();

    if (API.getAuthToken()) {
      try {
        await API.fetchAPI(`/api/ai-history/${id}`, "DELETE");
      } catch (e) {
        console.error("[AskAi] Failed to delete history:", e);
      }
    } else {
      localStorage.setItem("ai_history", JSON.stringify(this.aiHistory));
    }
  },

  async clearAllAiHistory() {
    if (!confirm("Are you sure you want to clear all AI history?")) return;

    this.aiHistory = [];
    this.renderHistory();

    if (API.getAuthToken()) {
      try {
        await API.fetchAPI("/api/ai-history", "DELETE");
      } catch (e) {
        console.error("[AskAi] Failed to clear history:", e);
      }
    } else {
      localStorage.removeItem("ai_history");
    }
  },

  renderHistory() {
    const list = document.getElementById("ai-history-list");
    const empty = document.getElementById("ai-history-empty");
    if (!list || !empty) return;

    if (this.aiHistory.length === 0) {
      list.style.display = "none";
      empty.style.display = "block";
      return;
    }

    list.style.display = "grid";
    empty.style.display = "none";

    const icons = { chat: "fa-comments", architect: "fa-code-merge" };

    list.innerHTML = this.aiHistory
      .map((h, i) => {
        const icon = icons[h.module] || "fa-robot";
        return `
            <div class="glass-card-static flex-col" style="padding:16px;">
                <div class="flex-between mb-sm" style="align-items:flex-start;">
                    <div style="flex:1; margin-right: 12px; min-width:0;">
                        <span class="tag tag-primary text-xs mb-xs" style="text-transform:uppercase;"><i class="fa-solid ${icon}"></i> ${h.module}</span>
                        <h4 style="font-size:0.95rem; font-weight:600; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${Helpers.escapeHtml(h.prompt)}">${Helpers.escapeHtml(h.prompt)}</h4>
                        <p class="text-xs text-muted"><i class="fa-regular fa-clock"></i> ${new Date(h.timestamp).toLocaleString()}</p>
                    </div>
                    <div class="flex-gap">
                        <button class="btn btn-ghost btn-xs toggle-ai-history" data-idx="${i}" title="Toggle Output"><i class="fa-solid fa-chevron-down"></i></button>
                        <button class="btn btn-ghost btn-xs delete-ai-history" data-id="${h.id}" title="Delete" style="color:var(--error);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div class="ai-history-content" id="ai-hist-content-${i}" style="display:none; margin-top:12px; height:200px; overflow-y:auto; background:rgba(0,0,0,0.3); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border); font-size:0.85rem; color:var(--text-secondary); width:100%; box-sizing:border-box;">
                    ${h.response}
                </div>
            </div>`;
      })
      .join("");

    // Bind toggles
    list.querySelectorAll(".toggle-ai-history").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.currentTarget.dataset.idx;
        const content = document.getElementById("ai-hist-content-" + idx);
        const isHidden = content.style.display === "none";
        content.style.display = isHidden ? "block" : "none";
        e.currentTarget.innerHTML = isHidden
          ? '<i class="fa-solid fa-chevron-up"></i>'
          : '<i class="fa-solid fa-chevron-down"></i>';
      });
    });

    // Bind deletes
    list.querySelectorAll(".delete-ai-history").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Delete this from history?")) {
          this.deleteAiHistory(e.currentTarget.dataset.id);
        }
      });
    });

    // Bind clear all
    const clearBtn = document.getElementById("clear-ai-history");
    if (clearBtn && !clearBtn.dataset.bound) {
      clearBtn.dataset.bound = "true";
      clearBtn.addEventListener("click", () => this.clearAllAiHistory());
    }
  },

  bindModelSelect() {
    const sel = document.getElementById("ai-model-select");
    const keyInput = document.getElementById("ai-api-key");
    if (sel) {
      sel.addEventListener("change", (e) => {
        this.currentAiModel = e.target.value;
        localStorage.setItem("trivoxa_ai_model", this.currentAiModel);
        Toast.show(
          "Groq Model switched to " +
            e.target.options[e.target.selectedIndex].text,
          "info",
        );
      });
    }
    if (keyInput) {
      keyInput.addEventListener("input", (e) => {
        localStorage.setItem("trivoxa_groq_key", e.target.value);
        API.setGroqApiKey(e.target.value);
        Toast.show("Groq API Key updated", "success");
      });
    }
  },

  bindTabs() {
    const aiHubTabs = document.getElementById("ai-hub-tabs");
    if (!aiHubTabs) {
      console.warn(
        "[Ask AI] Missing ai-hub-tabs element - skipping tab binding",
      );
      return;
    }

    aiHubTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".tab-item");
      if (!tab) return;
      document
        .querySelectorAll("#ai-hub-tabs .tab-item")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;

      const chatTab = document.getElementById("ai-tab-chat");
      const archTab = document.getElementById("ai-tab-architect");
      const stacksTab = document.getElementById("ai-tab-stacks");
      const historyTab = document.getElementById("ai-tab-history");

      if (chatTab) chatTab.style.display = target === "chat" ? "block" : "none";
      if (archTab)
        archTab.style.display = target === "architect" ? "block" : "none";
      if (stacksTab)
        stacksTab.style.display = target === "stacks" ? "block" : "none";
      if (historyTab)
        historyTab.style.display = target === "history" ? "block" : "none";
    });
  },
};

Object.assign(AskAiPage, AiChatMixin, AiArchitectMixin, AiStacksMixin);
