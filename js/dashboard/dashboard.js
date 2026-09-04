const DashboardPage = {
  render() {
    Navbar.renderTopbar("Home");
    const content = document.getElementById("page-content");

    content.innerHTML = `
            <div class="home-page">
                <div class="home-shell">
                    ${HeroSection.render()}
                    ${OverviewSection.render()}

                    <!-- ===== SECTION 02: WORKFLOW PIPELINE ===== -->
                    <section class="home-section home-reveal" style="animation-delay: 0.12s;">
                        <div class="section-label">
                            <span class="label-mono">02 / Workflow</span>
                            <span class="hero-brand-tag section-tag">Momentum</span>
                        </div>
                        <div class="section-content">
                            <h2>The natural rhythm of <span class="gradient-headline">modern engineering.</span></h2>
                            <p class="section-lead">
                                TrivoXa aligns directly with how senior engineers think, build, and ship. Each phase transitions seamlessly into the next.
                            </p>

                            <div class="workflow-circle-container">
                                <!-- Stage 1: Idea -->
                                <div class="workflow-circle-node" data-page="ask-ai">
                                    <span class="wf-circle-step">01</span>
                                    <div class="wf-circle-icon">
                                        <i class="fa-solid fa-lightbulb"></i>
                                    </div>
                                    <span class="wf-circle-label">Idea</span>
                                </div>

                                <!-- Connector 1 -> 2 -->
                                <div class="workflow-arrow-connector">
                                    <div class="workflow-arrow-line"></div>
                                    <div class="workflow-arrow-node">
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div class="workflow-arrow-line"></div>
                                </div>

                                <!-- Stage 2: Prototype -->
                                <div class="workflow-circle-node" data-page="workspace">
                                    <span class="wf-circle-step">02</span>
                                    <div class="wf-circle-icon">
                                        <i class="fa-solid fa-code"></i>
                                    </div>
                                    <span class="wf-circle-label">Prototype</span>
                                </div>

                                <!-- Connector 2 -> 3 -->
                                <div class="workflow-arrow-connector">
                                    <div class="workflow-arrow-line"></div>
                                    <div class="workflow-arrow-node">
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div class="workflow-arrow-line"></div>
                                </div>

                                <!-- Stage 3: Verify -->
                                <div class="workflow-circle-node" data-page="docs">
                                    <span class="wf-circle-step">03</span>
                                    <div class="wf-circle-icon">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </div>
                                    <span class="wf-circle-label">Verify</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- ===== SECTION 03: FAQ ===== -->
                    <section class="faq-section home-reveal" style="animation-delay: 0.18s;">
                        <div class="faq-header">
                            <div class="section-label">
                                <span class="label-mono">03 / FAQ</span>
                                <span class="hero-brand-tag section-tag">Clear Answers</span>
                            </div>
                            <h2>Frequently asked <span class="gradient-headline">questions.</span></h2>
                        </div>

                        <div class="faq-container">
                            <div class="faq-row">
                                <div class="faq-question-container">
                                    <h3>Do I need to sign up to use the platform?</h3>
                                    <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                                </div>
                                <div class="faq-answer">
                                    <div class="faq-answer-content">
                                        <p>No. You can explore technical documentation, browse command references, examine public APIs, and experiment with developer utilities immediately without an account. An account enables persistent cloud sync and customized features.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="faq-row">
                                <div class="faq-question-container">
                                    <h3>What makes TrivoXa different from other developer tools?</h3>
                                    <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                                </div>
                                <div class="faq-answer">
                                    <div class="faq-answer-content">
                                        <p>Instead of forcing you to bookmark dozens of disconnected websites, TrivoXa unifies the core daily engineering toolset—AI assistance, snippet management, 3D repo exploration, CLI cheats, and API catalogs—into one cohesive, fast, and unified developer interface.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="faq-row">
                                <div class="faq-question-container">
                                    <h3>How does the multi-model AI system work?</h3>
                                    <i class="fa-solid fa-chevron-down faq-toggle-icon"></i>
                                </div>
                                <div class="faq-answer">
                                    <div class="faq-answer-content">
                                        <p>TrivoXa features an intelligent backend provider router with automatic failover. Your requests are routed to your chosen model (Groq, Google Gemini 3.6, or OpenRouter). If a provider experiences high latency or rate limits, the system automatically routes to the next healthy provider without failing your request.</p>
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
                                        <p>You can use the top navigation to immediately jump into the AI Hub to ask questions or architect a project, explore a GitHub repository with 3D Explorer, or lookup CLI syntax in Commands.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- High-Impact Bottom CTA Banner matching Hero Style -->
                        <div class="signup-panel">
                            <div class="signup-banner">
                                <div class="signup-glow-orb"></div>
                                <div class="signup-text">
                                    <div class="hero-brand-tag" style="margin-bottom: 8px;">Ship Faster</div>
                                    <h3>Supercharge your development workflow <span class="gradient-headline">today.</span></h3>
                                    <p>Join developers building with TrivoXa's unified browser-native command center.</p>
                                </div>
                                <div class="signup-actions">
                                    <div class="hero-launch-bar cta-launch-bar" onclick="DashboardPage.openSignup();">
                                        <div class="launch-icon">
                                            <i class="fa-solid fa-user-plus"></i>
                                        </div>
                                        <span class="launch-label">Create free account</span>
                                        <button class="launch-action-btn" type="button" aria-label="Create account">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- ===== FOOTER ===== -->
                    <footer class="home-footer home-reveal" style="animation-delay: 0.28s;">
                        <div class="footer-content">
                            <div class="footer-left">
                                <span class="footer-brand">TrivoXa</span>
                                <p class="footer-tagline">Go from zero to shipping <span class="hero-brand-tag" style="font-size: 1.15rem; margin-left: 4px; display: inline-block;">with confidence</span></p>
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
    if (window.OverviewSection && OverviewSection.bindEvents) {
      OverviewSection.bindEvents(content);
    }

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
