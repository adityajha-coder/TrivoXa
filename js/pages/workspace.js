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
                
                <div id="snippets-view">
                    <div class="glass-card mb-lg">
                        <div class="flex-between mb-sm">
                            <h3 class="mb-0">Add New Snippet</h3>
                        </div>
                        <input type="text" id="snip-title" class="input-field mb-sm" placeholder="Snippet Title" style="width:100%; border-radius: var(--radius-sm);">
                        <select id="snip-lang-select" class="input-field mb-sm" style="width:100%; border-radius: var(--radius-sm); border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: var(--text);">
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
                        <textarea id="snip-code" class="input-field mb-sm" placeholder="Paste your code here..." style="width:100%; min-height:100px; resize:vertical; font-family:var(--font-mono); border-radius: var(--radius-sm);"></textarea>
                        <button id="save-snip-btn" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Save Snippet</button>
                    </div>
                    
                    <h3>Saved Snippets</h3>
                    <div class="grid-2 mt-sm" id="snippets-grid"></div>
                </div>
            </div>
        `;
        
        this.initDB().then(() => {
            this.loadSnippets().then(() => {
                this.renderSnippets();
            });
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
                        <button class="btn btn-ghost btn-xs run-snip-btn" data-idx="${idx}" title="Run in live environment" style="color:var(--success);"><i class="fa-solid fa-play"></i></button>
                        <button class="btn btn-ghost btn-xs copy-snip-btn" data-idx="${idx}"><i class="fa-solid fa-copy"></i></button>
                        <button class="btn btn-ghost btn-xs del-snip-btn" data-id="${s.id}" data-idx="${idx}" style="color:var(--error);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                ${s.lang ? `<span class="tag tag-primary mb-sm" style="display:inline-block;">${s.lang.toUpperCase()}</span>` : ''}
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
        document.getElementById('snip-lang-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#snip-lang-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });

        document.getElementById('save-snip-btn').addEventListener('click', () => {
            const title = document.getElementById('snip-title').value.trim();
            const code = document.getElementById('snip-code').value.trim();
            const lang = document.getElementById('snip-lang-select').value || 'text';
            if(!title || !code) return Toast.show('Please fill both fields', 'error');
            
            this.saveSnippet(title, code, lang);
            
            document.getElementById('snip-title').value = '';
            document.getElementById('snip-code').value = '';
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
        });
    }
};
