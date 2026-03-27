const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');

        content.innerHTML = `
            <style>
                #page-content {
                    height: calc(100vh - 56px);
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 0;
                    background: var(--bg-primary);
                }

                .dash-wrapper {
                    max-width: 1280px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 36px 48px;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                /* ===== HERO TOP TEXT ===== */
                .hero-top-text {
                    margin-bottom: 8px;
                }

                .hero-main-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: #fff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                }

                .hero-main-title .gold {
                    color: var(--primary-light);
                }

                .lead-text {
                    display: block;
                    font-size: 1.05rem;
                    color: var(--text-secondary);
                    font-weight: 400;
                    margin-top: 8px;
                }

                /* ===== HERO SECTION ===== */
                .dash-hero-section {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 24px;
                    min-height: 240px;
                }

                .hero-main-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 36px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }

                .hero-main-card h3 {
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 12px;
                }

                .hero-main-sub {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                    max-width: 440px;
                    margin-bottom: 32px;
                }

                .hero-main-bottom {
                    display: flex;
                    align-items: center;
                    margin-top: auto;
                }

                .hero-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 24px;
                    background: var(--primary);
                    color: #000;
                    border: none;
                    border-radius: 30px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                }

                .hero-bot-graphic {
                    width: 200px; height: 200px;
                    position: absolute;
                    bottom: -40px; right: 0px;
                    opacity: 0.03;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 10rem;
                    color: #fff;
                    pointer-events: none;
                }

                /* Right stack */
                .hero-side-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .hero-side-card {
                    flex: 1;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 24px;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    cursor: pointer;
                }

                .hero-side-icon {
                    font-size: 1.25rem;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .hero-side-text h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 6px;
                }

                .hero-side-text p {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.4;
                }

                /* ===== TOOLKIT SECTION ===== */
                .toolkit-label {
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: var(--text-muted);
                    margin-bottom: 20px;
                }

                .toolkit-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                .toolkit-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                }

                .toolkit-icon {
                    width: 48px; height: 48px;
                    border-radius: 8px;
                    background: var(--bg-primary);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.15rem;
                    flex-shrink: 0;
                }

                .toolkit-text {
                    flex: 1;
                    min-width: 0;
                }

                .toolkit-text h3 {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 4px;
                }

                .toolkit-text p {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    line-height: 1.35;
                }

                /* Icon colors */
                .color-yellow { color: #facc15; }
                .color-green { color: #4ade80; }
                .color-blue { color: #38bdf8; }
                .color-purple { color: #a78bfa; }
                .color-pink { color: #f472b6; }
                .color-orange { color: #fb923c; }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 1024px) {
                    .dash-wrapper { padding: 32px; gap: 24px; }
                    .toolkit-grid { grid-template-columns: repeat(3, 1fr); }
                }

                @media (max-width: 900px) {
                    .dash-hero-section { grid-template-columns: 1fr; min-height: auto; }
                    .hero-side-stack { flex-direction: row; }
                    .toolkit-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 600px) {
                    .dash-wrapper { padding: 20px 16px; gap: 20px; }
                    .hero-side-stack { flex-direction: column; }
                    .hero-main-title { font-size: 1.6rem; }
                    .toolkit-grid { grid-template-columns: 1fr; }
                }

                /* Entry animations */
                @keyframes dashFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .dash-animate {
                    opacity: 0;
                    animation: dashFadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
            </style>

            <div class="dash-wrapper">
                <div class="dash-animate">
                    <div class="hero-top-text">
                        <h1 class="hero-main-title">Accelerate Your Workflow. <span class="gold">Build Smarter.</span></h1>
                        <span class="lead-text">All-in-one platform for developers</span>
                    </div>
                </div>

                <!-- HERO SECTION -->
                <div class="dash-hero-section dash-animate" style="animation-delay: 0.05s;">
                    <!-- Main AI Hub Card -->
                    <div class="hero-main-card" data-page="ask-ai">
                        <div>
                            <h3>AI Hub</h3>
                            <p class="hero-main-sub">
                                Chat with AI, design app architectures, explore tech stacks, and debug errors — all in one place.
                            </p>
                        </div>
                        <div class="hero-main-bottom">
                            <button class="hero-cta" onclick="event.stopPropagation(); Router.navigate('ask-ai');">
                                <i class="fa-solid fa-arrow-right"></i> Open AI Hub
                            </button>
                        </div>
                        <div class="hero-bot-graphic"><i class="fa-solid fa-robot"></i></div>
                    </div>

                    <!-- Right Side Stack -->
                    <div class="hero-side-stack">
                        <div class="hero-side-card" data-page="ask-ai">
                            <div class="hero-side-icon color-yellow">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                            </div>
                            <div class="hero-side-text">
                                <h3>Code Generator</h3>
                                <p>Generate framework components with AI and run them live.</p>
                            </div>
                        </div>
                        <div class="hero-side-card" data-page="code-git-explorer">
                            <div class="hero-side-icon color-green">
                                <i class="fa-brands fa-github"></i>
                            </div>
                            <div class="hero-side-text">
                                <h3>GitHub Explorer</h3>
                                <p>Visualize any repository as an interactive 3D graph.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TOOLKIT SECTION -->
                <div class="dash-animate" style="animation-delay: 0.15s;">
                    <p class="toolkit-label">TOOLKIT</p>
                    
                    <div class="toolkit-grid">
                        <div class="toolkit-card" data-page="workspace">
                            <div class="toolkit-icon color-yellow">
                                <i class="fa-solid fa-laptop-code"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>My Workspace</h3>
                                <p>Save, edit & run code snippets</p>
                            </div>
                        </div>

                        <div class="toolkit-card" data-page="commands">
                            <div class="toolkit-icon color-green">
                                <i class="fa-solid fa-terminal"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>Commands</h3>
                                <p>Git, npm, Docker reference</p>
                            </div>
                        </div>

                        <div class="toolkit-card" data-page="free-apis">
                            <div class="toolkit-icon color-blue">
                                <i class="fa-solid fa-cloud"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>Free APIs</h3>
                                <p>55+ curated public endpoints</p>
                            </div>
                        </div>

                        <div class="toolkit-card" data-page="package-scout">
                            <div class="toolkit-icon color-purple">
                                <i class="fa-solid fa-box-open"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>Package Scout</h3>
                                <p>NPM insights & analytics</p>
                            </div>
                        </div>

                        <div class="toolkit-card" data-page="tools-vault">
                            <div class="toolkit-icon color-purple">
                                <i class="fa-solid fa-screwdriver-wrench"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>Tools Vault</h3>
                                <p>Frameworks, libraries & boilerplates</p>
                            </div>
                        </div>

                        <div class="toolkit-card" data-page="code-git-explorer">
                            <div class="toolkit-icon color-pink">
                                <i class="fa-brands fa-github"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>GitHub Explorer</h3>
                                <p>3D repo visualizations</p>
                            </div>
                        </div>

                        <div class="toolkit-card" data-page="docs">
                            <div class="toolkit-icon color-orange">
                                <i class="fa-solid fa-book-bookmark"></i>
                            </div>
                            <div class="toolkit-text">
                                <h3>Developer Docs</h3>
                                <p>Instantly search MDN API Docs</p>
                            </div>
                        </div>
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

        // Onboarding Check
        if (!localStorage.getItem('vdt_first_time')) {
            setTimeout(() => {
                Toast.show('Welcome to Vertex! Explore the developer tools below or use Ctrl+K to search.', 'info', 6000);
                localStorage.setItem('vdt_first_time', 'true');
            }, 1000);
        }
    }
};

window.DashboardPage = DashboardPage;
