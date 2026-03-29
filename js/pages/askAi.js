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
        ]},
        cloud: { title: 'Cloud Architecture', desc: 'Design and manage scalable cloud infrastructure and serverless apps.', stack: [
            { name: 'AWS Lambda', type: 'Serverless', desc: 'Run code without provisioning servers', icon: 'fa-brands fa-aws', color: '#ff9900' },
            { name: 'Kubernetes', type: 'Orchestration', desc: 'Manage containerized applications at scale', icon: 'fa-solid fa-dharmachakra', color: '#326ce5' },
            { name: 'Terraform', type: 'IaC', desc: 'Infrastructure as code for automation', icon: 'fa-solid fa-cubes', color: '#7b42bc' },
            { name: 'Azure / GCP', type: 'Cloud', desc: 'Enterprise-grade cloud services', icon: 'fa-brands fa-microsoft', color: '#00a4ef' },
            { name: 'Redis', type: 'Caching', desc: 'In-memory data structure store', icon: 'fa-solid fa-bolt', color: '#d82c20' },
            { name: 'Grafana / Prometheus', type: 'Monitoring', desc: 'Visualizing and alert on metrics', icon: 'fa-solid fa-chart-line', color: '#f46800' }
        ]},
        security: { title: 'Cybersecurity', desc: 'Protect applications, networks, and data from digital attacks.', stack: [
            { name: 'OWASP ZAP', type: 'Scanning', desc: 'Find vulnerabilities in web apps', icon: 'fa-solid fa-shield-virus', color: '#3ecf6e' },
            { name: 'Kali Linux', type: 'Pentesting', desc: 'Advanced penetration testing platform', icon: 'fa-brands fa-linux', color: '#55aaff' },
            { name: 'Wireshark', type: 'Network', desc: 'Analyze network protocol and traffic', icon: 'fa-solid fa-network-wired', color: '#167ec2' },
            { name: 'Burp Suite', type: 'Security', desc: 'Web application security testing', icon: 'fa-solid fa-user-shield', color: '#ff6633' },
            { name: 'Hashcat', type: 'Cracking', desc: 'Advanced password recovery tool', icon: 'fa-solid fa-unlock', color: '#ffbe00' },
            { name: 'Metasploit', type: 'Exploitation', desc: 'Software for offensive security', icon: 'fa-solid fa-skull', color: '#ee4444' }
        ]},
        data: { title: 'Data Science', desc: 'Extract insights from data using statistical and computational techniques.', stack: [
            { name: 'Python / R', type: 'Language', desc: 'Primary languages for data analysis', icon: 'fa-brands fa-python', color: '#3776ab' },
            { name: 'Pandas / NumPy', type: 'Analysis', desc: 'Data manipulation and computation', icon: 'fa-solid fa-table', color: '#150458' },
            { name: 'Scikit-Learn', type: 'Machine Learning', desc: 'Simple tools for predictive analysis', icon: 'fa-solid fa-microchip', color: '#f89939' },
            { name: 'Tableau / PowerBI', type: 'BI', desc: 'Business intelligence and visualization', icon: 'fa-solid fa-chart-pie', color: '#e97627' },
            { name: 'SQL / BigQuery', type: 'Query', desc: 'Retrieve data from large datasets', icon: 'fa-solid fa-database', color: '#4285f4' },
            { name: 'Matplotlib / Seaborn', type: 'Plotting', desc: 'Create static, animated visualizations', icon: 'fa-solid fa-chart-area', color: '#888888' }
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
    currentAiModel: localStorage.getItem('vertex_ai_model') || 'mixtral',
    apiKey: localStorage.getItem('vertex_groq_key') || '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',
    
    archSuggestions: [
        "Scalable Node.js Microservices", "React native chat app", 
        "Python E-commerce with Django", "Vue 3 SSR blog", 
        "Next.js Portfolio", "Express REST API template",
        "Fullstack SvelteKit store"
    ],
     async getAirforceModel(fallbackModelStr = null) {
        // Use Groq API models
        const activeModel = fallbackModelStr || this.currentAiModel || 'mixtral';
        const modelMap = {
            'mixtral': 'llama-3.1-8b-instant',
            'llama': 'llama-3.1-8b-instant',
            'gemma': 'llama-3.1-8b-instant',
            'claude': 'llama-3.1-8b-instant',
            'openai': 'llama-3.1-8b-instant',
            'mistral': 'llama-3.1-8b-instant',
            'llama': 'llama2-70b-4096'
        };
        return modelMap[activeModel] || 'llama-3.1-8b-instant';
    },

    cleanAiResponse(text) {
        if (!text) return "";
        // Remove common AI service ads and system messages
        const ads = [
            /Need proxies cheaper than the market\?[\s\S]*https:\/\/op\.wtf/img,
            /This model requires [\s\S]* to enable it\./img,
            /discord\.gg\/airforce/img,
            /This model is only available for pay-as-you-go users/img,
            /Powered by Airforce[\s\S]*/img,
            /Generated by [\s\S]*Airforce[\s\S]*/img,
            /This response was generated by[\s\S]*/img,
            /For more information, visit[\s\S]*/img,
            /Join our Discord[\s\S]*/img,
            /airforce\.gg[\s\S]*/img,
            /Generated by Pollinations[\s\S]*/img,
            /Powered by Pollinations[\s\S]*/img,
            /pollinations\.ai[\s\S]*/img,
            /text\.pollinations\.ai[\s\S]*/img
        ];
        let cleaned = text;
        ads.forEach(ad => {
            cleaned = cleaned.replace(ad, '');
        });
        return cleaned.trim();
    },

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
                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        <div class="form-group" style="min-width: 160px;">
                            <label class="text-xs text-muted mb-xs" style="display:block;">Groq Model</label>
                            <select id="ai-model-select" class="input-field" style="padding: 8px 12px; font-size: 0.85rem; height:auto; background: #000; color: #fff; appearance: none; -webkit-appearance: none; cursor: pointer;">
                                <option value="mixtral" selected>Mixtral 8x7B (Recommended)</option>
                                <option value="llama2">Llama 2 70B</option>
                                <option value="gemma">Gemma 7B</option>
                            </select>
                        </div>
                        <div class="form-group" style="min-width: 200px; display:none;">
                            <label class="text-xs text-muted mb-xs" style="display:block;">Groq API Key</label>
                            <input type="password" id="ai-api-key" class="input-field" placeholder="gsk_..." value="${localStorage.getItem('vertex_groq_key') || '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'}" style="padding: 8px 12px; font-size: 0.85rem; height:auto;">
                        </div>
                    </div>
                </div>

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
                            <div class="generator-output" style="background:rgba(0,0,0,0.5); padding:16px; border-radius:var(--radius); border:1px solid var(--border); overflow:hidden; width:100%; min-width:0; max-width:100%; box-sizing:border-box;">
                                <div id="monaco-code-output" style="height:500px; width:100%; min-width:0; max-width:100%; box-sizing:border-box;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== TAB 4: CODE ANALYZER ===== -->
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

                <!-- ===== TAB 5: TECH STACKS ===== -->
                <div id="ai-tab-stacks" style="display:none;">
                    <div class="flex-between mb-md">
                        <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>What do you want to build?</h2>
                    </div>
                    <div class="role-cards-grid mb-lg" id="role-cards">
                        ${Object.entries(this.roleData).map(([key, data]) => {
                            const icons = { web:'fa-solid fa-globe', mobile:'fa-solid fa-mobile-screen', ai:'fa-solid fa-brain', backend:'fa-solid fa-server', devops:'fa-solid fa-cloud-arrow-up', game:'fa-solid fa-gamepad', cloud: 'fa-solid fa-cloud', security: 'fa-solid fa-user-shield', data: 'fa-solid fa-chart-line' };
                            const colors = { web:'rgba(212,168,67,0.08)', mobile:'rgba(62,207,110,0.06)', ai:'rgba(139,92,246,0.06)', backend:'rgba(240,160,48,0.06)', devops:'rgba(6,182,212,0.06)', game:'rgba(236,72,153,0.06)', cloud: 'rgba(50,108,229,0.06)', security: 'rgba(62,207,110,0.06)', data: 'rgba(233,118,39,0.06)' };
                            const iconColors = { web:'var(--primary-light)', mobile:'var(--success)', ai:'#8b5cf6', backend:'var(--warning)', devops:'#06b6d4', game:'#ec4899', cloud: '#326ce5', security: 'var(--success)', data: '#e97627' };
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

    bindModelSelect() {
        const sel = document.getElementById('ai-model-select');
        const keyInput = document.getElementById('ai-api-key');
        if(sel) {
            sel.addEventListener('change', (e) => {
                this.currentAiModel = e.target.value;
                localStorage.setItem('vertex_ai_model', this.currentAiModel);
                Toast.show('Groq Model switched to ' + e.target.options[e.target.selectedIndex].text, 'info');
            });
        }
        if(keyInput) {
            keyInput.addEventListener('input', (e) => {
                localStorage.setItem('vertex_groq_key', e.target.value);
                API.setGroqApiKey(e.target.value);
                Toast.show('Groq API Key updated', 'success');
            });
        }
    },

    bindTabs() {
        const aiHubTabs = document.getElementById('ai-hub-tabs');
        if (!aiHubTabs) {
            console.warn('[Ask AI] Missing ai-hub-tabs element - skipping tab binding');
            return;
        }
        
        aiHubTabs.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#ai-hub-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;
            
            const chatTab = document.getElementById('ai-tab-chat');
            const archTab = document.getElementById('ai-tab-architect');
            const codegenTab = document.getElementById('ai-tab-codegen');
            const analyzerTab = document.getElementById('ai-tab-analyzer');
            const stacksTab = document.getElementById('ai-tab-stacks');
            
            if (chatTab) chatTab.style.display = target === 'chat' ? 'block' : 'none';
            if (archTab) archTab.style.display = target === 'architect' ? 'block' : 'none';
            if (codegenTab) codegenTab.style.display = target === 'codegen' ? 'block' : 'none';
            if (analyzerTab) analyzerTab.style.display = target === 'analyzer' ? 'block' : 'none';
            if (stacksTab) stacksTab.style.display = target === 'stacks' ? 'block' : 'none';
        });
    }
};

Object.assign(AskAiPage, AiChatMixin, AiArchitectMixin, AiCodegenMixin, AiAnalyzerMixin, AiStacksMixin);
