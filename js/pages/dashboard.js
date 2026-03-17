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
                @media (max-width: 768px) {
                    .dashboard-hero {
                        flex-direction: column;
                        text-align: center;
                        padding: 30px 20px;
                    }
                    .hero-text h1 { font-size: 2.2rem; }
                    .hero-text p { font-size: 0.95rem; }
                    .hero-actions { justify-content: center; flex-wrap: wrap; }
                    .dashboard-hero .fa-code { display: none; }
                }

                /* Unified Feature Grid */
                .unified-features-grid { 
                    display: grid; 
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 20px; 
                }
                @media (max-width: 1024px) {
                    .unified-features-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                }
                @media (max-width: 600px) {
                    .unified-features-grid { grid-template-columns: 1fr; gap: 14px; }
                }

                .feature-card {
                    padding: 24px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                }
                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
                    border-color: rgba(212,168,67,0.3);
                    background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(212,168,67,0.05) 100%);
                }
                .fc-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 20px;
                }
                .fc-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                .fc-metric {
                    text-align: right;
                }
                .fc-metric-val {
                    font-size: 1.8rem;
                    font-weight: 800;
                    line-height: 1;
                    color: var(--text);
                }
                .fc-metric-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-top: 4px;
                }
                .fc-body h3 {
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 6px;
                    color: var(--text);
                }
                .fc-body p {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                .fc-bg-icon {
                    position: absolute;
                    right: -20px;
                    bottom: -20px;
                    font-size: 8rem;
                    opacity: 0.03;
                    transition: all 0.3s;
                }
                .feature-card:hover .fc-bg-icon {
                    transform: scale(1.1) rotate(-10deg);
                    opacity: 0.06;
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
                    <div class="hide-mobile" style="position:absolute; z-index:0; right: 40px; top: 50%; transform: translateY(-50%); opacity: 0.2;">
                        <i class="fa-solid fa-code" style="font-size: 12rem; color: var(--primary-light);"></i>
                    </div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1.4rem;font-weight:700;"><i class="fa-solid fa-rocket" style="color:var(--primary-light);margin-right:8px;"></i>Toolkit & Features</h2>
                </div>
                
                <div class="unified-features-grid mb-lg">
                    <!-- Ask AI -->
                    <div class="feature-card" data-page="ask-ai">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(212,168,67,0.1); color:var(--primary-light);"><i class="fa-solid fa-robot"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val" data-count="6">0</div>
                                <div class="fc-metric-label">Learning Paths</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Ask AI Assistant</h3>
                            <p>Get personalized tool recommendations, tailored tech stacks, and intelligent framework suggestions.</p>
                        </div>
                        <i class="fa-solid fa-robot fc-bg-icon"></i>
                    </div>

                    <!-- Commands -->
                    <div class="feature-card" data-page="commands">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(62,207,110,0.1); color:var(--success);"><i class="fa-solid fa-terminal"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val" data-count="133">0</div>
                                <div class="fc-metric-label">Total Commands</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Command Reference</h3>
                            <p>Master Git, npm, terminal APIs, and Docker with interactive step-by-step workflow visualizers.</p>
                        </div>
                        <i class="fa-solid fa-terminal fc-bg-icon"></i>
                    </div>

                    <!-- Tools Vault -->
                    <div class="feature-card" data-page="tools-vault">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(180,80,220,0.1); color:#b450dc;"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val" data-count="10">0</div>
                                <div class="fc-metric-label">Core Tools</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Tools Vault</h3>
                            <p>An exclusively curated repository of 80+ essential libraries, design tools, and utilities.</p>
                        </div>
                        <i class="fa-solid fa-screwdriver-wrench fc-bg-icon"></i>
                    </div>

                    <!-- Free APIs -->
                    <div class="feature-card" data-page="free-apis">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(6,182,212,0.1); color:#06b6d4;"><i class="fa-solid fa-cloud"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val" data-count="55">0</div>
                                <div class="fc-metric-label">Free APIs</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Free APIs Base</h3>
                            <p>A heavily categorized database of functional, free-to-use public endpoints for any project.</p>
                        </div>
                        <i class="fa-solid fa-cloud fc-bg-icon"></i>
                    </div>

                    <!-- Code Gen -->
                    <div class="feature-card" data-page="code-generator">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(236,72,153,0.1); color:#ec4899;"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val">AI</div>
                                <div class="fc-metric-label">Powered</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Code Generator</h3>
                            <p>Instantly scaffold modular React, Vue, HTML, and Python components natively generated by AI.</p>
                        </div>
                        <i class="fa-solid fa-wand-magic-sparkles fc-bg-icon"></i>
                    </div>

                    <!-- GitHub Expl -->
                    <div class="feature-card" data-page="code-git-explorer">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(100,100,100,0.1); color:#e8e4dc;"><i class="fa-brands fa-github"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val">3D</div>
                                <div class="fc-metric-label">Interactive</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>GitHub Explorer</h3>
                            <p>Search profiles and view interactive 3D repository globes with real-time dependency mappings.</p>
                        </div>
                        <i class="fa-brands fa-github fc-bg-icon"></i>
                    </div>

                    <!-- Package Scout -->
                    <div class="feature-card" data-page="package-scout">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(203,56,55,0.1); color:#cb3837;"><i class="fa-solid fa-box-open"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val">npm</div>
                                <div class="fc-metric-label">Registry</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Package Scout</h3>
                            <p>Search NPM deeply for crucial package insights, sizes, bundle impacts, and weekly downloads.</p>
                        </div>
                        <i class="fa-solid fa-box-open fc-bg-icon"></i>
                    </div>

                    <!-- Workspace -->
                    <div class="feature-card" data-page="workspace">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(212,168,67,0.1); color:var(--primary-light);"><i class="fa-solid fa-laptop-code"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val">IDE</div>
                                <div class="fc-metric-label">Local DB</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>My Workspace</h3>
                            <p>Secured local database integrated to save snippets and test copy-pasted generated code directly.</p>
                        </div>
                        <i class="fa-solid fa-laptop-code fc-bg-icon"></i>
                    </div>

                    <!-- Scaffolder -->
                    <div class="feature-card" data-page="scaffolder">
                        <div class="fc-header">
                            <div class="fc-icon" style="background:rgba(62,207,110,0.1); color:var(--success);"><i class="fa-solid fa-folder-tree"></i></div>
                            <div class="fc-metric">
                                <div class="fc-metric-val" data-count="4">0</div>
                                <div class="fc-metric-label">Frameworks</div>
                            </div>
                        </div>
                        <div class="fc-body">
                            <h3>Project Scaffolder</h3>
                            <p>View folder tree structural standards for Node, Django, Vue, and React environments seamlessly.</p>
                        </div>
                        <i class="fa-solid fa-folder-tree fc-bg-icon"></i>
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
        document.querySelectorAll('.fc-metric-val[data-count]').forEach(el => {
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
