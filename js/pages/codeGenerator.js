const CodeGeneratorPage = {
    currentFramework: 'html',

    render() {
        Navbar.renderTopbar('AI Code Generator');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>AI Code <span class="text-gradient">Generator</span></h1>
                    <p>Describe your component and let AI generate production-ready code instantly.</p>
                </div>
                
                <div class="glass-card mb-lg">
                    <div class="form-group mb-md">
                        <label class="text-sm text-secondary mb-sm" style="font-weight: 600; display:block;">Framework</label>
                        <div class="tabs" id="framework-tabs" style="display:inline-flex;">
                            <button class="tab-item active" data-fw="html">HTML/CSS</button>
                            <button class="tab-item" data-fw="react">React</button>
                            <button class="tab-item" data-fw="vue">Vue</button>
                            <button class="tab-item" data-fw="python">Python</button>
                        </div>
                    </div>
                    
                    <div class="form-group mb-md">
                        <label class="text-sm text-secondary mb-sm" style="font-weight: 600; display:block;">Component Description</label>
                        <textarea id="ai-code-prompt" class="input-field" placeholder="e.g. A modern login form with email, password, and social login buttons, using glassmorphism styling." style="min-height: 100px; width:100%; resize:vertical; background:rgba(0,0,0,0.2); border:1px solid var(--border); color:var(--text); padding:12px; border-radius:var(--radius);"></textarea>
                    </div>
                    
                    <button id="generate-ai-code-btn" class="btn btn-primary" style="width: 100%;">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Code
                    </button>
                </div>

                <div id="loading-overlay" style="display:none; text-align:center; padding:40px 0;">
                    <div class="spinner" style="margin: 0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                    <p class="text-muted">AI is crafting your code...</p>
                </div>

                <div id="generator-output-area" style="display: none;">
                    <div class="glass-card-static">
                        <div class="flex-between mb-md">
                            <div class="flex-gap">
                                <span class="tag tag-primary" id="output-fw-tag"></span>
                            </div>
                            <div class="flex-gap">
                                <button class="btn btn-secondary btn-sm" id="run-container-btn" style="background:var(--accent); color:#fff; border-color:var(--accent);">
                                    <i class="fa-solid fa-play"></i> Run Output
                                </button>
                                <button class="btn btn-secondary btn-sm" id="copy-code-btn">
                                    <i class="fa-solid fa-copy"></i> Copy Code
                                </button>
                                <button class="btn btn-primary btn-sm" id="save-workspace-btn">
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Save to Workspace
                                </button>
                            </div>
                        </div>
                        <div class="generator-output" style="background:rgba(0,0,0,0.5); padding:16px; border-radius:var(--radius); border:1px solid var(--border); max-height:500px; overflow-y:auto; overflow-x:auto;">
                            <pre id="code-output" style="margin:0; font-family:var(--font-mono); font-size:13px; color:#e2e8f0;"></pre>
                        </div>
                    </div>
                </div>
            </div>`;
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('framework-tabs').addEventListener('click', (e) => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#framework-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            this.currentFramework = tab.dataset.fw;
        });

        document.getElementById('generate-ai-code-btn').addEventListener('click', () => {
            const prompt = document.getElementById('ai-code-prompt').value.trim();
            if(!prompt) return Toast.show('Please enter a description first', 'error');
            this.generateAICode(prompt);
        });

        document.getElementById('copy-code-btn').addEventListener('click', () => {
            Helpers.copyToClipboard(document.getElementById('code-output').textContent);
            Toast.show('Code copied to clipboard!', 'success');
        });

        document.getElementById('save-workspace-btn').addEventListener('click', () => {
            const code = document.getElementById('code-output').textContent;
            if(!code) return Toast.show('No code to save', 'error');
            const fw = this.currentFramework;
            WorkspacePage.saveSnippet(`AI Generated ${fw.toUpperCase()}`, code);
            Toast.show('Saved to My Workspace!', 'success');
        });

        document.getElementById('run-container-btn').addEventListener('click', async () => {
            const code = document.getElementById('code-output').textContent;
            if(!code) return Toast.show('No code to run', 'error');

            const fw = this.currentFramework;
            let project = {
                title: 'Vertex AI Output',
                description: 'Generated by Vertex Developer Toolkit',
                template: 'javascript',
                files: { 'index.js': code }
            };

            if (fw === 'react') {
                project.template = 'create-react-app';
                project.files = {
                    'src/App.js': code,
                    'src/index.js': 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\nReactDOM.render(<App />, document.getElementById("root"));',
                    'public/index.html': '<div id="root"></div>'
                };
            } else if (fw === 'vue') {
                project.template = 'vue-cli';
                project.files = { 'src/App.vue': code };
            } else if (fw === 'html') {
                project.template = 'html';
                project.files = { 'index.html': code };
            } else if (fw === 'python') {
                return Toast.show('WebContainers Python runtime coming soon. Try React/Vue/HTML.', 'info');
            }

            // Dynamically load StackBlitz SDK if not present
            if (!window.StackBlitzSDK) {
                Toast.show('Loading WebContainer runtime...', 'info', 2000);
                await Helpers.loadScript('https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js');
            }

            // Ensure the embed container exists
            let embedWrap = document.getElementById('stackblitz-embed-wrap');
            if (!embedWrap) {
                embedWrap = document.createElement('div');
                embedWrap.id = 'stackblitz-embed-wrap';
                embedWrap.style.cssText = 'margin-top:20px;';
                embedWrap.innerHTML = `
                    <div class="glass-card-static" style="padding:0; overflow:hidden;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;"></span>
                                <span style="font-size:0.88rem;font-weight:600;color:var(--text);">Live Preview</span>
                            </div>
                            <button class="btn btn-ghost btn-xs" id="close-embed-btn"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div id="stackblitz-embed" style="height:450px;"></div>
                    </div>`;
                document.getElementById('generator-output-area').appendChild(embedWrap);
                document.getElementById('close-embed-btn').addEventListener('click', () => { embedWrap.style.display = 'none'; });
            }
            embedWrap.style.display = 'block';

            Toast.show('Booting Live WebContainer...', 'success');
            window.StackBlitzSDK.embedProject(
                document.getElementById('stackblitz-embed'),
                project,
                { openFile: Object.keys(project.files)[0], height: 450, forceEmbedLayout: true }
            );
        });
    },

    async generateAICode(prompt) {
        document.getElementById('generator-output-area').style.display = 'none';
        document.getElementById('loading-overlay').style.display = 'block';

        const systemPrompt = `You are an expert coder. Write ONLY the code for a ${prompt} component using ${this.currentFramework}. Do NOT include markdown blocks like \`\`\`html or \`\`\`javascript, and do NOT include any explanations. Output pure, valid code.`;
        
        try {
            let code = '';
            try {
                // Try POST endpoint first
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 30000);
                const response = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [{ role: 'user', content: systemPrompt }], model: 'openai' }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!response.ok) throw new Error('POST failed');
                code = await response.text();
            } catch(postErr) {
                // Fallback to GET endpoint
                const encoded = encodeURIComponent(systemPrompt);
                const response = await fetch(`https://text.pollinations.ai/${encoded}`, { method: 'GET' });
                if (!response.ok) throw new Error('GET also failed');
                code = await response.text();
            }
            
            // Cleanup markdown fences
            code = code.replace(/^```[a-zA-Z]*\n?/gm, '').replace(/\n?```$/gm, '').trim();

            document.getElementById('loading-overlay').style.display = 'none';
            document.getElementById('generator-output-area').style.display = 'block';
            document.getElementById('output-fw-tag').textContent = this.currentFramework.toUpperCase();
            
            const el = document.getElementById('code-output');
            el.textContent = '';
            this.typeCode(el, code, 0);
        } catch(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            Toast.show('Failed to generate code. The AI service may be temporarily down. Try again.', 'error');
        }
    },

    typeCode(element, code, index) {
        if (index < code.length) {
            const chunk = Math.max(1, Math.floor(code.length / 50));
            element.textContent = code.substring(0, index + chunk);
            requestAnimationFrame(() => this.typeCode(element, code, index + chunk));
        } else {
            element.textContent = code;
        }
    }
};
