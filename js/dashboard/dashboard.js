const DashboardPage = {
  render() {
    Navbar.renderTopbar("Home");
    const content = document.getElementById("page-content");

    content.innerHTML = `
            <div class="home-page">
                <div class="home-shell">
                    <section class="home-hero home-reveal">
                        <div class="hero-content">
                            <h1 class="hero-title">Accelerate Your Workflow. <br><span>Build Smarter.</span></h1>
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
                    </section>
                    <section class="home-section home-reveal" id="overview" style="animation-delay: 0.08s;">
                        <div class="section-label">01 / Overview</div>
                        <div class="section-content">
                            <h2>What is TrivoXa?</h2>
                            <p>
                                TrivoXa is an all-in-one toolkit for developers who want fewer fragmented tools and a clearer working environment. Instead of moving between separate sites for AI help, snippets, docs, APIs, package checks, and GitHub inspection, the platform keeps those capabilities together in one interface.
                            </p>
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
                                    <p>Check docs, evaluate dependencies in Commands, browse Free APIs, and understand repo structure with GitHub Explorer.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="home-section home-reveal" style="animation-delay: 0.16s;">
                        <div class="section-label">03 / Modules</div>
                        <div class="section-content">
                            <h2>TrivoXa features you should know.</h2>
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
                            <h2>Questions related to TrivoXa.</h2>
                        </div>

                        <div class="faq-row">
                            <div class="faq-question-container">
                                <h3>Do I need to sign up to understand the platform?</h3>
                                <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                            </div>
                            <div class="faq-answer">
                                <div class="faq-answer-content">
                                    <p>No. The homepage is designed to explain the product before you commit. Some features may require authentication, but the value of the platform should be clear before that point.</p>
                                </div>
                            </div>
                        </div>
                        <div class="faq-row">
                            <div class="faq-question-container">
                                <h3>What makes TrivoXa different from using separate tools?</h3>
                                <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                            </div>
                            <div class="faq-answer">
                                <div class="faq-answer-content">
                                    <p>The value is not that each tool is impossible to find elsewhere; it is that the common parts of development are brought into one coherent workflow, which saves attention and time.</p>
                                </div>
                            </div>
                        </div>
                        <div class="faq-row">
                            <div class="faq-question-container">
                                <h3>Is this only for AI-related work?</h3>
                                <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                            </div>
                            <div class="faq-answer">
                                <div class="faq-answer-content">
                                    <p>No. AI is one part of the product. TrivoXa also includes practical engineering utilities such as commands, docs, snippets, package research, APIs, and repo exploration.</p>
                                </div>
                            </div>
                        </div>
                        <div class="faq-row">
                            <div class="faq-question-container">
                                <h3>Where should I begin after landing here?</h3>
                                <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                            </div>
                            <div class="faq-answer">
                                <div class="faq-answer-content">
                                    <p>If you want to explore the platform, start with AI Hub or Workspace. If you already know what you need, the top navigation lets you jump directly into any module.</p>
                                </div>
                            </div>
                        </div>

                        <div class="signup-panel">
                            <h3>Ready to build with TrivoXa?</h3>                           
                            <div class="signup-actions">
                                <button class="hero-btn hero-btn-primary" onclick="DashboardPage.openSignup();">Create free account</button>
                                <button class="hero-btn hero-btn-secondary" onclick="DashboardPage.openSignin();">Sign in</button>
                            </div>
                        </div>
                    </section>

                    <footer class="home-footer home-reveal" style="animation-delay: 0.28s;">
                        <div class="footer-content">
                            <div class="footer-left">
                                <span class="footer-brand">TrivoXa</span>
                                <p class="footer-tagline">Go from zero to shipping</p>
                            </div>
                            <div class="footer-center">
                                <p class="footer-report-text">For issue reporting you can mail me at:</p>
                                <a href="mailto:developer.adityajha@gmail.com" class="footer-email-link">
                                    <i class="fa-solid fa-envelope"></i>
                                    <span>developer.adityajha@gmail.com</span>
                                </a>
                            </div>
                            <div class="footer-right">
                                <div class="footer-links-group">
                                    <h4>Connect with me</h4>
                                    <div class="footer-socials">
                                        <a href="https://www.linkedin.com/in/aditya-jha-8534a1305/" target="_blank" rel="noopener noreferrer" class="social-link linkedin">
                                            <i class="fa-brands fa-linkedin"></i>
                                            <span>LinkedIn</span>
                                        </a>
                                        <a href="https://github.com/adityajha-coder" target="_blank" rel="noopener noreferrer" class="social-link github">
                                            <i class="fa-brands fa-github"></i>
                                            <span>GitHub</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2026 TrivoXa. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>`;

    this.bindEvents(content);
  },

  bindEvents(content) {
    content.querySelectorAll("[data-page]").forEach((el) => {
      el.addEventListener("click", () => Router.navigate(el.dataset.page));
    });

    // FAQ Accordion toggles
    content.querySelectorAll(".faq-row").forEach((row) => {
      row.addEventListener("click", () => {
        const isActive = row.classList.contains("active");
        content.querySelectorAll(".faq-row").forEach((otherRow) => {
          otherRow.classList.remove("active");
        });
        if (!isActive) {
          row.classList.add("active");
        }
      });
    });

    if (!localStorage.getItem("vdt_first_time")) {
      setTimeout(() => {
        Toast.show(
          "Welcome to TrivoXa! Explore the developer tools below or use Ctrl+K to search.",
          "info",
          6000,
        );
        localStorage.setItem("vdt_first_time", "true");
      }, 1000);
    }
  },
  openSignin() {
    const signInButton = document.getElementById("btn-auth-in");
    if (signInButton) signInButton.click();
  },

  openSignup() {
    const signInButton = document.getElementById("btn-auth-in");
    if (signInButton) signInButton.click();

    const title = document.getElementById("auth-title");
    const toggleLink = document.getElementById("auth-toggle-link");
    if (title && toggleLink && title.textContent === "Sign In") {
      toggleLink.click();
    }
  },
};

window.DashboardPage = DashboardPage;
