const API = {
    GITHUB_BASE: 'https://api.github.com',
    NPM_SEARCH: 'https://registry.npmjs.org/-/v1/search',
    NPM_PACKAGE: 'https://registry.npmjs.org',
    GROQ_BASE: 'https://api.groq.com/openai/v1',
    API_BASE: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3001' 
        : '',
    USE_PROXY: true,

    getGroqApiKey() {
        return localStorage.getItem('vertex_groq_key') || '';
    },

    setGroqApiKey(key) {
        localStorage.setItem('vertex_groq_key', key);
    },

    // MEN Stack Authentication
    getAuthToken() {
        return localStorage.getItem('vertex_auth_token');
    },

    setAuthToken(token) {
        if (token) localStorage.setItem('vertex_auth_token', token);
        else localStorage.removeItem('vertex_auth_token');
    },

    getUser() {
        try {
            return JSON.parse(localStorage.getItem('vertex_user'));
        } catch { return null; }
    },

    setUser(user) {
        if (user) localStorage.setItem('vertex_user', JSON.stringify(user));
        else localStorage.removeItem('vertex_user');
    },

    logout() {
        this.setAuthToken(null);
        this.setUser(null);
        window.dispatchEvent(new Event('auth_changed'));
    },

    // Returns true if logged in, otherwise opens the login modal and returns false
    requireAuth() {
        if (this.getAuthToken()) return true;
        const modal = document.getElementById('auth-modal');
        if (modal) modal.style.display = 'flex';
        Toast.show('Please sign in to use this feature', 'warning');
        return false;
    },

    async register(name, email, password) {
        const res = await fetch(`${this.API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const text = await res.text();
        let data;
        try { data = text ? JSON.parse(text) : {}; } 
        catch (e) { throw new Error('Server returned an invalid response (might be offline).'); }

        if (!res.ok) throw new Error(data.error || 'Registration failed');
        this.setAuthToken(data.token);
        this.setUser(data.user);
        window.dispatchEvent(new Event('auth_changed'));
        return data;
    },

    async login(email, password) {
        const res = await fetch(`${this.API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const text = await res.text();
        let data;
        try { data = text ? JSON.parse(text) : {}; } 
        catch (e) { throw new Error('Server returned an invalid response (might be offline).'); }

        if (!res.ok) throw new Error(data.error || 'Login failed');
        this.setAuthToken(data.token);
        this.setUser(data.user);
        window.dispatchEvent(new Event('auth_changed'));
        return data;
    },

    async fetchAPI(endpoint, method = 'GET', body = null) {
        const token = this.getAuthToken();
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const options = { method, headers };
        if (body) options.body = JSON.stringify(body);

        const res = await fetch(`${this.API_BASE}${endpoint}`, options);
        
        const text = await res.text();
        let data;
        try { data = text ? JSON.parse(text) : {}; } 
        catch (e) { throw new Error('Server returned an invalid response (might be offline).'); }

        if (!res.ok) throw new Error(data.error || 'API Request failed');
        return data;
    },

    async fetchGroq(endpoint, body, model = 'llama-3.1-8b-instant') {
        // Proxy handles the API key server-side
        if (this.USE_PROXY) {
            return this.fetchGroqViaProxy(endpoint, body);
        }

        const apiKey = this.getGroqApiKey();
        if (!apiKey || !apiKey.startsWith('gsk_')) {
            throw new Error('Invalid Groq API key. Key should start with "gsk_". Check your API key in settings.');
        }
        return this.fetchGroqDirect(endpoint, body, apiKey);
    },

    async fetchGroqViaProxy(endpoint, body) {
        const url = `${this.API_BASE}/api/groq${endpoint}`;
        
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const errorText = await res.text();
                let errorMsg = `Proxy error: ${res.status} ${res.statusText}`;
                
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMsg = errorJson.error || errorJson.message || errorMsg;
                } catch {
                    errorMsg += ` - ${errorText}`;
                }
                
                console.error('Groq Proxy Error:', { status: res.status, error: errorText });
                throw new Error(errorMsg);
            }

            return res.json();
        } catch (err) {
            if (err instanceof TypeError) {
                console.error('Proxy Connection Error:', err);
                throw new Error('Cannot reach API server on localhost:3001. Make sure it\'s running: npm run proxy');
            }
            throw err;
        }
    },

    async fetchGroqDirect(endpoint, body, apiKey) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        try {
            const res = await fetch(`${this.GROQ_BASE}${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const errorText = await res.text();
                let errorMsg = `Groq API error: ${res.status} ${res.statusText}`;
                
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMsg += ` - ${errorJson.error?.message || errorText}`;
                } catch {
                    errorMsg += ` - ${errorText}`;
                }
                
                console.error('Groq API Error:', { status: res.status, error: errorText });
                throw new Error(errorMsg);
            }

            return res.json();
        } catch (err) {
            if (err instanceof TypeError) {
                console.error('Network/CORS Error:', err);
                throw new Error('Network error. This might be a CORS issue. Try running the server: npm run proxy');
            }
            throw err;
        }
    },

    async callGroqChat(messages, model = 'llama-3.1-8b-instant', temperature = 0.7) {
        try {
            return await this.fetchGroq('/chat', {
                model: model,
                messages: messages,
                temperature: temperature,
                max_tokens: 2048
            });
        } catch (error) {
            console.error('[Groq Chat Error]', error.message);
            throw error;
        }
    },

    async fetchGitHub(endpoint, customMethod = 'GET', body = null) {
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        const options = { method: customMethod, headers };
        if (body) {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        const res = await fetch(`${this.GITHUB_BASE}${endpoint}`, options);
        
        if (!res.ok) {
            if (res.status === 401) throw new Error('GitHub PAT is invalid. Please disconnect and reconnect via the Navbar.');
            if (res.status === 403) throw new Error('GitHub API rate limit exceeded. Connect your GitHub account via the top right icon to bypass restrictions.');
            if (res.status === 404) throw new Error('Resource not found. Ensure repository exists or check permissions.');
            throw new Error(`GitHub API error: ${res.status}`);
        }
        
        // GitHub API can return empty responses for some POSTs
        const text = await res.text();
        return text ? JSON.parse(text) : {};
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
