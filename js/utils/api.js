/* API Base Config & Groq Methods — merges ApiAuth + ApiGithub */
const API = {
    GITHUB_BASE: 'https://api.github.com',
    NPM_SEARCH: 'https://registry.npmjs.org/-/v1/search',
    NPM_PACKAGE: 'https://registry.npmjs.org',
    GROQ_BASE: 'https://api.groq.com/openai/v1',
    API_BASE: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
        ? 'http://localhost:3001'
        : '',
    USE_PROXY: true,

    getGroqApiKey() {
        return localStorage.getItem('trivoxa_groq_key') || '';
    },

    setGroqApiKey(key) {
        localStorage.setItem('trivoxa_groq_key', key);
    },

    async fetchGroq(endpoint, body, model = 'groq/compound-mini') {
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
            const headers = { 'Content-Type': 'application/json' };
            const token = this.getAuthToken();
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                if (res.status === 401) {
                    ApiAuth.logout();
                    ApiAuth.requireAuth();
                    throw new Error("Session expired. Please log in again.");
                }

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

    async callGroqChat(messages, model = 'groq/compound-mini', temperature = 0.7) {
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
    }
};

// Merge auth and GitHub methods into the unified API object
Object.assign(API, ApiAuth, ApiGithub);
