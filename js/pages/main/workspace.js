const WorkspacePage = {
    snippets: [],
    db: null,
    _dbReady: null,
    
    initDB() {
        if (this._dbReady) return this._dbReady;
        this._dbReady = new Promise((resolve, reject) => {
            const request = indexedDB.open('VertexDB', 1);
            request.onerror = e => reject(e);
            request.onsuccess = e => {
                this.db = e.target.result;
                resolve();
            };
            request.onupgradeneeded = e => {
                const db = e.target.result;
                if(!db.objectStoreNames.contains('snippets')) {
                    db.createObjectStore('snippets', { keyPath: 'id' });
                }
            };
        });
        return this._dbReady;
    },

    async loadSnippets() {
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

    render() {
        Navbar.renderTopbar('My Workspace');
        const content = document.getElementById('page-content');
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>My <span class="text-gradient">Workspace</span></h1>
                    <p>Assemble project folders, save notes, and bookmark APIs and tools for your upcoming builds.</p>
                </div>
                
                <div id="ws-tab-snippets">
                    <div class="glass-card mb-lg">
                        <div class="flex-between mb-sm">
                            <h3 class="mb-0">Add Note / Element</h3>
                        </div>
                        <div class="grid-2 mb-sm" style="gap: 10px;">
                            <input type="text" id="snip-title" class="input-field" placeholder="Title" style="width:100%; border-radius: var(--radius-sm);">
                            <div style="position: relative;">
                                <i class="fa-solid fa-folder" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.9rem; pointer-events: none; z-index: 1;"></i>
                                <input type="text" id="snip-folder" class="input-field" placeholder="Project Folder (e.g. XYZ App)" value="Uncategorized" style="width:100%; padding-left: 38px; border-radius: var(--radius-sm);">
                            </div>
                        </div>
                        <div class="mb-sm" style="position: relative;">
                            <i class="fa-solid fa-tags" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.9rem; pointer-events: none; z-index: 1;"></i>
                            <input type="text" id="snip-tags" class="input-field" placeholder="Tags (comma separated)" style="width:100%; padding-left: 38px; border-radius: var(--radius-sm);">
                        </div>
                        <textarea id="snip-code" class="input-field" placeholder="Write your note, link, or snippet here..." style="width:100%; height:120px; resize:vertical; border-radius: var(--radius-sm); margin-bottom: 12px; font-family:var(--font-mono); font-size:13px; background:rgba(0,0,0,0.3); border:1px solid var(--border); color:var(--text); padding:12px;"></textarea>
                        <button id="save-snip-btn" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Save to Project</button>
                    </div>
                    
                    <div class="flex-between mt-lg mb-sm">
                        <h3 style="margin-bottom:0;"><i class="fa-solid fa-layer-group" style="color:var(--primary-light); margin-right:8px;"></i> Your Projects</h3>
                    </div>
                    <div class="grid-2 mt-sm" id="snippets-grid"></div>
                </div>
                </div>
            </div>
        `;
        
        this.initDB().then(() => {
            this.loadSnippets().then(() => {
                this.renderSnippets();
            });
        });

        if (!this._authBound) {
            window.addEventListener('auth_changed', () => {
                if (document.getElementById('snippets-grid')) {
                    this.loadSnippets().then(() => this.renderSnippets());
                }
            });
            this._authBound = true;
        }
        
        this.bindEvents();
    },

    renderSnippets() {
        const grid = document.getElementById('snippets-grid');
        if (!grid) return;
        if(!this.snippets.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: span 2; padding: 60px 20px; text-align: center;">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3 style="margin-bottom: 8px;">No projects yet</h3>
                    <p class="text-muted" style="max-width: 400px; margin: 0 auto;">Add a note above or use the <i class="fa-regular fa-bookmark"></i> bookmark button in other sections to start assembling your project folders.</p>
                </div>`;
            return;
        }

        const sorted = [...this.snippets].sort((a, b) => {
            if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
            const folderA = a.folder || 'Uncategorized';
            const folderB = b.folder || 'Uncategorized';
            if (folderA !== folderB) return folderA.localeCompare(folderB);
            return a.title.localeCompare(b.title);
        });

        let html = '';
        let currentFolder = null;

        sorted.forEach((s) => {
            const idx = this.snippets.indexOf(s);
            const folderName = s.folder || 'Uncategorized';
            
            if (currentFolder !== folderName) {
                currentFolder = folderName;
                html += `<div style="grid-column: span 2; margin-top: 20px; border-bottom: 1px solid var(--border); padding-bottom: 5px;">
                            <h4 style="margin: 0; color: var(--primary-light);"><i class="fa-solid fa-folder-open" style="margin-right: 8px;"></i>${Helpers.escapeHtml(currentFolder)}</h4>
                         </div>`;
            }

            const tagsHtml = (s.tags || []).map(t => `<span class="tag mb-sm" style="display:inline-block; font-size:0.7rem; font-weight:600; background:rgba(255,255,255,0.1); color:var(--text-muted); border: 1px solid var(--border); margin-left: 5px;">#${Helpers.escapeHtml(t)}</span>`).join('');

            let contentHtml = '';
            if (s.itemType === 'blueprint') {
                contentHtml = `<pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">${Helpers.escapeHtml(s.code)}</pre>`;
            } else if (s.itemType === 'api') {
                contentHtml = `<div style="font-family:var(--font-mono); font-size:13px; color:var(--success);"><i class="fa-solid fa-link" style="margin-right:6px;"></i>${Helpers.escapeHtml(s.code)}</div>`;
            } else if (s.itemType === 'command') {
                contentHtml = `<div style="font-family:var(--font-mono); font-size:13px; color:var(--warning);"><i class="fa-solid fa-terminal" style="margin-right:6px;"></i>${Helpers.escapeHtml(s.code)}</div>`;
            } else if (s.itemType === 'tool') {
                contentHtml = `<a href="${Helpers.escapeHtml(s.code)}" target="_blank" style="color:var(--primary-light); font-weight:600; text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square" style="margin-right:6px;"></i>Open Link</a>`;
            } else {
                contentHtml = `<pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">${Helpers.escapeHtml(s.code)}</pre>`;
            }

            const typeIcons = { 'text': 'fa-file-lines', 'api': 'fa-server', 'command': 'fa-terminal', 'tool': 'fa-wrench', 'blueprint': 'fa-folder-tree' };
            const typeIcon = typeIcons[s.itemType || 'text'];

            html += `
            <div class="glass-card" style="${s.isPinned ? 'border-color: var(--primary-light);' : ''}">
                <div class="flex-between mb-sm">
                    <div style="font-weight:600; display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid ${typeIcon}" style="color:var(--text-muted);"></i>
                        ${Helpers.escapeHtml(s.title)}
                        ${s.isPinned ? '<i class="fa-solid fa-thumbtack" style="color:var(--primary-light); font-size:0.8rem;" title="Pinned"></i>' : ''}
                    </div>
                    <div class="flex-gap">
                        <button class="btn btn-ghost btn-xs pin-snip-btn" data-id="${s.id}" data-idx="${idx}" title="${s.isPinned ? 'Unpin' : 'Pin'}" style="color:${s.isPinned ? 'var(--primary-light)' : 'var(--text-muted)'};"><i class="fa-solid fa-thumbtack"></i></button>
                        <button class="btn btn-ghost btn-xs toggle-snip-btn" data-idx="${idx}" title="Toggle details"><i class="fa-solid fa-chevron-down toggle-icon-${idx}"></i></button>
                        <button class="btn btn-ghost btn-xs copy-snip-btn" data-idx="${idx}"><i class="fa-solid fa-copy"></i></button>
                        <button class="btn btn-ghost btn-xs del-snip-btn" data-id="${s.id}" data-idx="${idx}" style="color:var(--error);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                ${s.itemType === 'text' && s.lang ? `<span class="tag mb-sm" style="display:inline-block; font-weight:600; background: ${Helpers.getExtColor(s.lang)}20; color: ${Helpers.getExtColor(s.lang)}; border: 1px solid ${Helpers.getExtColor(s.lang)}40;">${s.lang.toUpperCase()}</span>` : ''}
                ${s.itemType && s.itemType !== 'text' ? `<span class="tag mb-sm" style="display:inline-block; font-weight:600; background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid var(--border); text-transform:capitalize;">${s.itemType}</span>` : ''}
                ${tagsHtml}
                <div id="snip-code-${idx}" style="display:none; background:rgba(0,0,0,0.5); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                    ${contentHtml}
                </div>
            </div>`;
        });
        grid.innerHTML = html;
    },

    async saveSnippet(title, code, lang, folder = 'Uncategorized', tags = [], itemType = 'text') {
        await this.initDB();
        let newSnip = { id: Date.now().toString(), title, code, lang: lang || 'text', folder, tags, itemType, isPinned: false };
        
        if (API.getAuthToken()) {
            try {
                const saved = await API.fetchAPI('/api/snippets', 'POST', { title, code, lang: lang || 'text', folder, tags, itemType });
                newSnip.id = saved._id;
                console.log("☁️ Snippet successfully synced to MongoDB!");
            } catch(e) {
                console.error("Failed to sync snippet to cloud:", e);
            }
        }
        
        this.snippets.push(newSnip);
        await this.saveToIndexedDB(newSnip);
        if (document.getElementById('snippets-grid')) {
            this.renderSnippets();
        }
    },

    bindEvents() {
        document.getElementById('save-snip-btn')?.addEventListener('click', () => {
            if (!API.requireAuth()) return;
            const title = document.getElementById('snip-title').value.trim();
            const folder = document.getElementById('snip-folder').value.trim() || 'Uncategorized';
            const tagsRaw = document.getElementById('snip-tags').value;
            const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t);
            const code = document.getElementById('snip-code').value.trim();
            
            if(!title || !code) return Toast.show('Please fill out the title and code', 'error');
            
            this.saveSnippet(title, code, 'text', folder, tags);
            
            document.getElementById('snip-title').value = '';
            document.getElementById('snip-tags').value = '';
            document.getElementById('snip-code').value = '';
            Toast.show('Saved to Project!', 'success');
        });

        document.getElementById('page-content').addEventListener('click', async (e) => {
            if(e.target.closest('.toggle-snip-btn')) {
                const idx = e.target.closest('.toggle-snip-btn').dataset.idx;
                const codeDiv = document.getElementById('snip-code-' + idx);
                const icon = document.querySelector('.toggle-icon-' + idx);
                if (codeDiv && codeDiv.style.display === 'none') {
                    codeDiv.style.display = 'block';
                    if (icon) { icon.classList.remove('fa-chevron-down'); icon.classList.add('fa-chevron-up'); }
                } else if (codeDiv) {
                    codeDiv.style.display = 'none';
                    if (icon) { icon.classList.remove('fa-chevron-up'); icon.classList.add('fa-chevron-down'); }
                }
            }

            if(e.target.closest('.copy-snip-btn')) {
                const idx = e.target.closest('.copy-snip-btn').dataset.idx;
                Helpers.copyToClipboard(this.snippets[idx].code);
                Toast.show('Snippet copied!', 'success');
            }
            if(e.target.closest('.del-snip-btn')) {
                if (!API.requireAuth()) return;
                const btn = e.target.closest('.del-snip-btn');
                const id = btn.dataset.id;
                const idx = parseInt(btn.dataset.idx);
                
                this.snippets.splice(idx, 1);
                await this.deleteFromIndexedDB(id);
                
                if (API.getAuthToken()) {
                    try {
                        await API.fetchAPI(`/api/snippets/${id}`, 'DELETE');
                    } catch(e) { console.error("Cloud delete fail", e); }
                }

                this.renderSnippets();
                Toast.show('Snippet deleted', 'success');
            }
            if(e.target.closest('.pin-snip-btn')) {
                if (!API.requireAuth()) return;
                const btn = e.target.closest('.pin-snip-btn');
                const id = btn.dataset.id;
                const idx = parseInt(btn.dataset.idx);
                
                this.snippets[idx].isPinned = !this.snippets[idx].isPinned;
                await this.saveToIndexedDB(this.snippets[idx]);
                
                if (API.getAuthToken()) {
                    try {
                        await API.fetchAPI(`/api/snippets/${id}/pin`, 'PATCH');
                    } catch(e) { console.error("Cloud pin toggle fail", e); }
                }
                
                this.renderSnippets();
                Toast.show(this.snippets[idx].isPinned ? 'Snippet pinned' : 'Snippet unpinned', 'success');
            }
        });
    }
};
