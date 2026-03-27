const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');

        content.innerHTML = `
            <style>
                .dash-header { margin-bottom: 32px; }
                .dash-title { font-size: 1.9rem; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
                .dash-sub { color: var(--text-secondary); font-size: 0.95rem; }

                .dash-hero {
                    display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; margin-bottom: 28px;
                }
                .hero-main {
                    background: rgba(212,168,67,0.06); border: 1px solid rgba(212,168,67,0.15);
                    border-radius: 14px; padding: 28px 32px; position: relative; overflow: hidden;
                    cursor: pointer; transition: border-color 0.3s, box-shadow 0.3s;
                }
                .hero-main:hover { border-color: rgba(212,168,67,0.35); box-shadow: 0 8px 30px rgba(0,0,0,0.25); }
                .hero-main h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 6px; }
                .hero-main p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; max-width: 85%; margin-bottom: 16px; }
                .hero-main .hero-bg { position: absolute; right: 16px; bottom: -8px; font-size: 7rem; opacity: 0.04; pointer-events: none; color: var(--primary-light); }
                .hero-side {
                    display: grid; grid-template-rows: 1fr 1fr; gap: 14px;
                }
                .hero-card {
                    background: rgba(255,255,255,0.02); border: 1px solid var(--border-light);
                    border-radius: 14px; padding: 20px 24px; cursor: pointer;
                    transition: border-color 0.3s, background 0.3s;
                }
                .hero-card:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); }
                .hero-card h3 { font-size: 0.92rem; font-weight: 600; margin-bottom: 4px; display:flex; align-items:center; gap:8px; }
                .hero-card p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }


                .section-title { font-size: 1rem; font-weight: 700; color: var(--text-muted); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.78rem; }
                .tgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
                .tcard {
                    background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 14px;
                    cursor: pointer; transition: all 0.25s ease;
                }
                .tcard:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }
                .tcard-icon {
                    width: 38px; height: 38px; min-width: 38px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center; font-size: 1rem;
                }

                .ic-gold { background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.2); }
                .ic-gold i { color: #eab308; }
                .ic-blue { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.2); }
                .ic-blue i { color: #3b82f6; }
                .ic-green { background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.2); }
                .ic-green i { color: #22c55e; }
                .ic-cyan { background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.2); }
                .ic-cyan i { color: #06b6d4; }
                .ic-purple { background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.2); }
                .ic-purple i { color: #a855f7; }
                .ic-pink { background: rgba(236,72,153,0.12); border: 1px solid rgba(236,72,153,0.2); }
                .ic-pink i { color: #ec4899; }

                .tcard-info { flex: 1; }
                .tcard-name { font-size: 0.88rem; font-weight: 600; color: var(--text); }
                .tcard-desc { font-size: 0.76rem; color: var(--text-muted); margin-top: 1px; }
                .tcard-arrow { color: rgba(255,255,255,0.1); font-size: 0.75rem; transition: all 0.25s; }
                .tcard:hover .tcard-arrow { color: rgba(255,255,255,0.6); transform: translateX(3px); }

                @media (max-width: 900px) {
                    .dash-hero { grid-template-columns: 1fr; }
                    .hero-side { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
                }
                @media (max-width: 550px) {
                    .dash-title { font-size: 1.5rem; }
                    .hero-side { grid-template-columns: 1fr; }
                    .tgrid { grid-template-columns: 1fr; }
                }
            </style>
            <div class="page-enter">
                <div class="dash-header">
                    <h1 class="dash-title">Ship Code <span class="text-gradient">Faster.</span> Build <span class="text-gradient">Smarter.</span></h1>
                    <p class="dash-sub" style="font-size:1.05rem;">The unified developer toolkit for development</p>
                </div>

                <div class="dash-hero">
                    <div class="hero-main" data-page="ask-ai">
                        <h2>AI Hub</h2>
                        <p>Chat with AI, design app architectures, explore tech stacks, and debug errors — all in one place.</p>
                        <span class="btn btn-primary btn-sm" style="pointer-events:none; border-radius:30px; padding: 10px 22px;"><i class="fa-solid fa-arrow-right"></i> Open AI Hub</span>
                        <i class="fa-solid fa-robot hero-bg"></i>
                    </div>
                    <div class="hero-side">
                        <div class="hero-card" data-page="ask-ai">
                            <h3><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--primary-light);"></i> Code Generator</h3>
                            <p>Generate framework components with AI and run them live.</p>
                        </div>
                        <div class="hero-card" data-page="code-git-explorer">
                            <h3><i class="fa-brands fa-github" style="color:var(--success);"></i> GitHub Explorer</h3>
                            <p>Visualize any repository as an interactive 3D graph.</p>
                        </div>
                    </div>
                </div>

                <div class="section-title">Toolkit</div>
                <div class="tgrid">
                    <div class="tcard" data-page="workspace">
                        <div class="tcard-icon ic-gold"><i class="fa-solid fa-laptop-code"></i></div>
                        <div class="tcard-info"><div class="tcard-name">My Workspace</div><div class="tcard-desc">Save, edit & run code snippets</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                    <div class="tcard" data-page="commands">
                        <div class="tcard-icon ic-green"><i class="fa-solid fa-terminal"></i></div>
                        <div class="tcard-info"><div class="tcard-name">Commands</div><div class="tcard-desc">Git, npm, Docker reference</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                    <div class="tcard" data-page="free-apis">
                        <div class="tcard-icon ic-cyan"><i class="fa-solid fa-cloud"></i></div>
                        <div class="tcard-info"><div class="tcard-name">Free APIs</div><div class="tcard-desc">55+ curated public endpoints</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                    <div class="tcard" data-page="package-scout">
                        <div class="tcard-icon ic-blue"><i class="fa-solid fa-box-open"></i></div>
                        <div class="tcard-info"><div class="tcard-name">Package Scout</div><div class="tcard-desc">NPM insights & analytics</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                    <div class="tcard" data-page="tools-vault">
                        <div class="tcard-icon ic-purple"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                        <div class="tcard-info"><div class="tcard-name">Tools Vault</div><div class="tcard-desc">Frameworks, libraries & boilerplates</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                    <div class="tcard" data-page="code-git-explorer">
                        <div class="tcard-icon ic-pink"><i class="fa-brands fa-github"></i></div>
                        <div class="tcard-info"><div class="tcard-name">GitHub Explorer</div><div class="tcard-desc">3D repo visualizations</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                    <div class="tcard" data-page="docs">
                        <div class="tcard-icon" style="background:rgba(234,88,12,0.12);border:1px solid rgba(234,88,12,0.2);"><i class="fa-solid fa-book-open-reader" style="color:#ea580c;"></i></div>
                        <div class="tcard-info"><div class="tcard-name">Developer Docs</div><div class="tcard-desc">Instantly search MDN API Docs</div></div>
                        <i class="fa-solid fa-chevron-right tcard-arrow"></i>
                    </div>
                </div>
            </div>`;

        this.bindEvents(content);
    },

    bindEvents(content) {
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });

        // Onboarding Check
        if(!localStorage.getItem('vdt_first_time')) {
            setTimeout(() => {
                Toast.show('Welcome to Vertex! Your all-in-one developer hub. Explore the AI tools below or use Ctrl+K to search.', 'info', 6000);
                localStorage.setItem('vdt_first_time', 'true');
            }, 1000);
        }
    }
};

window.DashboardPage = DashboardPage;
