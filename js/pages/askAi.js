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

    render() {
        Navbar.renderTopbar('Ask AI');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Ask <span class="text-gradient">AI</span></h1>
                    <p>Get personalized tool recommendations or explore curated tech stacks by project type.</p>
                </div>

                <div class="glass-card-static ai-chat-section mb-lg">
                    <div class="ai-chat-header">
                        <div class="flex-gap">
                            <div class="ai-bot-avatar"><i class="fa-solid fa-robot"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">Vertex AI Assistant</h3>
                                <span class="text-xs text-muted">Tell me what you want to build</span>
                            </div>
                        </div>
                    </div>
                    <div class="ai-bot-messages" id="ai-bot-messages" style="min-height:160px;max-height:400px;">
                        <div class="ai-msg bot-msg">
                            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                            <div class="msg-bubble">Hi! Tell me what you want to build, and I'll recommend the best tools, APIs, and frameworks. Try: <em>"I want to make a weather app"</em></div>
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
                        <button class="ai-suggest-chip" data-q="I want to build a mobile app">📱 Mobile App</button>
                        <button class="ai-suggest-chip" data-q="I want to build a game">🎮 Game</button>
                    </div>
                </div>

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
            </div>`;

        this.bindChat();
        this.bindRoles();
    },

    bindChat() {
        const input = document.getElementById('ai-bot-input');
        const send = document.getElementById('ai-bot-send');
        const handleSend = () => { const q = input.value.trim(); if (!q) return; this.addMsg(q, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        send.addEventListener('click', handleSend);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
        document.querySelectorAll('.ai-suggest-chip').forEach(chip => {
            chip.addEventListener('click', () => { const q = chip.dataset.q; this.addMsg(q, 'user'); setTimeout(() => this.genReply(q), 400); });
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

    genReply(query) {
        const q = query.toLowerCase();
        let match = null;
        for (const [key, data] of Object.entries(this.recommendations)) { if (q.includes(key)) { match = data; break; } }
        if (!match) {
            if (q.includes('app') || q.includes('build') || q.includes('make') || q.includes('create')) {
                match = { reply: 'Here\'s a great stack to start with:', tools: [{ name: 'React or Next.js', why: 'Modern component-based UI' }, { name: 'Node.js + Express', why: 'Flexible backend server' }, { name: 'Supabase or Firebase', why: 'Database, auth, hosting' }, { name: 'Vercel or Netlify', why: 'One-click deployment' }] };
            } else { this.addMsg('Try asking something like "I want to build a weather app" or "I want to make a chat application" — I\'ll recommend the best tools!', 'bot'); return; }
        }
        let html = `<strong>${match.reply}</strong><div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">`;
        match.tools.forEach((t, i) => { html += `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid var(--border);"><span style="color:var(--primary-light);font-weight:700;min-width:18px;">${i+1}.</span><div><span style="font-weight:600;font-size:0.84rem;">${t.name}</span><p style="font-size:0.76rem;color:var(--text-muted);margin-top:2px;">${t.why}</p></div></div>`; });
        html += '</div>';
        this.addMsg(html, 'bot');
    },

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
    }
};
