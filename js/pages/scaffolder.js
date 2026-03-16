const ScaffolderPage = {
    stacks: {
        'mern': { label: 'MERN Stack', desc: 'MongoDB, Express, React, Node.js', cmd: 'mkdir -p client/src/components client/src/pages client/src/utils server/models server/routes server/controllers && touch client/src/App.js server/server.js server/.env' },
        'nextjs': { label: 'Next.js App Router', desc: 'React, Next.js, Tailwind', cmd: 'mkdir -p app/api app/components app/lib app/styles public && touch app/page.tsx app/layout.tsx next.config.js tailwind.config.ts' },
        'django': { label: 'Django + React', desc: 'Python, Django REST, React', cmd: 'mkdir -p backend/api backend/core frontend/src/components frontend/src/pages && touch backend/manage.py frontend/src/index.js' },
        'vue': { label: 'Vue 3 + Vite', desc: 'Vue 3, Vite, Vue Router', cmd: 'mkdir -p src/assets src/components src/router src/views public && touch src/App.vue src/main.js index.html vite.config.js' },
        'flutter': { label: 'Flutter App', desc: 'Dart, Flutter Framework', cmd: 'mkdir -p lib/screens lib/widgets lib/models lib/services assets/images && touch lib/main.dart pubspec.yaml' },
        'springboot': { label: 'Spring Boot REST API', desc: 'Java, Spring Boot, Maven', cmd: 'mkdir -p src/main/java/com/app/controller src/main/java/com/app/model src/main/java/com/app/repository src/main/resources && touch pom.xml src/main/resources/application.properties' },
        'reactnative': { label: 'React Native (Expo)', desc: 'React Native, Expo, Navigation', cmd: 'mkdir -p app/components app/screens app/navigation assets && touch app/_layout.tsx app/index.tsx app.json babel.config.js' }
    },
    
    currentStack: 'mern',

    render() {
        Navbar.renderTopbar('Project Scaffolder');
        const content = document.getElementById('page-content');
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Project <span class="text-gradient">Scaffolder</span></h1>
                    <p>Select your tech stack and generate a best-practice folder structure and setup script.</p>
                </div>
                
                <div class="grid-2 mb-lg">
                    <div class="glass-card">
                        <h3 class="mb-sm">Select Stack</h3>
                        <div class="scaffold-options flex-col flex-gap" id="scaffold-stack-options">
                            ${Object.entries(this.stacks).map(([key, st]) => `
                                <div class="glass-card-static stack-option ${key === this.currentStack ? 'active' : ''}" data-stack="${key}" style="cursor:pointer; padding:12px 16px; border:1px solid ${key === this.currentStack ? 'var(--primary)' : 'var(--border)'}; transition:all 0.2s;">
                                    <div style="font-weight:600; color:var(--text);">${st.label}</div>
                                    <div class="text-xs text-muted mt-sm">${st.desc}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="glass-card">
                        <h3 class="mb-md">Generated Structure</h3>
                        <div id="scaffold-tree" style="background:rgba(0,0,0,0.4); padding:16px; border-radius:var(--radius); border:1px solid var(--border); font-family:var(--font-mono); font-size:13px; color:var(--primary-light); min-height: 200px; line-height:1.6;">
                            <!-- tree injected here -->
                        </div>
                    </div>
                </div>
                
                <div class="glass-card">
                    <div class="flex-between mb-sm align-start">
                        <div>
                            <h3>Setup Command</h3>
                            <p class="text-sm text-secondary">Run this single command in your terminal to instantly generate the entire file structure.</p>
                        </div>
                        <button class="btn btn-primary btn-sm" id="scaffold-copy-btn"><i class="fa-solid fa-copy"></i> Copy Script</button>
                    </div>
                    <div style="background:#0a0a0f; padding:14px 18px; border-radius:var(--radius); border:1px solid var(--border);">
                        <code id="scaffold-cmd" style="color:#e2e8f0; font-family:var(--font-mono); word-break:break-all;"></code>
                    </div>
                </div>
            </div>
        `;
        
        this.updateView();
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('scaffold-stack-options').addEventListener('click', (e) => {
            const opt = e.target.closest('.stack-option');
            if(!opt) return;
            document.querySelectorAll('.stack-option').forEach(el => el.style.borderColor = 'var(--border)');
            opt.style.borderColor = 'var(--primary)';
            this.currentStack = opt.dataset.stack;
            this.updateView();
        });

        document.getElementById('scaffold-copy-btn').addEventListener('click', () => {
            Helpers.copyToClipboard(this.stacks[this.currentStack].cmd);
            Toast.show('Setup command copied!', 'success');
        });
    },

    updateView() {
        const stack = this.stacks[this.currentStack];
        document.getElementById('scaffold-cmd').textContent = stack.cmd;
        
        let treeHTML = '';
        if(this.currentStack === 'mern') {
            treeHTML = `
root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
            `;
        } else if(this.currentStack === 'nextjs') {
            treeHTML = `
root/
├── app/
│   ├── api/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── next.config.js
└── tailwind.config.ts
            `;
        } else if(this.currentStack === 'vue') {
            treeHTML = `
root/
├── src/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
└── vite.config.js
            `;
        } else if(this.currentStack === 'flutter') {
            treeHTML = `
root/
├── lib/
│   ├── models/
│   ├── screens/
│   ├── services/
│   ├── widgets/
│   └── main.dart
├── assets/
│   └── images/
└── pubspec.yaml
            `;
        } else if(this.currentStack === 'springboot') {
            treeHTML = `
root/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── app/
│       │           ├── controller/
│       │           ├── model/
│       │           └── repository/
│       └── resources/
│           └── application.properties
└── pom.xml
            `;
        } else if(this.currentStack === 'reactnative') {
            treeHTML = `
root/
├── app/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
├── app.json
└── babel.config.js
            `;
        } else {
            treeHTML = `
root/
├── backend/
│   ├── api/
│   ├── core/
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── index.js
            `;
        }
        
        document.getElementById('scaffold-tree').innerHTML = `<pre style="margin:0;">${treeHTML.trim()}</pre>`;
    }
};
