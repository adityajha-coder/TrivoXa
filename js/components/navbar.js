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
                <button class="menu-toggle" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
                <button class="topnav-btn" id="btn-fullscreen" title="Fullscreen"><i class="fa-solid fa-expand"></i></button>
                
                <div class="topnav-divider" style="height: 20px; margin: 0 4px;"></div>
                
                <div id="auth-container" style="display:flex; align-items:center; gap:8px;">
                    <!-- Logged Out Sign In Button -->
                    <button class="topnav-btn" id="btn-auth-in" title="Sign in with Google" style="width:auto; padding:0 12px; font-size:0.8rem; font-weight:600; gap:8px;">
                        <i class="fa-brands fa-google" style="color:var(--text);"></i> Sign In
                    </button>

                    <!-- Logged In Profile & Sign Out Button -->
                    <div id="user-profile" style="display:none; align-items:center; gap:8px; background:rgba(255,255,255,0.02); border:1px solid var(--border); padding:3px 12px 3px 3px; border-radius:30px;">
                        <img id="user-avatar" src="" style="width:26px; height:26px; border-radius:50%; object-fit:cover;">
                        <span id="user-name" style="font-size:0.8rem; font-weight:500; color:var(--text);"></span>
                    </div>
                    <button class="topnav-btn" id="btn-auth-out" title="Sign Out" style="display:none; color:var(--error); border-color:var(--border);">
                        <i class="fa-solid fa-power-off"></i>
                    </button>
                </div>
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


        document.getElementById('menu-toggle').addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            document.getElementById('mobile-overlay').classList.toggle('active');
        });

        document.getElementById('btn-fullscreen').addEventListener('click', () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
        });

        // Authentication Logic
        const btnIn = document.getElementById('btn-auth-in');
        const btnOut = document.getElementById('btn-auth-out');
        const userProfile = document.getElementById('user-profile');
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');

        if (window.auth) {
            window.auth.onAuthStateChanged(user => {
                if (user) {
                    btnIn.style.display = 'none';
                    btnOut.style.display = 'flex';
                    userProfile.style.display = 'flex';
                    userAvatar.src = user.photoURL || 'favicon.svg';
                    userName.textContent = user.displayName ? user.displayName.split(' ')[0] : 'User';
                } else {
                    btnIn.style.display = 'flex';
                    btnOut.style.display = 'none';
                    userProfile.style.display = 'none';
                }
            });

            btnIn.addEventListener('click', () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                window.auth.signInWithPopup(provider)
                    .then((result) => {
                        Toast.show(`Welcome, ${result.user.displayName}!`, "success");
                    }).catch((error) => {
                        Toast.show(error.message, "error");
                    });
            });

            btnOut.addEventListener('click', () => {
                window.auth.signOut().then(() => {
                    Toast.show("Signed out successfully", "success");
                });
            });
        }

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

    renderTopbar(title) { }
};
