const Navbar = {
    navItems: [
        { id: 'dashboard', icon: 'fa-solid fa-grid-2', label: 'Dashboard' },
        { id: 'workspace', icon: 'fa-solid fa-laptop-code', label: 'Workspace' },
        { id: 'ask-ai', icon: 'fa-solid fa-robot', label: 'Ask AI' },
        { id: 'docs', icon: 'fa-solid fa-book-open-reader', label: 'Docs' },
        { id: 'tools-vault', icon: 'fa-solid fa-screwdriver-wrench', label: 'Tools' },
        { id: 'commands', icon: 'fa-solid fa-terminal', label: 'Commands' },
        { id: 'free-apis', icon: 'fa-solid fa-plug', label: 'APIs' },
        { id: 'package-scout', icon: 'fa-solid fa-box-open', label: 'Packages' },
        { id: 'code-git-explorer', icon: 'fa-brands fa-github', label: 'Explorer' }
    ],

    render() {
        const topnav = document.getElementById('topnav');
        const linksHtml = this.navItems.map(item =>
            `<button class="topnav-link" data-page="${item.id}" id="nav-${item.id}"><i class="${item.icon}"></i><span>${item.label}</span></button>`
        ).join('');

        topnav.innerHTML = `
            <div class="topnav-left">
                <div class="topnav-brand" data-page="dashboard">
                    <img src="favicon.svg" alt="Vertex" class="topnav-logo" />
                    <span class="topnav-name">Vertex</span>
                </div>
                <div class="topnav-divider"></div>
                <nav class="topnav-links">${linksHtml}</nav>
            </div>
            <div class="topnav-right">
                <button class="topnav-btn" id="btn-github-connect" title="Connect GitHub (Bypass API limits & Sync Gists)"><i class="fa-brands fa-github"></i></button>
                <button class="menu-toggle" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
                <button class="topnav-btn" id="btn-fullscreen" title="Fullscreen"><i class="fa-solid fa-expand"></i></button>
            </div>`;

        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = this.navItems.map(item =>
            `<button class="topnav-link" data-page="${item.id}"><i class="${item.icon}"></i><span>${item.label}</span></button>`
        ).join('');
        document.body.appendChild(mobileMenu);

        topnav.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });

        mobileMenu.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => {
                Router.navigate(el.dataset.page);
                this.closeMobile();
            });
        });

        document.querySelector('.topnav-brand').addEventListener('click', () => Router.navigate('dashboard'));

        const checkGitTokenBtn = () => {
            const btn = document.getElementById('btn-github-connect');
            if (localStorage.getItem('vertex_gh_token')) {
                btn.style.color = 'var(--success)';
                btn.title = "GitHub Connected! (Click to disconnect)";
            } else {
                btn.style.color = 'var(--text-muted)';
                btn.title = "Connect GitHub PAT (Bypass API limits)";
            }
        };
        checkGitTokenBtn();

        document.getElementById('btn-github-connect').addEventListener('click', () => {
            if (localStorage.getItem('vertex_gh_token')) {
                if (confirm('Disconnect GitHub account?')) {
                    localStorage.removeItem('vertex_gh_token');
                    Toast.show('GitHub Disconnected', 'info');
                    checkGitTokenBtn();
                }
            } else {
                const token = prompt('Enter a GitHub Personal Access Token (PAT) to bypass API limits and enable Gist syncing. We only save this locally in your browser:');
                if (token && token.trim().startsWith('ghp_')) {
                    localStorage.setItem('vertex_gh_token', token.trim());
                    Toast.show('GitHub Connected Successfully!', 'success');
                    checkGitTokenBtn();
                } else if (token) {
                    Toast.show('Invalid token format. Must start with ghp_', 'error');
                }
            }
        });

        document.getElementById('menu-toggle').addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            document.getElementById('mobile-overlay').classList.toggle('active');
        });

        document.getElementById('btn-fullscreen').addEventListener('click', () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
        });

        document.getElementById('mobile-overlay').addEventListener('click', () => this.closeMobile());
    },

    setActive(page) {
        document.querySelectorAll('.topnav-link').forEach(el => el.classList.remove('active'));
        document.querySelectorAll(`[data-page="${page}"]`).forEach(el => el.classList.add('active'));
    },

    closeMobile() {
        const mm = document.getElementById('mobile-menu');
        if (mm) mm.classList.remove('open');
        document.getElementById('mobile-overlay').classList.remove('active');
    },

    renderTopbar(title) {}
};
