/* Workspace IndexedDB & Data Layer */
const WorkspaceDB = {
    snippets: [],
    db: null,
    _dbReady: null,

    initDB() {
        if (this._dbReady) return this._dbReady;
        this._dbReady = new Promise((resolve, reject) => {
            const request = indexedDB.open('TrivoXaDB', 1);
            request.onerror = e => reject(e);
            request.onsuccess = e => {
                this.db = e.target.result;
                resolve();
            };
            request.onupgradeneeded = e => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('snippets')) {
                    db.createObjectStore('snippets', { keyPath: 'id' });
                }
            };
        });
        return this._dbReady;
    },

    async loadSnippets() {
        if (!API.getAuthToken()) {
            this.snippets = [];
            return;
        }

        await this.initDB();

        // Sync from MongoDB if logged in
        if (API.getAuthToken()) {
            try {
                const cloudSnips = await API.fetchAPI('/api/snippets');
                const transaction = this.db.transaction(['snippets'], 'readwrite');
                const store = transaction.objectStore('snippets');
                store.clear();
                cloudSnips.forEach(s => {
                    store.put({ id: s._id, title: s.title, code: s.code, itemType: s.itemType || 'text', lang: s.lang, folder: s.folder || 'Uncategorized', tags: s.tags || [], isPinned: s.isPinned || false });
                });
            } catch (e) {
                console.error("Failed to sync snippets from cloud:", e);
            }
        }

        return new Promise(resolve => {
            const transaction = this.db.transaction(['snippets'], 'readonly');
            const store = transaction.objectStore('snippets');
            const request = store.getAll();
            request.onsuccess = e => {
                this.snippets = e.target.result || [];
                resolve();
            };
        });
    },

    async saveToIndexedDB(snippet) {
        await this.initDB();
        return new Promise(resolve => {
            const transaction = this.db.transaction(['snippets'], 'readwrite');
            const store = transaction.objectStore('snippets');
            store.put(snippet);
            transaction.oncomplete = () => resolve();
        });
    },

    async deleteFromIndexedDB(id) {
        await this.initDB();
        return new Promise(resolve => {
            const transaction = this.db.transaction(['snippets'], 'readwrite');
            const store = transaction.objectStore('snippets');
            store.delete(id);
            transaction.oncomplete = () => resolve();
        });
    },

    async saveSnippet(title, code, lang, folder = 'Uncategorized', tags = [], itemType = 'text') {
        await this.initDB();
        let newSnip = { id: Date.now().toString(), title, code, lang: lang || 'text', folder, tags, itemType, isPinned: false };

        if (API.getAuthToken()) {
            try {
                const saved = await API.fetchAPI('/api/snippets', 'POST', { title, code, lang: lang || 'text', folder, tags, itemType });
                newSnip.id = saved._id;
                console.log("☁️ Snippet successfully synced to MongoDB!");
            } catch (e) {
                console.error("Failed to sync snippet to cloud:", e);
            }
        }

        this.snippets.push(newSnip);
        await this.saveToIndexedDB(newSnip);
        if (document.getElementById('snippets-grid')) {
            this.renderSnippets();
        }
    }
};
