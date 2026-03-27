const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');

        content.innerHTML = `
            <style>
                .dash-header { margin-bottom: 32px; padding-top: 10px; }
                .dash-title { font-size: 2.2rem; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; color: var(--text); }
                .dash-sub { color: var(--text-secondary); font-size: 1.05rem; }

                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 40px;
                    grid-auto-rows: minmax(140px, auto);
                }

                .bento-card {
                    background: rgba(255, 255, 255, 0.015);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                }

                .bento-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%);
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                    z-index: 1;
                }

                .bento-card:hover {
                    border-color: rgba(255,255,255,0.15);
                    background: rgba(255,255,255,0.025);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
                }
                
                .bento-card:hover::before {
                    opacity: 1;
                }

                /* Layout Spans */
                .span-2-col { grid-column: span 2; }
                
                .card-inner {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .card-icon-wrap {
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                    margin-bottom: 16px;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: rgba(0,0,0,0.2);
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .bento-card:hover .card-icon-wrap {
                    transform: scale(1.05);
                }

                .c-primary { color: var(--primary-light); background: rgba(212,168,67,0.1); border-color: rgba(212,168,67,0.2); }
                .c-blue    { color: #60a5fa; background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.2); }
                .c-green   { color: #34d399; background: rgba(52,211,153,0.1); border-color: rgba(52,211,153,0.2); }
                .c-purple  { color: #c084fc; background: rgba(192,132,252,0.1); border-color: rgba(192,132,252,0.2); }
                .c-pink    { color: #f472b6; background: rgba(244,114,182,0.1); border-color: rgba(244,114,182,0.2); }
                .c-orange  { color: #fb923c; background: rgba(251,146,60,0.1); border-color: rgba(251,146,60,0.2); }
                .c-emerald { color: #10b981; background: rgba(16,185,129,0.1); border-color: rgba(16,185,129,0.2); }

                .bento-card h3 {
                    font-size: 1.05rem;
                    font-weight: 600;
                    margin-bottom: 6px;
                    color: var(--text);
                }

                .bento-card p {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                    flex: 1;
                }

                .arrow-icon {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    color: var(--text-muted);
                    opacity: 0;
                    transform: translate(-5px, 5px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 1rem;
                }

                .bento-card:hover .arrow-icon {
                    opacity: 1;
                    transform: translate(0, 0);
                    color: var(--text);
                }

                /* Main feature card styling */
                .bento-main {
                    background: linear-gradient(145deg, rgba(212,168,67,0.08) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(212,168,67,0.15);
                }
                .bento-main:hover {
                    border-color: rgba(212,168,67,0.3);
                }

                .bento-main h3 { font-size: 1.35rem; margin-bottom: 8px; }
                .bento-main p { font-size: 0.95rem; max-width: 85%; }
                
                .tech-pattern {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 200px;
                    height: 100%;
                    background-image: radial-gradient(rgba(212,168,67,0.3) 1px, transparent 1px);
                    background-size: 16px 16px;
                    opacity: 0.4;
                    mask-image: linear-gradient(to right, transparent, black);
                    -webkit-mask-image: linear-gradient(to right, transparent, black);
                    pointer-events: none;
                    z-index: 0;
                }

                @media (max-width: 1024px) {
                    .bento-grid { grid-template-columns: repeat(2, 1fr); }
                    .span-2-col { grid-column: span 2; }
                }
                @media (max-width: 650px) {
                    .dash-title { font-size: 1.7rem; }
                    .bento-grid { grid-template-columns: 1fr; }
                    .span-2-col { grid-column: span 1; }
                    .tech-pattern { opacity: 0.15; }
                }
            </style>
            
            <div class="page-enter">
                <div class="dash-header">
                    <h1 class="dash-title">Ship Code <span class="text-gradient">Faster.</span> Build <span class="text-gradient">Smarter.</span></h1>
                    <p class="dash-sub">The unified developer toolkit for modern workflows.</p>
                </div>

                <div class="bento-grid" id="dashboard-bento">
                    <!-- Main Feature -->
                    <div class="bento-card bento-main span-2-col" data-page="ask-ai">
                        <div class="tech-pattern"></div>
                        <div class="card-inner">
                            <div class="card-icon-wrap c-primary"><i class="fa-solid fa-layer-group"></i></div>
                            <h3>Command Center</h3>
                            <p>Design app architectures, chat with contextual assistants, and generate framework components — all from a single interface.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <!-- Toolkit Cards -->
                    <div class="bento-card" data-page="code-git-explorer">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-green"><i class="fa-solid fa-diagram-project"></i></div>
                            <h3>GitHub Explorer</h3>
                            <p>Visualize repositories as interactive 3D force-directed graphs.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card" data-page="workspace">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-orange"><i class="fa-solid fa-laptop-code"></i></div>
                            <h3>My Workspace</h3>
                            <p>Save snippets, edit local files, and securely run code directly in the browser.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card" data-page="commands">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-emerald"><i class="fa-solid fa-terminal"></i></div>
                            <h3>Command Line Info</h3>
                            <p>Quick-reference cheat sheets for Git, Docker, and npm commands.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card" data-page="tools-vault">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-purple"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                            <h3>Tools Vault</h3>
                            <p>A curated directory of frameworks, VS Code extensions, and quick boilerplates.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card" data-page="docs">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-pink"><i class="fa-solid fa-book-open-reader"></i></div>
                            <h3>Developer Docs</h3>
                            <p>Access precise, contextual documentation generated instantly for any subject.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card" data-page="free-apis">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-cyan"><i class="fa-solid fa-cloud"></i></div>
                            <h3>Free APIs</h3>
                            <p>Test and prototype with 55+ verified, open public API endpoints.</p>
                        </div>
                        <i class="fa-solid fa-arrow-right arrow-icon"></i>
                    </div>

                    <div class="bento-card" data-page="package-scout">
                        <div class="card-inner">
                            <div class="card-icon-wrap c-blue"><i class="fa-solid fa-box-open"></i></div>
                            <h3>Package Scout</h3>
                            <p>Deep dive into NPM package heuristics, dependencies, and bundle sizes.</p>
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
