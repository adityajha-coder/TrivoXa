const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');
        const hours = new Date().getHours();
        const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

        content.innerHTML = `
            <style>
                /* Modern Minimalist Dashboard */
                .dash-header {
                    margin-bottom: 32px;
                }
                .dash-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                    margin-bottom: 6px;
                    color: var(--text);
                }
                .dash-subtitle {
                    color: var(--text-secondary);
                    font-size: 1.05rem;
                }

                /* Quick Actions Bento */
                .quick-actions-bento {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .bento-main {
                    background: linear-gradient(135deg, rgba(212,168,67,0.1) 0%, rgba(212,168,67,0.01) 100%);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212,168,67,0.2);
                    border-radius: 16px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bento-main:hover { border-color: rgba(212,168,67,0.4); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
                .bento-main h2 { font-size: 1.8rem; margin-bottom: 10px; font-weight: 700; color: var(--text); }
                .bento-main p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; max-width: 80%; margin-bottom: 24px; }
                .bento-main-bg { position: absolute; right: 20px; bottom: -10px; font-size: 10rem; color: var(--primary-light); opacity: 0.05; transform: rotate(-10deg); pointer-events: none; transition: transform 0.4s ease; }
                .bento-main:hover .bento-main-bg { transform: rotate(-15deg) scale(1.05); opacity: 0.08; }

                .bento-side-col {
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    gap: 16px;
                }
                .bento-side-card {
                    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bento-side-card:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
                .bento-side-card h3 { font-size: 1.15rem; margin-bottom: 6px; font-weight: 600; display:flex; align-items:center; gap:8px;}
                .bento-side-card p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; }

                /* Core Metrics Row */
                .metrics-row {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .metric-card {
                    background: linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);
                    backdrop-filter: blur(5px);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }
                .metric-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                .metric-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted);
                    font-size: 0.82rem;
                    font-weight: 500;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .metric-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--text);
                    line-height: 1;
                }

                /* Tools Grid */
                .tools-section-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: var(--text);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .tools-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .tool-card {
                    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    backdrop-filter: blur(5px);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    padding: 20px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .tool-card:hover {
                    border-color: rgba(255,255,255,0.2);
                    background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
                }
                .tc-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }
                .tc-icon-wrap {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    color: var(--text);
                    transition: all 0.2s;
                }
                .tool-card:hover .tc-icon-wrap {
                    color: var(--primary-light);
                    background: rgba(212,168,67,0.1);
                }
                .tc-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text);
                }
                .tc-desc {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }

                @media (max-width: 1024px) {
                    .quick-actions-bento { grid-template-columns: 1fr; }
                    .bento-side-col { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
                    .metrics-row { grid-template-columns: repeat(2, 1fr); }
                    .tools-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 600px) {
                    .dash-header { text-align: center; margin-bottom: 24px; }
                    .dash-title { font-size: 1.8rem; }
                    .dash-subtitle { font-size: 0.95rem; }
                    
                    .bento-main { padding: 24px; text-align: center; align-items: center; }
                    .bento-main p { max-width: 100%; text-align: center; }
                    .bento-main .btn { width: 100%; justify-content: center; }
                    
                    .bento-side-col { grid-template-columns: 1fr; }
                    .bento-side-card { padding: 20px; text-align: center; align-items: center; }
                    
                    .metrics-row { grid-template-columns: repeat(2, 1fr); gap: 12px; }
                    .metric-card { padding: 16px; align-items: center; text-align: center; }
                    .metric-header { justify-content: center; }
                    .metric-value { font-size: 1.6rem; }
                    
                    .tools-section-title { justify-content: center; margin-top: 10px; }
                    .tools-grid { grid-template-columns: 1fr; gap: 12px; }
                    .tool-card { padding: 16px; flex-direction: row; align-items: center; gap: 16px; }
                    .tc-header { margin-bottom: 0; min-width: max-content; }
                    .tc-title { display: none; }
                    .tc-desc { font-size: 0.9rem; text-align: left; }
                }
                @media (max-width: 480px) {
                    .tool-card { flex-direction: column; align-items: flex-start; text-align: left; gap: 8px; }
                    .tc-header { min-width: unset; margin-bottom: 4px; }
                    .tc-title { display: block; }
                }
            </style>
            <div class="page-enter">
                <div class="dash-header">
                    <h1 class="dash-title">${greeting}, <span class="text-gradient">Developer</span></h1>
                    <p class="dash-subtitle">Welcome to your clean, high-performance developer workspace.</p>
                </div>

                <div class="quick-actions-bento">
                    <div class="bento-main" data-page="ask-ai">
                        <h2>Build with AI</h2>
                        <p>Describe your project and let our AI assemble the perfect tech stack, folder structure, and boilerplates instantly.</p>
                        <div>
                            <span class="btn btn-primary btn-sm" style="pointer-events:none;"><i class="fa-solid fa-wand-magic-sparkles"></i> Getting Started</span>
                        </div>
                        <i class="fa-solid fa-robot bento-main-bg"></i>
                    </div>
                    
                    <div class="bento-side-col">
                        <div class="bento-side-card" data-page="code-generator">
                            <h3><i class="fa-solid fa-code" style="color:var(--primary-light)"></i> Code Generator</h3>
                            <p>Generate highly-optimized framework components natively.</p>
                        </div>
                        <div class="bento-side-card" data-page="code-git-explorer">
                            <h3><i class="fa-brands fa-github" style="color:var(--success)"></i> GitHub Explorer</h3>
                            <p>Visualize repositories as beautiful interactive 3D graphs.</p>
                        </div>
                    </div>
                </div>

                <div class="metrics-row">
                    <div class="metric-card">
                        <div class="metric-header"><i class="fa-solid fa-terminal" style="color:var(--success)"></i> CLI Refs</div>
                        <div class="metric-value" data-count="133">0</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header"><i class="fa-solid fa-cloud" style="color:#06b6d4"></i> APIs</div>
                        <div class="metric-value" data-count="55">0</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header"><i class="fa-solid fa-screwdriver-wrench" style="color:#b450dc"></i> Tools</div>
                        <div class="metric-value" data-count="80">0</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header"><i class="fa-solid fa-folder-tree" style="color:#ec4899"></i> Boilerplates</div>
                        <div class="metric-value" data-count="4">0</div>
                    </div>
                </div>

                <h3 class="tools-section-title"><i class="fa-solid fa-layer-group" style="color:var(--text-muted)"></i> Developer Toolkit</h3>
                <div class="tools-grid">
                    <div class="tool-card" data-page="workspace">
                        <div class="tc-header">
                            <div class="tc-icon-wrap"><i class="fa-solid fa-laptop-code"></i></div>
                            <div class="tc-title">My Workspace</div>
                        </div>
                        <div class="tc-desc">Local IndexedDB environment to securely save code snippets and instantly test implementations.</div>
                    </div>
                    
                    <div class="tool-card" data-page="package-scout">
                        <div class="tc-header">
                            <div class="tc-icon-wrap"><i class="fa-solid fa-box-open"></i></div>
                            <div class="tc-title">Package Scout</div>
                        </div>
                        <div class="tc-desc">Deep NPM insights, version tracking, dependency analysis, and ecosystem analytics.</div>
                    </div>

                    <div class="tool-card" data-page="commands">
                        <div class="tc-header">
                            <div class="tc-icon-wrap"><i class="fa-solid fa-terminal"></i></div>
                            <div class="tc-title">Command Reference</div>
                        </div>
                        <div class="tc-desc">Master Git, npm, terminal paths, and Docker workflows with interactive steps.</div>
                    </div>
                    
                    <div class="tool-card" data-page="free-apis">
                        <div class="tc-header">
                            <div class="tc-icon-wrap"><i class="fa-solid fa-cloud"></i></div>
                            <div class="tc-title">Free APIs Base</div>
                        </div>
                        <div class="tc-desc">A highly categorized database of free-to-use, reliable public endpoints.</div>
                    </div>

                    <div class="tool-card" data-page="tools-vault">
                        <div class="tc-header">
                            <div class="tc-icon-wrap"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                            <div class="tc-title">Tools Vault</div>
                        </div>
                        <div class="tc-desc">Exclusive library directory for UI frameworks, CSS toolkits, and dev utilities.</div>
                    </div>

                    <div class="tool-card" data-page="scaffolder">
                        <div class="tc-header">
                            <div class="tc-icon-wrap"><i class="fa-solid fa-folder-tree"></i></div>
                            <div class="tc-title">Project Scaffolder</div>
                        </div>
                        <div class="tc-desc">Browse directory structures and configurations for Next, Django, Vue, and React.</div>
                    </div>
                </div>

            </div>`;

        this.animateCounters();
        this.bindEvents(content);
    },

    animateCounters() {
        document.querySelectorAll('.metric-value[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 25));
            const interval = setInterval(() => { 
                current += step; 
                if (current >= target) { 
                    current = target; 
                    clearInterval(interval); 
                } 
                el.textContent = current; 
            }, 40);
        });
    },

    bindEvents(content) {
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });
    }
};

window.DashboardPage = DashboardPage;
