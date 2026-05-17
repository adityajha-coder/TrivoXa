const WorkspacePage = {
    render() {
        Navbar.renderTopbar('My Workspace');
        const content = document.getElementById('page-content');

        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header flex-between" style="align-items:flex-start; flex-wrap:wrap; gap:16px;">
                    <div>
                        <h1>My <span class="text-gradient">Workspace</span></h1>
                        <p>Assemble project folders, save notes, and bookmark APIs and tools for your upcoming builds.</p>
                    </div>
                    <button id="ws-create-folder-btn" class="btn btn-primary"><i class="fa-solid fa-folder-plus"></i> Create Folder</button>
                </div>
                
                <div id="ws-tab-snippets">
                    <!-- New Folder Form -->
                    <div id="ws-new-folder-container" class="glass-card mb-lg" style="display:none; animation: slideDown 0.3s ease;">
                        <h3 class="mb-sm"><i class="fa-solid fa-folder-plus text-primary"></i> Create Project Folder</h3>
                        <div style="display:flex; gap:10px;">
                            <input type="text" id="ws-new-folder-input" class="input-field" placeholder="Folder Name (e.g. My Next.js App)">
                            <button id="ws-save-folder-btn" class="btn btn-primary">Create</button>
                            <button id="ws-cancel-folder-btn" class="btn btn-ghost">Cancel</button>
                        </div>
                    </div>

                    <!-- Add Item Form (Hidden by default) -->
                    <div class="glass-card mb-lg" id="ws-add-item-card" style="display:none; animation: slideDown 0.3s ease;">
                        <div class="flex-between mb-sm">
                            <h3 class="mb-0">Add Item to <span class="text-gradient" id="ws-active-folder-name"></span></h3>
                            <button id="ws-close-add-item-btn" class="btn btn-ghost btn-sm"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <input type="hidden" id="snip-folder" value="">
                        
                        <div class="mb-sm" style="position: relative;">
                            <i class="fa-solid fa-list-ul" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.9rem; pointer-events: none; z-index: 1;"></i>
                            <select id="ws-item-source-select" class="input-field" style="width:100%; padding-left: 38px; border-radius: var(--radius-sm); appearance: none; background: rgba(0,0,0,0.3) !important;">
                                <option value="custom" style="background:#111; color:#fff;">Custom Text / Code</option>
                                <option value="api" style="background:#111; color:#fff;">Select from Free APIs</option>
                                <option value="tool" style="background:#111; color:#fff;">Select from Tools Vault</option>
                                <option value="history" style="background:#111; color:#fff;">Select from AI History</option>
                            </select>
                        </div>

                        <div id="ws-preset-selector-container" class="mb-sm" style="display:none; position: relative;">
                            <i class="fa-solid fa-search" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.9rem; pointer-events: none; z-index: 1;"></i>
                            <select id="ws-preset-select" class="input-field" style="width:100%; padding-left: 38px; border-radius: var(--radius-sm); appearance: none; background: rgba(0,0,0,0.3) !important;">
                                <option value="">Loading...</option>
                            </select>
                        </div>

                        <div class="mb-sm" style="position: relative;">
                            <input type="hidden" id="snip-title" value="">
                            <i class="fa-solid fa-tags" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.9rem; pointer-events: none; z-index: 1;"></i>
                            <input type="text" id="snip-tags" class="input-field" placeholder="Tags (comma separated)" style="width:100%; padding-left: 38px; border-radius: var(--radius-sm);">
                        </div>
                        <input type="hidden" id="snip-item-type" value="text">
                        <textarea id="snip-code" class="input-field" placeholder="Write your note, link, or snippet here..." style="width:100%; height:120px; resize:vertical; border-radius: var(--radius-sm); margin-bottom: 12px; font-family:var(--font-mono); font-size:13px; background:rgba(0,0,0,0.3); border:1px solid var(--border); color:var(--text); padding:12px;"></textarea>
                        <button id="save-snip-btn" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Save to Folder</button>
                    </div>
                    
                    <div id="snippets-grid"></div>
                </div>
            </div>
        `;

        this.initDB().then(() => {
            this.loadSnippets().then(() => {
                this.renderSnippets();
                this._applyAuthGate();
            });
        });

        if (!this._authBound) {
            window.addEventListener('auth_changed', () => {
                if (!API.getAuthToken()) {
                    this.snippets = [];
                }
                this._applyAuthGate();
                if (document.getElementById('snippets-grid')) {
                    this.loadSnippets()
                        .catch(err => {
                            console.error('Workspace data load failed after auth change:', err);
                        })
                        .finally(() => {
                            this.renderSnippets();
                        });
                }
            });
            this._authBound = true;
        }

        this.bindEvents();
    },

    _applyAuthGate() {
        const createBtn = document.getElementById('ws-create-folder-btn');
        const grid = document.getElementById('snippets-grid');
        
        if (API.getAuthToken()) {
            if (createBtn) { createBtn.disabled = false; createBtn.style.opacity = ''; }
            return;
        }

        if (createBtn) { createBtn.disabled = true; createBtn.style.opacity = '0.4'; }
        
        // Hide forms if they are open
        const newFolder = document.getElementById('ws-new-folder-container');
        const addItem = document.getElementById('ws-add-item-card');
        if (newFolder) newFolder.style.display = 'none';
        if (addItem) addItem.style.display = 'none';
    },

    renderSnippets() {
        const grid = document.getElementById('snippets-grid');
        if (!grid) return;
        
        if (!API.getAuthToken()) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: span 2; padding: 60px 20px; text-align: center; position:relative;">
                    <i class="fa-solid fa-lock" style="font-size:2.5rem; color:var(--primary-light); margin-bottom:16px;"></i>
                    <h3 style="margin-bottom:8px;">Sign In to use Workspace</h3>
                    <p style="max-width:400px; margin:0 auto 20px;" class="text-muted">Create a free account to assemble project folders, save notes, and bookmark APIs.</p>
                    <button class="btn btn-primary" id="ws-gate-login" style="min-width:140px; margin:0 auto;">Sign In</button>
                </div>`;
            document.getElementById('ws-gate-login')?.addEventListener('click', () => API.requireAuth());
            return;
        }

        if (!this.snippets.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: span 2; padding: 60px 20px; text-align: center;">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3 style="margin-bottom: 8px;">No projects yet</h3>
                    <p class="text-muted" style="max-width: 400px; margin: 0 auto;">Click "Create Folder" above to start assembling your projects.</p>
                </div>`;
            return;
        }

        const folders = {};
        this.snippets.forEach(s => {
            const fName = s.folder || 'Unassigned';
            if (!folders[fName]) folders[fName] = [];
            folders[fName].push(s);
        });

        const folderNames = Object.keys(folders).sort();

        let html = '<div style="display:flex; flex-direction:column; gap:24px;">';
        folderNames.forEach(fName => {
            const folderSnips = folders[fName];
            const activeSnips = folderSnips.filter(s => s.itemType !== 'folder-stub').sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return 0;
            });

            html += `
            <div class="glass-card folder-card" style="padding:0; overflow:hidden; border-color:var(--border);">
                <div class="flex-between" style="background:rgba(212,168,67,0.03); padding:16px 20px; border-bottom:1px solid var(--border);">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-folder" style="color:var(--primary-light); font-size:1.1rem;"></i>
                        <h3 style="margin:0; font-size:1.05rem;">${Helpers.escapeHtml(fName)}</h3>
                        <span class="tag tag-primary text-xs">${activeSnips.length} items</span>
                    </div>
                    <div class="flex-gap">
                        <button class="btn btn-ghost btn-sm add-to-folder-btn" data-folder="${Helpers.escapeHtml(fName)}"><i class="fa-solid fa-plus"></i> Add Item</button>
                        <button class="btn btn-ghost btn-sm delete-folder-btn" data-folder="${Helpers.escapeHtml(fName)}" style="color:var(--error);" title="Delete Folder"><i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-ghost btn-sm toggle-folder-btn"><i class="fa-solid fa-chevron-down"></i></button>
                    </div>
                </div>
                <div class="folder-content" style="padding:20px; display:block;">
                    <div class="grid-2">
                        ${activeSnips.length === 0 ? '<p class="text-muted text-sm" style="grid-column: span 2;">Folder is empty. Add notes, code, or tools here.</p>' :
                    activeSnips.map(s => {
                        const idx = this.snippets.indexOf(s);
                        const tagsArray = Array.isArray(s.tags) ? s.tags : (typeof s.tags === 'string' ? s.tags.split(',') : []);
                        const tagsHtml = tagsArray.map(t => `<span class="tag mb-sm" style="display:inline-block; font-size:0.7rem; font-weight:600; background:rgba(255,255,255,0.1); color:var(--text-muted); border: 1px solid var(--border); margin-left: 5px;">#${Helpers.escapeHtml(t.trim())}</span>`).join('');

                        let contentHtml = '';
                        if (s.itemType === 'blueprint') {
                            contentHtml = `<pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-muted); white-space: pre-wrap; word-break: break-word;">${Helpers.escapeHtml(s.code)}</pre>`;
                        } else if (s.itemType === 'api') {
                            contentHtml = `<div style="font-family:var(--font-mono); font-size:13px; color:var(--success);"><i class="fa-solid fa-link" style="margin-right:6px;"></i>${Helpers.escapeHtml(s.code)}</div>`;
                        } else if (s.itemType === 'command') {
                            contentHtml = `<div style="font-family:var(--font-mono); font-size:13px; color:var(--warning);"><i class="fa-solid fa-terminal" style="margin-right:6px;"></i>${Helpers.escapeHtml(s.code)}</div>`;
                        } else if (s.itemType === 'tool') {
                            contentHtml = `<a href="${Helpers.escapeHtml(s.code)}" target="_blank" style="color:var(--primary-light); font-weight:600; text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square" style="margin-right:6px;"></i>Open Link</a>`;
                        } else {
                            contentHtml = `<pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-muted); white-space: pre-wrap; word-break: break-word;">${Helpers.escapeHtml(s.code)}</pre>`;
                        }

                        const typeIcons = { 'text': 'fa-file-lines', 'api': 'fa-server', 'command': 'fa-terminal', 'tool': 'fa-wrench', 'blueprint': 'fa-folder-tree' };
                        const typeIcon = typeIcons[s.itemType || 'text'];

                        return `
                            <div class="glass-card-static" style="${s.isPinned ? 'border-color: var(--primary-light);' : ''} padding:16px; min-width: 0;">
                                <div class="flex-between mb-sm" style="align-items: flex-start; gap: 10px;">
                                    <div style="font-weight:600; display:flex; align-items:center; gap:8px; min-width: 0; flex: 1;">
                                        <i class="fa-solid ${typeIcon}" style="color:var(--text-muted); font-size:0.9rem; flex-shrink: 0;"></i>
                                        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${Helpers.escapeHtml(s.title)}</span>
                                        ${s.isPinned ? '<i class="fa-solid fa-thumbtack" style="color:var(--primary-light); font-size:0.8rem; flex-shrink: 0;" title="Pinned"></i>' : ''}
                                    </div>
                                    <div class="flex-gap" style="flex-shrink: 0;">
                                        <button class="btn btn-ghost btn-xs pin-snip-btn" data-id="${s.id}" data-idx="${idx}" title="${s.isPinned ? 'Unpin' : 'Pin'}" style="color:${s.isPinned ? 'var(--primary-light)' : 'var(--text-muted)'};"><i class="fa-solid fa-thumbtack"></i></button>
                                        <button class="btn btn-ghost btn-xs toggle-snip-btn" data-idx="${idx}" title="Toggle details"><i class="fa-solid fa-eye toggle-icon-${idx}"></i></button>
                                        <button class="btn btn-ghost btn-xs copy-snip-btn" data-idx="${idx}"><i class="fa-solid fa-copy"></i></button>
                                        <button class="btn btn-ghost btn-xs del-snip-btn" data-id="${s.id}" data-idx="${idx}" style="color:var(--error);"><i class="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                                ${s.itemType === 'text' && s.lang ? `<span class="tag mb-sm" style="display:inline-block; font-weight:600; background: ${Helpers.getExtColor(s.lang)}20; color: ${Helpers.getExtColor(s.lang)}; border: 1px solid ${Helpers.getExtColor(s.lang)}40;">${s.lang.toUpperCase()}</span>` : ''}
                                ${s.itemType && s.itemType !== 'text' ? `<span class="tag mb-sm" style="display:inline-block; font-weight:600; background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid var(--border); text-transform:capitalize;">${s.itemType}</span>` : ''}
                                ${tagsHtml}
                                <div id="snip-code-${idx}" style="display:none; margin-top:12px; background:rgba(0,0,0,0.4); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                                    ${contentHtml}
                                </div>
                            </div>
                            `;
                    }).join('')}
                    </div>
                </div>
            </div>`;
        });

        html += '</div>';
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
            } catch (e) {
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
        document.getElementById('ws-create-folder-btn')?.addEventListener('click', () => {
            document.getElementById('ws-new-folder-container').style.display = 'block';
            document.getElementById('ws-new-folder-input').focus();
        });

        document.getElementById('ws-cancel-folder-btn')?.addEventListener('click', () => {
            document.getElementById('ws-new-folder-container').style.display = 'none';
        });

        document.getElementById('ws-save-folder-btn')?.addEventListener('click', () => {
            const folderName = document.getElementById('ws-new-folder-input').value.trim();
            if (!folderName) return Toast.show('Folder name cannot be empty', 'warning');

            this.saveSnippet(`Folder created: ${folderName}`, '', 'text', folderName, [], 'folder-stub');
            document.getElementById('ws-new-folder-input').value = '';
            document.getElementById('ws-new-folder-container').style.display = 'none';
            Toast.show(`Folder "${folderName}" created`, 'success');
        });

        document.getElementById('save-snip-btn')?.addEventListener('click', () => {
            if (!API.requireAuth()) return;
            let title = document.getElementById('snip-title').value.trim();
            const folder = document.getElementById('snip-folder').value.trim() || 'Unassigned';
            const tagsRaw = document.getElementById('snip-tags').value;
            const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t);
            const code = document.getElementById('snip-code').value.trim();
            const itemType = document.getElementById('snip-item-type').value || 'text';

            if (!code) return Toast.show('Please provide a note or snippet content', 'error');

            if (!title) {
                title = code.substring(0, 40).replace(/\n/g, ' ') + (code.length > 40 ? '...' : '');
            }

            this.saveSnippet(title, code, 'text', folder, tags, itemType);

            document.getElementById('snip-title').value = '';
            document.getElementById('snip-tags').value = '';
            document.getElementById('snip-code').value = '';
            document.getElementById('ws-add-item-card').style.display = 'none';
            Toast.show(`Saved to ${folder}!`, 'success');
        });

        document.getElementById('ws-item-source-select')?.addEventListener('change', async (e) => {
            const source = e.target.value;
            const presetContainer = document.getElementById('ws-preset-selector-container');
            const presetSelect = document.getElementById('ws-preset-select');

            if (source === 'custom') {
                presetContainer.style.display = 'none';
                document.getElementById('snip-title').value = '';
                document.getElementById('snip-code').value = '';
                document.getElementById('snip-tags').value = '';
                document.getElementById('snip-item-type').value = 'text';
                return;
            }

            presetContainer.style.display = 'block';
            presetSelect.innerHTML = '<option value="">Loading...</option>';

            try {
                if (source === 'api') {
                    if (!this._cachedApis) {
                        const res = await fetch('/data/apis.json');
                        this._cachedApis = await res.json();
                    }
                    presetSelect.innerHTML = '<option value="" style="background:#111; color:#fff;">-- Select an API --</option>' + this._cachedApis.map((a, i) => `<option value="${i}" style="background:#111; color:#fff;">${a.name} (${a.category})</option>`).join('');
                } else if (source === 'tool') {
                    if (!this._cachedTools) {
                        const res = await fetch('/data/tools.json');
                        this._cachedTools = await res.json();
                        // Flatten tools
                        this._flatTools = [];
                        this._cachedTools.forEach(cat => cat.items.forEach(t => this._flatTools.push({ ...t, category: cat.cat })));
                    }
                    presetSelect.innerHTML = '<option value="" style="background:#111; color:#fff;">-- Select a Tool --</option>' + this._flatTools.map((t, i) => `<option value="${i}" style="background:#111; color:#fff;">${t.name} (${t.category})</option>`).join('');
                } else if (source === 'history') {
                    if (!this._cachedHistory || Date.now() - (this._lastHistoryFetch || 0) > 60000) {
                        if (API.getAuthToken()) {
                            try {
                                this._cachedHistory = await API.fetchAPI('/api/ai-history');
                            } catch (e) {
                                this._cachedHistory = JSON.parse(localStorage.getItem('ai_history') || '[]');
                            }
                        } else {
                            this._cachedHistory = JSON.parse(localStorage.getItem('ai_history') || '[]');
                        }
                        this._lastHistoryFetch = Date.now();
                    }

                    if (!this._cachedHistory || this._cachedHistory.length === 0) {
                        presetSelect.innerHTML = '<option value="" style="background:#111; color:#fff;">-- No AI History Found --</option>';
                    } else {
                        presetSelect.innerHTML = '<option value="" style="background:#111; color:#fff;">-- Select from AI History --</option>' + this._cachedHistory.map((h, i) => {
                            const shortPrompt = h.prompt.length > 50 ? h.prompt.substring(0, 50) + '...' : h.prompt;
                            const moduleIcon = h.module === 'architect' ? 'Architecture' : 'Chat';
                            return `<option value="${i}" style="background:#111; color:#fff;">[${moduleIcon}] ${shortPrompt}</option>`;
                        }).join('');
                    }
                }
            } catch (err) {
                console.error("Failed to load presets", err);
                presetSelect.innerHTML = '<option value="">Error loading data</option>';
            }
        });

        document.getElementById('ws-preset-select')?.addEventListener('change', (e) => {
            const idx = e.target.value;
            if (idx === '') return;
            const source = document.getElementById('ws-item-source-select').value;

            if (source === 'api' && this._cachedApis) {
                const api = this._cachedApis[idx];
                document.getElementById('snip-title').value = api.name + " API";
                document.getElementById('snip-code').value = api.url;
                document.getElementById('snip-tags').value = "api, " + api.category.toLowerCase();
                document.getElementById('snip-item-type').value = 'api';
            } else if (source === 'tool' && this._flatTools) {
                const tool = this._flatTools[idx];
                document.getElementById('snip-title').value = tool.name;
                document.getElementById('snip-code').value = tool.url;
                document.getElementById('snip-tags').value = "tool, " + tool.category.toLowerCase();
                document.getElementById('snip-item-type').value = 'tool';
            } else if (source === 'history' && this._cachedHistory) {
                const historyItem = this._cachedHistory[idx];
                document.getElementById('snip-title').value = historyItem.prompt;

                let content = historyItem.response;
                let itemType = 'text';

                // Extract bash command from architect history html
                if (historyItem.module === 'architect') {
                    const match = content.match(/<strong>Command:<\/strong>\n(.*?)\n\n<strong>Structure:<\/strong>/);
                    if (match && match[1]) {
                        content = match[1].trim();
                        itemType = 'command';
                    } else {
                        itemType = 'blueprint';
                    }
                } else if (historyItem.module === 'chat') {
                    // Extract plain text from the HTML chat response
                    const htmlWithNewlines = content.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>|<\/li>|<\/div>/gi, '\n');
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = htmlWithNewlines;
                    content = (tempDiv.innerText || tempDiv.textContent).trim();
                    itemType = 'text';
                }

                document.getElementById('snip-code').value = content;
                document.getElementById('snip-item-type').value = itemType;
            }
        });

        document.getElementById('ws-close-add-item-btn')?.addEventListener('click', () => {
            document.getElementById('ws-add-item-card').style.display = 'none';
        });

        document.getElementById('page-content').addEventListener('click', async (e) => {
            if (e.target.closest('.delete-folder-btn')) {
                if (!API.requireAuth()) return;
                const folderName = e.target.closest('.delete-folder-btn').dataset.folder;

                if (!confirm(`Are you sure you want to completely delete the folder "${folderName}" and ALL items inside it? This cannot be undone.`)) {
                    return;
                }

                // Find all snippets in this folder
                const snipsToDelete = this.snippets.filter(s => (s.folder || 'Unassigned') === folderName);

                // Remove from local array
                this.snippets = this.snippets.filter(s => (s.folder || 'Unassigned') !== folderName);

                // Remove from DBs
                for (const snip of snipsToDelete) {
                    await this.deleteFromIndexedDB(snip.id);
                    if (API.getAuthToken()) {
                        try {
                            await API.fetchAPI(`/api/snippets/${snip.id}`, 'DELETE');
                        } catch (err) { console.error("Cloud delete fail", err); }
                    }
                }

                this.renderSnippets();
                Toast.show(`Folder "${folderName}" deleted`, 'success');
            }

            if (e.target.closest('.toggle-folder-btn')) {
                const btn = e.target.closest('.toggle-folder-btn');
                const content = btn.closest('.folder-card').querySelector('.folder-content');
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    btn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
                } else {
                    content.style.display = 'none';
                    btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
                }
            }

            if (e.target.closest('.add-to-folder-btn')) {
                const folder = e.target.closest('.add-to-folder-btn').dataset.folder;
                document.getElementById('snip-folder').value = folder;
                document.getElementById('ws-active-folder-name').textContent = folder;
                document.getElementById('ws-add-item-card').style.display = 'block';
                document.getElementById('ws-add-item-card').scrollIntoView({ behavior: 'smooth' });
            }

            if (e.target.closest('.toggle-snip-btn')) {
                const idx = e.target.closest('.toggle-snip-btn').dataset.idx;
                const codeDiv = document.getElementById('snip-code-' + idx);
                const icon = document.querySelector('.toggle-icon-' + idx);
                if (codeDiv && codeDiv.style.display === 'none') {
                    codeDiv.style.display = 'block';
                    if (icon) { icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash'); }
                } else if (codeDiv) {
                    codeDiv.style.display = 'none';
                    if (icon) { icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye'); }
                }
            }

            if (e.target.closest('.copy-snip-btn')) {
                const idx = e.target.closest('.copy-snip-btn').dataset.idx;
                Helpers.copyToClipboard(this.snippets[idx].code);
                Toast.show('Snippet copied!', 'success');
            }
            if (e.target.closest('.del-snip-btn')) {
                if (!API.requireAuth()) return;
                const btn = e.target.closest('.del-snip-btn');
                const id = btn.dataset.id;
                const idx = parseInt(btn.dataset.idx);

                this.snippets.splice(idx, 1);
                await this.deleteFromIndexedDB(id);

                if (API.getAuthToken()) {
                    try {
                        await API.fetchAPI(`/api/snippets/${id}`, 'DELETE');
                    } catch (e) { console.error("Cloud delete fail", e); }
                }

                this.renderSnippets();
                Toast.show('Snippet deleted', 'success');
            }
            if (e.target.closest('.pin-snip-btn')) {
                if (!API.requireAuth()) return;
                const btn = e.target.closest('.pin-snip-btn');
                const id = btn.dataset.id;
                const idx = parseInt(btn.dataset.idx);

                const isCurrentlyPinned = this.snippets[idx].isPinned;
                if (!isCurrentlyPinned) {
                    const folderName = this.snippets[idx].folder || 'Unassigned';
                    const pinnedCount = this.snippets.filter(s => s.isPinned && (s.folder || 'Unassigned') === folderName).length;
                    if (pinnedCount >= 3) {
                        return Toast.show('You can only pin up to 3 items per folder.', 'warning');
                    }
                }

                this.snippets[idx].isPinned = !this.snippets[idx].isPinned;
                await this.saveToIndexedDB(this.snippets[idx]);

                if (API.getAuthToken()) {
                    try {
                        await API.fetchAPI(`/api/snippets/${id}/pin`, 'PATCH');
                    } catch (e) { console.error("Cloud pin toggle fail", e); }
                }

                this.renderSnippets();
                Toast.show(this.snippets[idx].isPinned ? 'Snippet pinned' : 'Snippet unpinned', 'success');
            }
        });
    }
};

Object.assign(WorkspacePage, WorkspaceDB);

