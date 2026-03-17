const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');
        const hours = new Date().getHours();
        const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

        content.innerHTML = `
            <style>
                .dashboard-hero {
                    background: linear-gradient(135deg, rgba(212,168,67,0.1) 0%, rgba(0,0,0,0) 100%);
                    border-radius: 20px;
                    padding: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid rgba(212,168,67,0.2);
                    box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                }
                .dashboard-hero::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 50%);
                    animation: rotateBg 20s linear infinite;
                    pointer-events: none;
                }
                @keyframes rotateBg { 100% { transform: rotate(360deg); } }
                .hero-text h1 { font-size: 2.8rem; letter-spacing: -1px; margin-bottom: 12px; }
                .hero-text p { font-size: 1.1rem; max-width: 500px; color: var(--text-secondary); line-height: 1.6; }
                .stat-card {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border-radius: 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
                    border-color: var(--primary);
                }
                .stat-value { font-size: 2.5rem; font-weight: 800; margin: 12px 0 4px 0; color: var(--text); }
                .dash-grid-box {
                    padding: 20px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.02);
                    transition: all 0.2s;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .dash-grid-box:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    transform: scale(1.02);
                }
                .dash-grid-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                @media (max-width: 768px) {
                    .dashboard-hero {
                        flex-direction: column;
                        text-align: center;
                        padding: 30px 20px;
                    }
                    .hero-text h1 {
                        font-size: 2.2rem;
                    }
                    .hero-text p {
                        font-size: 1rem;
                    }
                    .hero-actions {
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                    .dashboard-hero .fa-code {
                        display: none;
                    }
                }
            </style>
            <div class="page-enter">
                <div class="dashboard-hero mb-lg" style="position:relative;">
                    <div class="hero-text" style="position:relative; z-index:1;">
                        <h1>${greeting}, <span class="text-gradient">Developer</span></h1>
                        <p>Welcome to Vertex — your all-in-one toolkit for code generation, API exploration, package analysis, and Git mastery.</p>
                        <div class="hero-actions" style="margin-top: 24px; display: flex; gap: 12px;">
                            <button class="btn btn-primary btn-lg" data-page="ask-ai"><i class="fa-solid fa-robot"></i> Ask AI</button>
                            <button class="btn btn-secondary btn-lg" data-page="commands"><i class="fa-solid fa-terminal"></i> Commands Ref</button>
                        </div>
                    </div>
                    <div class="hide-mobile" style="position:relative; z-index:1; opacity: 0.8; right: 20px;">
                        <i class="fa-solid fa-code" style="font-size: 8rem; color: var(--primary-light); filter: drop-shadow(0 0 40px rgba(212,168,67,0.4)); transform: rotate(-15deg);"></i>
                    </div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1.4rem;font-weight:700;"><i class="fa-solid fa-chart-pie" style="color:var(--primary-light);margin-right:8px;"></i>System Metrics</h2>
                </div>
                <div class="grid-4 mb-lg">
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-primary"><i class="fa-solid fa-toolbox"></i></div>
                        <div class="stat-value" data-count="10">0</div>
                        <div class="stat-label">Core Tools</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                        <div style="position:absolute; top:-20px; right:-20px; font-size:6rem; opacity:0.03;"><i class="fa-solid fa-toolbox"></i></div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-accent"><i class="fa-solid fa-plug"></i></div>
                        <div class="stat-value" data-count="55">0</div>
                        <div class="stat-label">Free APIs</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                        <div style="position:absolute; top:-20px; right:-20px; font-size:6rem; opacity:0.03;"><i class="fa-solid fa-plug"></i></div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-success"><i class="fa-solid fa-terminal"></i></div>
                        <div class="stat-value" data-count="133">0</div>
                        <div class="stat-label">Total Commands</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                        <div style="position:absolute; top:-20px; right:-20px; font-size:6rem; opacity:0.03;"><i class="fa-solid fa-terminal"></i></div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-warning"><i class="fa-solid fa-compass"></i></div>
                        <div class="stat-value" data-count="6">0</div>
                        <div class="stat-label">Learning Paths</div>
                        <div class="dash-mini-chart">${this.miniChart()}</div>
                        <div style="position:absolute; top:-20px; right:-20px; font-size:6rem; opacity:0.03;"><i class="fa-solid fa-compass"></i></div>
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
                            <span><i class="fa-brands fa-git-alt"></i> 41 Git</span>
                            <span><i class="fa-brands fa-npm"></i> 30 npm</span>
                            <span><i class="fa-solid fa-terminal"></i> 40 Term</span>
                            <span><i class="fa-brands fa-docker"></i> 10 Docker</span>
                            <span><i class="fa-solid fa-network-wired"></i> 12 HTTP</span>
                        </div>
                    </div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1.4rem;font-weight:700;"><i class="fa-solid fa-rocket" style="color:var(--primary-light);margin-right:8px;"></i>All Features</h2>
                </div>
                <div class="grid-3 mb-lg">
                    <div class="dash-grid-box" data-page="code-generator">
                        <div class="dash-grid-icon" style="background:rgba(212,168,67,0.1); color:var(--primary-light);"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">Code Generator</h3>
                        <p class="text-sm text-secondary">Instantly generate boilerplate framework components with AI.</p>
                    </div>
                    <div class="dash-grid-box" data-page="workspace">
                        <div class="dash-grid-icon" style="background:rgba(62,207,110,0.1); color:var(--success);"><i class="fa-solid fa-laptop-code"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">My Workspace</h3>
                        <p class="text-sm text-secondary">Local database to save snippets and copy-paste generated code.</p>
                    </div>
                    <div class="dash-grid-box" data-page="tools-vault">
                        <div class="dash-grid-icon" style="background:rgba(180,80,220,0.1); color:#b450dc;"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">Tools Vault</h3>
                        <p class="text-sm text-secondary">80+ curated libraries, design tools, and web links.</p>
                    </div>
                    <div class="dash-grid-box" data-page="code-git-explorer">
                        <div class="dash-grid-icon" style="background:rgba(100,100,100,0.1); color:#e8e4dc;"><i class="fa-brands fa-github"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">GitHub Explorer</h3>
                        <p class="text-sm text-secondary">Search profiles and view interactive 3D repository globes.</p>
                    </div>
                    <div class="dash-grid-box" data-page="package-scout">
                        <div class="dash-grid-icon" style="background:rgba(203,56,55,0.1); color:#cb3837;"><i class="fa-solid fa-box-open"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">Package Scout</h3>
                        <p class="text-sm text-secondary">Search npm for package insights and weekly downloads.</p>
                    </div>
                    <div class="dash-grid-box" data-page="free-apis">
                        <div class="dash-grid-icon" style="background:rgba(6,182,212,0.1); color:#06b6d4;"><i class="fa-solid fa-cloud"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">Free APIs Base</h3>
                        <p class="text-sm text-secondary">A categorized database of 60+ free public endpoints.</p>
                    </div>
                    <div class="dash-grid-box" data-page="scaffolder">
                        <div class="dash-grid-icon" style="background:rgba(236,72,153,0.1); color:#ec4899;"><i class="fa-solid fa-folder-tree"></i></div>
                        <h3 style="font-size:1.1rem; font-weight:600;">Project Scaffolder</h3>
                        <p class="text-sm text-secondary">View folder tree standards for Next, Django, Vue, and React.</p>
                    </div>
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
