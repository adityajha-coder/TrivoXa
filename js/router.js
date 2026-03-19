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
        'free-apis': () => FreeApisPage.render(),
        'ai-architect': () => AiArchitectPage.render()
    },

    _currentPage: null,
    _domCache: {},
    _cacheable: new Set(['workspace']),

    navigate(page) {
        const pageContent = document.getElementById('page-content');

        // Cache current page DOM if it's cacheable
        if (this._currentPage && this._cacheable.has(this._currentPage)) {
            const frag = document.createDocumentFragment();
            while (pageContent.firstChild) {
                frag.appendChild(pageContent.firstChild);
            }
            this._domCache[this._currentPage] = frag;
        }

        this.cleanupPage();
        location.hash = page;
        this._currentPage = page;

        // Restore from cache if available
        if (this._cacheable.has(page) && this._domCache[page]) {
            pageContent.innerHTML = '';
            pageContent.appendChild(this._domCache[page]);
            Navbar.renderTopbar(page === 'workspace' ? 'My Workspace' : page);
            Navbar.setActive(page);
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
        const page = location.hash.replace('#', '') || 'dashboard';
        this.navigate(page);
    },

    cleanupPage() {
        if (typeof CodeGitExplorerPage !== 'undefined' && CodeGitExplorerPage.cleanup) CodeGitExplorerPage.cleanup();
    }
};
