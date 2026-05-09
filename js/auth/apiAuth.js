/* API Authentication & Core Fetch Methods */
const ApiAuth = {
    // MEN Stack Authentication
    getAuthToken() {
        return localStorage.getItem('trivoxa_auth_token');
    },

    setAuthToken(token) {
        if (token) localStorage.setItem('trivoxa_auth_token', token);
        else localStorage.removeItem('trivoxa_auth_token');
    },

    getUser() {
        try {
            return JSON.parse(localStorage.getItem('trivoxa_user'));
        } catch { return null; }
    },

    setUser(user) {
        if (user) localStorage.setItem('trivoxa_user', JSON.stringify(user));
        else localStorage.removeItem('trivoxa_user');
    },

    async logout() {
        this.setAuthToken(null);
        this.setUser(null);
        localStorage.removeItem('ai_history');

        try {
            await new Promise((resolve) => {
                const req = indexedDB.open('TrivoXaDB', 1);
                req.onsuccess = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains('snippets')) {
                        return resolve();
                    }
                    const tx = db.transaction('snippets', 'readwrite');
                    tx.objectStore('snippets').clear();
                    tx.oncomplete = () => resolve();
                    tx.onerror = () => resolve();
                };
                req.onerror = () => resolve();
            });
        } catch (e) {
            console.error('Failed to clear local workspace cache on logout', e);
        }

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
    }
};
