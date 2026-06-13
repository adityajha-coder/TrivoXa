const CommandsPage = {
  activeTab: "git",
  activeCat: "All",
  activeOS: localStorage.getItem("trivoxa_cmd_os") || "unix",

  gitCommands: [],
  npmCommands: [],
  terminalCommands: [],
  dockerCommands: [],
  kubernetesCommands: [],
  httpCommands: [],
  flowSteps: {},
  _loaded: false,
  _pkgSearchOpen: false,

  async loadData() {
    if (this._loaded) return;
    try {
      const res = await fetch("/data/commands.json");
      const data = await res.json();
      this.gitCommands = data.gitCommands || [];
      this.npmCommands = data.npmCommands || [];
      this.terminalCommands = data.terminalCommands || [];
      this.dockerCommands = data.dockerCommands || [];
      this.kubernetesCommands = data.kubernetesCommands || [];
      this.httpCommands = data.httpCommands || [];
      this.flowSteps = data.flowSteps || {};
      this._loaded = true;
    } catch (e) {
      console.error("[Commands] Failed to load data:", e);
    }
  },

  async render() {
    Navbar.renderTopbar("Commands");
    const content = document.getElementById("page-content");

    // Show loading state
    content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Command <span class="text-gradient">Reference</span></h1>
                    <p>Master Git, npm, and terminal commands with step-by-step workflows and searchable reference.</p>
                </div>
                <div style="text-align:center; padding:60px 0;">
                    <div class="spinner" style="margin:0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                    <p class="text-muted">Loading commands...</p>
                </div>
            </div>`;

    await this.loadData();

    content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Command <span class="text-gradient">Reference</span></h1>
                    <p>Master Git, npm, and terminal commands with step-by-step workflows and searchable reference.</p>
                </div>

                <div class="grid-3 mb-lg">
                    <div class="glass-card cmd-type-card active" data-cmd="git" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(232,69,69,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-git-alt" style="font-size:1.1rem;color:var(--error);"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">Git</h3><p class="text-xs text-muted">${this.gitCommands.length} commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="npm" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(203,56,55,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-npm" style="font-size:1.3rem;color:#cb3837;"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">npm</h3><p class="text-xs text-muted">${this.npmCommands.length} commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="terminal" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(62,207,110,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-terminal" style="font-size:1rem;color:var(--success);"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">Terminal</h3><p class="text-xs text-muted">${this.terminalCommands.length} commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="docker" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(36,150,237,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-docker" style="font-size:1rem;color:#2496ed;"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">Docker</h3><p class="text-xs text-muted">${this.dockerCommands.length} commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="kubernetes" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(50,108,229,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-dharmachakra" style="font-size:1rem;color:#326ce5;"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">Kubernetes</h3><p class="text-xs text-muted">${this.kubernetesCommands.length} commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="http" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(139,92,246,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-network-wired" style="font-size:1rem;color:#8b5cf6;"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">HTTP Status</h3><p class="text-xs text-muted">${this.httpCommands.length} codes</p></div>
                        </div>
                    </div>
                </div>

                <div id="pkg-search-section" style="display:none;" class="mb-lg">
                    <div class="glass-card-static" style="padding:20px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;" id="pkg-search-toggle">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="width:36px;height:36px;border-radius:var(--radius);background:rgba(203,56,55,0.08);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-magnifying-glass-chart" style="font-size:0.95rem;color:#cb3837;"></i></div>
                                <div>
                                    <h3 style="font-size:0.95rem;font-weight:600;margin:0;">Search npm Packages</h3>
                                </div>
                            </div>
                            <i class="fa-solid fa-chevron-down" id="pkg-toggle-icon" style="color:var(--text-muted);transition:transform 0.3s ease;font-size:0.85rem;"></i>
                        </div>
                        <div id="pkg-search-body" style="display:none;margin-top:16px;">
                            <div class="flex-gap mb-md flex-wrap">
                                <div class="search-container" style="flex:1;min-width:260px;max-width:500px;">
                                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                                    <input class="input-field" id="pkg-search-input" type="text" placeholder="Search npm packages..." style="background:var(--bg-secondary);color:var(--text);border-color:var(--border);" />
                                </div>
                                <button class="btn btn-primary" id="pkg-search-btn"><i class="fa-solid fa-search"></i> Search</button>
                            </div>
                            <div id="pkg-results" class="grid-2"></div>
                            <div id="pkg-empty" style="display:none;">
                                <div class="empty-state">
                                    <i class="fa-solid fa-box-open"></i>
                                    <h3>Discover Packages</h3>
                                    <p>Search for npm packages to see detailed information, quality metrics, and safety assessments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass-card-static mb-lg" style="padding:20px;">
                    <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:14px;" id="flow-title"><i class="fa-solid fa-route" style="color:var(--primary-light);margin-right:6px;"></i>Git Workflow — Step by Step</h3>
                    <p class="text-xs text-muted mb-md" id="flow-desc">Follow the flow to understand how commands connect in a typical workflow.</p>
                    <div class="cmd-flow-visual" id="cmd-flow"></div>
                    <div class="glass-card mt-md" id="flow-detail" style="padding:16px;display:none;border-left:3px solid var(--primary);"></div>
                </div>

                <div class="flex-gap mb-lg flex-wrap" style="align-items:center;">
                    <div class="search-container" style="flex:1; max-width: 400px;">
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                        <input class="input-field" id="cmd-search" type="text" placeholder="Search commands..." />
                    </div>
                    <div id="os-toggle-wrap" style="display:none;">
                        <div class="os-toggle-pill" id="os-toggle">
                            <button class="os-toggle-btn ${this.activeOS === "unix" ? "active" : ""}" data-os="unix" id="os-btn-unix">
                                <i class="fa-brands fa-apple"></i>
                                <i class="fa-brands fa-linux" style="margin-left:2px;"></i>
                                <span>Mac / Linux</span>
                            </button>
                            <button class="os-toggle-btn ${this.activeOS === "win" ? "active" : ""}" data-os="win" id="os-btn-win">
                                <i class="fa-brands fa-windows"></i>
                                <span>PowerShell</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tabs mb-lg" id="cmd-cat-tabs"></div>
                <div id="cmd-grid"></div>
            </div>`;

    this.bindEvents();
    this.bindOSToggle();
    this.bindPkgSearch();
    this.updateOSToggleVisibility();
    this.updatePkgSearchVisibility();
    this.buildFlow();
    this.renderCategories();
    this.renderCards();
  },

  getActiveCommands() {
    const base =
      this.activeTab === "git"
        ? this.gitCommands
        : this.activeTab === "npm"
          ? this.npmCommands
          : this.activeTab === "docker"
            ? this.dockerCommands
            : this.activeTab === "kubernetes"
              ? this.kubernetesCommands
              : this.activeTab === "http"
                ? this.httpCommands
                : this.terminalCommands;
    // For terminal commands, apply OS-specific translations when Windows is selected
    if (this.activeTab === "terminal" && this.activeOS === "win") {
      return base.map((c) => ({
        ...c,
        cmd: c.win?.cmd || c.cmd,
        desc: c.win?.desc || c.desc,
        example: c.win?.example || c.example,
      }));
    }
    return base;
  },

  bindEvents() {
    document.querySelectorAll(".cmd-type-card").forEach((card) => {
      card.addEventListener("click", () => {
        document
          .querySelectorAll(".cmd-type-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        this.activeTab = card.dataset.cmd;
        this.activeCat = "All";
        const titles = {
          git: "Git Workflow — Step by Step",
          npm: "npm Workflow — Step by Step",
          terminal: "Terminal Workflow — Step by Step",
          docker: "Docker Workflow — Step by Step",
          kubernetes: "Kubernetes Workflow — Step by Step",
          http: "HTTP Status Codes — Flow",
        };
        document.getElementById("flow-title").innerHTML =
          `<i class="fa-solid fa-route" style="color:var(--primary-light);margin-right:6px;"></i>${titles[this.activeTab]}`;
        document.getElementById("cmd-search").value = "";
        document.getElementById("cmd-search").placeholder =
          `Search ${this.activeTab} commands...`;
        this.updateOSToggleVisibility();
        this.updatePkgSearchVisibility();
        this.buildFlow();
        this.renderCategories();
        this.renderCards();
      });
    });
    document.getElementById("cmd-search").addEventListener(
      "input",
      Helpers.debounce(() => this.renderCards(), 200),
    );
  },

  bindOSToggle() {
    const toggle = document.getElementById("os-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", (e) => {
      const btn = e.target.closest(".os-toggle-btn");
      if (!btn) return;
      const os = btn.dataset.os;
      if (os === this.activeOS) return;
      this.activeOS = os;
      localStorage.setItem("trivoxa_cmd_os", os);
      document
        .querySelectorAll("#os-toggle .os-toggle-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      Toast.show(
        os === "win"
          ? "Switched to Windows / PowerShell"
          : "Switched to Mac / Linux",
        "info",
      );
      this.buildFlow();
      this.renderCategories();
      this.renderCards();
    });
  },

  updateOSToggleVisibility() {
    const wrap = document.getElementById("os-toggle-wrap");
    if (wrap) {
      wrap.style.display = this.activeTab === "terminal" ? "flex" : "none";
    }
  },

  buildFlow() {
    const steps = this.flowSteps[this.activeTab];
    if (!steps) return;
    const cmds = this.getActiveCommands();
    const flow = document.getElementById("cmd-flow");
    flow.innerHTML = steps
      .map(
        (s, i) => `
            ${i > 0 ? '<div class="cmd-flow-arrow"><i class="fa-solid fa-chevron-right"></i></div>' : ""}
            <div class="cmd-flow-node" data-step="${s.id}">
                <div class="node-dot" style="background:${s.color};color:#000;"><i class="${s.icon}"></i></div>
                <span class="node-label">${s.label}</span>
            </div>
        `,
      )
      .join("");

    flow.onclick = (e) => {
      const node = e.target.closest(".cmd-flow-node");
      if (!node) return;
      const stepId = parseInt(node.dataset.step);
      const step = steps.find((s) => s.id === stepId);
      const matched = cmds.filter((c) => c.step === stepId);
      document
        .querySelectorAll("#cmd-flow .cmd-flow-node")
        .forEach((n) => n.classList.remove("active"));
      node.classList.add("active");
      const detail = document.getElementById("flow-detail");
      detail.style.display = "block";
      detail.innerHTML = `
                <div class="flex-between mb-sm">
                    <h4 style="font-size:0.92rem;font-weight:600;color:var(--primary-light);"><i class="${step.icon}" style="margin-right:6px;"></i>${step.label}</h4>
                    <span class="tag tag-primary">Step ${step.id}</span>
                </div>
                ${matched
                  .map(
                    (c) => `
                    <div style="padding:8px 10px;border-radius:var(--radius-sm);background:rgba(0,0,0,0.4);margin-bottom:6px;border:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
                        <div style="flex:1;min-width:0;">
                            <span class="text-mono text-sm" style="color:var(--primary-light);">${Helpers.escapeHtml(c.cmd)}</span>
                            <p class="text-xs text-muted" style="margin-top:3px;line-height:1.5;">${c.desc}</p>
                            <div class="text-mono text-xs" style="margin-top:4px; color:var(--text);"><i class="fa-solid fa-terminal" style="margin-right:3px; opacity:0.6;"></i>${Helpers.escapeHtml(c.example)}</div>
                        </div>
                        <button class="cmd-copy-btn" onclick="CommandsPage.copyCmd('${Helpers.escapeHtml(c.example).replace(/'/g, "\\'")}'  , this)" title="Copy command"><i class="fa-regular fa-copy"></i></button>
                    </div>`,
                  )
                  .join("")}`;
    };
    flow.querySelector(".cmd-flow-node")?.click();
  },

  renderCategories() {
    const cmds = this.getActiveCommands();
    const cats = ["All", ...new Set(cmds.map((c) => c.cat))];
    const tabs = document.getElementById("cmd-cat-tabs");
    tabs.innerHTML = cats
      .map(
        (c) =>
          `<button class="tab-item ${c === this.activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`,
      )
      .join("");
    tabs.onclick = (e) => {
      if (!e.target.classList.contains("tab-item")) return;
      this.activeCat = e.target.dataset.cat;
      document
        .querySelectorAll("#cmd-cat-tabs .tab-item")
        .forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");
      this.renderCards();
    };
  },

  renderCards() {
    const search = (
      document.getElementById("cmd-search")?.value || ""
    ).toLowerCase();
    let cmds = this.getActiveCommands();
    if (this.activeCat !== "All")
      cmds = cmds.filter((c) => c.cat === this.activeCat);
    if (search)
      cmds = cmds.filter(
        (c) =>
          c.cmd.toLowerCase().includes(search) ||
          c.desc.toLowerCase().includes(search),
      );
    const grid = document.getElementById("cmd-grid");
    if (!cmds.length) {
      grid.innerHTML =
        '<div class="empty-state"><i class="fa-solid fa-terminal"></i><h3>No commands found</h3></div>';
      return;
    }
    grid.innerHTML = `<div class="grid-2">${cmds
      .map(
        (c) => `
            <div class="glass-card git-cmd-card">
                <div class="flex-between" style="align-items:flex-start;">
                    <div class="cmd-syntax">${Helpers.escapeHtml(c.cmd)}</div>
                    <button class="cmd-copy-btn" onclick="CommandsPage.copyCmd('${Helpers.escapeHtml(c.example).replace(/'/g, "\\'")}'  , this)" title="Copy command"><i class="fa-regular fa-copy"></i></button>
                </div>
                <p class="cmd-desc">${c.desc}</p>
                <div class="cmd-example"><i class="fa-solid fa-terminal" style="margin-right:4px;opacity:0.4;"></i>${Helpers.escapeHtml(c.example)}</div>
                <div class="mt-sm flex-gap gap-sm"><span class="tag tag-primary">${c.cat}</span><span class="text-xs text-muted">Step ${c.step}</span></div>
            </div>`,
      )
      .join("")}</div>`;
  },

  // ── npm Package Search (integrated from Package Scout) ──

  updatePkgSearchVisibility() {
    const section = document.getElementById("pkg-search-section");
    if (section) {
      section.style.display = this.activeTab === "npm" ? "block" : "none";
    }
  },

  bindPkgSearch() {
    const toggle = document.getElementById("pkg-search-toggle");
    const body = document.getElementById("pkg-search-body");
    const icon = document.getElementById("pkg-toggle-icon");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      this._pkgSearchOpen = !this._pkgSearchOpen;
      body.style.display = this._pkgSearchOpen ? "block" : "none";
      icon.style.transform = this._pkgSearchOpen
        ? "rotate(180deg)"
        : "rotate(0deg)";
    });

    document.getElementById("pkg-search-btn").addEventListener("click", () => {
      const q = document.getElementById("pkg-search-input").value.trim();
      if (q) this.searchPackages(q);
    });
    document
      .getElementById("pkg-search-input")
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const q = e.target.value.trim();
          if (q) this.searchPackages(q);
        }
      });
  },

  async searchPackages(query) {
    const results = document.getElementById("pkg-results");
    const empty = document.getElementById("pkg-empty");
    empty.style.display = "none";
    results.innerHTML = Loader.skeleton(4);

    try {
      const data = await API.searchNpmPackages(query, 20);
      if (!data.objects || data.objects.length === 0) {
        results.innerHTML = "";
        empty.style.display = "block";
        return;
      }
      results.innerHTML = data.objects
        .map((obj) => {
          const pkg = obj.package;
          const score = obj.score;
          const quality = Math.round((score.detail?.quality || 0) * 100);
          const popularity = Math.round((score.detail?.popularity || 0) * 100);
          const maintenance = Math.round(
            (score.detail?.maintenance || 0) * 100,
          );
          const overall = Math.round((score.final || 0) * 100);
          const qualityColor =
            quality > 70
              ? "var(--success)"
              : quality > 40
                ? "var(--warning)"
                : "var(--error)";
          const maintColor =
            maintenance > 70
              ? "var(--success)"
              : maintenance > 40
                ? "var(--warning)"
                : "var(--error)";
          const isOutdated =
            pkg.date &&
            new Date() - new Date(pkg.date) > 365 * 24 * 60 * 60 * 1000;
          const warnings = [];
          if (isOutdated) warnings.push("Potentially outdated");
          if (quality < 40) warnings.push("Low quality score");
          if (maintenance < 30) warnings.push("Poor maintenance");
          return `
            <div class="glass-card pkg-card">
                <div class="pkg-header">
                    <a href="https://www.npmjs.com/package/${pkg.name}" target="_blank" rel="noopener" class="pkg-name">${pkg.name}</a>
                    <span class="pkg-version">${pkg.version || ""}</span>
                </div>
                <p class="pkg-desc">${Helpers.escapeHtml(pkg.description || "No description available.")}</p>
                ${warnings.length > 0 ? `<div style="display:flex;gap:6px;flex-wrap:wrap;"><span class="tag tag-warning" style="font-size:0.7rem;"><i class="fa-solid fa-triangle-exclamation"></i> ${warnings.join(" · ")}</span></div>` : ""}
                ${pkg.links?.npm ? `<a href="${pkg.links.npm}" target="_blank" rel="noopener" class="api-link mt-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> npm</a>` : ""}
            </div>`;
        })
        .join("");
    } catch (err) {
      Toast.show("Failed to search packages: " + err.message, "error");
      results.innerHTML = "";
      empty.style.display = "block";
    }
  },

  copyCmd(text, btn) {
    navigator.clipboard
      .writeText(text.trim())
      .then(() => {
        const icon = btn.querySelector("i");
        icon.className = "fa-solid fa-check";
        btn.classList.add("copied");
        Toast.show("Copied to clipboard!", "success");
        setTimeout(() => {
          icon.className = "fa-regular fa-copy";
          btn.classList.remove("copied");
        }, 1500);
      })
      .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text.trim();
        ta.style.cssText = "position:fixed;opacity:0;";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        const icon = btn.querySelector("i");
        icon.className = "fa-solid fa-check";
        btn.classList.add("copied");
        Toast.show("Copied to clipboard!", "success");
        setTimeout(() => {
          icon.className = "fa-regular fa-copy";
          btn.classList.remove("copied");
        }, 1500);
      });
  },
};
