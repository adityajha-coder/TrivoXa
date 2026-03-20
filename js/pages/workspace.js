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

        const lang = snippet.lang || 'text';
        if (lang === 'text') return Toast.show('Cannot run plain text', 'error');
        if (lang === 'sql') return Toast.show('SQL runner coming soon.', 'info');

        const webLangs = ['html', 'vue', 'react', 'angular', 'svelte', 'typescript'];
        
        // Remove existing embed wraps if any
        ['ws-stackblitz-wrap', 'ws-piston-wrap', 'ws-iframe-wrap'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        // ==========================
        //  WEB ENVIRONMENT RUNNER (StackBlitz)
        // ==========================
        if (webLangs.includes(lang)) {
            let project = {
                title: snippet.title || 'Workspace Snippet',
                description: 'Run from Vertex Workspace',
                template: 'javascript',
                files: { 'index.js': snippet.code }
            };

            if (lang === 'react') {
                project.template = 'create-react-app';
                project.files = {
                    'src/App.js': `import React from 'react';\nimport './style.css';\n\n${snippet.code}`,
                    'src/index.js': 'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App";\nconst root = createRoot(document.getElementById("root"));\nroot.render(<App />);',
                    'public/index.html': '<div id="root"></div>',
                    'src/style.css': 'body { font-family: sans-serif; padding: 20px; }'
                };
            } else if (lang === 'vue') {
                project.template = 'node';
                project.files = { 
                    'package.json': '{"name":"vue-preview","scripts":{"start":"vite"},"dependencies":{"vue":"^3.2.0"},"devDependencies":{"vite":"^4.0.0","@vitejs/plugin-vue":"^4.0.0"}}',
                    'index.html': '<div id="app"></div><script type="module" src="/main.js"><\/script>',
                    'main.js': 'import { createApp } from "vue";\nimport App from "./App.vue";\ncreateApp(App).mount("#app");',
                    'App.vue': snippet.code,
                    'vite.config.js': 'import { defineConfig } from "vite";\nimport vue from "@vitejs/plugin-vue";\nexport default defineConfig({plugins:[vue()]});'
                };
            } else if (lang === 'html') {
                project.template = 'html';
                project.files = { 'index.html': snippet.code };
            } else if (lang === 'angular') {
                project.template = 'angular-cli';
                project.files = { 'src/app/app.component.ts': snippet.code };
            } else if (lang === 'svelte') {
                project.template = 'node';
                project.files = {
                    'package.json': '{"scripts":{"dev":"vite"},"devDependencies":{"vite":"^4.0.0","@sveltejs/vite-plugin-svelte":"^2.0.0","svelte":"^3.54.0"}}',
                    'vite.config.js': 'import { defineConfig } from "vite";\nimport { svelte } from "@sveltejs/vite-plugin-svelte";\nexport default defineConfig({plugins:[svelte()]});',
                    'index.html': '<div id="app"></div><script type="module" src="/main.js"><\/script>',
                    'main.js': 'import App from "./App.svelte";\nnew App({target: document.getElementById("app")});',
                    'App.svelte': snippet.code
                };
            } else if (lang === 'typescript') {
                project.template = 'typescript';
                project.files = { 'index.ts': snippet.code };
            }

            if (!window.StackBlitzSDK) {
                Toast.show('Loading WebContainer...', 'info', 2000);
                await Helpers.loadScript('https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js');
            }

            const embedWrap = document.createElement('div');
            embedWrap.id = 'ws-stackblitz-wrap';
            embedWrap.style.cssText = 'margin-top:20px;';
            embedWrap.innerHTML = `
                <div class="glass-card-static" style="padding:0; overflow:hidden;">
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;"></span>
                            <span style="font-size:0.88rem;font-weight:600;color:var(--text);" id="ws-embed-title">Live Preview — ${snippet.title}</span>
                        </div>
                        <button class="btn btn-ghost btn-xs" id="ws-close-embed"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div id="ws-stackblitz-embed" style="height:450px;"></div>
                </div>`;
            document.getElementById('ws-tab-snippets').appendChild(embedWrap);
            document.getElementById('ws-close-embed').addEventListener('click', () => { embedWrap.style.display = 'none'; });
            
            embedWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
            Toast.show('Booting Live Server...', 'success');
            
            const openFile = Object.keys(project.files).find(f => f.includes('App') || f.includes('index') || f.includes('main'));
            window.StackBlitzSDK.embedProject(
                document.getElementById('ws-stackblitz-embed'),
                project,
                { openFile: openFile, height: 450, forceEmbedLayout: true }
            );
            return;
        }

        // ==========================
        //  REMOTE EXECUTION RUNNER (Judge0 API)
        // ==========================
        const embedWrap = document.createElement('div');
        embedWrap.id = 'ws-piston-wrap'; // keeping the ID same for css/logic simplicity
        embedWrap.style.cssText = 'margin-top:20px;';
        embedWrap.innerHTML = `
            <div class="glass-card-static" style="padding:0; overflow:hidden;">
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);background:#1a1b26;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-terminal" style="color:#7aa2f7;"></i>
                        <span style="font-size:0.88rem;font-weight:600;color:#c0caf5;">Terminal Output — ${snippet.title}</span>
                    </div>
                    <button class="btn btn-ghost btn-xs" id="ws-close-piston"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div style="background:#1a1b26; padding:16px; height:350px; overflow-y:auto; font-family:'JetBrains Mono', monospace; font-size:13px; color:#a9b1d6;" id="ws-piston-output">
                    <span style="color:#bb9af7;">> Execution started for ${lang} via Judge0...</span><br/>
                </div>
            </div>`;
        document.getElementById('ws-tab-snippets').appendChild(embedWrap);
        document.getElementById('ws-close-piston').addEventListener('click', () => { embedWrap.style.display = 'none'; });
        embedWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

        try {
            // Judge0 CE Language IDs map
            const judge0Map = {
                'python': 71,
                'java': 62,
                'cpp': 54,
                'c': 50,
                'csharp': 51,
                'go': 60,
                'rust': 73,
                'ruby': 72,
                'php': 68,
                'bash': 46,
                'javascript': 63
            };
            const langId = judge0Map[lang] || 71;

            const response = await fetch('https://ce.judge0.com/submissions?wait=true', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language_id: langId,
                    source_code: snippet.code
                })
            });

            const data = await response.json();
            const outDiv = document.getElementById('ws-piston-output');
            
            if (data.compile_output) {
                outDiv.innerHTML += `<br/><span style="color:#e0af68;">[Compilation Output]</span><br/>${Helpers.escapeHtml(data.compile_output).replace(/\\n/g, '<br/>')}`;
            }

            if (data.stdout) {
                outDiv.innerHTML += `<br/><span style="color:#9ece6a;">[Output]</span><br/>${Helpers.escapeHtml(data.stdout).replace(/\\n/g, '<br/>').replace(/\\r/g, '')}`;
            } 
            if (data.stderr) {
                outDiv.innerHTML += `<br/><span style="color:#f7768e;">[Error]</span><br/>${Helpers.escapeHtml(data.stderr).replace(/\\n/g, '<br/>')}`;
            }
            if (data.status && data.status.description) {
                outDiv.innerHTML += `<br/><span style="color:#7dcfff;">[Status: ${data.status.description}]</span>`;
            }
            
            if (!data.stdout && !data.stderr && !data.compile_output) {
                outDiv.innerHTML += `<br/><span style="color:#7dcfff;">[Program finished with no output]</span>`;
            }
        } catch(err) {
            document.getElementById('ws-piston-output').innerHTML += `<br/><span style="color:#f7768e;">[Execution Failed] ${err.message}</span>`;
            Toast.show('Failed to execute code.', 'error');
        }
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
