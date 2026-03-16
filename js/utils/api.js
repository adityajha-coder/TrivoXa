const API = {
    GITHUB_BASE: 'https://api.github.com',
    NPM_SEARCH: 'https://registry.npmjs.org/-/v1/search',
    NPM_PACKAGE: 'https://registry.npmjs.org',

    async fetchGitHub(endpoint) {
        const res = await fetch(`${this.GITHUB_BASE}${endpoint}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!res.ok) {
            if (res.status === 403) throw new Error('GitHub API rate limit exceeded. Try again later.');
            if (res.status === 404) throw new Error('Repository not found. Check the URL and try again.');
            throw new Error(`GitHub API error: ${res.status}`);
        }
        return res.json();
    },

    async getRepoInfo(owner, repo) {
        return this.fetchGitHub(`/repos/${owner}/${repo}`);
    },

    async getRepoContents(owner, repo, path = '') {
        return this.fetchGitHub(`/repos/${owner}/${repo}/contents/${path}`);
    },

    async getRepoTree(owner, repo, branch = 'main') {
        try {
            return await this.fetchGitHub(`/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
        } catch (e) {
            return this.fetchGitHub(`/repos/${owner}/${repo}/git/trees/master?recursive=1`);
        }
    },

    async getRepoBranches(owner, repo) {
        return this.fetchGitHub(`/repos/${owner}/${repo}/branches?per_page=30`);
    },

    async getRepoCommits(owner, repo, branch = '', perPage = 30) {
        const sha = branch ? `&sha=${branch}` : '';
        return this.fetchGitHub(`/repos/${owner}/${repo}/commits?per_page=${perPage}${sha}`);
    },

    async getUserInfo(username) {
        return this.fetchGitHub(`/users/${username}`);
    },

    async getUserRepos(username, sort = 'updated', perPage = 30) {
        return this.fetchGitHub(`/users/${username}/repos?sort=${sort}&per_page=${perPage}`);
    },

    async getUserEvents(username, perPage = 30) {
        return this.fetchGitHub(`/users/${username}/events/public?per_page=${perPage}`);
    },

    async searchNpmPackages(query, size = 20) {
        const res = await fetch(`${this.NPM_SEARCH}?text=${encodeURIComponent(query)}&size=${size}`);
        if (!res.ok) throw new Error('npm search failed');
        return res.json();
    },

    async getNpmPackage(name) {
        const res = await fetch(`${this.NPM_PACKAGE}/${encodeURIComponent(name)}`);
        if (!res.ok) throw new Error('Package not found');
        return res.json();
    },

    parseGitHubUrl(url) {
        url = url.trim().replace(/\/$/, '');
        const patterns = [
            /github\.com\/([^\/]+)\/([^\/\?#]+)/,
            /^([^\/]+)\/([^\/]+)$/
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return { owner: match[1], repo: match[2].replace('.git', '') };
        }
        return null;
    }
};
