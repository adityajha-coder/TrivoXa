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
                    <p>Save your personal code snippets, run them live, and access common project boilerplates.</p>
                </div>
                
                <div id="ws-tab-snippets">
                    <div class="glass-card mb-lg">
                        <div class="flex-between mb-sm">
                            <h3 class="mb-0">Add New Snippet</h3>
                        </div>
                        <input type="text" id="snip-title" class="input-field mb-sm" placeholder="Snippet Title" style="width:100%; border-radius: var(--radius-sm);">
                        <div class="mb-sm" style="position: relative;">
                            <i class="fa-solid fa-code" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.9rem; pointer-events: none; z-index: 1;"></i>
                            <i class="fa-solid fa-chevron-down" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.8rem; pointer-events: none; z-index: 1;"></i>
                            <select id="snip-lang-select" class="input-field" style="width:100%; padding-left: 38px; padding-right: 40px; appearance: none; -webkit-appearance: none; background: #000000 !important; cursor: pointer; font-weight: 500;">
                                <optgroup label="Runnable Web / Node Languages">
                                    <option value="html" selected>HTML / CSS</option>
                                    <option value="javascript">JavaScript (Node.js)</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="react">React (JSX)</option>
                                    <option value="vue">Vue</option>
                                    <option value="angular">Angular</option>
                                    <option value="svelte">Svelte</option>
                                </optgroup>
                                <optgroup label="Other Compiled / Scripting Languages">
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                    <option value="c">C</option>
                                    <option value="csharp">C#</option>
                                    <option value="go">Go</option>
                                    <option value="rust">Rust</option>
                                    <option value="ruby">Ruby</option>
                                    <option value="php">PHP</option>
                                    <option value="bash">Bash / Shell</option>
                                    <option value="sql">SQL</option>
                                    <option value="text">Plain Text</option>
                                </optgroup>
                            </select>
                        </div>
                        <div id="monaco-editor-container" style="width:100%; height:300px; border-radius: var(--radius-sm); border: 1px solid var(--border); margin-bottom: 12px; overflow:hidden;"></div>
                        <button id="save-snip-btn" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Save Snippet</button>
                    </div>
                    
                    <div class="flex-between mt-lg mb-sm">
                        <h3 style="margin-bottom:0;">Saved Snippets</h3>
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
        
        // Initialize Monaco Editor
        Helpers.initMonaco().then(monaco => {
            const container = document.getElementById('monaco-editor-container');
            if(container) {
                this.editor = monaco.editor.create(container, {
                    value: '// Paste your code or type here...',
                    language: document.getElementById('snip-lang-select').value || 'html',
                    theme: 'vs-dark',
                    minimap: { enabled: false },
                    automaticLayout: true,
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono',
                    scrollBeyondLastLine: false,
                    roundedSelection: true
                });

                document.getElementById('snip-lang-select').addEventListener('change', (e) => {
                    let lang = e.target.value;
                    if (lang === 'vue' || lang === 'svelte') lang = 'html';
                    if (lang === 'bash') lang = 'shell';
                    monaco.editor.setModelLanguage(this.editor.getModel(), lang);
                });
            }
        });

        this.bindEvents();
    },

    renderSnippets() {
        const grid = document.getElementById('snippets-grid');
        if (!grid) return;
        if(!this.snippets.length) {
            grid.innerHTML = '<p class="text-muted" style="grid-column: span 2;">No snippets saved yet. Add one above!</p>';
            return;
        }
        grid.innerHTML = this.snippets.map((s, idx) => `
            <div class="glass-card">
                <div class="flex-between mb-sm">
                    <div style="font-weight:600;">${Helpers.escapeHtml(s.title)}</div>
                    <div class="flex-gap">
                        <button class="btn btn-ghost btn-xs edit-snip-btn" data-idx="${idx}" title="Edit snippet" style="color:var(--primary-light);"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-ghost btn-xs run-snip-btn" data-idx="${idx}" title="Run in live environment" style="color:var(--success);"><i class="fa-solid fa-play"></i></button>
                        <button class="btn btn-ghost btn-xs copy-snip-btn" data-idx="${idx}"><i class="fa-solid fa-copy"></i></button>
                        <button class="btn btn-ghost btn-xs del-snip-btn" data-id="${s.id}" data-idx="${idx}" style="color:var(--error);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                ${s.lang ? `<span class="tag mb-sm" style="display:inline-block; font-weight:600; background: ${Helpers.getExtColor(s.lang)}20; color: ${Helpers.getExtColor(s.lang)}; border: 1px solid ${Helpers.getExtColor(s.lang)}40;">${s.lang.toUpperCase()}</span>` : ''}
                <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                    <pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">${Helpers.escapeHtml(s.code)}</pre>
                </div>
            </div>
        `).join('');
    },

    async saveSnippet(title, code, lang) {
        await this.initDB();
        const newSnip = { id: Date.now().toString(), title, code, lang: lang || 'html' };
        this.snippets.push(newSnip);
        await this.saveToIndexedDB(newSnip);
        if (document.getElementById('snippets-grid')) {
            this.renderSnippets();
        }
    },

    async _runSnippet(idx) {
        const snippet = this.snippets[idx];
        if (!snippet) return Toast.show('Snippet not found', 'error');

        const lang = snippet.lang || 'html';
        let htmlContent = '';

        if (lang === 'html' || lang === 'vue' || lang === 'svelte') {
            htmlContent = snippet.code;
        } else if (lang === 'javascript' || lang === 'typescript') {
            htmlContent = `<!DOCTYPE html><html><body><script>${snippet.code}<\/script></body></html>`;
        } else if (lang === 'react') {
            htmlContent = `<!DOCTYPE html><html><head>
                <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin><\/script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin><\/script>
                <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
            </head><body><div id="root"></div><script type="text/babel">${snippet.code}<\/script></body></html>`;
        } else {
            return Toast.show(`Running ${lang.toUpperCase()} inside the browser sandbox is not supported yet.`, 'error');
        }

        let embedWrap = document.getElementById('ws-iframe-wrap');
        if (!embedWrap) {
            embedWrap = document.createElement('div');
            embedWrap.id = 'ws-iframe-wrap';
            embedWrap.style.cssText = 'margin-top:20px;';
            embedWrap.innerHTML = `
                <div class="glass-card-static" style="padding:0; overflow:hidden;">
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;"></span>
                            <span style="font-size:0.88rem;font-weight:600;color:var(--text);" id="ws-embed-title">Live Preview</span>
                        </div>
                        <button class="btn btn-ghost btn-xs" id="ws-close-embed"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <iframe id="ws-sandbox-iframe" sandbox="allow-scripts allow-modals" style="width:100%;height:450px;border:none;background:#fff;"></iframe>
                </div>`;
            document.getElementById('ws-tab-snippets').appendChild(embedWrap);
            document.getElementById('ws-close-embed').addEventListener('click', () => { embedWrap.style.display = 'none'; });
        }
        
        embedWrap.style.display = 'block';
        document.getElementById('ws-embed-title').textContent = `Live Preview — ${snippet.title}`;
        embedWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const iframe = document.getElementById('ws-sandbox-iframe');
        iframe.srcdoc = htmlContent;
        Toast.show('Running snippet...', 'success');
    },

    bindEvents() {


        document.getElementById('snip-lang-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#snip-lang-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });

        document.getElementById('save-snip-btn').addEventListener('click', () => {
            const title = document.getElementById('snip-title').value.trim();
            const code = this.editor ? this.editor.getValue().trim() : '';
            const lang = document.getElementById('snip-lang-select').value || 'text';
            if(!title || !code) return Toast.show('Please fill out the title and code', 'error');
            
            this.saveSnippet(title, code, lang);
            
            document.getElementById('snip-title').value = '';
            if(this.editor) this.editor.setValue('');
            Toast.show('Snippet saved!', 'success');
        });

        document.getElementById('page-content').addEventListener('click', async (e) => {
            if(e.target.closest('.run-snip-btn')) {
                const idx = parseInt(e.target.closest('.run-snip-btn').dataset.idx);
                this._runSnippet(idx);
            }
            if(e.target.closest('.copy-snip-btn')) {
                const idx = e.target.closest('.copy-snip-btn').dataset.idx;
                Helpers.copyToClipboard(this.snippets[idx].code);
                Toast.show('Snippet copied!', 'success');
            }
            if(e.target.closest('.del-snip-btn')) {
                const btn = e.target.closest('.del-snip-btn');
                const id = btn.dataset.id;
                const idx = parseInt(btn.dataset.idx);
                
                this.snippets.splice(idx, 1);
                await this.deleteFromIndexedDB(id);
                
                this.renderSnippets();
                Toast.show('Snippet deleted', 'success');
            }
            if(e.target.closest('.edit-snip-btn')) {
                const idx = parseInt(e.target.closest('.edit-snip-btn').dataset.idx);
                const snippet = this.snippets[idx];
                if(!snippet) return;

                // Load the snippet back into the editor
                document.getElementById('snip-title').value = snippet.title;
                const langSelect = document.getElementById('snip-lang-select');
                if(langSelect) langSelect.value = snippet.lang || 'text';
                if(this.editor) {
                    this.editor.setValue(snippet.code);
                    let lang = snippet.lang || 'text';
                    if (lang === 'vue' || lang === 'svelte') lang = 'html';
                    if (lang === 'bash') lang = 'shell';
                    window.monaco?.editor.setModelLanguage(this.editor.getModel(), lang);
                }

                // Remove old snippet
                this.snippets.splice(idx, 1);
                await this.deleteFromIndexedDB(snippet.id);
                this.renderSnippets();

                // Scroll to editor
                document.getElementById('monaco-editor-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                Toast.show('Editing snippet — make changes and save again.', 'info');
            }
        });
    }
};
