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
                
                <div class="tabs mb-lg" id="workspace-tabs">
                    <button class="tab-item active" data-tab="snippets"><i class="fa-solid fa-code" style="margin-right:6px;"></i>Code Snippets</button>
                    <button class="tab-item" data-tab="terminal"><i class="fa-solid fa-terminal" style="margin-right:6px;"></i>Local Terminal</button>
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
                    
                    <div class="flex-between mt-lg">
                        <h3>Saved Snippets</h3>
                        <button class="btn btn-secondary btn-sm" id="sync-gists-btn"><i class="fa-brands fa-github"></i> Sync to Gists</button>
                    </div>
                    <div class="grid-2 mt-sm" id="snippets-grid"></div>
                </div>

                <div id="ws-tab-terminal" style="display:none;">
                    <div class="glass-card-static" style="padding:0; overflow:hidden; border:1px solid var(--border);">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:rgba(0,0,0,0.6);border-bottom:1px solid var(--border);">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-terminal" style="color:var(--primary-light);"></i>
                                <span style="font-size:0.88rem;font-weight:600;color:var(--text);">WebContainer Terminal</span>
                            </div>
                            <span class="tag" style="background:rgba(62,207,110,0.1);color:var(--success);border:none;">Online</span>
                        </div>
                        <div id="raw-terminal-embed" style="height:600px;background:#000;">
                            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
                                <i class="fa-brands fa-node-js" style="font-size:3rem;color:var(--success);opacity:0.8;"></i>
                                <p class="text-secondary text-sm">Offline terminal emulator preparing...</p>
                                <button class="btn btn-primary mt-sm" id="boot-terminal-btn"><i class="fa-solid fa-power-off"></i> Boot Terminal Instance</button>
                            </div>
                        </div>
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
        let project = {
            title: snippet.title || 'Workspace Snippet',
            description: 'Run from Vertex Workspace',
            template: 'javascript',
            files: { 'index.js': snippet.code }
        };

        if (lang === 'react') {
            project.template = 'create-react-app';
            project.files = {
                'src/App.js': snippet.code,
                'src/index.js': 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\nReactDOM.render(<App />, document.getElementById("root"));',
                'public/index.html': '<div id="root"></div>'
            };
        } else if (lang === 'vue') {
            project.template = 'vue-cli';
            project.files = { 'src/App.vue': snippet.code };
        } else if (lang === 'html') {
            project.template = 'html';
            project.files = { 'index.html': snippet.code };
        } else if (lang === 'typescript') {
            project.template = 'typescript';
            project.files = { 'index.ts': snippet.code };
        } else if (lang === 'javascript') {
            project.template = 'node';
            project.files = { 'index.js': snippet.code };
        } else if (lang === 'angular') {
            project.template = 'angular-cli';
            project.files = { 'src/app/app.component.ts': snippet.code };
        } else {
            return Toast.show(`Running ${lang.toUpperCase()} in the browser is not supported natively yet. Use Web/Node languages instead.`, 'error');
        }

        if (!window.StackBlitzSDK) {
            Toast.show('Loading WebContainer runtime...', 'info', 2000);
            await Helpers.loadScript('https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js');
        }

        let embedWrap = document.getElementById('ws-stackblitz-wrap');
        if (!embedWrap) {
            embedWrap = document.createElement('div');
            embedWrap.id = 'ws-stackblitz-wrap';
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
                    <div id="ws-stackblitz-embed" style="height:450px;"></div>
                </div>`;
            document.getElementById('snippets-view').appendChild(embedWrap);
            document.getElementById('ws-close-embed').addEventListener('click', () => { embedWrap.style.display = 'none'; });
        }
        embedWrap.style.display = 'block';
        document.getElementById('ws-embed-title').textContent = `Live Preview — ${snippet.title}`;
        embedWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

        Toast.show('Booting Live WebContainer...', 'success');
        window.StackBlitzSDK.embedProject(
            document.getElementById('ws-stackblitz-embed'),
            project,
            { openFile: Object.keys(project.files)[0], height: 450, forceEmbedLayout: true }
        );
    },

    bindEvents() {
        document.getElementById('workspace-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#workspace-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.dataset.tab;
            if(target === 'snippets') {
                document.getElementById('ws-tab-snippets').style.display = 'block';
                document.getElementById('ws-tab-terminal').style.display = 'none';
            } else {
                document.getElementById('ws-tab-snippets').style.display = 'none';
                document.getElementById('ws-tab-terminal').style.display = 'block';
            }
        });

        document.getElementById('boot-terminal-btn')?.addEventListener('click', async () => {
            if (!window.StackBlitzSDK) {
                Toast.show('Loading WebContainer...', 'info', 2000);
                await Helpers.loadScript('https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js');
            }
            document.getElementById('raw-terminal-embed').innerHTML = '';
            window.StackBlitzSDK.embedProject(
                document.getElementById('raw-terminal-embed'),
                {
                    title: 'Vertex Terminal',
                    description: 'Raw local WebContainer Terminal',
                    template: 'node',
                    files: {
                        'index.js': "console.log('Terminal Booted! You can now use npm, node, git, etc.');\nsetInterval(() => {}, 1000);",
                        'package.json': '{"name":"vertex-terminal","scripts":{"start":"node index.js"}}'
                    }
                },
                { height: 600, view: 'editor', forceEmbedLayout: true, hideNavigation: true, hideExplorer: true }
            );
        });

        document.getElementById('sync-gists-btn')?.addEventListener('click', () => this.syncToGists());

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
    },

    async syncToGists() {
        if (!this.snippets.length) return Toast.show('No snippets left to sync!', 'warning');
        if (!localStorage.getItem('vertex_gh_token')) return Toast.show('Please connect GitHub via the top right icon first.', 'error');

        const btn = document.getElementById('sync-gists-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Syncing...';
        btn.disabled = true;

        try {
            const files = {};
            this.snippets.forEach((s, i) => {
                let ext = '.txt';
                if(s.lang === 'html' || s.lang === 'vue' || s.lang === 'svelte') ext = '.html';
                else if(s.lang === 'javascript' || s.lang === 'node' || s.lang === 'react') ext = '.js';
                else if(s.lang === 'typescript' || s.lang === 'angular') ext = '.ts';
                else if(s.lang === 'python') ext = '.py';
                else if(s.lang === 'css') ext = '.css';
                else if(s.lang === 'java') ext = '.java';
                else if(s.lang === 'cpp') ext = '.cpp';
                else if(s.lang === 'c') ext = '.c';
                else if(s.lang === 'csharp') ext = '.cs';
                else if(s.lang === 'go') ext = '.go';
                else if(s.lang === 'rust') ext = '.rs';
                else if(s.lang === 'ruby') ext = '.rb';
                else if(s.lang === 'php') ext = '.php';
                else if(s.lang === 'sql') ext = '.sql';
                else if(s.lang === 'bash' || s.lang === 'shell') ext = '.sh';

                const safeName = s.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ext;
                files[`${i+1}_${safeName}`] = { content: s.code };
            });

            const res = await API.fetchGitHub('/gists', 'POST', {
                description: 'Vertex Toolkit - Workspace Snippets Backup',
                public: false,
                files: files
            });

            Toast.show('Successfully synced to private GitHub Gist!', 'success');
        } catch (e) {
            Toast.show(e.message || 'Failed to sync Gists. Check token validity.', 'error');
        } finally {
            btn.innerHTML = '<i class="fa-brands fa-github"></i> Sync to Gists';
            btn.disabled = false;
        }
    }
};
