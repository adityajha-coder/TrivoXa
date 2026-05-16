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
                    background:
                        radial-gradient(circle at top left, rgba(212, 168, 67, 0.12), transparent 30%),
                        radial-gradient(circle at 82% 0%, rgba(56, 189, 248, 0.08), transparent 28%),
                        var(--bg-primary);
                }

                .home-shell {
                    width: min(1240px, 100%);
                    margin: 0 auto;
                    padding: 34px 40px 42px;
                    display: flex;
                    flex-direction: column;
                    gap: 26px;
                }

                .home-hero {
                    display: grid;
                    grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
                    gap: 18px;
                    align-items: stretch;
                }

                .hero-panel,
                .spotlight-card,
                .feature-card {
                    border: 1px solid var(--border);
                    background: rgba(22, 27, 34, 0.9);
                    box-shadow: var(--shadow);
                }

                .hero-panel {
                    position: relative;
                    overflow: hidden;
                    min-height: 340px;
                    border-radius: 20px;
                    padding: 34px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .hero-panel::before {
                    content: '';
                    position: absolute;
                    width: 340px;
                    height: 340px;
                    right: -120px;
                    top: -130px;
                    border-radius: 50%;
                    background: rgba(212, 168, 67, 0.14);
                    filter: blur(4px);
                }

                .hero-panel::after {
                    content: '';
                    position: absolute;
                    inset: auto 28px 24px auto;
                    width: 180px;
                    height: 180px;
                    background:
                        linear-gradient(135deg, rgba(212, 168, 67, 0.18), transparent 60%),
                        radial-gradient(circle, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
                    background-size: auto, 18px 18px;
                    opacity: 0.45;
                    border-radius: 24px;
                    transform: rotate(10deg);
                }

                .hero-copy,
                .hero-actions {
                    position: relative;
                    z-index: 1;
                }

                .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    width: fit-content;
                    padding: 6px 10px;
                    border-radius: 999px;
                    border: 1px solid rgba(212, 168, 67, 0.16);
                    background: rgba(212, 168, 67, 0.08);
                    color: var(--primary-light);
                    font-size: 0.74rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .hero-title {
                    max-width: 620px;
                    margin: 18px 0 12px;
                    font-size: clamp(2rem, 4vw, 3.15rem);
                    line-height: 0.98;
                    letter-spacing: -0.08em;
                    font-weight: 800;
                }

                .hero-title span {
                    color: var(--primary-light);
                }

                .hero-description {
                    max-width: 560px;
                    color: var(--text-secondary);
                    font-size: 0.98rem;
                    line-height: 1.7;
                }

                .hero-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 28px;
                }

                .home-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    min-height: 42px;
                    padding: 0 16px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-size: 0.84rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all var(--transition);
                }

                .home-btn-primary {
                    color: #111;
                    background: var(--primary-light);
                }

                .home-btn-primary:hover {
                    background: #f1d994;
                }

                .home-btn-secondary {
                    color: var(--text);
                    background: rgba(255, 255, 255, 0.03);
                    border-color: var(--border);
                }

                .home-btn-secondary:hover {
                    border-color: rgba(212, 168, 67, 0.35);
                    background: rgba(212, 168, 67, 0.08);
                }

                .hero-rail {
                    display: grid;
                    gap: 18px;
                }

                .spotlight-card {
                    border-radius: 20px;
                    padding: 22px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: transform var(--transition), border-color var(--transition), background var(--transition);
                }

                .spotlight-card:hover,
                .feature-card:hover {
                    transform: translateY(-2px);
                    border-color: rgba(212, 168, 67, 0.28);
                    background: var(--surface-hover);
                }

                .spotlight-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }

                .spotlight-icon,
                .feature-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.035);
                    font-size: 1.05rem;
                }

                .spotlight-card h3 {
                    margin-top: 18px;
                    font-size: 1.05rem;
                    font-weight: 700;
                }

                .spotlight-card p {
                    margin-top: 7px;
                    color: var(--text-secondary);
                    font-size: 0.84rem;
                    line-height: 1.55;
                }

                .spotlight-link {
                    color: var(--primary-light);
                    font-size: 0.78rem;
                    font-weight: 700;
                }

                .feature-section {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .section-head {
                    display: flex;
                    align-items: end;
                    justify-content: space-between;
                    gap: 16px;
                }

                .section-head h2 {
                    font-size: 1rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                .section-head p {
                    color: var(--text-muted);
                    font-size: 0.8rem;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 14px;
                }

                .feature-card {
                    min-height: 150px;
                    border-radius: 18px;
                    padding: 18px;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    cursor: pointer;
                    transition: transform var(--transition), border-color var(--transition), background var(--transition);
                }

                .feature-card h3 {
                    font-size: 0.94rem;
                    font-weight: 700;
                }

                .feature-card p {
                    color: var(--text-secondary);
                    font-size: 0.8rem;
                    line-height: 1.5;
                }

                .feature-meta {
                    margin-top: auto;
                    color: var(--text-muted);
                    font-size: 0.73rem;
                }

                .tone-gold { color: #facc15; }
                .tone-green { color: #4ade80; }
                .tone-blue { color: #38bdf8; }
                .tone-purple { color: #a78bfa; }
                .tone-pink { color: #f472b6; }
                .tone-orange { color: #fb923c; }

                @keyframes homeFadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .home-enter {
                    opacity: 0;
                    animation: homeFadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }

                @media (max-width: 1080px) {
                    .home-shell { padding: 30px 24px 34px; }
                    .home-hero { grid-template-columns: 1fr; }
                    .hero-rail { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                    .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }

                @media (max-width: 700px) {
                    .home-shell { padding: 20px 16px 24px; gap: 20px; }
                    .hero-panel { min-height: 300px; padding: 24px; }
                    .hero-title { font-size: 1.9rem; }
                    .hero-description { font-size: 0.9rem; }
                    .hero-rail,
                    .feature-grid { grid-template-columns: 1fr; }
                    .section-head {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 4px;
                    }
                }
            </style>

            <div class="home-shell">
                <section class="home-hero home-enter">
                    <div class="hero-panel">
                        <div class="hero-copy">
                            <div class="eyebrow">
                                <i class="fa-solid fa-bolt"></i>
                                Developer command center
                            </div>
                            <h1 class="hero-title">Build faster with one <span>clean workspace.</span></h1>
                            <p class="hero-description">
                                TrivoXa brings AI help, code tools, docs, package research, and repository exploration into one calm place, so your attention stays on the work instead of the switching.
                            </p>
                        </div>

                        <div class="hero-actions">
                            <button class="home-btn home-btn-primary" onclick="Router.navigate('ask-ai');">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                                Start with AI Hub
                            </button>
                            <button class="home-btn home-btn-secondary" onclick="Router.navigate('workspace');">
                                <i class="fa-solid fa-laptop-code"></i>
                                Open Workspace
                            </button>
                        </div>
                    </div>

                    <div class="hero-rail">
                        <article class="spotlight-card" data-page="code-git-explorer">
                            <div class="spotlight-top">
                                <div class="spotlight-icon tone-green">
                                    <i class="fa-brands fa-github"></i>
                                </div>
                                <span class="spotlight-link">Explore</span>
                            </div>
                            <div>
                                <h3>See a repo before you read it.</h3>
                                <p>Turn GitHub projects into a navigable 3D structure and find the shape of the codebase quickly.</p>
                            </div>
                        </article>

                        <article class="spotlight-card" data-page="package-scout">
                            <div class="spotlight-top">
                                <div class="spotlight-icon tone-purple">
                                    <i class="fa-solid fa-box-open"></i>
                                </div>
                                <span class="spotlight-link">Research</span>
                            </div>
                            <div>
                                <h3>Choose packages with context.</h3>
                                <p>Compare npm libraries with live signals before adding another dependency to the stack.</p>
                            </div>
                        </article>
                    </div>
                </section>

                <section class="feature-section home-enter" style="animation-delay: 0.08s;">
                    <div class="section-head">
                        <h2>Everything in reach</h2>
                        <p>Jump into the tool that fits the next move.</p>
                    </div>

                    <div class="feature-grid">
                        <article class="feature-card" data-page="workspace">
                            <div class="feature-icon tone-gold"><i class="fa-solid fa-laptop-code"></i></div>
                            <div>
                                <h3>My Workspace</h3>
                                <p>Save, edit, and run your code snippets in one place.</p>
                            </div>
                            <div class="feature-meta">Create and iterate</div>
                        </article>

                        <article class="feature-card" data-page="commands">
                            <div class="feature-icon tone-green"><i class="fa-solid fa-terminal"></i></div>
                            <div>
                                <h3>Commands</h3>
                                <p>Keep Git, npm, and Docker references close while you work.</p>
                            </div>
                            <div class="feature-meta">Recall faster</div>
                        </article>

                        <article class="feature-card" data-page="free-apis">
                            <div class="feature-icon tone-blue"><i class="fa-solid fa-cloud"></i></div>
                            <div>
                                <h3>Free APIs</h3>
                                <p>Browse 120+ public endpoints for experiments and prototypes.</p>
                            </div>
                            <div class="feature-meta">Discover inputs</div>
                        </article>

                        <article class="feature-card" data-page="tools-vault">
                            <div class="feature-icon tone-purple"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                            <div>
                                <h3>Tools Vault</h3>
                                <p>Start from curated boilerplates instead of blank files.</p>
                            </div>
                            <div class="feature-meta">Move sooner</div>
                        </article>

                        <article class="feature-card" data-page="docs">
                            <div class="feature-icon tone-orange"><i class="fa-solid fa-book-bookmark"></i></div>
                            <div>
                                <h3>Developer Docs</h3>
                                <p>Search MDN references without leaving the flow.</p>
                            </div>
                            <div class="feature-meta">Stay precise</div>
                        </article>

                        <article class="feature-card" data-page="ask-ai">
                            <div class="feature-icon tone-pink"><i class="fa-solid fa-robot"></i></div>
                            <div>
                                <h3>AI Hub</h3>
                                <p>Generate code, plan architecture, and debug roadblocks.</p>
                            </div>
                            <div class="feature-meta">Think with leverage</div>
                        </article>

                        <article class="feature-card" data-page="package-scout">
                            <div class="feature-icon tone-purple"><i class="fa-solid fa-chart-line"></i></div>
                            <div>
                                <h3>Package Scout</h3>
                                <p>Read adoption signals before bringing a library aboard.</p>
                            </div>
                            <div class="feature-meta">Choose wisely</div>
                        </article>

                        <article class="feature-card" data-page="code-git-explorer">
                            <div class="feature-icon tone-green"><i class="fa-solid fa-diagram-project"></i></div>
                            <div>
                                <h3>GitHub Explorer</h3>
                                <p>Map repository structure and orient yourself in seconds.</p>
                            </div>
                            <div class="feature-meta">See the system</div>
                        </article>
                    </div>
                </section>
            </div>`;

        this.bindEvents(content);
    },

    bindEvents(content) {
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });

        if (!localStorage.getItem('vdt_first_time')) {
            setTimeout(() => {
                Toast.show('Welcome to TrivoXa! Explore the developer tools below or use Ctrl+K to search.', 'info', 6000);
                localStorage.setItem('vdt_first_time', 'true');
            }, 1000);
        }
    }
};

window.DashboardPage = DashboardPage;
