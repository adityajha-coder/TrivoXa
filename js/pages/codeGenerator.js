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
                            <button class="btn btn-secondary btn-sm" id="copy-code-btn">
                                <i class="fa-solid fa-copy"></i> Copy Code
                            </button>
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
    },

    async generateAICode(prompt) {
        document.getElementById('generator-output-area').style.display = 'none';
        document.getElementById('loading-overlay').style.display = 'block';

        const sysPrompt = `You are an expert coder. Write ONLY the code for a ${prompt} component using ${this.currentFramework}. Do NOT include markdown blocks like \`\`\`html or \`\`\`javascript, and do NOT include any explanations. Output pure, valid code.`;
        
        try {
            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(sysPrompt)}`);
            if(!response.ok) throw new Error('Generation failed');
            
            let code = await response.text();
            
            // basic cleanup in case AI ignores instructions
            code = code.replace(/^\`\`\`[a-z]*\\n?/m, '').replace(/\\n?\`\`\`$/m, '');

            document.getElementById('loading-overlay').style.display = 'none';
            document.getElementById('generator-output-area').style.display = 'block';
            document.getElementById('output-fw-tag').textContent = this.currentFramework.toUpperCase();
            
            const el = document.getElementById('code-output');
            el.textContent = '';
            this.typeCode(el, code, 0);
        } catch(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            Toast.show('Failed to generate code. Try again.', 'error');
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
