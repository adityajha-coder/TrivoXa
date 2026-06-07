const Router = {
    routes: {
        'dashboard': () => DashboardPage.render(),
        'ask-ai': () => AskAiPage.render(),
        'commands': () => CommandsPage.render(),
        'workspace': () => WorkspacePage.render(),
        'tools-vault': () => ToolsVaultPage.render(),
        'docs': () => DocsPage.render(),
        'code-git-explorer': () => CodeGitExplorerPage.render(),
        'package-scout': () => PackageScoutPage.render(),
        'free-apis': () => FreeApisPage.render()
    },

    _currentPage: null,
    _domCache: {},
    _cacheable: new Set(['workspace', 'code-git-explorer']),

    navigate(page) {
        if (this._currentPage === page) return;

        const pageContent = document.getElementById('page-content');

        if (this._currentPage && this._cacheable.has(this._currentPage)) {
            const frag = document.createDocumentFragment();
            while (pageContent.firstChild) {
                frag.appendChild(pageContent.firstChild);
            }
            this._domCache[this._currentPage] = frag;
        }

        this.cleanupPage();
        this._currentPage = page;
        location.hash = page;

        // restore from cache
        if (this._cacheable.has(page) && this._domCache[page]) {
            pageContent.innerHTML = '';
            pageContent.appendChild(this._domCache[page]);
            const pageLabel = { 'workspace': 'My Workspace', 'code-git-explorer': 'Code & Git Explorer' };
            Navbar.renderTopbar(pageLabel[page] || page);
            Navbar.setActive(page);
            // reattach 3D animation
            if (page === 'code-git-explorer' && typeof CodeGitExplorerPage !== 'undefined') {
                CodeGitExplorerPage._reattach3D();
            }
            return;
        }

        if (this.routes[page]) {
            this.routes[page]();
            Navbar.setActive(page);
        } else {
            this.routes['dashboard']();
            Navbar.setActive('dashboard');
        }
    },

    init() {
        window.addEventListener('hashchange', () => {
            const page = location.hash.replace('#', '') || 'dashboard';
            this.navigate(page);
        });
        
        window.addEventListener('auth_changed', () => {
            this._domCache = {};
        });

        const page = location.hash.replace('#', '') || 'dashboard';
        this.navigate(page);
    },

    cleanupPage() {
        if (this._currentPage !== 'code-git-explorer') {
            if (typeof CodeGitExplorerPage !== 'undefined' && CodeGitExplorerPage.cleanup) CodeGitExplorerPage.cleanup();
        } else if (typeof CodeGitExplorerPage !== 'undefined') {
            CodeGitExplorerPage._pause3D();
        }
    }
};
