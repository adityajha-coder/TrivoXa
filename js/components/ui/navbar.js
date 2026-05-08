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
                    <img src="public/favicon.svg" alt="Vertex" class="topnav-logo" />
                    <span class="topnav-name">Vertex</span>
                </div>
                <div class="topnav-divider"></div>
                <nav class="topnav-links">${linksHtml}</nav>
            </div>
            <div class="topnav-right">
                <button class="menu-toggle" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
                
                <!-- Support Button -->
                <a href="https://rzp.io/rzp/ijBIiWa" target="_blank" class="topnav-btn" id="btn-support" title="Support this project" style="color: #facc15; text-decoration: none; display: flex; align-items: center; gap: 6px; padding: 0 12px; font-size: 0.8rem; font-weight: 600; width: auto; border: 1px solid rgba(250, 204, 21, 0.2); background: rgba(250, 204, 21, 0.05);">
                    <i class="fa-solid fa-mug-hot"></i> Support
                </a>

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

        // Custom Authentication Logic
        const btnIn = document.getElementById('btn-auth-in');
        const btnOut = document.getElementById('btn-auth-out');
        const userProfile = document.getElementById('user-profile');
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');

        const updateAuthUI = () => {
            const user = API.getUser();
            if (user) {
                btnIn.style.display = 'none';
                btnOut.style.display = 'flex';
                userProfile.style.display = 'flex';
                userAvatar.src = user.avatar || 'public/favicon.svg';
                userName.textContent = user.name ? user.name.split(' ')[0] : 'User';
            } else {
                btnIn.style.display = 'flex';
                btnOut.style.display = 'none';
                userProfile.style.display = 'none';
            }
        };

        // Initialize UI
        updateAuthUI();

        // Listen for auth changes from API
        window.addEventListener('auth_changed', updateAuthUI);

        // Build the Auth Modal
        const authModal = document.createElement('div');
        authModal.id = 'auth-modal';
        authModal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; align-items:center; justify-content:center; backdrop-filter:blur(5px);';
        authModal.innerHTML = `
            <div class="glass-card" style="width:100%; max-width:400px; position:relative; padding:30px;">
                <button id="auth-close" class="btn btn-ghost btn-xs" style="position:absolute; top:15px; right:15px;"><i class="fa-solid fa-xmark"></i></button>
                <div style="text-align:center; margin-bottom:20px;">
                    <img src="public/favicon.svg" style="width:50px; height:50px; margin-bottom:10px;">
                    <h2 id="auth-title" style="margin:0;">Sign In</h2>
                </div>
                
                <form id="auth-form" style="display:flex; flex-direction:column; gap:15px;">
                    <div id="auth-name-group" style="display:none;">
                        <input type="text" id="auth-name" class="input-field" placeholder="Full Name" style="width:100%;">
                    </div>
                    <div>
                        <input type="email" id="auth-email" class="input-field" placeholder="Email Address" required style="width:100%;">
                    </div>
                    <div>
                        <input type="password" id="auth-password" class="input-field" placeholder="Password" required style="width:100%;">
                    </div>
                    <div id="auth-confirm-group" style="display:none;">
                        <input type="password" id="auth-confirm-password" class="input-field" placeholder="Confirm Password" style="width:100%;">
                        <p id="auth-pw-mismatch" style="display:none; color:var(--error); font-size:0.75rem; margin-top:5px;"><i class="fa-solid fa-circle-exclamation" style="margin-right:4px;"></i>Passwords do not match</p>
                    </div>
                    <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width:100%; justify-content:center;">Sign In</button>
                </form>
                
                <div style="text-align:center; margin-top:20px; font-size:0.9rem;">
                    <span id="auth-toggle-text" style="color:var(--text-muted);">Don't have an account?</span>
                    <a href="#" id="auth-toggle-link" style="color:var(--primary); font-weight:600; margin-left:5px;">Register</a>
                </div>
            </div>
        `;
        document.body.appendChild(authModal);

        let isLogin = true;

        document.getElementById('auth-toggle-link').addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;
            document.getElementById('auth-title').textContent = isLogin ? 'Sign In' : 'Create Account';
            document.getElementById('auth-submit-btn').textContent = isLogin ? 'Sign In' : 'Register';
            document.getElementById('auth-toggle-text').textContent = isLogin ? "Don't have an account?" : "Already have an account?";
            document.getElementById('auth-toggle-link').textContent = isLogin ? 'Register' : 'Sign In';
            document.getElementById('auth-name-group').style.display = isLogin ? 'none' : 'block';
            document.getElementById('auth-confirm-group').style.display = isLogin ? 'none' : 'block';
            if (!isLogin) {
                document.getElementById('auth-name').required = true;
                document.getElementById('auth-confirm-password').required = true;
            } else {
                document.getElementById('auth-name').required = false;
                document.getElementById('auth-confirm-password').required = false;
                document.getElementById('auth-confirm-password').value = '';
                document.getElementById('auth-pw-mismatch').style.display = 'none';
            }
        });

        // Real-time confirm password validation
        document.getElementById('auth-confirm-password').addEventListener('input', () => {
            const pw = document.getElementById('auth-password').value;
            const cpw = document.getElementById('auth-confirm-password').value;
            const mismatch = document.getElementById('auth-pw-mismatch');
            if (cpw && pw !== cpw) {
                mismatch.style.display = 'block';
            } else {
                mismatch.style.display = 'none';
            }
        });

        document.getElementById('auth-close').addEventListener('click', () => {
            authModal.style.display = 'none';
        });

        btnIn.addEventListener('click', () => {
            authModal.style.display = 'flex';
        });

        document.getElementById('auth-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('auth-submit-btn');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Please wait...';
            btn.disabled = true;

            const email = document.getElementById('auth-email').value;
            const pass = document.getElementById('auth-password').value;
            const name = document.getElementById('auth-name').value;

            try {
                if (isLogin) {
                    await API.login(email, pass);
                    Toast.show('Welcome back!', 'success');
                } else {
                    const confirmPass = document.getElementById('auth-confirm-password').value;
                    if (pass !== confirmPass) {
                        Toast.show('Passwords do not match', 'error');
                        btn.innerHTML = 'Register';
                        btn.disabled = false;
                        return;
                    }
                    await API.register(name, email, pass);
                    Toast.show('Account created successfully!', 'success');
                }
                authModal.style.display = 'none';
                document.getElementById('auth-form').reset();
            } catch (err) {
                Toast.show(err.message, 'error');
            } finally {
                btn.innerHTML = isLogin ? 'Sign In' : 'Register';
                btn.disabled = false;
            }
        });

        btnOut.addEventListener('click', () => {
            API.logout();
            Toast.show("Signed out successfully", "success");
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

    renderTopbar(title) { }
};
