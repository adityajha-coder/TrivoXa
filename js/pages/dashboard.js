const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');
        const hours = new Date().getHours();
        const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

        content.innerHTML = `
            <div class="page-enter">
                <div class="dashboard-hero" style="position:relative;">
                    <div class="hero-text" style="position:relative; z-index:1;">
                        <h1>${greeting}, <span class="text-gradient">Developer</span> ⚡</h1>
                        <p>Welcome to Vertex — your all-in-one toolkit for code generation, repo exploration, package analysis, and Git mastery.</p>
                    </div>
                    <div class="hero-actions" style="position:relative; z-index:1;">
                        <button class="btn btn-primary btn-lg" data-page="ask-ai"><i class="fa-solid fa-robot"></i> Ask AI</button>
                        <button class="btn btn-secondary btn-lg" data-page="commands"><i class="fa-solid fa-terminal"></i> Commands</button>
                    </div>
                </div>

                <div class="grid-4 mb-lg">
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-primary"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div class="stat-value" data-count="5">0</div>
                        <div class="stat-label">Developer Tools</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-accent"><i class="fa-solid fa-plug"></i></div>
                        <div class="stat-value" data-count="45">0</div>
                        <div class="stat-label">Free APIs</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-success"><i class="fa-solid fa-code-branch"></i></div>
                        <div class="stat-value" data-count="90">0</div>
                        <div class="stat-label">Total Commands</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-warning"><i class="fa-solid fa-compass"></i></div>
                        <div class="stat-value" data-count="6">0</div>
                        <div class="stat-label">Learning Paths</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                    </div>
                </div>

                <div class="grid-2 mb-lg">
                    <div class="glass-card dash-highlight-card" data-page="ask-ai" style="cursor:pointer;">
                        <div class="dash-highlight-icon" style="background:rgba(212,168,67,0.06);"><i class="fa-solid fa-robot" style="color:var(--primary-light);font-size:1.3rem;"></i></div>
                        <h3>Ask AI Assistant</h3>
                        <p>Tell AI what you want to build and get personalized tool recommendations, tech stacks, and framework suggestions.</p>
                        <div class="flex-gap text-xs text-muted" style="margin-top:10px;">
                            <span><i class="fa-solid fa-message"></i> 11 Project Types</span>
                            <span><i class="fa-solid fa-compass"></i> 6 Learning Paths</span>
                        </div>
                    </div>
                    <div class="glass-card dash-highlight-card" data-page="commands" style="cursor:pointer;">
                        <div class="dash-highlight-icon" style="background:rgba(62,207,110,0.06);"><i class="fa-solid fa-terminal" style="color:var(--success);font-size:1.3rem;"></i></div>
                        <h3>Command Reference</h3>
                        <p>Master Git, npm, and terminal commands with step-by-step workflow visualizations and quick search.</p>
                        <div class="flex-gap text-xs text-muted" style="margin-top:10px;">
                            <span><i class="fa-brands fa-git-alt"></i> 35 Git</span>
                            <span><i class="fa-brands fa-npm"></i> 25 npm</span>
                            <span><i class="fa-solid fa-terminal"></i> 30 Terminal</span>
                        </div>
                    </div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-toolbox" style="color:var(--primary-light);margin-right:6px;"></i>All Tools</h2>
                </div>
                <div class="dashboard-tools-grid mb-lg">
                    <div class="glass-card tool-card" data-page="workspace">
                        <div class="tool-icon" style="background:rgba(62,207,110,0.06);color:var(--success);"><i class="fa-solid fa-laptop-code"></i></div>
                        <h3>My Workspace</h3>
                        <p>Save personal code snippets and access boilerplate templates.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="tools-vault">
                        <div class="tool-icon" style="background:rgba(236,72,153,0.06);color:#ec4899;"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                        <h3>Tools Vault</h3>
                        <p>Curated list of standard dev tools and cutting-edge AI utilities.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="code-generator">
                        <div class="tool-icon icon-primary"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <h3>Code Generator</h3>
                        <p>Generate code components instantly using AI LLM integration.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="code-git-explorer">
                        <div class="tool-icon icon-success"><i class="fa-solid fa-cube"></i></div>
                        <h3>Code & Git Explorer</h3>
                        <p>Visualize repository structure and branch history in 3D.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="package-scout">
                        <div class="tool-icon icon-warning"><i class="fa-solid fa-box-open"></i></div>
                        <h3>Package Scout</h3>
                        <p>Evaluate npm packages with quality scores and risk warnings.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="free-apis">
                        <div class="tool-icon icon-error"><i class="fa-solid fa-plug"></i></div>
                        <h3>Free APIs</h3>
                        <p>45+ curated free APIs organized by category for development.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                </div>
            </div>`;

        this.animateCounters();
        this.bindEvents(content);
    },

    miniChart() {
        const bars = [];
        for (let i = 0; i < 7; i++) bars.push(`<div class="bar" style="height:${Math.random()*20+8}px;"></div>`);
        return bars.join('');
    },

    animateCounters() {
        document.querySelectorAll('.stat-value[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 25));
            const interval = setInterval(() => { current += step; if (current >= target) { current = target; clearInterval(interval); } el.textContent = current; }, 40);
        });
    },

    bindEvents(content) {
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });
    }
};
