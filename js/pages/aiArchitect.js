const AiArchitectPage = {
    render() {
        Navbar.renderTopbar('AI Architect');
        const content = document.getElementById('page-content');
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>AI Architecture <span class="text-gradient">Builder</span></h1>
                    <p>Describe your project. Our AI will engineer a best-practice architecture, generate the file tree, and optionally boot a live sandbox environment.</p>
                </div>
                
                <div class="glass-card mb-lg">
                    <div style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap;">
                        <span style="flex:1; min-width:300px;">
                            <label class="text-xs text-muted mb-sm" style="display:block;">Project Blueprint</label>
                            <input type="text" id="ai-arch-prompt" class="input-field" placeholder="e.g. A realtime chat app with Next.js, Tailwind, and a Node.js Socket.io backend..." style="width:100%;">
                        </span>
                        <button class="btn btn-primary" id="ai-arch-btn"><i class="fa-solid fa-wand-magic-sparkles"></i> Design Architecture</button>
                    </div>
                </div>

                <div class="grid-2" id="ai-arch-results" style="display:none; gap: 20px;">
                    <div class="glass-card flex-col">
                        <div class="flex-between mb-md">
                            <h3><i class="fa-solid fa-diagram-project" style="color:var(--primary-light); margin-right:8px;"></i> Generated Architecture</h3>
                        </div>
                        <div id="ai-arch-tree" style="background:rgba(0,0,0,0.4); padding:16px; border-radius:var(--radius); border:1px solid var(--border); overflow-y:auto; flex:1; min-height:300px;">
                        </div>
                    </div>
                    
                    <div class="flex-col" style="gap:20px;">
                        <div class="glass-card">
                            <h3 class="mb-sm"><i class="fa-solid fa-terminal" style="color:var(--success); margin-right:8px;"></i> Setup Script</h3>
                            <p class="text-xs text-muted mb-md">Run this single terminal command to globally scaffold the entire project instantly.</p>
                            <div style="position:relative;">
                                <div style="background:#0a0a0f; padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                                    <pre id="ai-arch-cmd" style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text); white-space:pre-wrap;"></pre>
                                </div>
                                <button class="btn btn-ghost btn-xs" id="ai-copy-cmd" style="position:absolute; top:8px; right:8px;"><i class="fa-solid fa-copy"></i></button>
                            </div>
                        </div>

                        <div class="glass-card">
                            <div class="flex-between mb-sm align-start">
                                <div>
                                    <h3><i class="fa-solid fa-laptop-code" style="color:#06b6d4; margin-right:8px;"></i> Live Sandbox</h3>
                                    <p class="text-xs text-muted mt-xs">Boot this architecture into an active WebContainer. (Supports Node/Web frameworks)</p>
                                </div>
                            </div>
                            <button class="btn btn-primary w-100 mt-md" id="ai-boot-btn"><i class="fa-solid fa-play"></i> Boot Sandbox Environment</button>
                        </div>
                    </div>
                </div>
                
                <div id="ws-stackblitz-wrap" style="display:none; margin-top:30px;">
                    <div class="glass-card-static" style="padding:0; overflow:hidden;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block; box-shadow: 0 0 10px #22c55e;"></span>
                                <span style="font-size:0.88rem;font-weight:600;color:var(--text);" id="ws-embed-title">Live Architecture Sandbox</span>
                            </div>
                            <button class="btn btn-ghost btn-xs" id="ws-close-embed"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div id="ws-stackblitz-embed" style="height:550px;"></div>
                    </div>
                </div>
            </div>

            <style>
                .folder-tree { list-style: none; padding-left: 20px; font-family: var(--font-mono); font-size: 13px; line-height: 1.8; position: relative; }
                .folder-tree::before { content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background: rgba(255,255,255,0.1); }
                .folder-tree li { position: relative; padding-left: 15px; }
                .folder-tree li::before { content: ""; position: absolute; top: 12px; left: -20px; width: 30px; height: 1px; background: rgba(255,255,255,0.1); }
                .folder-tree .dir-label { font-weight: 600; color: var(--primary-light); display:flex; align-items:center; gap:6px; cursor:pointer; }
                .folder-tree .file-label { color: var(--text-secondary); display:flex; align-items:center; gap:6px; }
                .folder-tree i { font-size: 11px; opacity: 0.8; }
            </style>
        `;
        
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('ai-arch-btn').addEventListener('click', () => this.generateArchitecture());
        document.getElementById('ai-arch-prompt').addEventListener('keydown', e => {
            if(e.key === 'Enter') this.generateArchitecture();
        });
        
        document.getElementById('ai-copy-cmd').addEventListener('click', () => {
            const cmd = document.getElementById('ai-arch-cmd').textContent;
            Helpers.copyToClipboard(cmd);
            Toast.show('Command copied!', 'success');
        });
        
        document.getElementById('ai-boot-btn').addEventListener('click', () => this.bootSandbox());
        document.getElementById('ws-close-embed').addEventListener('click', () => {
            document.getElementById('ws-stackblitz-wrap').style.display = 'none';
        });
    },

    currentProjectState: null,

    async generateArchitecture() {
        const prompt = document.getElementById('ai-arch-prompt').value.trim();
        if(!prompt) return Toast.show('Please describe your project first.', 'warning');
        
        const btn = document.getElementById('ai-arch-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Designing...';
        btn.disabled = true;

        try {
            const sysPrompt = `You are an expert Software Architect. Return ONLY raw, valid JSON representing the folder structure and setup command for the user's requested project.
JSON format expected:
{
  "setupCommand": "string (a single 1-line bash script using mkdir -p and touch to build the folder structure globally)",
  "tree": {
     "folderName": {
        "subFolder": {
           "file.txt": "content or simply '...'"
        },
        "file.js": "content..."
     }
  },
  "flatFiles": {
    "package.json": "{ \\"name\\": \\"app\\" }",
    "index.js": "console.log('hi')"
  }
}
If they ask for a Web framework like Next.js, React, or Node, inject some boilerplate into flatFiles object so it can be booted in a basic StackBlitz WebContainer. Use 'flatFiles' keys formatted exactly block relative paths (e.g. 'src/index.js' or 'package.json').`;

            const abortController = new AbortController();
            const timeout = setTimeout(() => abortController.abort(), 20000);

            let res;
            try {
                res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: sysPrompt },
                            { role: 'user', content: prompt }
                        ],
                        jsonMode: true
                    }),
                    signal: abortController.signal
                });
            } catch(e) { /* fallback below */ }
            clearTimeout(timeout);

            if(!res || !res.ok) {
                res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(sysPrompt + "\nUser request: " + prompt));
            }

            let text = await res.text();
            
            // Clean markdown JSON wrapper if exists
            text = text.replace(/^```(json)?/m, '').replace(/```$/m, '').trim();
            const data = JSON.parse(text);

            this.currentProjectState = data;
            
            // Render the DOM Tree recursively
            const renderTree = (node) => {
                if(typeof node !== 'object' || node === null) return '';
                let html = '<ul class="folder-tree">';
                for(let key in node) {
                    if(typeof node[key] === 'object') {
                        html += `<li><div class="dir-label"><i class="fa-solid fa-folder"></i> ${Helpers.escapeHtml(key)}/</div>${renderTree(node[key])}</li>`;
                    } else {
                        html += `<li><div class="file-label"><i class="fa-regular fa-file-code"></i> ${Helpers.escapeHtml(key)}</div></li>`;
                    }
                }
                html += '</ul>';
                return html;
            };

            document.getElementById('ai-arch-tree').innerHTML = renderTree(data.tree || { "root": data.flatFiles });
            document.getElementById('ai-arch-cmd').textContent = data.setupCommand || "echo 'No command provided'";
            document.getElementById('ai-arch-results').style.display = 'grid';
            Toast.show('Architecture built successfully!', 'success');

        } catch (err) {
            console.error(err);
            Toast.show('AI failed to build architecture. Please try again.', 'error');
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Design Architecture';
            btn.disabled = false;
        }
    },

    async bootSandbox() {
        if(!this.currentProjectState?.flatFiles) {
            return Toast.show('No runnable files detected. Only standard Web/Node structures can be booted.', 'error');
        }

        const btn = document.getElementById('ai-boot-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booting Environment...';
        btn.disabled = true;

        if (!window.StackBlitzSDK) {
            Toast.show('Loading WebContainer runtime...', 'info', 2000);
            await Helpers.loadScript('https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js');
        }

        const project = {
            title: 'AI Generated Architecture',
            description: 'Booted from Vertex Developer Toolkit',
            template: 'node',
            files: this.currentProjectState.flatFiles || {}
        };

        const embedWrap = document.getElementById('ws-stackblitz-wrap');
        embedWrap.style.display = 'block';
        embedWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

        Toast.show('Deploying to Sandbox...', 'success');
        window.StackBlitzSDK.embedProject(
            document.getElementById('ws-stackblitz-embed'),
            project,
            { openFile: Object.keys(project.files)[0], height: 550, forceEmbedLayout: true }
        );
        
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Boot Sandbox Environment';
        btn.disabled = false;
    }
};
