const ToolsVaultPage = {
    tools: [],
    vsCodeExtensions: [],
    _loaded: false,

    activeExtCategory: 'All',
    extSearchQuery: '',
    activeCategory: 'All',
    searchQuery: '',

    async loadData() {
        if (this._loaded) return;
        try {
            const [toolsRes, extRes] = await Promise.all([
                fetch('/data/tools.json'),
                fetch('/data/extensions.json')
            ]);
            this.tools = await toolsRes.json();
            this.vsCodeExtensions = await extRes.json();
            this._loaded = true;
        } catch (e) {
            console.error('[ToolsVault] Failed to load data:', e);
            this.tools = [];
            this.vsCodeExtensions = [];
        }
    },

    async render() {
        Navbar.renderTopbar('Tools Vault');
        const content = document.getElementById('page-content');

        // Show loading state
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Tools <span class="text-gradient">Vault</span></h1>
                    <p>A curated directory of industry-leading dev tools, AI utilities, and frameworks to supercharge your workflow.</p>
                </div>
                <div style="text-align:center; padding:60px 0;">
                    <div class="spinner" style="margin:0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                    <p class="text-muted">Loading tools directory...</p>
                </div>
            </div>`;

        await this.loadData();

        const allCats = ['All', ...this.tools.map(t => t.cat)].sort();
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Tools <span class="text-gradient">Vault</span></h1>
                    <p>A curated directory of industry-leading dev tools, AI utilities, and frameworks to supercharge your workflow.</p>
                </div>
                <div class="tabs mb-lg" id="tv-tabs">
                    <button class="tab-item active" data-view="resources">Tools & Resources</button>
                    <button class="tab-item" data-view="extensions">VS Code Extensions</button>
                </div>
                
                <div id="tv-resources-view" class="mb-xl">
                    <div class="flex-center mb-xl">
                        <div class="search-container glass-card" style="width:100%; max-width:700px; display:flex; gap:10px; padding:10px; align-items:center;">
                            <div style="position:relative; flex:1;">
                                <i class="fa-solid fa-magnifying-glass search-icon" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;"></i>
                                <input class="input-field" id="tv-search" type="text" placeholder="Search tools..." style="width:100%; padding-left:40px; border:none; background:rgba(255,255,255,0.05);" />
                            </div>
                            <select class="input-field" id="tv-category-filter" style="width:220px; padding:0 12px; height:42px; cursor:pointer; background:rgba(255,255,255,0.05); color:#fff; border:none; font-size: 0.85rem;">
                                ${allCats.map(cat => `<option value="${cat}" ${cat === this.activeCategory ? 'selected' : ''} style="background:#000; color:#fff;">${cat}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div id="tv-grid-container"></div>
                </div>


                <div id="tv-extensions-view" style="display:none; padding-bottom:40px;">
                    <div class="flex-center mb-lg">
                        <div class="search-container glass-card" style="width:100%; max-width:700px; display:flex; gap:10px; padding:10px; align-items:center;">
                            <div style="position:relative; flex:1;">
                                <i class="fa-solid fa-magnifying-glass search-icon" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;"></i>
                                <input class="input-field" id="tv-ext-search" type="text" placeholder="Search extensions..." style="width:100%; padding-left:40px; border:none; background:rgba(255,255,255,0.05);" />
                            </div>
                            <select class="input-field" id="tv-ext-category-filter" style="width:220px; padding:0 12px; height:42px; cursor:pointer; background:rgba(255,255,255,0.05); color:#fff; border:none; font-size:0.85rem;">
                                <option value="All" style="background:#000; color:#fff;">All</option>
                                ${this.vsCodeExtensions.map(g => `<option value="${g.cat}" style="background:#000; color:#fff;">${g.cat}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div id="tv-ext-grid-container"></div>
                </div>
            </div>
            <style>
            .tool-link-card {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .tool-link-card:hover {
                background: rgba(212,168,67,0.04);
                border-color: rgba(212,168,67,0.3);
                transform: translateY(-2px);
            }
            .line-clamp-2 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .ext-card {
                display: flex; flex-direction: column; gap: 6px; transition: all 0.2s;
                height: 100%;
            }
            .ext-card:hover {
                background: rgba(212,168,67,0.04);
                border-color: rgba(212,168,67,0.3);
                transform: translateY(-2px);
            }
            .ext-card .ext-id {
                font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);
                background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 4px; display: inline-block; margin-top: 4px;
            }
            .ext-card .ext-install-btn {
                margin-top: auto; padding: 6px 12px; font-size: 0.75rem; border-radius: 6px;
                background: var(--surface-hover); border: 1px solid var(--border); color: var(--text-secondary);
                cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; width: fit-content;
            }
            .ext-card .ext-install-btn:hover {
                background: var(--primary); color: #000; border-color: var(--primary);
            }
            .tool-link-card i {
                transition: color 0.2s;
            }
            .tool-link-card:hover i {
                color: var(--primary-light);
            }

            </style>
        `;

        this.renderToolsGrid();
        this.renderExtensionsGrid();
        this.bindEvents();
        // TODO: Re-enable auth gate after completion
        this._applyAuthGate();

        // Remove gate when user logs in
        if (!this._authBound) {
            window.addEventListener('auth_changed', () => {
                // TODO: Re-enable auth gate after completion
                this._applyAuthGate();
            });
            this._authBound = true;
        }
    },

    _applyAuthGate() {
        const existing = document.getElementById('tv-auth-gate');
        if (existing) existing.remove();

        if (API.getAuthToken()) {
            const container = document.getElementById('tv-grid-container');
            if (container) container.style.maxHeight = '';
            const extContainer = document.getElementById('tv-ext-grid-container');
            if (extContainer) extContainer.style.maxHeight = '';
            const filter = document.getElementById('tv-category-filter');
            if (filter) { filter.disabled = false; filter.style.opacity = ''; }
            const search = document.getElementById('tv-search');
            if (search) { search.disabled = false; search.style.opacity = ''; }
            const extFilter = document.getElementById('tv-ext-category-filter');
            if (extFilter) { extFilter.disabled = false; extFilter.style.opacity = ''; }
            const extSearch = document.getElementById('tv-ext-search');
            if (extSearch) { extSearch.disabled = false; extSearch.style.opacity = ''; }
            return;
        }

        const container = document.getElementById('tv-grid-container');
        if (container) {
            container.style.maxHeight = '400px';
            container.style.overflow = 'hidden';
            container.style.position = 'relative';
            const gate = document.createElement('div');
            gate.id = 'tv-auth-gate';
            gate.style.cssText = 'position:absolute; bottom:0; left:0; right:0; height:200px; background:linear-gradient(transparent, rgba(0,0,0,0.95)); display:flex; align-items:flex-end; justify-content:center; padding-bottom:20px; z-index:10;';
            gate.innerHTML = `
                <div style="text-align:center; padding:16px 24px; background:rgba(20,20,20,0.9); border:1px solid var(--border); border-radius:var(--radius); backdrop-filter:blur(8px);">
                    <i class="fa-solid fa-lock" style="font-size:1.4rem; color:var(--primary-light); margin-bottom:8px; display:block;"></i>
                    <p style="font-size:0.9rem; font-weight:600; color:var(--text); margin-bottom:6px;">Sign in to explore all tools</p>
                    <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:12px;">Create a free account to unlock full access</p>
                    <button class="btn btn-primary btn-sm" id="tv-gate-login" style="min-width:120px;"><i class="fa-solid fa-right-to-bracket" style="margin-right:6px;"></i>Sign In</button>
                </div>`;
            container.appendChild(gate);
            document.getElementById('tv-gate-login')?.addEventListener('click', () => { API.requireAuth(); });
        }

        const filter = document.getElementById('tv-category-filter');
        if (filter) { filter.disabled = true; filter.style.opacity = '0.4'; }
        const search = document.getElementById('tv-search');
        if (search) { search.disabled = true; search.style.opacity = '0.4'; }
        const extFilter = document.getElementById('tv-ext-category-filter');
        if (extFilter) { extFilter.disabled = true; extFilter.style.opacity = '0.4'; }
        const extSearch = document.getElementById('tv-ext-search');
        if (extSearch) { extSearch.disabled = true; extSearch.style.opacity = '0.4'; }
    },

    renderToolsGrid() {
        const container = document.getElementById('tv-grid-container');
        if(!container) return;

        let results = [];
        this.tools.forEach(group => {
            if (this.activeCategory === 'All' || group.cat === this.activeCategory) {
                const filteredItems = group.items.filter(item => {
                    if (!this.searchQuery) return true;
                    const q = this.searchQuery.toLowerCase();
                    return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
                });
                if (filteredItems.length > 0) {
                    results.push({ cat: group.cat, items: filteredItems });
                }
            }
        });

        if (results.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding:40px;"><i class="fa-solid fa-search" style="font-size:2rem; opacity:0.3; margin-bottom:10px;"></i><h3>No matching tools found</h3></div>`;
            return;
        }

        container.innerHTML = results.map(section => `
            <div class="mb-xl">
                <h2 class="mb-md" style="font-size:1.1rem; font-weight:600; color:var(--primary-light); border-bottom:1px solid var(--border); padding-bottom:8px;">
                    ${section.cat}
                </h2>
                <div class="grid-3">
                    ${section.items.map(tool => `
                        <div class="glass-card tool-link-card" style="display:flex; flex-direction:column; transition:all 0.2s;">
                            <div style="font-weight:600; font-size:1rem; color:var(--text); margin-bottom:4px; display:flex; align-items:center; justify-content:space-between;">
                                <a href="${tool.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:var(--text); flex:1; display:flex; align-items:center; gap:8px;">
                                    ${tool.name} <i class="fa-solid fa-arrow-up-right-from-square text-muted text-xs"></i>
                                </a>
                            </div>
                            <div class="text-sm text-secondary line-clamp-2" style="line-height:1.4;">${tool.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    },

    bindEvents() {
        document.getElementById('tv-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if(!tab) return;
            document.querySelectorAll('#tv-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const view = tab.dataset.view;
            document.getElementById('tv-resources-view').style.display = view === 'resources' ? 'block' : 'none';
            document.getElementById('tv-extensions-view').style.display = view === 'extensions' ? 'block' : 'none';
            if (view === 'extensions') this.renderExtensionsGrid();
        });

        document.getElementById('tv-category-filter')?.addEventListener('change', (e) => {
            this.activeCategory = e.target.value;
            this.renderToolsGrid();
        });

        document.getElementById('tv-search')?.addEventListener('input', Helpers.debounce((e) => {
            this.searchQuery = e.target.value;
            this.renderToolsGrid();
        }, 200));

        document.getElementById('page-content')?.addEventListener('click', e => {
            const extCopyBtn = e.target.closest('.ext-copy-id');
            if(extCopyBtn) {
                const extId = extCopyBtn.dataset.extid;
                if(extId) {
                    Helpers.copyToClipboard(`ext install ${extId}`);
                    Toast.show('Install command copied!', 'success');
                }
            }
        });

        document.getElementById('tv-ext-category-filter')?.addEventListener('change', (e) => {
            this.activeExtCategory = e.target.value;
            this.renderExtensionsGrid();
        });

        document.getElementById('tv-ext-search')?.addEventListener('input', Helpers.debounce((e) => {
            this.extSearchQuery = e.target.value;
            this.renderExtensionsGrid();
        }, 200));
    },

    renderExtensionsGrid() {
        const container = document.getElementById('tv-ext-grid-container');
        if(!container) return;

        let results = [];
        this.vsCodeExtensions.forEach(group => {
            if (this.activeExtCategory === 'All' || group.cat === this.activeExtCategory) {
                const filteredItems = group.items.filter(item => {
                    if (!this.extSearchQuery) return true;
                    const q = this.extSearchQuery.toLowerCase();
                    return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
                });
                if (filteredItems.length > 0) {
                    results.push({ cat: group.cat, items: filteredItems });
                }
            }
        });

        if (results.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding:40px;"><i class="fa-solid fa-puzzle-piece" style="font-size:2rem; opacity:0.3; margin-bottom:10px;"></i><h3>No matching extensions found</h3></div>`;
            return;
        }

        container.innerHTML = results.map(section => `
            <div class="mb-xl">
                <h2 class="mb-md" style="font-size:1.1rem; font-weight:600; color:var(--primary-light); border-bottom:1px solid var(--border); padding-bottom:8px;">
                    ${section.cat}
                </h2>
                <div class="grid-3">
                    ${section.items.map(ext => `
                        <div class="glass-card ext-card">
                            <div style="font-weight:600; font-size:0.95rem; color:var(--text); display:flex; align-items:center; gap:8px;">
                                <i class="fa-solid fa-puzzle-piece" style="color:var(--primary-light); font-size:0.85rem;"></i>
                                ${Helpers.escapeHtml(ext.name)}
                            </div>
                            <div class="text-sm text-secondary" style="line-height:1.45;">${ext.desc}</div>
                            <a href="https://marketplace.visualstudio.com/items?itemName=${ext.id}" target="_blank" rel="noopener noreferrer" class="ext-install-btn">
                                <i class="fa-solid fa-download"></i> Install in VS Code
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
};
