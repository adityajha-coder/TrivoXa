const PackageScoutPage = {
    activeTab: 'search',
    activeCmdCat: 'All',

    npmCommands: [
        { cmd: 'npm init', desc: 'Create a new package.json file interactively.', example: 'npm init -y', cat: 'Setup', step: 1 },
        { cmd: 'npm init -y', desc: 'Create package.json with default values (skip prompts).', example: 'npm init -y', cat: 'Setup', step: 1 },
        { cmd: 'npm install', desc: 'Install all dependencies listed in package.json.', example: 'npm install', cat: 'Install', step: 2 },
        { cmd: 'npm install <pkg>', desc: 'Install a package and add it to dependencies.', example: 'npm install express', cat: 'Install', step: 2 },
        { cmd: 'npm install -D <pkg>', desc: 'Install as a dev dependency (testing, build tools).', example: 'npm install -D jest', cat: 'Install', step: 2 },
        { cmd: 'npm install -g <pkg>', desc: 'Install a package globally on your system.', example: 'npm install -g nodemon', cat: 'Install', step: 2 },
        { cmd: 'npm uninstall <pkg>', desc: 'Remove a package from your project.', example: 'npm uninstall lodash', cat: 'Install', step: 2 },
        { cmd: 'npm update', desc: 'Update all packages to their latest allowed version.', example: 'npm update', cat: 'Manage', step: 3 },
        { cmd: 'npm update <pkg>', desc: 'Update a specific package.', example: 'npm update react', cat: 'Manage', step: 3 },
        { cmd: 'npm outdated', desc: 'Check which packages have newer versions available.', example: 'npm outdated', cat: 'Manage', step: 3 },
        { cmd: 'npm list', desc: 'Show a tree of installed packages.', example: 'npm list --depth=0', cat: 'Inspect', step: 4 },
        { cmd: 'npm list -g', desc: 'Show all globally installed packages.', example: 'npm list -g --depth=0', cat: 'Inspect', step: 4 },
        { cmd: 'npm info <pkg>', desc: 'View detailed info about a package from the registry.', example: 'npm info react', cat: 'Inspect', step: 4 },
        { cmd: 'npm search <term>', desc: 'Search the npm registry for packages.', example: 'npm search express', cat: 'Inspect', step: 4 },
        { cmd: 'npm run <script>', desc: 'Run a script defined in package.json.', example: 'npm run dev', cat: 'Scripts', step: 5 },
        { cmd: 'npm start', desc: 'Run the "start" script (shortcut).', example: 'npm start', cat: 'Scripts', step: 5 },
        { cmd: 'npm test', desc: 'Run the "test" script (shortcut).', example: 'npm test', cat: 'Scripts', step: 5 },
        { cmd: 'npm run build', desc: 'Run the "build" script for production bundling.', example: 'npm run build', cat: 'Scripts', step: 5 },
        { cmd: 'npm publish', desc: 'Publish your package to the npm registry.', example: 'npm publish', cat: 'Publish', step: 6 },
        { cmd: 'npm version <type>', desc: 'Bump the version (patch, minor, or major).', example: 'npm version patch', cat: 'Publish', step: 6 },
        { cmd: 'npm pack', desc: 'Create a tarball (.tgz) of the package for testing.', example: 'npm pack', cat: 'Publish', step: 6 },
        { cmd: 'npm login', desc: 'Log in to the npm registry.', example: 'npm login', cat: 'Publish', step: 6 },
        { cmd: 'npm cache clean --force', desc: 'Clear the local npm cache to fix install issues.', example: 'npm cache clean --force', cat: 'Troubleshoot', step: 7 },
        { cmd: 'npm doctor', desc: 'Run diagnostics to check your npm environment.', example: 'npm doctor', cat: 'Troubleshoot', step: 7 },
        { cmd: 'npm audit', desc: 'Scan for known vulnerabilities in dependencies.', example: 'npm audit', cat: 'Security', step: 8 },
        { cmd: 'npm audit fix', desc: 'Automatically fix vulnerable dependencies.', example: 'npm audit fix', cat: 'Security', step: 8 },
        { cmd: 'npm ci', desc: 'Clean install from lock file (ideal for CI/CD).', example: 'npm ci', cat: 'Advanced', step: 9 },
        { cmd: 'npx <pkg>', desc: 'Run a package without installing it globally.', example: 'npx create-react-app my-app', cat: 'Advanced', step: 9 }
    ],

    render() {
        Navbar.renderTopbar('Package Scout');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Package <span class="text-gradient">Scout</span></h1>
                    <p>Search npm packages visually and learn essential npm commands with examples.</p>
                </div>
                <div class="tabs mb-lg" id="pkg-tabs">
                    <button class="tab-item active" data-tab="search"><i class="fa-solid fa-search" style="margin-right:4px;"></i> Package Search</button>
                    <button class="tab-item" data-tab="commands"><i class="fa-solid fa-terminal" style="margin-right:4px;"></i> npm Commands</button>
                </div>
                <div id="pkg-search-section">
                    <div class="flex-gap mb-lg flex-wrap">
                        <div class="search-container" style="flex: 1; min-width: 300px; max-width: 600px;">
                            <i class="fa-solid fa-magnifying-glass search-icon"></i>
                            <input class="input-field" id="pkg-search-input" type="text" placeholder="Search npm packages..." />
                        </div>
                        <button class="btn btn-primary" id="pkg-search-btn"><i class="fa-solid fa-search"></i> Search</button>
                    </div>
                    <div id="pkg-results" class="grid-2"></div>
                    <div id="pkg-empty">
                        <div class="empty-state">
                            <i class="fa-solid fa-box-open"></i>
                            <h3>Discover Packages</h3>
                            <p>Search for npm packages to see detailed information, quality metrics, and safety assessments.</p>
                        </div>
                    </div>
                </div>
                <div id="pkg-commands-section" style="display:none;">
                    <div class="glass-card-static mb-lg" style="padding:20px;">
                        <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:14px;"><i class="fa-solid fa-route" style="color:var(--primary-light);margin-right:6px;"></i>npm Workflow — Step by Step</h3>
                        <p class="text-xs text-muted mb-md">Follow the flow to understand the npm lifecycle from project setup to publishing.</p>
                        <div class="cmd-flow-visual" id="npm-cmd-flow"></div>
                        <div class="glass-card mt-md" id="npm-flow-detail" style="padding:16px;display:none;border-left:3px solid var(--primary);"></div>
                    </div>
                    <div class="flex-gap mb-lg flex-wrap">
                        <div class="search-container" style="flex:1; max-width: 400px;">
                            <i class="fa-solid fa-magnifying-glass search-icon"></i>
                            <input class="input-field" id="npm-cmd-search" type="text" placeholder="Search npm commands..." />
                        </div>
                    </div>
                    <div class="tabs mb-lg" id="npm-cat-tabs"></div>
                    <div id="npm-cmd-grid"></div>
                </div>
            </div>`;

        this.bindEvents();
        this.searchPackages('react');
    },

    bindEvents() {
        document.getElementById('pkg-search-btn').addEventListener('click', () => {
            const q = document.getElementById('pkg-search-input').value.trim();
            if (q) this.searchPackages(q);
        });
        document.getElementById('pkg-search-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { const q = e.target.value.trim(); if (q) this.searchPackages(q); }
        });
        document.getElementById('pkg-tabs').addEventListener('click', e => {
            if (!e.target.closest('.tab-item')) return;
            document.querySelectorAll('#pkg-tabs .tab-item').forEach(t => t.classList.remove('active'));
            e.target.closest('.tab-item').classList.add('active');
            this.activeTab = e.target.closest('.tab-item').dataset.tab;
            document.getElementById('pkg-search-section').style.display = this.activeTab === 'search' ? 'block' : 'none';
            document.getElementById('pkg-commands-section').style.display = this.activeTab === 'commands' ? 'block' : 'none';
            if (this.activeTab === 'commands' && !this._npmFlowBuilt) {
                this.buildNpmFlow();
                this.renderNpmCategories();
                this.renderNpmCommands();
                this._npmFlowBuilt = true;
            }
        });
    },

    buildNpmFlow() {
        const steps = [
            { id: 1, label: 'Setup', icon: 'fa-solid fa-folder-plus', color: 'var(--primary)', desc: 'Initialize a new project and create your package.json.' },
            { id: 2, label: 'Install', icon: 'fa-solid fa-download', color: 'var(--success)', desc: 'Add, remove, and manage project dependencies.' },
            { id: 3, label: 'Manage', icon: 'fa-solid fa-arrows-rotate', color: 'var(--accent)', desc: 'Update packages and check for outdated dependencies.' },
            { id: 4, label: 'Inspect', icon: 'fa-solid fa-magnifying-glass', color: '#06b6d4', desc: 'List installed packages, view info, and search the registry.' },
            { id: 5, label: 'Scripts', icon: 'fa-solid fa-play', color: '#8b5cf6', desc: 'Run dev server, tests, and build scripts defined in package.json.' },
            { id: 6, label: 'Publish', icon: 'fa-solid fa-upload', color: '#ec4899', desc: 'Version, pack, and publish your package to npm.' },
            { id: 7, label: 'Debug', icon: 'fa-solid fa-wrench', color: 'var(--warning)', desc: 'Clear cache and run diagnostics to fix environment issues.' },
            { id: 8, label: 'Secure', icon: 'fa-solid fa-shield-halved', color: 'var(--error)', desc: 'Audit dependencies for vulnerabilities and auto-fix issues.' },
            { id: 9, label: 'Advanced', icon: 'fa-solid fa-rocket', color: 'var(--primary-light)', desc: 'CI-optimized installs and running packages without installing.' }
        ];

        const flow = document.getElementById('npm-cmd-flow');
        flow.innerHTML = steps.map((s, i) => `
            ${i > 0 ? '<div class="cmd-flow-arrow"><i class="fa-solid fa-chevron-right"></i></div>' : ''}
            <div class="cmd-flow-node" data-step="${s.id}">
                <div class="node-dot" style="background:${s.color};color:#000;"><i class="${s.icon}"></i></div>
                <span class="node-label">${s.label}</span>
            </div>
        `).join('');

        flow.addEventListener('click', e => {
            const node = e.target.closest('.cmd-flow-node');
            if (!node) return;
            const stepId = parseInt(node.dataset.step);
            const step = steps.find(s => s.id === stepId);
            const cmds = this.npmCommands.filter(c => c.step === stepId);
            document.querySelectorAll('#npm-cmd-flow .cmd-flow-node').forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            const detail = document.getElementById('npm-flow-detail');
            detail.style.display = 'block';
            detail.innerHTML = `
                <div class="flex-between mb-sm">
                    <h4 style="font-size:0.92rem;font-weight:600;color:var(--primary-light);"><i class="${step.icon}" style="margin-right:6px;"></i>${step.label}</h4>
                    <span class="tag tag-primary">Step ${step.id}</span>
                </div>
                <p class="text-sm text-secondary mb-md" style="line-height:1.6;">${step.desc}</p>
                ${cmds.map(c => `
                    <div style="padding:8px 10px;border-radius:var(--radius-sm);background:rgba(0,0,0,0.4);margin-bottom:6px;border:1px solid var(--border);">
                        <div class="flex-between"><span class="text-mono text-sm" style="color:var(--primary-light);">${Helpers.escapeHtml(c.cmd)}</span></div>
                        <p class="text-xs text-muted" style="margin-top:3px;line-height:1.5;">${c.desc}</p>
                        <div class="text-mono text-xs text-muted" style="margin-top:4px;opacity:0.6;"><i class="fa-solid fa-terminal" style="margin-right:3px;"></i>${Helpers.escapeHtml(c.example)}</div>
                    </div>`).join('')}`;
        });
        flow.querySelector('.cmd-flow-node').click();
    },

    renderNpmCategories() {
        const cats = ['All', ...new Set(this.npmCommands.map(c => c.cat))];
        const tabs = document.getElementById('npm-cat-tabs');
        tabs.innerHTML = cats.map(c => `<button class="tab-item ${c === this.activeCmdCat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
        tabs.addEventListener('click', e => {
            if (!e.target.classList.contains('tab-item')) return;
            this.activeCmdCat = e.target.dataset.cat;
            document.querySelectorAll('#npm-cat-tabs .tab-item').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            this.renderNpmCommands();
        });
        document.getElementById('npm-cmd-search').addEventListener('input', Helpers.debounce(() => this.renderNpmCommands(), 200));
    },

    renderNpmCommands() {
        const search = (document.getElementById('npm-cmd-search')?.value || '').toLowerCase();
        let cmds = this.npmCommands;
        if (this.activeCmdCat !== 'All') cmds = cmds.filter(c => c.cat === this.activeCmdCat);
        if (search) cmds = cmds.filter(c => c.cmd.toLowerCase().includes(search) || c.desc.toLowerCase().includes(search));
        const grid = document.getElementById('npm-cmd-grid');
        if (!cmds.length) { grid.innerHTML = '<div class="empty-state"><i class="fa-solid fa-terminal"></i><h3>No commands found</h3></div>'; return; }
        grid.innerHTML = `<div class="grid-2">${cmds.map(c => `
            <div class="glass-card git-cmd-card">
                <div class="cmd-syntax">${Helpers.escapeHtml(c.cmd)}</div>
                <p class="cmd-desc">${c.desc}</p>
                <div class="cmd-example"><i class="fa-solid fa-terminal" style="margin-right:4px;opacity:0.4;"></i>${Helpers.escapeHtml(c.example)}</div>
                <div class="mt-sm flex-gap gap-sm"><span class="tag tag-primary">${c.cat}</span><span class="text-xs text-muted">Step ${c.step}</span></div>
            </div>`).join('')}</div>`;
    },

    async searchPackages(query) {
        const results = document.getElementById('pkg-results');
        const empty = document.getElementById('pkg-empty');
        empty.style.display = 'none';
        results.innerHTML = Loader.skeleton(4);

        try {
            const data = await API.searchNpmPackages(query, 20);
            if (!data.objects || data.objects.length === 0) { results.innerHTML = ''; empty.style.display = 'block'; return; }
            results.innerHTML = data.objects.map(obj => {
                const pkg = obj.package;
                const score = obj.score;
                const quality = Math.round((score.detail?.quality || 0) * 100);
                const popularity = Math.round((score.detail?.popularity || 0) * 100);
                const maintenance = Math.round((score.detail?.maintenance || 0) * 100);
                const overall = Math.round((score.final || 0) * 100);
                const qualityColor = quality > 70 ? 'var(--success)' : quality > 40 ? 'var(--warning)' : 'var(--error)';
                const maintColor = maintenance > 70 ? 'var(--success)' : maintenance > 40 ? 'var(--warning)' : 'var(--error)';
                const isOutdated = pkg.date && (new Date() - new Date(pkg.date)) > 365 * 24 * 60 * 60 * 1000;
                const warnings = [];
                if (isOutdated) warnings.push('Potentially outdated');
                if (quality < 40) warnings.push('Low quality score');
                if (maintenance < 30) warnings.push('Poor maintenance');
                return `
                    <div class="glass-card pkg-card">
                        <div class="pkg-header">
                            <a href="https://www.npmjs.com/package/${pkg.name}" target="_blank" rel="noopener" class="pkg-name">${pkg.name}</a>
                            <span class="pkg-version">${pkg.version || ''}</span>
                        </div>
                        <p class="pkg-desc">${Helpers.escapeHtml(pkg.description || 'No description available.')}</p>
                        ${warnings.length > 0 ? `<div style="display:flex;gap:6px;flex-wrap:wrap;">${warnings.map(w => `<span class="tag tag-warning"><i class="fa-solid fa-triangle-exclamation"></i> ${w}</span>`).join('')}</div>` : ''}
                        <div>
                            <div class="flex-between mb-sm"><span class="text-xs text-muted">Quality</span><span class="text-xs" style="color:${qualityColor}">${quality}%</span></div>
                            <div class="pkg-score"><div class="pkg-score-fill" style="width:${quality}%; background:${qualityColor};"></div></div>
                        </div>
                        <div>
                            <div class="flex-between mb-sm"><span class="text-xs text-muted">Maintenance</span><span class="text-xs" style="color:${maintColor}">${maintenance}%</span></div>
                            <div class="pkg-score"><div class="pkg-score-fill" style="width:${maintenance}%; background:${maintColor};"></div></div>
                        </div>
                        <div class="pkg-meta">
                            <span><i class="fa-solid fa-fire"></i> ${popularity}% popular</span>
                            <span><i class="fa-solid fa-star"></i> ${overall}% overall</span>
                            ${pkg.date ? `<span><i class="fa-solid fa-clock"></i> ${Helpers.timeAgo(pkg.date)}</span>` : ''}
                        </div>
                        ${pkg.links?.npm ? `<a href="${pkg.links.npm}" target="_blank" rel="noopener" class="api-link mt-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> npm</a>` : ''}
                    </div>`;
            }).join('');
        } catch (err) {
            Toast.show('Failed to search packages: ' + err.message, 'error');
            results.innerHTML = '';
            empty.style.display = 'block';
        }
    }
};
