const Navbar = {
  navItems: [
    { id: "dashboard", icon: "fa-solid fa-house", label: "Home" },
    { id: "workspace", icon: "fa-solid fa-laptop-code", label: "Workspace" },
    { id: "ask-ai", icon: "fa-solid fa-robot", label: "Ask AI" },
    { id: "docs", icon: "fa-solid fa-book-open-reader", label: "Docs" },
    {
      id: "tools-vault",
      icon: "fa-solid fa-screwdriver-wrench",
      label: "Tools",
    },
    { id: "commands", icon: "fa-solid fa-terminal", label: "Commands" },
    { id: "free-apis", icon: "fa-solid fa-plug", label: "APIs" },
    { id: "package-scout", icon: "fa-solid fa-box-open", label: "Packages" },
    { id: "code-git-explorer", icon: "fa-brands fa-github", label: "Explorer" },
  ],

  render() {
    const topnav = document.getElementById("topnav");
    const linksHtml = this.navItems
      .map(
        (item) =>
          `<button class="topnav-link" data-page="${item.id}" id="nav-${item.id}"><i class="${item.icon}"></i><span>${item.label}</span></button>`,
      )
      .join("");

    topnav.innerHTML = `
            <div class="topnav-left">
                <div class="topnav-brand" data-page="dashboard">
                    <img src="public/favicon.svg" alt="TrivoXa" class="topnav-logo" />
                    <span class="topnav-name">TrivoXa</span>
                </div>
                <div class="topnav-divider hide-mobile"></div>
                <nav class="topnav-links">${linksHtml}</nav>
            </div>
            <div class="topnav-right">
                <!-- Support Button -->
                <a href="https://rzp.io/rzp/ijBIiWa" target="_blank" class="topnav-btn" id="btn-support" title="Support this project" style="color: #facc15; text-decoration: none; display: flex; align-items: center; gap: 6px; padding: 0 12px; font-size: 0.8rem; font-weight: 600; width: auto; border: 1px solid rgba(250, 204, 21, 0.2); background: rgba(250, 204, 21, 0.05);">
                    <i class="fa-solid fa-mug-hot"></i> <span class="hide-mobile">Support</span>
                </a>

                <button class="topnav-btn" id="btn-fullscreen" title="Fullscreen"><i class="fa-solid fa-expand"></i></button>
                
                <div class="topnav-divider hide-mobile" style="height: 20px; margin: 0 4px;"></div>
                
                <div id="auth-container" style="display:flex; align-items:center; gap:8px;">
                    <!-- Logged Out Sign In Button -->
                    <button class="topnav-btn" id="btn-auth-in" title="Sign In" style="width:auto; padding:0 12px; font-size:0.8rem; font-weight:600; gap:8px;">
                        <i class="fa-solid fa-user" style="color:var(--text);"></i> <span class="hide-mobile">Sign In</span>
                    </button>

                    <!-- Logged In Profile & Sign Out Button -->
                    <div id="user-profile" style="display:none; align-items:center; gap:8px; background:rgba(255,255,255,0.02); border:1px solid var(--border); padding:3px; border-radius:30px;">
                        <img id="user-avatar" src="" style="width:26px; height:26px; border-radius:50%; object-fit:cover;">
                        <span id="user-name" class="hide-mobile" style="font-size:0.8rem; font-weight:500; color:var(--text); margin-right:8px;"></span>
                    </div>
                    <button class="topnav-btn" id="btn-auth-out" title="Sign Out" style="display:none; color:var(--error); border-color:var(--border);">
                        <i class="fa-solid fa-power-off"></i>
                    </button>
                </div>
                
                <button class="menu-toggle" id="menu-toggle" style="margin-left: 4px;"><i class="fa-solid fa-bars"></i></button>
            </div>`;

    // Prevent duplicates on re-render
    const existingMenu = document.getElementById("mobile-menu");
    if (existingMenu) existingMenu.remove();

    const mobileMenu = document.createElement("div");
    mobileMenu.id = "mobile-menu";
    mobileMenu.className = "mobile-menu";
    mobileMenu.innerHTML = `
      <div class="mobile-menu-header">
        <button class="mobile-menu-close" id="mobile-menu-close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="mobile-menu-links">
        ${this.navItems
          .map(
            (item) =>
              `<button class="topnav-link" data-page="${item.id}"><i class="${item.icon}"></i><span>${item.label}</span></button>`,
          )
          .join("")}
      </div>
    `;
    document.body.appendChild(mobileMenu);

    const closeBtn = mobileMenu.querySelector("#mobile-menu-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeMobile());
    }

    topnav.querySelectorAll("[data-page]").forEach((el) => {
      el.addEventListener("click", () => Router.navigate(el.dataset.page));
    });

    mobileMenu.querySelectorAll("[data-page]").forEach((el) => {
      el.addEventListener("click", () => {
        Router.navigate(el.dataset.page);
        this.closeMobile();
      });
    });

    document
      .querySelector(".topnav-brand")
      .addEventListener("click", () => Router.navigate("dashboard"));

    document.getElementById("menu-toggle").addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      document.getElementById("mobile-overlay").classList.toggle("active");
    });

    document.getElementById("btn-fullscreen").addEventListener("click", () => {
      if (!document.fullscreenElement)
        document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    });

    // Initialize auth modal (extracted to authModal.js)
    AuthModal.init();

    document
      .getElementById("mobile-overlay")
      .addEventListener("click", () => this.closeMobile());
  },

  setActive(page) {
    document
      .querySelectorAll(".topnav-link")
      .forEach((el) => el.classList.remove("active"));
    document
      .querySelectorAll(`[data-page="${page}"]`)
      .forEach((el) => el.classList.add("active"));
  },

  closeMobile() {
    const mm = document.getElementById("mobile-menu");
    if (mm) mm.classList.remove("open");
    document.getElementById("mobile-overlay").classList.remove("active");
  },

  renderTopbar(title) {},
};
