const DashboardPage = {
    render() {
        Navbar.renderTopbar('Home');
        const content = document.getElementById('page-content');

        content.innerHTML = `
            <div class="home-page">
                <div class="home-shell">
                    <section class="home-hero home-reveal">
                        <div>
                            <div class="hero-eyebrow">Developer toolkit for focused building</div>
                            <h1 class="hero-title">Everything a modern developer needs, <span>in one workspace.</span></h1>
                            <p class="hero-copy">
                                TrivoXa is a browser based developer platform that brings AI assistance, code execution, technical references, package research, public APIs, and repository exploration into one connected experience. If you are visiting for the first time, this page will show you exactly what the platform does and how it can help you work faster with less context switching.
                            </p>
                            <div class="hero-actions">
                                <button class="hero-btn hero-btn-primary" onclick="Router.navigate('ask-ai');">
                                    Explore AI Hub
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                                <button class="hero-btn hero-btn-secondary" onclick="document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });">
                                    See what is inside
                                </button>
                            </div>
                        </div>

                        <aside class="hero-visual" aria-label="Platform summary">
                            <div class="visual-metric"><span>9</span> integrated modules</div>
                            <div class="visual-flow">
                                <div class="visual-flow-row">
                                    <strong>Plan</strong>
                                    <p>AI chat, architecture help, and stack exploration.</p>
                                </div>
                                <div class="visual-flow-row">
                                    <strong>Build</strong>
                                    <p>Workspace, snippets, commands, and boilerplates.</p>
                                </div>
                                <div class="visual-flow-row">
                                    <strong>Verify</strong>
                                    <p>Docs, packages, APIs, and GitHub structure analysis.</p>
                                </div>
                            </div>
                        </aside>
                    </section>

                    <section class="home-band home-reveal" style="animation-delay: 0.04s;">
                        <div class="band-grid">
                            <div class="band-item">
                                <strong>AI assisted</strong>
                                <span>Generate, debug, compare, and plan with built-in AI tools.</span>
                            </div>
                            <div class="band-item">
                                <strong>Browser based</strong>
                                <span>No heavy setup required to explore the platform and its tools.</span>
                            </div>
                            <div class="band-item">
                                <strong>Multi purpose</strong>
                                <span>From code snippets to repo analysis, one product covers the workflow.</span>
                            </div>
                            <div class="band-item">
                                <strong>Built for flow</strong>
                                <span>Reduce tab switching and keep technical context close.</span>
                            </div>
                        </div>
                    </section>

                    <section class="home-section home-reveal" id="overview" style="animation-delay: 0.08s;">
                        <div class="section-label">01 / Overview</div>
                        <div class="section-content">
                            <h2>What is TrivoXa?</h2>
                            <p>
                                TrivoXa is an all-in-one toolkit for developers who want fewer fragmented tools and a clearer working environment. Instead of moving between separate sites for AI help, snippets, docs, APIs, package checks, and GitHub inspection, the platform keeps those capabilities together in one interface.
                            </p>

                            <div class="feature-grid">
                                <div class="feature-item">
                                    <h3>AI Hub</h3>
                                    <p>Ask questions, generate code, explore architecture, compare tech stacks, and debug problems.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Workspace</h3>
                                    <p>Create, save, edit, and run code snippets in a focused environment.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Developer references</h3>
                                    <p>Use commands and docs when you need precise answers without leaving the flow.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Research tools</h3>
                                    <p>Evaluate npm packages, browse public APIs, and inspect repositories with more confidence.</p>
                                </div>
                    </section>

                    <section class="home-section home-reveal" style="animation-delay: 0.12s;">
                        <div class="section-label">02 / Workflow</div>
                        <div class="section-content">
                            <h2>How the platform fits into real development work.</h2>
                            <p>
                                A first time user should understand not only what the tools are, but when they matter. TrivoXa is organized around the natural rhythm of building software: think clearly, implement efficiently, then validate the technical choices around the work.
                            </p>

                            <div class="journey-list">
                                <div class="journey-row">
                                    <div class="journey-index">01</div>
                                    <h3>Think</h3>
                                    <p>Use AI Hub to explore the problem, generate approaches, compare stacks, or unblock a bug before committing to a direction.</p>
                                </div>
                                <div class="journey-row">
                                    <div class="journey-index">02</div>
                                    <h3>Build</h3>
                                    <p>Move into Workspace, reference Commands, and reach for Tools Vault when you need a faster starting point.</p>
                                </div>
                                <div class="journey-row">
                                    <div class="journey-index">03</div>
                                    <h3>Verify</h3>
                                    <p>Check docs, evaluate dependencies with Package Scout, browse Free APIs, and understand repo structure with GitHub Explorer.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="home-section home-reveal" style="animation-delay: 0.16s;">
                        <div class="section-label">03 / Modules</div>
                        <div class="section-content">
                            <h2>Everything inside the platform, explained plainly.</h2>
                            <p>
                                Each section exists for a different kind of developer need. Together they form a compact operating system for learning, building, and researching.
                            </p>

                            <div class="feature-grid">
                                <div class="feature-item">
                                    <h3>AI Hub</h3>
                                    <p>Conversational help, architecture generation, code creation, and stack guidance.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Workspace</h3>
                                    <p>A place to save reusable snippets and keep hands-on coding work organized.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Docs</h3>
                                    <p>Quick access to technical references when implementation details matter.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Commands</h3>
                                    <p>Searchable Git, npm, Docker, and CLI references for fast recall.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Tools Vault</h3>
                                    <p>Curated boilerplates, utilities, and useful developer resources.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Free APIs</h3>
                                    <p>A browsable directory of public endpoints for prototypes and integrations.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>Package Scout</h3>
                                    <p>Live npm package information to help compare dependencies more intelligently.</p>
                                </div>
                                <div class="feature-item">
                                    <h3>GitHub Explorer</h3>
                                    <p>Visualize repository structure and understand unfamiliar codebases faster.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="home-section home-reveal" style="animation-delay: 0.2s;">
                        <div class="section-label">04 / Who it helps</div>
                        <div class="section-content">
                            <h2>Useful whether you are learning, shipping, or evaluating.</h2>
                            <p>
                                The homepage should answer the quiet question every visitor has: “Is this for someone like me?” TrivoXa is designed to be approachable for newer developers while still useful for experienced builders who value speed and concentration.
                            </p>

                            <div class="audience-grid">
                                <div class="audience-item">
                                    <h3>Students and beginners</h3>
                                    <p>Learn faster with commands, docs, AI explanations, examples, and a safer place to experiment.</p>
                                </div>
                                <div class="audience-item">
                                    <h3>Independent developers</h3>
                                    <p>Move from idea to implementation with fewer scattered tools and less overhead.</p>
                                </div>
                                <div class="audience-item">
                                    <h3>Teams and reviewers</h3>
                                    <p>Inspect packages, APIs, and repositories more quickly before making technical decisions.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="faq-section home-reveal" style="animation-delay: 0.24s;">
                        <div class="faq-header">
                            <span>05 / FAQ</span>
                            <h2>Questions realted to TrivoXa.</h2>
                        </div>

                        <div class="faq-row">
                            <h3>Do I need to sign up to understand the platform?</h3>
                            <p>No. The homepage is designed to explain the product before you commit. Some features may require authentication, but the value of the platform should be clear before that point.</p>
                        </div>
                        <div class="faq-row">
                            <h3>What makes TrivoXa different from using separate tools?</h3>
                            <p>The value is not that each tool is impossible to find elsewhere; it is that the common parts of development are brought into one coherent workflow, which saves attention and time.</p>
                        </div>
                        <div class="faq-row">
                            <h3>Is this only for AI-related work?</h3>
                            <p>No. AI is one part of the product. TrivoXa also includes practical engineering utilities such as commands, docs, snippets, package research, APIs, and repo exploration.</p>
                        </div>
                        <div class="faq-row">
                            <h3>Where should I begin after landing here?</h3>
                            <p>If you want to explore the platform, start with AI Hub or Workspace. If you already know what you need, the top navigation lets you jump directly into any module.</p>
                        </div>

                        <div class="signup-panel">
                            <h3>Create an account when you are ready to keep your work.</h3>
                            <p>Sign up to persist snippets, keep your AI history, and turn TrivoXa from a useful toolkit into your personal development workspace.</p>
                            <div class="signup-actions">
                                <button class="hero-btn hero-btn-primary" onclick="DashboardPage.openSignup();">Create free account</button>
                                <button class="hero-btn hero-btn-secondary" onclick="DashboardPage.openSignin();">Sign in</button>
                            </div>
                        </div>
                    </section>
                </div>
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
    ,

    openSignin() {
        const signInButton = document.getElementById('btn-auth-in');
        if (signInButton) signInButton.click();
    },

    openSignup() {
        const signInButton = document.getElementById('btn-auth-in');
        if (signInButton) signInButton.click();

        const title = document.getElementById('auth-title');
        const toggleLink = document.getElementById('auth-toggle-link');
        if (title && toggleLink && title.textContent === 'Sign In') {
            toggleLink.click();
        }
    }
};

window.DashboardPage = DashboardPage;
