const Navbar = {
    navItems: [
        { id: 'dashboard', icon: 'fa-solid fa-grid-2', label: 'Dashboard', section: 'overview' },
        { id: 'code-generator', icon: 'fa-solid fa-wand-magic-sparkles', label: 'Code Generator', section: 'tools' },
        { id: 'code-git-explorer', icon: 'fa-solid fa-cube', label: 'Code & Git Explorer', section: 'tools' },
        { id: 'package-scout', icon: 'fa-solid fa-box-open', label: 'Package Scout', section: 'tools' },
        { id: 'free-apis', icon: 'fa-solid fa-plug', label: 'Free APIs', section: 'resources' },
        { id: 'github-hub', icon: 'fa-brands fa-github', label: 'GitHub Hub', section: 'resources' }
    ],

    render() {
        const sidebar = document.getElementById('sidebar');
        const sections = {};
        this.navItems.forEach(item => {
            if (!sections[item.section]) sections[item.section] = [];
            sections[item.section].push(item);
        });
        const sectionLabels = { overview: 'Overview', tools: 'Developer Tools', resources: 'Resources' };

        let navHtml = '';
        Object.entries(sections).forEach(([key, items]) => {
            navHtml += `<div class="nav-section-label">${sectionLabels[key]}</div>`;
            items.forEach(item => {
                navHtml += `<div class="nav-item" data-page="${item.id}" id="nav-${item.id}"><i class="${item.icon}"></i><span>${item.label}</span></div>`;
            });
        });

        sidebar.innerHTML = `
            <div class="sidebar-header">
                <div class="sidebar-logo"><i class="fa-solid fa-bolt"></i></div>
                <div class="sidebar-brand">
                    <span class="sidebar-brand-name">DevNexus</span>
                    <span class="sidebar-brand-tag">Developer Toolkit</span>
                </div>
            </div>
            <div class="sidebar-nav">${navHtml}</div>
            <div class="sidebar-footer">
                <span class="text-xs text-muted">v1.0.0</span>
            </div>`;

        sidebar.querySelectorAll('.nav-item[data-page]').forEach(item => {
            item.addEventListener('click', () => {
                Router.navigate(item.dataset.page);
                this.closeMobile();
            });
        });
    },

    setActive(page) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const navItem = document.getElementById(`nav-${page}`);
        if (navItem) navItem.classList.add('active');
    },

    closeMobile() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('mobile-overlay').classList.remove('active');
    },

    renderTopbar(title) {
        const topbar = document.getElementById('topbar');
        topbar.innerHTML = `
            <div class="topbar-left">
                <button class="menu-toggle" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
                <div class="topbar-breadcrumb"><i class="fa-solid fa-bolt" style="color:var(--primary)"></i><span>/</span><span>${title}</span></div>
            </div>
            <div class="topbar-right">
                <button class="topbar-btn" id="btn-fullscreen" title="Fullscreen"><i class="fa-solid fa-expand"></i></button>
            </div>`;
        document.getElementById('menu-toggle').addEventListener('click', () => { document.getElementById('sidebar').classList.toggle('open'); document.getElementById('mobile-overlay').classList.toggle('active'); });
        document.getElementById('btn-fullscreen').addEventListener('click', () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); });
    }
};
