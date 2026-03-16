const Router = {
    routes: {
        'dashboard': () => DashboardPage.render(),
        'ask-ai': () => AskAiPage.render(),
        'commands': () => CommandsPage.render(),
        'code-generator': () => CodeGeneratorPage.render(),
        'code-git-explorer': () => CodeGitExplorerPage.render(),
        'package-scout': () => PackageScoutPage.render(),
        'free-apis': () => FreeApisPage.render(),
        'github-hub': () => GitHubHubPage.render()
    },

    navigate(page) {
        this.cleanupPage();
        location.hash = page;
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
        if (typeof GitHubHubPage !== 'undefined' && GitHubHubPage.cleanupCmd) GitHubHubPage.cleanupCmd();
    }
};
