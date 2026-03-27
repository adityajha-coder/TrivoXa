const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');

        content.innerHTML = `
            <style>
                /* Prevent scrolling on desktop, allow on mobile */
                #page-content {
                    height: calc(100vh - 64px); /* Fill the screen minus navbar */
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    padding: 16px 32px; /* reduced general padding */
                }
                
                .dash-header { margin-bottom: 12px; flex-shrink: 0; }
                .dash-title { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; color: var(--text); }
                .dash-sub { color: var(--text-secondary); font-size: 0.85rem; }

                .dash-layout-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    flex: 1; /* take remaining height */
                    min-height: 0;
                }

                .dash-top-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                    height: 130px; /* highly condensed fixed height */
                    flex-shrink: 0;
                }

                .dash-bottom-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    flex: 1; /* stretch remaining */
                    min-height: 0;
                }

                .bento-card {
                    background: rgba(255, 255, 255, 0.015);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                }

                /* Arrow Icon */
                .arrow-icon {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                }

                .card-inner {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                /* Medium Card Styling (Top Row) */
                .medium-card { padding: 16px; justify-content: flex-start; }
                .medium-card .card-icon-wrap {
                    width: 36px; height: 36px; font-size: 1rem;
                    margin-bottom: 10px; border-radius: 8px;
                }
                .medium-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: var(--text); }
                .medium-card p { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; max-width: 95%; }
                
                /* Small Card Styling (Bottom Row) */
                .small-card { padding: 14px 16px; }
                .small-card .card-icon-wrap {
                    width: 32px; height: 32px; font-size: 0.85rem;
                    margin-bottom: 8px; border-radius: 6px;
                }
                .small-card h3 { font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; color: var(--text); }
                .small-card p { font-size: 0.72rem; color: var(--text-secondary); line-height: 1.3; }

                /* Shared Icon Wrap Base */
                .card-icon-wrap {
                    display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: rgba(0,0,0,0.2);
                }

                /* Icon Colors */
                .c-primary { color: var(--primary-light); background: rgba(212,168,67,0.1); border-color: rgba(212,168,67,0.2); }
                .c-blue    { color: #60a5fa; background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.2); }
                .c-green   { color: #34d399; background: rgba(52,211,153,0.1); border-color: rgba(52,211,153,0.2); }
                .c-purple  { color: #c084fc; background: rgba(192,132,252,0.1); border-color: rgba(192,132,252,0.2); }
                .c-pink    { color: #f472b6; background: rgba(244,114,182,0.1); border-color: rgba(244,114,182,0.2); }
                .c-orange  { color: #fb923c; background: rgba(251,146,60,0.1); border-color: rgba(251,146,60,0.2); }
                .c-emerald { color: #10b981; background: rgba(16,185,129,0.1); border-color: rgba(16,185,129,0.2); }

                @media (max-width: 900px) {
                    #page-content { height: auto; overflow: visible; padding: 20px; }
                    .dash-top-grid { grid-template-columns: 1fr; height: auto; }
                    .dash-bottom-grid { grid-template-columns: repeat(2, 1fr); }
                    .medium-card, .small-card { min-height: 120px; }
                }
                @media (max-width: 600px) {
                    .dash-title { font-size: 1.4rem; }
                    .dash-bottom-grid { grid-template-columns: 1fr; }
                }
            </style>
            
            <div class="dash-header">
                <h1 class="dash-title">Ship Code <span class="text-gradient">Faster.</span> Build <span class="text-gradient">Smarter.</span></h1>
                <p class="dash-sub">The unified developer toolkit for modern workflows.</p>
            </div>

            <div class="dash-layout-container" id="dashboard-bento">
                <!-- Top Medium Cards (50% Width Each) -->
                <div class="dash-top-grid">
                    <div class="bento-card medium-card" data-page="ask-ai">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-primary"><i class="fa-solid fa-layer-group"></i></div>
                            <h3>Command Center (AI Hub)</h3>
                            <p>Design architectures, collaborate with AI assistants, and instantly generate framework code for your projects.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card medium-card" data-page="code-git-explorer">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-green"><i class="fa-brands fa-github"></i></div>
                            <h3>GitHub Explorer</h3>
                            <p>Transform standard codebases into an interactive 3D universe. Visualize file structures and relationships instantly.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>
                </div>

                <!-- Bottom Small Cards (3 Columns) -->
                <div class="dash-bottom-grid">
                    <div class="bento-card small-card" data-page="workspace">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-orange"><i class="fa-solid fa-laptop-code"></i></div>
                            <h3>My Workspace</h3>
                            <p>Organize snippets, edit locally, and run code entirely in your browser.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card small-card" data-page="commands">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-emerald"><i class="fa-solid fa-terminal"></i></div>
                            <h3>Command Line</h3>
                            <p>Blazing fast cheat-sheets for Git, Docker, npm and terminal utilities.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card small-card" data-page="tools-vault">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-purple"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                            <h3>Tools Vault</h3>
                            <p>Curated tech-stack generator, quick boilerplates, and VS Code extensions.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card small-card" data-page="docs">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-pink"><i class="fa-solid fa-book-open-reader"></i></div>
                            <h3>Developer Docs</h3>
                            <p>Search any framework or SDK for precise, AI-crafted technical docs.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card small-card" data-page="free-apis">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-cyan"><i class="fa-solid fa-cloud"></i></div>
                            <h3>Free APIs</h3>
                            <p>Ping and test 55+ open public endpoints directly within the dashboard.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card small-card" data-page="package-scout">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-blue"><i class="fa-solid fa-box-open"></i></div>
                            <h3>Package Scout</h3>
                            <p>Deep dive into NPM package heuristics, download trends, and bundle sizes.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>
                </div>
            </div>`;

        this.bindEvents(content);
    },

    bindEvents(content) {
        // Navigation clicks
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });

        // Mouse tracking for interactive spotlight effect
        content.querySelectorAll('.bento-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Onboarding Check
        if(!localStorage.getItem('vdt_first_time')) {
            setTimeout(() => {
                Toast.show('Welcome to Vertex! Explore the developer tools below or use Ctrl+K to search.', 'info', 6000);
                localStorage.setItem('vdt_first_time', 'true');
            }, 1000);
        }
    }
};

window.DashboardPage = DashboardPage;
