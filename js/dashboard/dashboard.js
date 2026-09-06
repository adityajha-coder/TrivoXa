const DashboardPage = {
  render() {
    Navbar.renderTopbar("Home");
    const content = document.getElementById("page-content");

    content.innerHTML = `
            <div class="home-page">
                <div class="home-shell">
                    ${HeroSection.render()}

                    <!-- ===== FOOTER ===== -->
                    <footer class="home-footer home-reveal" style="animation-delay: 0.15s;">
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
                                    <h4>Platform</h4>
                                    <div class="footer-platform-links">
                                        <button class="footer-page-btn" data-page="workspace">Workspace</button>
                                        <button class="footer-page-btn" data-page="ask-ai">Ask AI</button>
                                        <button class="footer-page-btn" data-page="code-git-explorer">3D Explorer</button>
                                        <button class="footer-page-btn" data-page="commands">Commands</button>
                                    </div>
                                </div>
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

    if (!localStorage.getItem("vdt_first_time")) {
      setTimeout(() => {
        Toast.show(
          "Welcome to TrivoXa! Launch the workspace or explore AI Hub to get started.",
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
};

window.DashboardPage = DashboardPage;