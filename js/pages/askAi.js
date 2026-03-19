const AskAiPage = {
    roleData: {
        web: { title: 'Build Websites', desc: 'Everything you need to go from idea to deployed website.', stack: [
            { name: 'HTML/CSS/JS', type: 'Foundation', desc: 'Core web technologies — start here', icon: 'fa-brands fa-html5', color: '#e34f26' },
            { name: 'React / Vue', type: 'Framework', desc: 'Build dynamic, component-based UIs', icon: 'fa-brands fa-react', color: '#61dafb' },
            { name: 'Tailwind CSS', type: 'Styling', desc: 'Utility-first CSS for rapid UI development', icon: 'fa-solid fa-palette', color: '#06b6d4' },
            { name: 'Vercel / Netlify', type: 'Hosting', desc: 'Deploy instantly with git push', icon: 'fa-solid fa-rocket', color: '#3ecf6e' },
            { name: 'REST APIs', type: 'Data', desc: 'Fetch data from external services', icon: 'fa-solid fa-plug', color: 'var(--primary-light)' },
            { name: 'GitHub Pages', type: 'Free Hosting', desc: 'Host static sites directly from your repo', icon: 'fa-brands fa-github', color: '#e8e4dc' }
        ]},
        mobile: { title: 'Build Mobile Apps', desc: 'Create cross-platform mobile applications for iOS and Android.', stack: [
            { name: 'React Native', type: 'Framework', desc: 'Build native apps with React and JS', icon: 'fa-brands fa-react', color: '#61dafb' },
            { name: 'Expo', type: 'Toolchain', desc: 'Fastest way to build React Native apps', icon: 'fa-solid fa-bolt', color: 'var(--primary-light)' },
            { name: 'Flutter', type: 'Framework', desc: 'Google UI toolkit for mobile, web, desktop', icon: 'fa-solid fa-feather', color: '#02569B' },
            { name: 'Firebase', type: 'Backend', desc: 'Auth, database, storage, hosting', icon: 'fa-solid fa-fire', color: '#f0a030' },
            { name: 'AsyncStorage', type: 'Storage', desc: 'Simple key-value local storage', icon: 'fa-solid fa-database', color: '#8b5cf6' },
            { name: 'Play Store / App Store', type: 'Distribution', desc: 'Publish to millions of users', icon: 'fa-solid fa-store', color: '#3ecf6e' }
        ]},
        ai: { title: 'Learn AI / ML', desc: 'Get started with artificial intelligence — from APIs to training models.', stack: [
            { name: 'OpenAI API', type: 'AI API', desc: 'GPT models for text generation', icon: 'fa-solid fa-brain', color: '#10a37f' },
            { name: 'TensorFlow.js', type: 'ML Library', desc: 'Run ML models in the browser', icon: 'fa-solid fa-robot', color: '#ff6f00' },
            { name: 'Hugging Face', type: 'Models Hub', desc: 'Thousands of pre-trained models', icon: 'fa-solid fa-face-smile', color: '#ffd21e' },
            { name: 'Python + Jupyter', type: 'Environment', desc: 'Standard toolkit for data science', icon: 'fa-brands fa-python', color: '#3776ab' },
            { name: 'Kaggle', type: 'Datasets', desc: 'Free datasets and competitions', icon: 'fa-solid fa-chart-line', color: '#20beff' },
            { name: 'Replicate', type: 'Inference', desc: 'Run ML models via API calls', icon: 'fa-solid fa-cloud', color: '#8b5cf6' }
        ]},
        backend: { title: 'Build Backend / APIs', desc: 'Learn server-side applications, REST APIs, and databases.', stack: [
            { name: 'Node.js', type: 'Runtime', desc: 'JavaScript on the server', icon: 'fa-brands fa-node-js', color: '#339933' },
            { name: 'Express.js', type: 'Framework', desc: 'Minimal web framework for Node', icon: 'fa-solid fa-server', color: '#e8e4dc' },
            { name: 'PostgreSQL', type: 'Database', desc: 'Powerful relational database', icon: 'fa-solid fa-database', color: '#336791' },
            { name: 'MongoDB', type: 'Database', desc: 'Flexible NoSQL document DB', icon: 'fa-solid fa-leaf', color: '#47A248' },
            { name: 'JWT / OAuth', type: 'Auth', desc: 'Secure authentication', icon: 'fa-solid fa-shield-halved', color: 'var(--error)' },
            { name: 'Postman', type: 'Testing', desc: 'Test and debug APIs', icon: 'fa-solid fa-paper-plane', color: '#ff6c37' }
        ]},
        devops: { title: 'DevOps & Deployment', desc: 'Automate deployments, containerize apps, and manage infrastructure.', stack: [
            { name: 'Docker', type: 'Containers', desc: 'Package apps into containers', icon: 'fa-brands fa-docker', color: '#2496ed' },
            { name: 'GitHub Actions', type: 'CI/CD', desc: 'Automate build/test/deploy', icon: 'fa-brands fa-github', color: '#e8e4dc' },
            { name: 'AWS / GCP', type: 'Cloud', desc: 'Scalable cloud platforms', icon: 'fa-brands fa-aws', color: '#ff9900' },
            { name: 'Nginx', type: 'Web Server', desc: 'Reverse proxy and load balancer', icon: 'fa-solid fa-globe', color: '#009639' },
            { name: 'Terraform', type: 'IaC', desc: 'Infrastructure as code', icon: 'fa-solid fa-cubes', color: '#7b42bc' },
            { name: 'Linux / Bash', type: 'OS', desc: 'Server administration skills', icon: 'fa-brands fa-linux', color: '#fcc624' }
        ]},
        game: { title: 'Build Games', desc: 'Create 2D and 3D games for web, mobile, or desktop.', stack: [
            { name: 'Three.js', type: '3D Engine', desc: '3D experiences in the browser', icon: 'fa-solid fa-cube', color: 'var(--primary-light)' },
            { name: 'Phaser', type: '2D Engine', desc: 'Fast HTML5 game framework', icon: 'fa-solid fa-gamepad', color: '#ec4899' },
            { name: 'Unity', type: 'Game Engine', desc: 'Industry-standard engine', icon: 'fa-solid fa-dice-d20', color: '#e8e4dc' },
            { name: 'Godot', type: 'Game Engine', desc: 'Free open-source alternative', icon: 'fa-solid fa-gem', color: '#478cbf' },
            { name: 'PixiJS', type: '2D Renderer', desc: 'Super fast WebGL rendering', icon: 'fa-solid fa-star', color: '#ff6f91' },
            { name: 'Socket.io', type: 'Multiplayer', desc: 'Real-time multiplayer', icon: 'fa-solid fa-network-wired', color: '#06b6d4' }
        ]}
    },

    recommendations: {
        'weather': { reply: 'Great choice! Here\'s what you need:', tools: [{ name: 'OpenWeather API', why: 'Free weather data with forecasts' }, { name: 'React or Vanilla JS', why: 'Build the UI and handle API calls' }, { name: 'Chart.js', why: 'Visualize temperature trends' }, { name: 'Vercel', why: 'Deploy for free with one click' }] },
        'todo': { reply: 'A todo app is perfect for learning CRUD!', tools: [{ name: 'React + useState', why: 'Component state for task management' }, { name: 'LocalStorage API', why: 'Persist tasks without a backend' }, { name: 'CSS Modules or Tailwind', why: 'Clean, scoped styling' }, { name: 'Netlify', why: 'Free static hosting' }] },
        'portfolio': { reply: 'A portfolio showcases your work!', tools: [{ name: 'Next.js or Astro', why: 'SEO-friendly static site generation' }, { name: 'Framer Motion', why: 'Smooth animations and transitions' }, { name: 'GitHub API', why: 'Auto-fetch your latest projects' }, { name: 'Vercel', why: 'Deploy directly from your repo' }] },
        'chat': { reply: 'Real-time chat is a fantastic project!', tools: [{ name: 'Socket.io', why: 'Real-time bidirectional communication' }, { name: 'Node.js + Express', why: 'Handle WebSocket connections' }, { name: 'React', why: 'Dynamic message UI' }, { name: 'MongoDB', why: 'Store chat history and users' }] },
        'ecommerce': { reply: 'E-commerce covers a lot of skills!', tools: [{ name: 'Next.js', why: 'SSR for product pages' }, { name: 'Stripe API', why: 'Secure payment processing' }, { name: 'Supabase or Firebase', why: 'Database, auth, and storage' }, { name: 'Cloudinary', why: 'Image optimization and hosting' }] },
        'blog': { reply: 'Blogs are great for content-driven sites!', tools: [{ name: 'Astro or Next.js', why: 'Static site generation with markdown' }, { name: 'Markdown', why: 'Write content in simple format' }, { name: 'Contentlayer or MDX', why: 'Transform markdown into components' }, { name: 'Vercel', why: 'Free hosting with ISR support' }] },
        'game': { reply: 'Game development is super fun!', tools: [{ name: 'Phaser.js', why: 'Easy 2D HTML5 game framework' }, { name: 'Three.js', why: '3D graphics in the browser' }, { name: 'Howler.js', why: 'Audio playback for sound effects' }, { name: 'GitHub Pages', why: 'Free hosting for web games' }] },
        'api': { reply: 'Building APIs teaches backend fundamentals!', tools: [{ name: 'Node.js + Express', why: 'Fast, minimal server framework' }, { name: 'PostgreSQL', why: 'Reliable relational database' }, { name: 'JWT', why: 'Token-based authentication' }, { name: 'Swagger', why: 'Auto-generate API docs' }] },
        'mobile': { reply: 'Mobile apps reach billions of users!', tools: [{ name: 'React Native + Expo', why: 'Cross-platform with hot reload' }, { name: 'Firebase', why: 'Auth, Firestore, push notifications' }, { name: 'React Navigation', why: 'Smooth screen transitions' }, { name: 'EAS Build', why: 'Build and submit to stores' }] },
        'dashboard': { reply: 'Dashboards are great for data viz!', tools: [{ name: 'React + Recharts', why: 'Beautiful interactive charts' }, { name: 'REST API or GraphQL', why: 'Fetch real-time data' }, { name: 'Tailwind CSS', why: 'Responsive grid layouts' }, { name: 'Vercel', why: 'Fast deployment' }] },
        'social': { reply: 'Social apps cover many concepts!', tools: [{ name: 'Next.js', why: 'SSR for fast page loads' }, { name: 'Supabase', why: 'Auth, real-time DB, file storage' }, { name: 'Socket.io', why: 'Live notifications' }, { name: 'Cloudinary', why: 'Image/video uploads' }] }
    },

    currentProjectState: null,
    currentFramework: 'html',
    currentAiModel: localStorage.getItem('vertex_ai_model') || 'openai',
    
    archSuggestions: [
        "Scalable Node.js Microservices", "React native chat app", 
        "Python E-commerce with Django", "Vue 3 SSR blog", 
        "Next.js Portfolio", "Express REST API template",
        "Fullstack SvelteKit store"
    ],

    render() {
        Navbar.renderTopbar('Ask AI');
        const content = document.getElementById('page-content');
        
        const archSuggestHtml = this.archSuggestions.sort(() => 0.5 - Math.random()).slice(0, 4)
            .map(s => `<button class="ai-suggest-chip" data-q="${s}">${s}</button>`).join('');

        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header flex-between" style="align-items:flex-start; flex-wrap:wrap; gap:16px;">
                    <div>
                        <h1>AI <span class="text-gradient">Hub</span></h1>
                        <p>Chat with AI, design project architectures, analyze code, and explore curated tech stacks.</p>
                    </div>
                    <div class="form-group" style="min-width: 160px;">
                        <label class="text-xs text-muted mb-xs" style="display:block;">AI Model</label>
                        <select id="ai-model-select" class="input-field" style="padding: 8px 12px; font-size: 0.85rem; height:auto; background: #000; color: #fff; appearance: none; -webkit-appearance: none; cursor: pointer;">
                            <option value="openai" ${this.currentAiModel === 'openai' ? 'selected' : ''}>OpenAI (Default)</option>
                            <option value="mistral" ${this.currentAiModel === 'mistral' ? 'selected' : ''}>Mistral AI</option>
                            <option value="claude" ${this.currentAiModel === 'claude' ? 'selected' : ''}>Claude</option>
                            <option value="llama" ${this.currentAiModel === 'llama' ? 'selected' : ''}>Llama 3</option>
                        </select>
                    </div>
                </div>

                <!-- Unified Tabs -->
                <div class="tabs mb-lg" id="ai-hub-tabs">
                    <button class="tab-item active" data-tab="chat"><i class="fa-solid fa-comments" style="margin-right:6px;"></i>AI Chat</button>
                    <button class="tab-item" data-tab="architect"><i class="fa-solid fa-code-merge" style="margin-right:6px;"></i>Architect</button>
                    <button class="tab-item" data-tab="codegen"><i class="fa-solid fa-laptop-code" style="margin-right:6px;"></i>Generator</button>
                    <button class="tab-item" data-tab="analyzer"><i class="fa-solid fa-microscope" style="margin-right:6px;"></i>Analyzer</button>
                    <button class="tab-item" data-tab="stacks"><i class="fa-solid fa-compass" style="margin-right:6px;"></i>Stacks</button>
                </div>

                <!-- ===== TAB 1: AI CHAT ===== -->
                <div id="ai-tab-chat">
                    <div class="glass-card-static ai-chat-section mb-lg">
                        <div class="ai-chat-header">
                            <div class="flex-gap">
                                <div class="ai-bot-avatar"><i class="fa-solid fa-robot"></i></div>
                                <div>
                                    <h3 style="font-size:0.95rem;font-weight:600;">Vertex AI Assistant</h3>
                                    <span class="text-xs text-muted">Ask anything — code help, tool recommendations, or explanations</span>
                                </div>
                            </div>
                            <button class="btn btn-ghost btn-xs" id="ai-clear-chat" title="Clear chat"><i class="fa-solid fa-broom"></i></button>
                        </div>
                        <div class="ai-bot-messages" id="ai-bot-messages" style="min-height:200px;max-height:500px;">
                            <div class="ai-msg bot-msg">
                                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                                <div class="msg-bubble">Hi! I'm your Vertex AI assistant. I can:<br>
                                    <strong>1.</strong> Recommend tools for any project idea<br>
                                    <strong>2.</strong> Explain code like you're a beginner<br>
                                    <strong>3.</strong> Debug errors and suggest fixes<br>
                                    <strong>4.</strong> Answer any programming question<br><br>
                                    Try asking something or click a quick action below! 👇
                                </div>
                            </div>
                        </div>
                        <div class="ai-bot-input-area" style="flex-direction: column; align-items: flex-end; gap: 8px;">
                            <textarea class="input-field" id="ai-bot-input" placeholder='Ask anything... "How do I deploy to Vercel?", "Explain this code...", "I want to build a..."' style="width: 100%; min-height: 60px; resize: vertical; padding-right: 12px; font-family: inherit; line-height: 1.5;"></textarea>
                            <div class="flex-between" style="width: 100%;">
                                <div class="flex-gap">
                                    <button class="btn btn-ghost btn-sm" id="ai-bot-explain" style="color:var(--primary-light);">
                                        <i class="fa-solid fa-graduation-cap"></i> Explain Code
                                    </button>
                                    <button class="btn btn-ghost btn-sm" id="ai-bot-debug" style="color:var(--error);">
                                        <i class="fa-solid fa-bug"></i> Debug Error
                                    </button>
                                </div>
                                <button class="btn btn-primary" id="ai-bot-send" style="min-width: 45px;"><i class="fa-solid fa-paper-plane"></i></button>
                            </div>
                        </div>
                        <div class="ai-bot-suggestions">
                            <button class="ai-suggest-chip" data-q="I want to build a weather app">🌤 Weather App</button>
                            <button class="ai-suggest-chip" data-q="I want to build a portfolio website">💼 Portfolio</button>
                            <button class="ai-suggest-chip" data-q="I want to build a chat application">💬 Chat App</button>
                            <button class="ai-suggest-chip" data-q="I want to build an e-commerce store">🛒 E-commerce</button>
                            <button class="ai-suggest-chip" data-q="What is the difference between REST and GraphQL?">🔗 REST vs GraphQL</button>
                            <button class="ai-suggest-chip" data-q="How do I use Git branches?">🌿 Git Branching</button>
                        </div>
                    </div>
                </div>

                <!-- ===== TAB 2: AI ARCHITECT ===== -->
                <div id="ai-tab-architect" style="display:none;">
                    <div class="glass-card mb-lg">
                        <div class="flex-gap mb-sm" style="align-items:center;">
                            <div class="ai-bot-avatar" style="width:36px;height:36px;font-size:0.9rem;"><i class="fa-solid fa-folder-tree"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">AI Architecture Builder</h3>
                                <span class="text-xs text-muted">Describe your project and get a full folder structure + setup script</span>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; margin-top:16px;">
                            <span style="flex:1; min-width:280px;">
                                <input type="text" id="ai-arch-prompt" class="input-field" placeholder="e.g. A realtime chat app with Next.js, Tailwind, and a Node.js Socket.io backend..." style="width:100%;">
                            </span>
                            <button class="btn btn-primary" id="ai-arch-btn"><i class="fa-solid fa-wand-magic-sparkles"></i> Design Architecture</button>
                        </div>
                        <div class="ai-bot-suggestions mt-md" id="ai-arch-suggestions" style="justify-content:flex-start;">
                            ${archSuggestHtml}
                        </div>
                    </div>

                    <div class="grid-2" id="ai-arch-results" style="display:none; gap: 20px;">
                        <div class="glass-card flex-col">
                            <div class="flex-between mb-md">
                                <h3><i class="fa-solid fa-diagram-project" style="color:var(--primary-light); margin-right:8px;"></i> Generated Architecture</h3>
                            </div>
                            <div id="ai-arch-tree" style="background:rgba(0,0,0,0.4); padding:16px; border-radius:var(--radius); border:1px solid var(--border); overflow-y:auto; flex:1; min-height:300px;"></div>
                        </div>
                        
                        <div class="flex-col" style="gap:20px;">
                            <div class="glass-card">
                                <h3 class="mb-sm"><i class="fa-solid fa-terminal" style="color:var(--success); margin-right:8px;"></i> Setup Script</h3>
                                <p class="text-xs text-muted mb-md">Run this single terminal command to scaffold the entire project.</p>
                                <div style="position:relative;">
                                    <div style="background:#0a0a0f; padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                                        <pre id="ai-arch-cmd" style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text); white-space:pre-wrap;"></pre>
                                    </div>
                                    <button class="btn btn-ghost btn-xs" id="ai-copy-cmd" style="position:absolute; top:8px; right:8px;"><i class="fa-solid fa-copy"></i></button>
                                </div>
                            </div>
                            <div class="glass-card">
                                <h3 class="mb-sm"><i class="fa-solid fa-laptop-code" style="color:#06b6d4; margin-right:8px;"></i> Live Sandbox</h3>
                                <p class="text-xs text-muted">Boot this architecture into a live WebContainer environment.</p>
                                <button class="btn btn-primary w-100 mt-md" id="ai-boot-btn"><i class="fa-solid fa-play"></i> Boot Sandbox</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="arch-stackblitz-wrap" style="display:none; margin-top:30px;">
                        <div class="glass-card-static" style="padding:0; overflow:hidden;">
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border);">
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block; box-shadow: 0 0 10px #22c55e;"></span>
                                    <span style="font-size:0.88rem;font-weight:600;color:var(--text);">Live Architecture Sandbox</span>
                                </div>
                                <button class="btn btn-ghost btn-xs" id="arch-close-embed"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                            <div id="arch-stackblitz-embed" style="height:550px;"></div>
                        </div>
                    </div>
                </div>

                <!-- ===== TAB 3: CODE GENERATOR ===== -->
                <div id="ai-tab-codegen" style="display:none;">
                    <div class="glass-card mb-lg">
                        <div class="flex-gap mb-sm" style="align-items:center;">
                            <div class="ai-bot-avatar" style="width:36px;height:36px;font-size:0.9rem;"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">AI Code Generator</h3>
                                <span class="text-xs text-muted">Generate production-ready code blocks and run them live</span>
                            </div>
                        </div>
                        <div class="form-group mb-md mt-md">
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
                            <div class="generator-output" style="background:rgba(0,0,0,0.5); padding:16px; border-radius:var(--radius); border:1px solid var(--border); overflow:hidden;">
                                <div id="monaco-code-output" style="height:500px; width:100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== TAB 5: CODE ANALYZER ===== -->
                <div id="ai-tab-analyzer" style="display:none;">
                    <div class="glass-card mb-lg" id="drop-zone" style="border: 2px dashed var(--border); text-align: center; padding: 60px 20px; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fa-solid fa-file-code" style="font-size: 3.5rem; color: var(--primary); margin-bottom: 20px; opacity: 0.8;"></i>
                        <h3 style="font-size: 1.2rem; margin-bottom: 10px; font-weight:600;">Drag & Drop Code File Here</h3>
                        <p class="text-muted text-sm" style="max-width:300px; margin:0 auto;">Supports .js, .py, .cpp, .java, .html, .css, .txt, .md (Max 100KB). The AI will instantly analyze code health, bugs, and Big-O efficiency.</p>
                        <button class="btn btn-secondary mt-md" id="browse-file-btn">Browse File</button>
                        <input type="file" id="file-upload" style="display: none;" accept=".js,.jsx,.ts,.tsx,.py,.cpp,.c,.h,.java,.html,.css,.json,.md,.txt">
                    </div>

                    <div id="analyzer-loading" style="display:none; text-align:center; padding:40px 0;">
                        <div class="spinner" style="margin: 0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                        <p class="text-muted" id="analyzer-status">Scanning structural logic...</p>
                    </div>

                    <div id="analyzer-results" style="display:none; flex-direction: column; gap: 16px;">
                        <div class="flex-between">
                            <h3 style="font-size:1.1rem;"><i class="fa-solid fa-chart-line" style="color:var(--primary-light);margin-right:8px;"></i>Analysis Report: <span id="analyze-filename" class="text-muted text-sm"></span></h3>
                            <button class="btn btn-ghost btn-sm" id="analyze-another-btn"><i class="fa-solid fa-rotate-left"></i> Analyze Another</button>
                        </div>
                        <div class="grid-3" id="analyzer-metrics">
                            <div class="glass-card-static" style="text-align:center; padding:16px;">
                                <h4 class="text-muted text-xs text-uppercase mb-sm"><i class="fa-solid fa-code-branch mb-xs"></i><br>Big-O Complexity</h4>
                                <div id="metric-complexity" style="font-size:1.4rem; font-weight:700; color:var(--text); font-family:var(--font-mono);">--</div>
                            </div>
                            <div class="glass-card-static" style="text-align:center; padding:16px;">
                                <h4 class="text-muted text-xs text-uppercase mb-sm"><i class="fa-solid fa-shield-halved mb-xs"></i><br>Security Vulnerabilities</h4>
                                <div id="metric-security" style="font-size:1.4rem; font-weight:700; color:var(--text);">--</div>
                            </div>
                            <div class="glass-card-static" style="text-align:center; padding:16px;">
                                <h4 class="text-muted text-xs text-uppercase mb-sm"><i class="fa-solid fa-heart-pulse mb-xs"></i><br>Overall Health Score</h4>
                                <div id="metric-score" style="font-size:1.4rem; font-weight:700; color:var(--text);">--</div>
                            </div>
                        </div>
                        <div class="glass-card-static mt-sm">
                            <h4 class="mb-sm text-sm" style="color:var(--primary-light);"><i class="fa-solid fa-magnifying-glass"></i> Deep Review</h4>
                            <div id="analyzer-review" class="text-sm text-secondary" style="line-height: 1.7; white-space: pre-wrap;"></div>
                        </div>
                        <div class="glass-card-static">
                            <h4 class="mb-sm text-sm" style="color:var(--success);"><i class="fa-solid fa-lightbulb"></i> Suggested Improvements</h4>
                            <div id="analyzer-suggestions" class="text-sm text-secondary" style="line-height: 1.7; white-space: pre-wrap;"></div>
                        </div>
                    </div>
                </div>

                <!-- ===== TAB 6: TECH STACKS ===== -->
                <div id="ai-tab-stacks" style="display:none;">
                    <div class="flex-between mb-md">
                        <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>What do you want to build?</h2>
                    </div>
                    <div class="role-cards-grid mb-lg" id="role-cards">
                        ${Object.entries(this.roleData).map(([key, data]) => {
                            const icons = { web:'fa-solid fa-globe', mobile:'fa-solid fa-mobile-screen', ai:'fa-solid fa-brain', backend:'fa-solid fa-server', devops:'fa-solid fa-cloud', game:'fa-solid fa-gamepad' };
                            const colors = { web:'rgba(212,168,67,0.08)', mobile:'rgba(62,207,110,0.06)', ai:'rgba(139,92,246,0.06)', backend:'rgba(240,160,48,0.06)', devops:'rgba(6,182,212,0.06)', game:'rgba(236,72,153,0.06)' };
                            const iconColors = { web:'var(--primary-light)', mobile:'var(--success)', ai:'#8b5cf6', backend:'var(--warning)', devops:'#06b6d4', game:'#ec4899' };
                            return `<div class="role-card" data-role="${key}">
                                <div class="role-icon" style="background:${colors[key]};"><i class="${icons[key]}" style="color:${iconColors[key]};"></i></div>
                                <div class="role-info"><h3>${data.title}</h3><p>${data.stack.slice(0,3).map(s=>s.name).join(', ')}</p></div>
                                <i class="fa-solid fa-chevron-right role-arrow"></i>
                            </div>`;
                        }).join('')}
                    </div>

                    <div class="glass-card-static mb-lg" id="role-detail" style="display:none;padding:24px;">
                        <div class="flex-between mb-md">
                            <h3 id="role-detail-title" style="font-size:1rem;font-weight:600;"></h3>
                            <button class="btn btn-ghost btn-sm" id="role-close"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <p id="role-detail-desc" class="text-sm text-secondary mb-lg" style="line-height:1.6;"></p>
                        <div id="role-detail-stack"></div>
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

        this.bindModelSelect();
        this.bindTabs();
        this.bindChat();
        this.bindArchitect();
        this.bindCodeGen();
        this.bindAnalyzer();
        this.bindRoles();

        Helpers.initMonaco().then(monaco => {
            const container = document.getElementById('monaco-code-output');
            if(container) {
                this.editor = monaco.editor.create(container, {
                    value: '// AI Generated code will appear here...',
                    language: 'javascript',
                    theme: 'vs-dark',
                    minimap: { enabled: false },
                    readOnly: true,
                    automaticLayout: true,
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono',
                    scrollBeyondLastLine: false,
                    roundedSelection: true
                });
            }
        });
    },

    // =================== TAB SWITCHING ===================
    bindModelSelect() {
        const sel = document.getElementById('ai-model-select');
        if(sel) {
            sel.addEventListener('change', (e) => {
                this.currentAiModel = e.target.value;
                localStorage.setItem('vertex_ai_model', this.currentAiModel);
                Toast.show('AI Model switched to ' + this.currentAiModel, 'info');
            });
        }
    },

    bindTabs() {
        document.getElementById('ai-hub-tabs').addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#ai-hub-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;
            document.getElementById('ai-tab-chat').style.display = target === 'chat' ? 'block' : 'none';
            document.getElementById('ai-tab-architect').style.display = target === 'architect' ? 'block' : 'none';
            document.getElementById('ai-tab-codegen').style.display = target === 'codegen' ? 'block' : 'none';
            document.getElementById('ai-tab-analyzer').style.display = target === 'analyzer' ? 'block' : 'none';
            document.getElementById('ai-tab-stacks').style.display = target === 'stacks' ? 'block' : 'none';
        });
    },

    // =================== AI CHAT ===================
    bindChat() {
        const input = document.getElementById('ai-bot-input');
        const send = document.getElementById('ai-bot-send');
        const explain = document.getElementById('ai-bot-explain');
        const debug = document.getElementById('ai-bot-debug');
        
        const handleSend = () => { const q = input.value.trim(); if (!q) return; this.addMsg(q, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        const handleExplain = () => { const code = input.value.trim(); if (!code) return Toast.show('Paste code first, then click Explain', 'warning'); const q = "Explain this code to me like I'm a beginner:\n\n" + code; this.addMsg("Explain this code to me like a beginner:\n" + code, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        const handleDebug = () => { const code = input.value.trim(); if (!code) return Toast.show('Paste the error or code first', 'warning'); const q = "Debug this error or code. Tell me what's wrong and how to fix it:\n\n" + code; this.addMsg("Debug this:\n" + code, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        
        send.addEventListener('click', handleSend);
        explain.addEventListener('click', handleExplain);
        debug.addEventListener('click', handleDebug);
        
        input.addEventListener('keydown', e => { 
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(); 
            }
        });
        document.querySelectorAll('.ai-suggest-chip').forEach(chip => {
            chip.addEventListener('click', () => { const q = chip.dataset.q; this.addMsg(q, 'user'); setTimeout(() => this.genReply(q), 400); });
        });

        document.getElementById('ai-clear-chat').addEventListener('click', () => {
            const msgs = document.getElementById('ai-bot-messages');
            msgs.innerHTML = `<div class="ai-msg bot-msg"><div class="msg-avatar"><i class="fa-solid fa-robot"></i></div><div class="msg-bubble">Chat cleared. How can I help you?</div></div>`;
            Toast.show('Chat cleared', 'success');
        });
    },

    addMsg(text, sender) {
        const msgs = document.getElementById('ai-bot-messages');
        const isBot = sender === 'bot';
        const div = document.createElement('div');
        div.className = `ai-msg ${isBot ? 'bot-msg' : 'user-msg'}`;
        div.innerHTML = `${isBot ? '<div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>' : ''}<div class="msg-bubble">${text}</div>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    },

    async genReply(query) {
        document.getElementById('ai-bot-send').disabled = true;
        document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        
        const q = query.toLowerCase();
        let match = null;
        for (const [key, data] of Object.entries(this.recommendations)) { if (q.includes(key)) { match = data; break; } }
        
        if (match) {
            let html = `<strong>${match.reply}</strong><div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">`;
            match.tools.forEach((t, i) => { html += `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid var(--border);"><span style="color:var(--primary-light);font-weight:700;min-width:18px;">${i+1}.</span><div><span style="font-weight:600;font-size:0.84rem;">${t.name}</span><p style="font-size:0.76rem;color:var(--text-muted);margin-top:2px;">${t.why}</p></div></div>`; });
            html += '</div>';
            this.addMsg(html, 'bot');
            document.getElementById('ai-bot-send').disabled = false;
            document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
            return;
        }

        try {
            const queryData = "You are Vertex AI, an expert programming assistant embedded in a developer toolkit. Format your answer clearly with numbered steps when appropriate. If they paste code and ask to explain or debug it, break it down simply. Keep answers concise but thorough. User Request: " + query;
            
            let replyText = '';
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 30000);
                const res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [{ role: 'user', content: queryData }], model: this.currentAiModel }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!res.ok) throw new Error('POST failed');
                replyText = await res.text();
            } catch(postErr) {
                const encoded = encodeURIComponent(queryData);
                const res = await fetch(`https://text.pollinations.ai/${encoded}?model=${this.currentAiModel}`, { method: 'GET' });
                if (!res.ok) throw new Error('GET also failed');
                replyText = await res.text();
            }
            
            let formattedReply = replyText.replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.4);padding:10px;border-radius:8px;border:1px solid var(--border);margin-top:8px;font-size:12px;overflow-x:auto;">$1</pre>');
            
            this.addMsg(formattedReply.trim(), 'bot');
        } catch(e) {
            this.addMsg('Sorry, the AI service is temporarily unavailable. Please try again in a moment.', 'bot');
        } finally {
            document.getElementById('ai-bot-send').disabled = false;
            document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
        }
    },

    // =================== AI ARCHITECT ===================
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
                        jsonMode: true,
                        model: this.currentAiModel
                    }),
                    signal: abortController.signal
                });
            } catch(e) { /* fallback below */ }
            clearTimeout(timeout);

            if(!res || !res.ok) {
                res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(sysPrompt + "\nUser request: " + prompt) + `?model=${this.currentAiModel}`);
            }

            let text = await res.text();
            
            // Fix JSON extraction
            const startIdx = text.indexOf('{');
            const endIdx = text.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
                text = text.slice(startIdx, endIdx + 1);
            }
            
            const data = JSON.parse(text);

            this.currentProjectState = data;
            
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
    },

    // =================== TECH STACKS ===================
    bindRoles() {
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', () => {
                const data = this.roleData[card.dataset.role];
                if (!data) return;
                document.getElementById('role-detail').style.display = 'block';
                document.getElementById('role-detail-title').innerHTML = `<i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>${data.title}`;
                document.getElementById('role-detail-desc').textContent = data.desc;
                document.getElementById('role-detail-stack').innerHTML = `<div class="grid-3">${data.stack.map(s => `<div class="glass-card" style="padding:16px;"><div class="flex-gap mb-sm"><i class="${s.icon}" style="color:${s.color};font-size:1.1rem;"></i><span style="font-weight:600;font-size:0.88rem;">${s.name}</span></div><span class="tag tag-primary mb-sm">${s.type}</span><p class="text-xs text-secondary" style="line-height:1.5;margin-top:6px;">${s.desc}</p></div>`).join('')}</div>`;
                document.getElementById('role-detail').scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
        document.getElementById('role-close').addEventListener('click', () => { document.getElementById('role-detail').style.display = 'none'; document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active')); });
    },

    // =================== CODE GENERATOR ===================
    bindCodeGen() {
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
            const code = this.editor ? this.editor.getValue() : '';
            if(!code) return Toast.show('No code to copy', 'error');
            Helpers.copyToClipboard(code);
            Toast.show('Code copied to clipboard!', 'success');
        });

        document.getElementById('save-workspace-btn').addEventListener('click', () => {
            const code = this.editor ? this.editor.getValue() : '';
            if(!code) return Toast.show('No code to save', 'error');
            const fw = this.currentFramework;
            WorkspacePage.saveSnippet(`AI Generated ${fw.toUpperCase()}`, code, fw);
            Toast.show('Saved to My Workspace!', 'success');
        });

        document.getElementById('run-container-btn').addEventListener('click', async () => {
            const code = this.editor ? this.editor.getValue() : '';
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

            if (!window.StackBlitzSDK) {
                Toast.show('Loading WebContainer runtime...', 'info', 2000);
                await Helpers.loadScript('https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js');
            }

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
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 30000);
                const response = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [{ role: 'user', content: systemPrompt }], model: this.currentAiModel }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!response.ok) throw new Error('POST failed');
                code = await response.text();
            } catch(postErr) {
                const encoded = encodeURIComponent(systemPrompt);
                const response = await fetch(`https://text.pollinations.ai/${encoded}?model=${this.currentAiModel}`, { method: 'GET' });
                if (!response.ok) throw new Error('GET also failed');
                code = await response.text();
            }
            
            // Cleanup markdown
            code = code.replace(/^```[a-zA-Z]*\n?/gm, '').replace(/\n?```$/gm, '').trim();

            document.getElementById('loading-overlay').style.display = 'none';
            document.getElementById('generator-output-area').style.display = 'block';
            document.getElementById('output-fw-tag').textContent = this.currentFramework.toUpperCase();
            
            if (this.editor) {
                this.editor.setValue('');
                let lang = this.currentFramework;
                if(lang === 'vue' || lang === 'react') lang = 'html';
                window.monaco?.editor.setModelLanguage(this.editor.getModel(), lang);
                this.editor.setValue(code);
            }
        } catch(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            Toast.show('Failed to generate code. Please try again.', 'error');
        }
    },

    // =================== CODE ANALYZER ===================
    bindAnalyzer() {
        const dropZone = document.getElementById('drop-zone');
        const fileUpload = document.getElementById('file-upload');
        const browseBtn = document.getElementById('browse-file-btn');
        const analyzeAnother = document.getElementById('analyze-another-btn');

        if(!dropZone || !fileUpload) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, e => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Highlight drop zone
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.style.borderColor = 'var(--primary)';
                dropZone.style.background = 'rgba(212,168,67,0.05)';
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.style.borderColor = 'var(--border)';
                dropZone.style.background = 'transparent';
            });
        });

        // Handle drop
        dropZone.addEventListener('drop', e => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if(files && files.length > 0) this.handleCodeFile(files[0]);
        });

        // Handle click browse
        browseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileUpload.click();
        });
        dropZone.addEventListener('click', (e) => {
            if(e.target !== browseBtn) fileUpload.click();
        });

        fileUpload.addEventListener('change', () => {
            if(fileUpload.files.length > 0) {
                this.handleCodeFile(fileUpload.files[0]);
            }
        });

        if(analyzeAnother) {
            analyzeAnother.addEventListener('click', () => {
                document.getElementById('analyzer-results').style.display = 'none';
                document.getElementById('drop-zone').style.display = 'block';
                fileUpload.value = '';
            });
        }
    },

    handleCodeFile(file) {
        if(file.size > 100000) return Toast.show('File is too large (max 100KB).', 'error');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            const code = e.target.result;
            if(!code.trim()) return Toast.show('File is empty.', 'error');
            this.analyzeCode(file.name, code);
        };
        reader.readAsText(file);
    },

    async analyzeCode(filename, codeContent) {
        document.getElementById('drop-zone').style.display = 'none';
        document.getElementById('analyzer-loading').style.display = 'block';

        const sysPrompt = `Act as an expert static code analyzer. Evaluate the source code file and return ONLY a valid JSON object matching exactly this structure, nothing else:
{
  "complexity": "e.g. O(N), O(N^2), or 'Low', 'High'",
  "security": "e.g. '0 Vulns', '1 Issue'",
  "healthScore": "e.g. '92/100'",
  "review": "A detailed 2-3 sentence technical review of the code's health and maintainability.",
  "suggestions": "2-3 bullet points on how to improve the code."
}`;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 20000);
            
            let res;
            try {
                res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: sysPrompt },
                            { role: 'user', content: `Filename: ${filename}\n\n${codeContent.substring(0, 3000)}` }
                        ],
                        jsonMode: true,
                        model: this.currentAiModel
                    }),
                    signal: controller.signal
                });
            } catch(e){}
            clearTimeout(timeout);

            if(!res || !res.ok) {
                const query = sysPrompt + "\n\nFilename: " + filename + "\n" + codeContent.substring(0, 500);
                res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(query) + `?model=${this.currentAiModel}`);
            }

            let text = await res.text();
            
            const startIdx = text.indexOf('{');
            const endIdx = text.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
                text = text.substring(startIdx, endIdx + 1);
            }
            
            const result = JSON.parse(text);

            document.getElementById('analyzer-loading').style.display = 'none';
            document.getElementById('analyzer-results').style.display = 'flex';
            
            document.getElementById('analyze-filename').textContent = filename;
            document.getElementById('metric-complexity').textContent = result.complexity || '--';
            document.getElementById('metric-security').textContent = result.security || '--';
            document.getElementById('metric-score').textContent = result.healthScore || '--';
            
            let scoreVal = parseInt(result.healthScore);
            const scoreEl = document.getElementById('metric-score');
            if(!isNaN(scoreVal)) {
                if(scoreVal >= 85) scoreEl.style.color = 'var(--success)';
                else if(scoreVal >= 60) scoreEl.style.color = 'var(--warning)';
                else scoreEl.style.color = 'var(--error)';
            } else {
                scoreEl.style.color = 'var(--text)';
            }

            document.getElementById('analyzer-review').textContent = result.review || 'No review generated.';
            document.getElementById('analyzer-suggestions').innerHTML = (result.suggestions || '').replace(/\n/g, '<br>');

        } catch (error) {
            document.getElementById('analyzer-loading').style.display = 'none';
            document.getElementById('drop-zone').style.display = 'block';
            Toast.show('Failed to analyze code. The model might have timed out.', 'error');
            console.error(error);
        }
    }
};
