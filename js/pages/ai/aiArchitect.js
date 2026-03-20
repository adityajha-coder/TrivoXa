const AiArchitectMixin = {
    bindArchitect() {
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
        document.getElementById('arch-close-embed').addEventListener('click', () => {
            document.getElementById('arch-stackblitz-wrap').style.display = 'none';
        });

        const suggestionsArea = document.getElementById('ai-arch-suggestions');
        if(suggestionsArea) {
            suggestionsArea.addEventListener('click', (e) => {
                if(e.target.classList.contains('ai-suggest-chip')) {
                    document.getElementById('ai-arch-prompt').value = e.target.dataset.q;
                    this.generateArchitecture();
                }
            });
        }
    },

    async generateArchitecture() {
        const prompt = document.getElementById('ai-arch-prompt').value.trim();
        if(!prompt) return Toast.show('Please describe your project first.', 'warning');
        
        const btn = document.getElementById('ai-arch-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Designing...';
        btn.disabled = true;

        try {
            const sysPrompt = `You are a JSON API. You MUST return ONLY a single raw JSON object with NO markdown, NO explanation, NO emoji, and NO text before or after the JSON. Do not wrap with code fences.
JSON schema:
{"setupCommand":"mkdir -p ... && touch ...","tree":{"src":{"index.js":"..."},"package.json":"..."},"flatFiles":{"package.json":"{}","src/index.js":"..."}}
Rules: setupCommand is a single bash line. tree is nested folders/files. flatFiles has relative path keys with file content values for StackBlitz. Respond with ONLY the JSON object.`;

            const abortController = new AbortController();
            const timeout = setTimeout(() => abortController.abort(), 25000);

            let res;
            try {
                res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: sysPrompt },
                            { role: 'user', content: 'Project: ' + prompt + '. Return ONLY JSON, no markdown.' }
                        ],
                        jsonMode: true,
                        model: this.currentAiModel
                    }),
                    signal: abortController.signal
                });
            } catch(e) { /* fallback below */ }
            clearTimeout(timeout);

            if(!res || !res.ok) {
                const fallbackPrompt = sysPrompt + '\nProject: ' + prompt + '. Return ONLY JSON.';
                res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(fallbackPrompt) + `?model=${this.currentAiModel}`);
            }

            let text = await res.text();
            
            text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
            
            let data = null;
            const startIdx = text.indexOf('{');
            const endIdx = text.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
                try {
                    data = JSON.parse(text.slice(startIdx, endIdx + 1));
                } catch(innerErr) {
                    try {
                        let cleaned = text.slice(startIdx, endIdx + 1);
                        cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                        data = JSON.parse(cleaned);
                    } catch(cleanErr) {
                        console.warn('AI Architect: Could not parse AI response, using smart fallback.');
                        data = null;
                    }
                }
            }

            if (!data || (!data.tree && !data.flatFiles)) {
                data = this._buildFallbackArch(prompt);
            }

            this.currentProjectState = data;
            
            const renderTree = (node) => {
                if(typeof node !== 'object' || node === null) return '';
                let html = '<ul class="folder-tree">';
                for(let key in node) {
                    if(typeof node[key] === 'object' && node[key] !== null) {
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
            console.error('Architect AI error:', err);
            try {
                const data = this._buildFallbackArch(prompt);
                this.currentProjectState = data;
                const renderTree = (node) => {
                    if(typeof node !== 'object' || node === null) return '';
                    let html = '<ul class="folder-tree">';
                    for(let key in node) {
                        if(typeof node[key] === 'object' && node[key] !== null) {
                            html += `<li><div class="dir-label"><i class="fa-solid fa-folder"></i> ${Helpers.escapeHtml(key)}/</div>${renderTree(node[key])}</li>`;
                        } else {
                            html += `<li><div class="file-label"><i class="fa-regular fa-file-code"></i> ${Helpers.escapeHtml(key)}</div></li>`;
                        }
                    }
                    html += '</ul>';
                    return html;
                };
                document.getElementById('ai-arch-tree').innerHTML = renderTree(data.tree);
                document.getElementById('ai-arch-cmd').textContent = data.setupCommand;
                document.getElementById('ai-arch-results').style.display = 'grid';
                Toast.show('Generated architecture using smart fallback.', 'info');
            } catch(fallbackErr) {
                Toast.show('AI failed to build architecture. Please try again.', 'error');
            }
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Design Architecture';
            btn.disabled = false;
        }
    },

    _buildFallbackArch(prompt) {
        const p = prompt.toLowerCase();
        const isReact = p.includes('react') || p.includes('next');
        const isVue = p.includes('vue');
        const isNode = p.includes('node') || p.includes('express') || p.includes('api') || p.includes('backend') || p.includes('server');
        const isPython = p.includes('python') || p.includes('django') || p.includes('flask');
        
        let tree, setupCommand, flatFiles;

        if (isReact) {
            tree = { 'src': { 'components': { 'App.jsx': '...', 'Header.jsx': '...', 'Footer.jsx': '...' }, 'pages': { 'Home.jsx': '...', 'About.jsx': '...' }, 'hooks': { 'useAuth.js': '...' }, 'utils': { 'api.js': '...' }, 'styles': { 'globals.css': '...' }, 'index.jsx': '...' }, 'public': { 'index.html': '...', 'favicon.ico': '...' }, 'package.json': '...', '.gitignore': '...', 'README.md': '...' };
            setupCommand = 'npx create-react-app my-app && cd my-app && mkdir -p src/components src/pages src/hooks src/utils src/styles';
            flatFiles = { 'package.json': '{"name":"app","scripts":{"start":"react-scripts start"},"dependencies":{"react":"^18","react-dom":"^18","react-scripts":"5"}}', 'src/index.jsx': 'import React from "react";\nimport {createRoot} from "react-dom/client";\nimport App from "./components/App";\ncreateRoot(document.getElementById("root")).render(<App/>);', 'public/index.html': '<!DOCTYPE html><html><head><title>App</title></head><body><div id="root"></div></body></html>', 'src/components/App.jsx': 'import React from "react";\nexport default function App(){return <div><h1>Hello World</h1></div>}' };
        } else if (isVue) {
            tree = { 'src': { 'components': { 'HelloWorld.vue': '...' }, 'views': { 'HomeView.vue': '...' }, 'router': { 'index.js': '...' }, 'assets': { 'main.css': '...' }, 'App.vue': '...', 'main.js': '...' }, 'public': { 'index.html': '...' }, 'package.json': '...', 'vite.config.js': '...' };
            setupCommand = 'npm create vue@latest my-vue-app -- --default && cd my-vue-app && npm install';
            flatFiles = { 'package.json': '{"name":"vue-app","scripts":{"dev":"vite"},"dependencies":{"vue":"^3"}}' };
        } else if (isPython) {
            tree = { 'app': { '__init__.py': '...', 'main.py': '...', 'models.py': '...', 'routes.py': '...', 'config.py': '...' }, 'tests': { 'test_main.py': '...' }, 'static': { 'css': { 'style.css': '...' } }, 'templates': { 'base.html': '...', 'index.html': '...' }, 'requirements.txt': '...', 'README.md': '...', '.gitignore': '...' };
            setupCommand = 'mkdir -p app tests static/css templates && touch app/__init__.py app/main.py app/models.py app/routes.py app/config.py tests/test_main.py requirements.txt README.md .gitignore static/css/style.css templates/base.html templates/index.html';
            flatFiles = null;
        } else if (isNode) {
            tree = { 'src': { 'routes': { 'index.js': '...', 'users.js': '...', 'auth.js': '...' }, 'controllers': { 'userController.js': '...' }, 'middleware': { 'auth.js': '...', 'errorHandler.js': '...' }, 'models': { 'User.js': '...' }, 'config': { 'db.js': '...' }, 'app.js': '...', 'server.js': '...' }, 'tests': { 'users.test.js': '...' }, 'package.json': '...', '.env.example': '...', '.gitignore': '...', 'README.md': '...' };
            setupCommand = 'mkdir -p src/routes src/controllers src/middleware src/models src/config tests && touch src/app.js src/server.js src/routes/index.js src/routes/users.js src/routes/auth.js src/controllers/userController.js src/middleware/auth.js src/middleware/errorHandler.js src/models/User.js src/config/db.js package.json .env.example .gitignore README.md tests/users.test.js';
            flatFiles = { 'package.json': '{"name":"node-api","main":"src/server.js","scripts":{"start":"node src/server.js","dev":"node --watch src/server.js"},"dependencies":{"express":"^4.18.0"}}', 'src/server.js': 'const app = require("./app");\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`Server running on port ${PORT}`));', 'src/app.js': 'const express = require("express");\nconst app = express();\napp.use(express.json());\napp.get("/", (req, res) => res.json({message:"API is running"}));\nmodule.exports = app;' };
        } else {
            tree = { 'src': { 'index.js': '...', 'utils.js': '...' }, 'public': { 'index.html': '...', 'style.css': '...' }, 'tests': { 'index.test.js': '...' }, 'package.json': '...', 'README.md': '...', '.gitignore': '...' };
            setupCommand = 'mkdir -p src public tests && touch src/index.js src/utils.js public/index.html public/style.css tests/index.test.js package.json README.md .gitignore';
            flatFiles = { 'package.json': '{"name":"my-project","scripts":{"start":"node src/index.js"}}', 'src/index.js': 'console.log("Hello from my project!");' };
        }

        return { setupCommand, tree, flatFiles };
    },

    async bootSandbox() {
        if(!this.currentProjectState?.flatFiles) {
            return Toast.show('No runnable files detected. Only standard Web/Node structures can be booted.', 'error');
        }

        const btn = document.getElementById('ai-boot-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booting...';
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

        const embedWrap = document.getElementById('arch-stackblitz-wrap');
        embedWrap.style.display = 'block';
        embedWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

        Toast.show('Deploying to Sandbox...', 'success');
        window.StackBlitzSDK.embedProject(
            document.getElementById('arch-stackblitz-embed'),
            project,
            { openFile: Object.keys(project.files)[0], height: 550, forceEmbedLayout: true }
        );
        
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Boot Sandbox';
        btn.disabled = false;
    }
};
