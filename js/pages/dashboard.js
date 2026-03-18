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
                    backdrop-filter: blur(8px);
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .metric-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
                
                .metric-card.card-success:hover { border-color: rgba(62,207,110,0.4); background: linear-gradient(145deg, rgba(62,207,110,0.08) 0%, rgba(0,0,0,0) 100%); }
                .metric-card.card-info:hover { border-color: rgba(6,182,212,0.4); background: linear-gradient(145deg, rgba(6,182,212,0.08) 0%, rgba(0,0,0,0) 100%); }
                .metric-card.card-purple:hover { border-color: rgba(180,80,220,0.4); background: linear-gradient(145deg, rgba(180,80,220,0.08) 0%, rgba(0,0,0,0) 100%); }
                .metric-card.card-pink:hover { border-color: rgba(236,72,153,0.4); background: linear-gradient(145deg, rgba(236,72,153,0.08) 0%, rgba(0,0,0,0) 100%); }

                .metric-card.card-success .metric-header i { color: var(--success); }
                .metric-card.card-info .metric-header i { color: #06b6d4; }
                .metric-card.card-purple .metric-header i { color: #b450dc; }
                .metric-card.card-pink .metric-header i { color: #ec4899; }

                .metric-bg-icon {
                    position: absolute;
                    right: -10px;
                    bottom: -15px;
                    font-size: 5rem;
                    opacity: 0.03;
                    transition: all 0.4s ease;
                    z-index: 0;
                }
                .metric-card.card-success .metric-bg-icon { color: var(--success); }
                .metric-card.card-info .metric-bg-icon { color: #06b6d4; }
                .metric-card.card-purple .metric-bg-icon { color: #b450dc; }
                .metric-card.card-pink .metric-bg-icon { color: #ec4899; }
                .metric-card:hover .metric-bg-icon { transform: scale(1.15) rotate(-10deg); opacity: 0.08; }

                .metric-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    z-index: 1;
                }
                .metric-body {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    z-index: 1;
                }
                .metric-value {
                    font-size: 2.4rem;
                    font-weight: 800;
                    color: var(--text);
                    line-height: 1;
                    letter-spacing: -1px;
                .card-pink .metric-header i { color: #ec4899; }

                /* Developer Toolkit Grid */
                .tools-section-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: var(--text);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    letter-spacing: -0.3px;
                }
                .tools-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    margin-bottom: 40px;
                }
                .tool-card {
                    background: rgba(255, 255, 255, 0.015);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 16px;
                    padding: 18px 22px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
                }
                .tool-card:hover {
                    background: rgba(255, 255, 255, 0.035);
                    border-color: rgba(255, 255, 255, 0.12);
                    transform: translateY(-2px);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
                }
                .tc-icon-wrap {
                    width: 48px;
                    height: 48px;
                    min-width: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    z-index: 1;
                }
                .tc-icon-wrap::before {
                    content: '';
                    position: absolute;
                    inset: -15px;
                    border-radius: 50%;
                    filter: blur(15px);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    z-index: -1;
                }
                .tool-card:hover .tc-icon-wrap { transform: translateY(-2px) scale(1.05); }
                
                .tool-card:hover .highlight-yellow::before { background: #eab308; opacity: 0.2; }
                .tool-card:hover .highlight-blue::before { background: #3b82f6; opacity: 0.2; }
                .tool-card:hover .highlight-green::before { background: #22c55e; opacity: 0.2; }
                .tool-card:hover .highlight-cyan::before { background: #06b6d4; opacity: 0.2; }
                .tool-card:hover .highlight-purple::before { background: #a855f7; opacity: 0.2; }
                .tool-card:hover .highlight-pink::before { background: #ec4899; opacity: 0.2; }

                .tc-icon-wrap i {
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .tc-icon-wrap.highlight-yellow i { background-image: linear-gradient(135deg, #fef08a, #eab308); }
                .tc-icon-wrap.highlight-blue i { background-image: linear-gradient(135deg, #93c5fd, #3b82f6); }
                .tc-icon-wrap.highlight-green i { background-image: linear-gradient(135deg, #86efac, #22c55e); }
                .tc-icon-wrap.highlight-cyan i { background-image: linear-gradient(135deg, #67e8f9, #06b6d4); }
                .tc-icon-wrap.highlight-purple i { background-image: linear-gradient(135deg, #d8b4fe, #a855f7); }
                .tc-icon-wrap.highlight-pink i { background-image: linear-gradient(135deg, #f9a8d4, #ec4899); }

                .tc-icon-wrap.highlight-yellow { background: linear-gradient(135deg, rgba(234,179,8,0.25), rgba(234,179,8,0.08)); border: 1px solid rgba(234,179,8,0.3); box-shadow: 0 4px 12px rgba(234,179,8,0.1); }
                .tc-icon-wrap.highlight-blue { background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.08)); border: 1px solid rgba(59,130,246,0.3); box-shadow: 0 4px 12px rgba(59,130,246,0.1); }
                .tc-icon-wrap.highlight-green { background: linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.08)); border: 1px solid rgba(34,197,94,0.3); box-shadow: 0 4px 12px rgba(34,197,94,0.1); }
                .tc-icon-wrap.highlight-cyan { background: linear-gradient(135deg, rgba(6,182,212,0.25), rgba(6,182,212,0.08)); border: 1px solid rgba(6,182,212,0.3); box-shadow: 0 4px 12px rgba(6,182,212,0.1); }
                .tc-icon-wrap.highlight-purple { background: linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.08)); border: 1px solid rgba(168,85,247,0.3); box-shadow: 0 4px 12px rgba(168,85,247,0.1); }
                .tc-icon-wrap.highlight-pink { background: linear-gradient(135deg, rgba(236,72,153,0.25), rgba(236,72,153,0.08)); border: 1px solid rgba(236,72,153,0.3); box-shadow: 0 4px 12px rgba(236,72,153,0.1); }

                .tc-content { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
                .tc-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.95);
                    margin-bottom: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    letter-spacing: -0.2px;
                }
                .tc-arrow {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.15);
                    transform: translateX(-4px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .tool-card:hover .tc-arrow {
                    color: rgba(255,255,255,0.9);
                    transform: translateX(2px);
                }
                .tc-desc {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.5);
                    line-height: 1.5;
                    padding-right: 15px;
                }

                @media (max-width: 1024px) {
                    .quick-actions-bento { grid-template-columns: 1fr; }
                    .bento-side-col { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
                    .metrics-row { grid-template-columns: repeat(2, 1fr); }
                    .tools-grid { grid-template-columns: 1fr; }
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
                    .tools-grid { gap: 12px; }
                    .tool-card { padding: 16px; flex-direction: row; align-items: center; gap: 14px; }
                    .tc-icon-wrap { width: 42px; height: 42px; min-width: 42px; font-size: 1rem; }
                    .tc-title { font-size: 1rem; }
                    .tc-desc { font-size: 0.85rem; }
                    .tc-arrow { display: none; }
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
                    <div class="metric-card card-success">
                        <div class="metric-header"><i class="fa-solid fa-terminal"></i> CLI Refs</div>
                        <div class="metric-body">
                            <div class="metric-value" data-count="133">0</div>
                        </div>
                        <i class="fa-solid fa-terminal metric-bg-icon"></i>
                    </div>
                    <div class="metric-card card-info">
                        <div class="metric-header"><i class="fa-solid fa-cloud"></i> APIs</div>
                        <div class="metric-body">
                            <div class="metric-value" data-count="55">0</div>
                        </div>
                        <i class="fa-solid fa-cloud metric-bg-icon"></i>
                    </div>
                    <div class="metric-card card-purple">
                        <div class="metric-header"><i class="fa-solid fa-screwdriver-wrench"></i> Tools</div>
                        <div class="metric-body">
                            <div class="metric-value" data-count="80">0</div>
                        </div>
                        <i class="fa-solid fa-screwdriver-wrench metric-bg-icon"></i>
                    </div>
                    <div class="metric-card card-pink">
                        <div class="metric-header"><i class="fa-solid fa-code-merge"></i> AI Architect</div>
                        <div class="metric-body">
                            <div class="metric-value" data-count="1">0</div>
                        </div>
                        <i class="fa-solid fa-code-merge metric-bg-icon"></i>
                    </div>
                </div>

                <h3 class="tools-section-title"><i class="fa-solid fa-layer-group" style="color:var(--text-muted)"></i> Developer Toolkit</h3>
                <div class="tools-grid">
                    <div class="tool-card" data-page="workspace">
                        <div class="tc-icon-wrap highlight-yellow"><i class="fa-solid fa-laptop-code"></i></div>
                        <div class="tc-content">
                            <div class="tc-title">My Workspace <i class="fa-solid fa-arrow-right tc-arrow"></i></div>
                            <div class="tc-desc">Local IndexedDB environment to securely save code snippets and instantly test implementations.</div>
                        </div>
                    </div>
                    
                    <div class="tool-card" data-page="package-scout">
                        <div class="tc-icon-wrap highlight-blue"><i class="fa-solid fa-box-open"></i></div>
                        <div class="tc-content">
                            <div class="tc-title">Package Scout <i class="fa-solid fa-arrow-right tc-arrow"></i></div>
                            <div class="tc-desc">Deep NPM insights, version tracking, dependency analysis, and ecosystem analytics.</div>
                        </div>
                    </div>

                    <div class="tool-card" data-page="commands">
                        <div class="tc-icon-wrap highlight-green"><i class="fa-solid fa-terminal"></i></div>
                        <div class="tc-content">
                            <div class="tc-title">Command Reference <i class="fa-solid fa-arrow-right tc-arrow"></i></div>
                            <div class="tc-desc">Master Git, npm, terminal paths, and Docker workflows with interactive steps.</div>
                        </div>
                    </div>
                    
                    <div class="tool-card" data-page="free-apis">
                        <div class="tc-icon-wrap highlight-cyan"><i class="fa-solid fa-cloud"></i></div>
                        <div class="tc-content">
                            <div class="tc-title">Free APIs Base <i class="fa-solid fa-arrow-right tc-arrow"></i></div>
                            <div class="tc-desc">A highly categorized database of free-to-use, reliable public endpoints.</div>
                        </div>
                    </div>

                    <div class="tool-card" data-page="tools-vault">
                        <div class="tc-icon-wrap highlight-purple"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                        <div class="tc-content">
                            <div class="tc-title">Tools Vault <i class="fa-solid fa-arrow-right tc-arrow"></i></div>
                            <div class="tc-desc">Exclusive library directory for UI frameworks, CSS toolkits, and dev utilities.</div>
                        </div>
                    </div>

                    <div class="tool-card" data-page="ask-ai">
                        <div class="tc-icon-wrap highlight-pink"><i class="fa-solid fa-robot"></i></div>
                        <div class="tc-content">
                            <div class="tc-title">AI Hub <i class="fa-solid fa-arrow-right tc-arrow"></i></div>
                            <div class="tc-desc">Chat with AI, design project architectures, explore tech stacks, and debug code — all in one place.</div>
                        </div>
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
