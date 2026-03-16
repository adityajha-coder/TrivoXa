const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');
        const hours = new Date().getHours();
        const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

        content.innerHTML = `
            <div class="page-enter">
                <div class="dashboard-hero">
                    <div class="hero-text">
                        <h1>${greeting}, <span class="text-gradient">Developer</span> ⚡</h1>
                        <p>Welcome to Vertex — your all-in-one toolkit for code generation, repo exploration, package analysis, and Git mastery.</p>
                    </div>
                    <div class="hero-quick-search">
                        <div class="ai-bot-mini" id="ai-bot-trigger">
                            <i class="fa-solid fa-robot"></i>
                            <span>Ask AI: "I want to build a weather app..."</span>
                            <i class="fa-solid fa-arrow-right" style="margin-left:auto;opacity:0.4;"></i>
                        </div>
                    </div>
                </div>

                <div class="grid-4 mb-lg">
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-primary"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div class="stat-value" data-count="5">0</div>
                        <div class="stat-label">Developer Tools</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-accent"><i class="fa-solid fa-plug"></i></div>
                        <div class="stat-value" data-count="45">0</div>
                        <div class="stat-label">Free APIs</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-success"><i class="fa-solid fa-terminal"></i></div>
                        <div class="stat-value" data-count="35">0</div>
                        <div class="stat-label">Git Commands</div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-warning"><i class="fa-solid fa-box-open"></i></div>
                        <div class="stat-value" data-count="28">0</div>
                        <div class="stat-label">npm Commands</div>
                    </div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>What do you want to build?</h2>
                </div>
                <div class="role-cards-grid mb-lg" id="role-cards">
                    <div class="role-card" data-role="web">
                        <div class="role-icon" style="background:rgba(212,168,67,0.08);"><i class="fa-solid fa-globe" style="color:var(--primary-light);"></i></div>
                        <div class="role-info">
                            <h3>Build Websites</h3>
                            <p>HTML, CSS, React, APIs, Hosting</p>
                        </div>
                        <i class="fa-solid fa-chevron-right role-arrow"></i>
                    </div>
                    <div class="role-card" data-role="mobile">
                        <div class="role-icon" style="background:rgba(62,207,110,0.06);"><i class="fa-solid fa-mobile-screen" style="color:var(--success);"></i></div>
                        <div class="role-info">
                            <h3>Build Mobile Apps</h3>
                            <p>React Native, Flutter, Expo</p>
                        </div>
                        <i class="fa-solid fa-chevron-right role-arrow"></i>
                    </div>
                    <div class="role-card" data-role="ai">
                        <div class="role-icon" style="background:rgba(139,92,246,0.06);"><i class="fa-solid fa-brain" style="color:#8b5cf6;"></i></div>
                        <div class="role-info">
                            <h3>Learn AI / ML</h3>
                            <p>TensorFlow, APIs, Datasets</p>
                        </div>
                        <i class="fa-solid fa-chevron-right role-arrow"></i>
                    </div>
                    <div class="role-card" data-role="backend">
                        <div class="role-icon" style="background:rgba(240,160,48,0.06);"><i class="fa-solid fa-server" style="color:var(--warning);"></i></div>
                        <div class="role-info">
                            <h3>Build Backend / APIs</h3>
                            <p>Node.js, Express, Databases</p>
                        </div>
                        <i class="fa-solid fa-chevron-right role-arrow"></i>
                    </div>
                    <div class="role-card" data-role="devops">
                        <div class="role-icon" style="background:rgba(6,182,212,0.06);"><i class="fa-solid fa-cloud" style="color:#06b6d4;"></i></div>
                        <div class="role-info">
                            <h3>DevOps & Deployment</h3>
                            <p>Docker, CI/CD, Cloud</p>
                        </div>
                        <i class="fa-solid fa-chevron-right role-arrow"></i>
                    </div>
                    <div class="role-card" data-role="game">
                        <div class="role-icon" style="background:rgba(236,72,153,0.06);"><i class="fa-solid fa-gamepad" style="color:#ec4899;"></i></div>
                        <div class="role-info">
                            <h3>Build Games</h3>
                            <p>Three.js, Phaser, Unity</p>
                        </div>
                        <i class="fa-solid fa-chevron-right role-arrow"></i>
                    </div>
                </div>

                <div class="glass-card-static mb-lg" id="role-detail" style="display:none;padding:24px;">
                    <div class="flex-between mb-md">
                        <h3 id="role-detail-title" style="font-size:1rem;font-weight:600;"></h3>
                        <button class="btn btn-ghost btn-sm" id="role-close"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <p id="role-detail-desc" class="text-sm text-secondary mb-lg" style="line-height:1.6;"></p>
                    <div id="role-detail-stack"></div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1.05rem;font-weight:600;"><i class="fa-solid fa-toolbox" style="color:var(--primary-light);margin-right:6px;"></i>All Tools</h2>
                </div>
                <div class="dashboard-tools-grid mb-lg">
                    <div class="glass-card tool-card" data-page="code-generator">
                        <div class="tool-icon icon-primary"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <h3>Code Generator</h3>
                        <p>Generate production-ready UI components in HTML, React, or Vue.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="code-git-explorer">
                        <div class="tool-icon icon-success"><i class="fa-solid fa-cube"></i></div>
                        <h3>Code & Git Explorer</h3>
                        <p>Visualize repository structure and branch history in 3D.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="package-scout">
                        <div class="tool-icon icon-warning"><i class="fa-solid fa-box-open"></i></div>
                        <h3>Package Scout</h3>
                        <p>Evaluate npm packages and learn essential npm commands.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="free-apis">
                        <div class="tool-icon icon-error"><i class="fa-solid fa-plug"></i></div>
                        <h3>Free APIs</h3>
                        <p>45+ curated free APIs organized by category for development.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="github-hub">
                        <div class="tool-icon" style="background:rgba(212,168,67,0.06);color:var(--primary-light);"><i class="fa-brands fa-github"></i></div>
                        <h3>GitHub Hub</h3>
                        <p>Profile lookup, activity feed, and Git command reference.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                </div>
            </div>

            <div class="ai-bot-overlay" id="ai-bot-overlay">
                <div class="ai-bot-panel glass-card-static">
                    <div class="ai-bot-header">
                        <div class="flex-gap">
                            <div class="ai-bot-avatar"><i class="fa-solid fa-robot"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">Vertex AI Assistant</h3>
                                <span class="text-xs text-muted">Ask me what you want to build</span>
                            </div>
                        </div>
                        <button class="btn btn-ghost btn-sm" id="ai-bot-close"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="ai-bot-messages" id="ai-bot-messages">
                        <div class="ai-msg bot-msg">
                            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                            <div class="msg-bubble">Hi! Tell me what you want to build, and I'll recommend the best tools, APIs, and frameworks. For example: <em>"I want to make a weather app"</em></div>
                        </div>
                    </div>
                    <div class="ai-bot-input-area">
                        <input class="input-field" id="ai-bot-input" type="text" placeholder='Try "I want to build a todo app..."' />
                        <button class="btn btn-primary" id="ai-bot-send"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                    <div class="ai-bot-suggestions">
                        <button class="ai-suggest-chip" data-q="I want to build a weather app">🌤 Weather App</button>
                        <button class="ai-suggest-chip" data-q="I want to build a portfolio website">💼 Portfolio</button>
                        <button class="ai-suggest-chip" data-q="I want to build a chat application">💬 Chat App</button>
                        <button class="ai-suggest-chip" data-q="I want to build an e-commerce store">🛒 E-commerce</button>
                        <button class="ai-suggest-chip" data-q="I want to build a blog">📝 Blog</button>
                    </div>
                </div>
            </div>`;

        this.animateCounters();
        this.bindEvents(content);
        this.bindRoleCards();
        this.bindAIBot();
    },

    roleData: {
        web: {
            title: 'Build Websites',
            desc: 'Everything you need to go from idea to deployed website. Learn the fundamentals, pick a framework, and ship it.',
            stack: [
                { name: 'HTML/CSS/JS', type: 'Foundation', desc: 'Core web technologies — start here', icon: 'fa-brands fa-html5', color: '#e34f26' },
                { name: 'React / Vue', type: 'Framework', desc: 'Build dynamic, component-based UIs', icon: 'fa-brands fa-react', color: '#61dafb' },
                { name: 'Tailwind CSS', type: 'Styling', desc: 'Utility-first CSS for rapid UI development', icon: 'fa-solid fa-palette', color: '#06b6d4' },
                { name: 'Vercel / Netlify', type: 'Hosting', desc: 'Deploy instantly with git push', icon: 'fa-solid fa-rocket', color: '#3ecf6e' },
                { name: 'REST APIs', type: 'Data', desc: 'Fetch data from external services', icon: 'fa-solid fa-plug', color: 'var(--primary-light)' },
                { name: 'GitHub Pages', type: 'Free Hosting', desc: 'Host static sites directly from your repo', icon: 'fa-brands fa-github', color: '#e8e4dc' }
            ]
        },
        mobile: {
            title: 'Build Mobile Apps',
            desc: 'Create cross-platform mobile applications that run on both iOS and Android from a single codebase.',
            stack: [
                { name: 'React Native', type: 'Framework', desc: 'Build native apps with React and JS', icon: 'fa-brands fa-react', color: '#61dafb' },
                { name: 'Expo', type: 'Toolchain', desc: 'Fastest way to build React Native apps', icon: 'fa-solid fa-bolt', color: 'var(--primary-light)' },
                { name: 'Flutter', type: 'Framework', desc: 'Google\'s UI toolkit for mobile, web, desktop', icon: 'fa-solid fa-feather', color: '#02569B' },
                { name: 'Firebase', type: 'Backend', desc: 'Auth, database, storage, hosting — all in one', icon: 'fa-solid fa-fire', color: '#f0a030' },
                { name: 'AsyncStorage', type: 'Storage', desc: 'Simple key-value local storage for mobile', icon: 'fa-solid fa-database', color: '#8b5cf6' },
                { name: 'App Store / Play Store', type: 'Distribution', desc: 'Publish your app to millions of users', icon: 'fa-solid fa-store', color: '#3ecf6e' }
            ]
        },
        ai: {
            title: 'Learn AI / Machine Learning',
            desc: 'Get started with artificial intelligence — from simple APIs to training your own models.',
            stack: [
                { name: 'OpenAI API', type: 'AI API', desc: 'GPT models for text generation and chat', icon: 'fa-solid fa-brain', color: '#10a37f' },
                { name: 'TensorFlow.js', type: 'ML Library', desc: 'Run ML models directly in the browser', icon: 'fa-solid fa-robot', color: '#ff6f00' },
                { name: 'Hugging Face', type: 'Models Hub', desc: 'Thousands of pre-trained models for free', icon: 'fa-solid fa-face-smile', color: '#ffd21e' },
                { name: 'Python + Jupyter', type: 'Environment', desc: 'The standard toolkit for data science', icon: 'fa-brands fa-python', color: '#3776ab' },
                { name: 'Kaggle', type: 'Datasets', desc: 'Free datasets and ML competitions', icon: 'fa-solid fa-chart-line', color: '#20beff' },
                { name: 'Replicate', type: 'Inference', desc: 'Run ML models via simple API calls', icon: 'fa-solid fa-cloud', color: '#8b5cf6' }
            ]
        },
        backend: {
            title: 'Build Backend / APIs',
            desc: 'Learn to build server-side applications, REST APIs, and manage databases.',
            stack: [
                { name: 'Node.js', type: 'Runtime', desc: 'JavaScript on the server', icon: 'fa-brands fa-node-js', color: '#339933' },
                { name: 'Express.js', type: 'Framework', desc: 'Minimal web framework for Node.js', icon: 'fa-solid fa-server', color: '#e8e4dc' },
                { name: 'PostgreSQL', type: 'Database', desc: 'Powerful open-source relational database', icon: 'fa-solid fa-database', color: '#336791' },
                { name: 'MongoDB', type: 'Database', desc: 'Flexible NoSQL document database', icon: 'fa-solid fa-leaf', color: '#47A248' },
                { name: 'JWT / OAuth', type: 'Auth', desc: 'Secure authentication and authorization', icon: 'fa-solid fa-shield-halved', color: 'var(--error)' },
                { name: 'Postman', type: 'Testing', desc: 'Test and debug your APIs easily', icon: 'fa-solid fa-paper-plane', color: '#ff6c37' }
            ]
        },
        devops: {
            title: 'DevOps & Deployment',
            desc: 'Automate deployments, containerize apps, and manage infrastructure at scale.',
            stack: [
                { name: 'Docker', type: 'Containers', desc: 'Package apps into portable containers', icon: 'fa-brands fa-docker', color: '#2496ed' },
                { name: 'GitHub Actions', type: 'CI/CD', desc: 'Automate build, test, deploy pipelines', icon: 'fa-brands fa-github', color: '#e8e4dc' },
                { name: 'AWS / GCP', type: 'Cloud', desc: 'Scalable cloud computing platforms', icon: 'fa-brands fa-aws', color: '#ff9900' },
                { name: 'Nginx', type: 'Web Server', desc: 'Reverse proxy and load balancer', icon: 'fa-solid fa-globe', color: '#009639' },
                { name: 'Terraform', type: 'IaC', desc: 'Infrastructure as code for cloud provisioning', icon: 'fa-solid fa-cubes', color: '#7b42bc' },
                { name: 'Linux / Bash', type: 'OS', desc: 'Essential server administration skills', icon: 'fa-brands fa-linux', color: '#fcc624' }
            ]
        },
        game: {
            title: 'Build Games',
            desc: 'Create 2D and 3D games for web, mobile, or desktop using popular game engines and libraries.',
            stack: [
                { name: 'Three.js', type: '3D Engine', desc: 'Create stunning 3D experiences in the browser', icon: 'fa-solid fa-cube', color: 'var(--primary-light)' },
                { name: 'Phaser', type: '2D Engine', desc: 'Fast, fun HTML5 game framework', icon: 'fa-solid fa-gamepad', color: '#ec4899' },
                { name: 'Unity', type: 'Game Engine', desc: 'Industry-standard for 2D/3D multi-platform games', icon: 'fa-solid fa-dice-d20', color: '#e8e4dc' },
                { name: 'Godot', type: 'Game Engine', desc: 'Free, open-source lightweight alternative', icon: 'fa-solid fa-gem', color: '#478cbf' },
                { name: 'PixiJS', type: '2D Renderer', desc: 'Super fast 2D WebGL rendering', icon: 'fa-solid fa-star', color: '#ff6f91' },
                { name: 'Socket.io', type: 'Multiplayer', desc: 'Real-time communication for multiplayer games', icon: 'fa-solid fa-network-wired', color: '#06b6d4' }
            ]
        }
    },

    recommendations: {
        'weather': { reply: 'Great choice! Here\'s what you need:', tools: [{ name: 'OpenWeather API', why: 'Free weather data with forecasts' }, { name: 'React or Vanilla JS', why: 'Build the UI and handle API calls' }, { name: 'Chart.js', why: 'Visualize temperature trends' }, { name: 'Vercel', why: 'Deploy for free with one click' }] },
        'todo': { reply: 'A todo app is perfect for learning CRUD!', tools: [{ name: 'React + useState', why: 'Component state for task management' }, { name: 'LocalStorage API', why: 'Persist tasks without a backend' }, { name: 'CSS Modules or Tailwind', why: 'Clean, scoped styling' }, { name: 'Netlify', why: 'Free static hosting' }] },
        'portfolio': { reply: 'A portfolio showcases your work!', tools: [{ name: 'Next.js or Astro', why: 'SEO-friendly static site generation' }, { name: 'Framer Motion', why: 'Smooth animations and transitions' }, { name: 'GitHub API', why: 'Auto-fetch your latest projects' }, { name: 'Vercel', why: 'Deploy directly from your repo' }] },
        'chat': { reply: 'Real-time chat is a fantastic project!', tools: [{ name: 'Socket.io', why: 'Real-time bidirectional communication' }, { name: 'Node.js + Express', why: 'Server to handle WebSocket connections' }, { name: 'React', why: 'Dynamic message UI with components' }, { name: 'MongoDB', why: 'Store chat history and users' }] },
        'ecommerce': { reply: 'E-commerce covers a lot of skills!', tools: [{ name: 'Next.js', why: 'Server-side rendering for product pages' }, { name: 'Stripe API', why: 'Secure payment processing' }, { name: 'Supabase or Firebase', why: 'Database, auth, and storage' }, { name: 'Cloudinary', why: 'Image optimization and hosting' }] },
        'blog': { reply: 'Blogs are great for content-driven sites!', tools: [{ name: 'Astro or Next.js', why: 'Static site generation with markdown' }, { name: 'Markdown', why: 'Write content in simple format' }, { name: 'Contentlayer or MDX', why: 'Transform markdown into components' }, { name: 'Vercel', why: 'Free hosting with ISR support' }] },
        'game': { reply: 'Game development is super fun!', tools: [{ name: 'Phaser.js', why: 'Easy 2D HTML5 game framework' }, { name: 'Three.js', why: '3D graphics in the browser' }, { name: 'Howler.js', why: 'Audio playback for sound effects' }, { name: 'GitHub Pages', why: 'Free hosting for web games' }] },
        'api': { reply: 'Building APIs teaches backend fundamentals!', tools: [{ name: 'Node.js + Express', why: 'Fast, minimal server framework' }, { name: 'PostgreSQL', why: 'Reliable relational database' }, { name: 'JWT', why: 'Token-based authentication' }, { name: 'Swagger', why: 'Auto-generate API documentation' }] },
        'mobile': { reply: 'Mobile apps reach billions of users!', tools: [{ name: 'React Native + Expo', why: 'Cross-platform with hot reload' }, { name: 'Firebase', why: 'Auth, Firestore, push notifications' }, { name: 'React Navigation', why: 'Smooth screen transitions' }, { name: 'EAS Build', why: 'Build and submit to app stores' }] },
        'dashboard': { reply: 'Dashboards are great for data visualization!', tools: [{ name: 'React + Recharts', why: 'Beautiful interactive charts' }, { name: 'REST API or GraphQL', why: 'Fetch real-time data' }, { name: 'Tailwind CSS', why: 'Responsive grid layouts' }, { name: 'Vercel', why: 'Fast deployment' }] },
        'social': { reply: 'Social media apps cover many concepts!', tools: [{ name: 'Next.js', why: 'SSR for fast page loads' }, { name: 'Supabase', why: 'Auth, real-time DB, file storage' }, { name: 'Socket.io', why: 'Live notifications and messaging' }, { name: 'Cloudinary', why: 'Image/video uploads and CDN' }] }
    },

    bindRoleCards() {
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', () => {
                const role = card.dataset.role;
                const data = this.roleData[role];
                if (!data) return;
                document.getElementById('role-detail').style.display = 'block';
                document.getElementById('role-detail-title').innerHTML = `<i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>${data.title}`;
                document.getElementById('role-detail-desc').textContent = data.desc;
                document.getElementById('role-detail-stack').innerHTML = `<div class="grid-3">${data.stack.map(s => `
                    <div class="glass-card" style="padding:16px;">
                        <div class="flex-gap mb-sm"><i class="${s.icon}" style="color:${s.color};font-size:1.1rem;"></i><span style="font-weight:600;font-size:0.88rem;">${s.name}</span></div>
                        <span class="tag tag-primary mb-sm">${s.type}</span>
                        <p class="text-xs text-secondary" style="line-height:1.5;margin-top:6px;">${s.desc}</p>
                    </div>`).join('')}</div>`;
                document.getElementById('role-detail').scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
        document.getElementById('role-close').addEventListener('click', () => {
            document.getElementById('role-detail').style.display = 'none';
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
        });
    },

    bindAIBot() {
        const trigger = document.getElementById('ai-bot-trigger');
        const overlay = document.getElementById('ai-bot-overlay');
        const close = document.getElementById('ai-bot-close');
        const input = document.getElementById('ai-bot-input');
        const send = document.getElementById('ai-bot-send');

        trigger.addEventListener('click', () => overlay.classList.add('open'));
        close.addEventListener('click', () => overlay.classList.remove('open'));
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

        const handleSend = () => {
            const q = input.value.trim();
            if (!q) return;
            this.addBotMessage(q, 'user');
            input.value = '';
            setTimeout(() => this.generateReply(q), 500);
        };
        send.addEventListener('click', handleSend);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

        document.querySelectorAll('.ai-suggest-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const q = chip.dataset.q;
                overlay.classList.add('open');
                setTimeout(() => {
                    this.addBotMessage(q, 'user');
                    setTimeout(() => this.generateReply(q), 500);
                }, 300);
            });
        });
    },

    addBotMessage(text, sender) {
        const msgs = document.getElementById('ai-bot-messages');
        const isBot = sender === 'bot';
        const div = document.createElement('div');
        div.className = `ai-msg ${isBot ? 'bot-msg' : 'user-msg'}`;
        div.innerHTML = `${isBot ? '<div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>' : ''}<div class="msg-bubble">${text}</div>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    },

    generateReply(query) {
        const q = query.toLowerCase();
        let match = null;
        for (const [key, data] of Object.entries(this.recommendations)) {
            if (q.includes(key)) { match = data; break; }
        }
        if (!match) {
            if (q.includes('app') || q.includes('build') || q.includes('make') || q.includes('create')) {
                match = { reply: 'Here\'s a great general-purpose stack to start with:', tools: [{ name: 'React or Next.js', why: 'Modern component-based UI' }, { name: 'Node.js + Express', why: 'Flexible backend server' }, { name: 'Supabase or Firebase', why: 'Database, auth, and hosting' }, { name: 'Vercel or Netlify', why: 'One-click deployment' }] };
            } else {
                this.addBotMessage('I\'m not sure about that one! Try asking something like "I want to build a weather app" or "I want to make a chat application". I\'ll recommend the best tools and APIs!', 'bot');
                return;
            }
        }
        let html = `<strong>${match.reply}</strong><div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">`;
        match.tools.forEach((t, i) => {
            html += `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid var(--border);"><span style="color:var(--primary-light);font-weight:700;min-width:18px;">${i + 1}.</span><div><span style="font-weight:600;font-size:0.84rem;">${t.name}</span><p style="font-size:0.76rem;color:var(--text-muted);margin-top:2px;">${t.why}</p></div></div>`;
        });
        html += '</div>';
        this.addBotMessage(html, 'bot');
    },

    animateCounters() {
        document.querySelectorAll('.stat-value[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 25));
            const interval = setInterval(() => { current += step; if (current >= target) { current = target; clearInterval(interval); } el.textContent = current; }, 40);
        });
    },

    bindEvents(content) {
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });
    }
};
