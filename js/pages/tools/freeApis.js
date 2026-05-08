const FreeApisPage = {
    apis: [],
    categories: [],
    activeCategory: 'All',
    activePricing: 'All',
    searchQuery: '',
    _loaded: false,

    async loadData() {
        if (this._loaded) return;
        try {
            const res = await fetch('/data/apis.json');
            this.apis = await res.json();
            this._loaded = true;
        } catch (e) {
            console.error('[FreeApis] Failed to load data:', e);
            this.apis = [];
        }
    },

    async render() {
        Navbar.renderTopbar('APIs');
        const content = document.getElementById('page-content');

        // Show loading state
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Public <span class="text-gradient">APIs</span></h1>
                    <p>A curated directory of free public APIs organized by category for your projects.</p>
                </div>
                <div style="text-align:center; padding:60px 0;">
                    <div class="spinner" style="margin:0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                    <p class="text-muted">Loading API directory...</p>
                </div>
            </div>`;

        await this.loadData();

        this.categories = ['All', ...new Set(this.apis.map(a => a.category))].sort();
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Public <span class="text-gradient">APIs</span></h1>
                    <p>A curated directory of free public APIs organized by category for your projects.</p>
                </div>
                
                <div class="flex-center mb-xl">
                    <div class="search-container glass-card" style="width:100%; max-width:700px; display:flex; gap:10px; padding:10px; align-items:center;">
                        <div style="position:relative; flex:1;">
                            <i class="fa-solid fa-magnifying-glass search-icon" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;"></i>
                            <input class="input-field" id="api-search" type="text" placeholder="Search APIs..." style="width:100%; padding-left:40px; border:none; background:rgba(255,255,255,0.05);" />
                        </div>
                        <select class="input-field" id="api-category-filter" style="width:180px; padding:0 12px; height:42px; cursor:pointer; background:rgba(255,255,255,0.05); color:#fff; border:none; font-size: 0.85rem;"></select>
                        <select class="input-field" id="api-pricing-filter" style="width:130px; padding:0 12px; height:42px; cursor:pointer; background:rgba(255,255,255,0.05); color:#fff; border:none; font-size: 0.85rem;">
                            <option value="All" style="background:#000; color:#fff;">All Pricing</option>
                            <option value="Free" style="background:#000; color:#fff;">Free</option>
                            <option value="Freemium" style="background:#000; color:#fff;">Freemium</option>
                            <option value="Paid" style="background:#000; color:#fff;">Paid</option>
                        </select>
                    </div>
                </div>
                <div class="flex-gap mb-md" style="justify-content:center; font-size: 0.85rem; color: var(--text-muted);">
                    <i class="fa-solid fa-database"></i>
                    <span>${this.apis.length} APIs available in the repository</span>
                </div>
                <div class="grid-3" id="api-grid"></div>
            </div>`;

        this.renderCategoryFilter();
        this.renderApiGrid();
        this.bindEvents();
        // TODO: Re-enable auth gate after completion
        this._applyAuthGate();

        if (!this._authBound) {
            window.addEventListener('auth_changed', () => {
                // TODO: Re-enable auth gate after completion
                this._applyAuthGate();
            });
            this._authBound = true;
        }
    },

    _applyAuthGate() {
        const existing = document.getElementById('api-auth-gate');
        if (existing) existing.remove();
        const grid = document.getElementById('api-grid');
        if (API.getAuthToken()) {
            if (grid) { grid.style.maxHeight = ''; grid.style.overflow = ''; grid.style.position = ''; }
            const search = document.getElementById('api-search');
            if (search) { search.disabled = false; search.style.opacity = ''; }
            const catFilter = document.getElementById('api-category-filter');
            if (catFilter) { catFilter.disabled = false; catFilter.style.opacity = ''; }
            const priceFilter = document.getElementById('api-pricing-filter');
            if (priceFilter) { priceFilter.disabled = false; priceFilter.style.opacity = ''; }
            return;
        }
        if (grid) {
            grid.style.maxHeight = '500px'; grid.style.overflow = 'hidden'; grid.style.position = 'relative';
            const gate = document.createElement('div');
            gate.id = 'api-auth-gate';
            gate.style.cssText = 'position:absolute; bottom:0; left:0; right:0; height:200px; background:linear-gradient(transparent, rgba(0,0,0,0.95)); display:flex; align-items:flex-end; justify-content:center; padding-bottom:20px; z-index:10;';
            gate.innerHTML = `<div style="text-align:center; padding:16px 24px; background:rgba(20,20,20,0.9); border:1px solid var(--border); border-radius:var(--radius); backdrop-filter:blur(8px);"><i class="fa-solid fa-lock" style="font-size:1.4rem; color:var(--primary-light); margin-bottom:8px; display:block;"></i><p style="font-size:0.9rem; font-weight:600; color:var(--text); margin-bottom:6px;">Sign in to explore all APIs</p><p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:12px;">Create a free account to unlock full access</p><button class="btn btn-primary btn-sm" id="api-gate-login" style="min-width:120px;"><i class="fa-solid fa-right-to-bracket" style="margin-right:6px;"></i>Sign In</button></div>`;
            grid.appendChild(gate);
            document.getElementById('api-gate-login')?.addEventListener('click', () => { API.requireAuth(); });
        }
        const search = document.getElementById('api-search');
        if (search) { search.disabled = true; search.style.opacity = '0.4'; }
        const catFilter = document.getElementById('api-category-filter');
        if (catFilter) { catFilter.disabled = true; catFilter.style.opacity = '0.4'; }
        const priceFilter = document.getElementById('api-pricing-filter');
        if (priceFilter) { priceFilter.disabled = true; priceFilter.style.opacity = '0.4'; }
    },

    renderCategoryFilter() {
        const sel = document.getElementById('api-category-filter');
        if(!sel) return;
        sel.innerHTML = this.categories.map(cat =>
            `<option value="${cat}" ${cat === this.activeCategory ? 'selected' : ''} style="background:#000; color:#fff;">${cat}</option>`
        ).join('');
    },

    renderApiGrid() {
        const grid = document.getElementById('api-grid');
        let filtered = this.apis;

        if (this.activeCategory !== 'All') {
            filtered = filtered.filter(a => a.category === this.activeCategory);
        }
        if (this.activePricing && this.activePricing !== 'All') {
            filtered = filtered.filter(a => a.pricing === this.activePricing);
        }
        if (this.searchQuery) {
            const q = this.searchQuery.toLowerCase();
            filtered = filtered.filter(a =>
                a.name.toLowerCase().includes(q) ||
                a.desc.toLowerCase().includes(q) ||
                a.category.toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><i class="fa-solid fa-search"></i><h3>No APIs found</h3><p>Try adjusting your search or category filter.</p></div>`;
            return;
        }

        
        const authColors = { 'None': 'tag-success', 'API Key': 'tag-warning', 'OAuth': 'tag-accent' };
        const priceColors = { 'Free': 'tag-success', 'Freemium': 'tag-primary', 'Paid': 'tag-error' };

        grid.innerHTML = filtered.map(api => `
            <div class="glass-card api-card">
                <div class="api-header">
                    <h3 style="margin-bottom:0;">${api.name}</h3>
                    <div class="flex-gap" style="align-items:center;">
                        <span class="tag ${priceColors[api.pricing] || 'tag-primary'}">${api.pricing}</span>
                        <span class="tag ${authColors[api.auth] || 'tag-primary'}">${api.auth}</span>
                        <button class="btn btn-ghost btn-xs bookmark-api-btn" data-name="${Helpers.escapeHtml(api.name)}" data-url="${api.url}" title="Add to Workspace Collection"><i class="fa-regular fa-bookmark"></i></button>
                    </div>
                </div>
                <p class="api-desc">${api.desc}</p>
                <div class="api-tags">
                    <span class="tag tag-primary">${api.category}</span>
                    ${api.cors ? '<span class="tag tag-success">CORS</span>' : '<span class="tag tag-error">No CORS</span>'}
                </div>
                <a href="${api.url}" target="_blank" rel="noopener" class="api-link">
                    Visit API Docs <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>`).join('');
    },

    bindEvents() {
        const catFilter = document.getElementById('api-category-filter');
        if(catFilter) {
            catFilter.addEventListener('change', (e) => {
                this.activeCategory = e.target.value;
                this.renderApiGrid();
            });
        }
        
        const priceFilter = document.getElementById('api-pricing-filter');
        if(priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.activePricing = e.target.value;
                this.renderApiGrid();
            });
        }

        const searchInput = document.getElementById('api-search');
        if(searchInput) {
            searchInput.addEventListener('input', Helpers.debounce((e) => {
                this.searchQuery = e.target.value;
                this.renderApiGrid();
            }, 200));
        }

        document.getElementById('api-grid')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.bookmark-api-btn');
            if (btn) {
                if (!API.requireAuth()) return;
                const name = btn.dataset.name;
                const url = btn.dataset.url;
                
                const folder = prompt("Enter Collection folder name to save this to (e.g. 'Next.js Project'):", "Uncategorized");
                if (folder === null) return;
                
                WorkspacePage.saveSnippet(
                    `${name} API`, 
                    url, 
                    'text', 
                    folder.trim() || 'Uncategorized', 
                    ['api'], 
                    'api'
                );
                
                btn.innerHTML = '<i class="fa-solid fa-bookmark" style="color:var(--primary-light);"></i>';
                Toast.show('API added to Collection!', 'success');
            }
        });
    }
};
