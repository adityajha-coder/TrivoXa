const AiStacksMixin = {
    roleData: {
        web: {
            title: 'Build Websites', desc: 'Everything you need to go from idea to deployed website.', stack: [
                { name: 'HTML/CSS/JS', type: 'Foundation', desc: 'Core web technologies — start here', icon: 'fa-brands fa-html5', color: '#e34f26' },
                { name: 'React / Vue', type: 'Framework', desc: 'Build dynamic, component-based UIs', icon: 'fa-brands fa-react', color: '#61dafb' },
                { name: 'Tailwind CSS', type: 'Styling', desc: 'Utility-first CSS for rapid UI development', icon: 'fa-solid fa-palette', color: '#06b6d4' },
                { name: 'Vercel / Netlify', type: 'Hosting', desc: 'Deploy instantly with git push', icon: 'fa-solid fa-rocket', color: '#3ecf6e' },
                { name: 'REST APIs', type: 'Data', desc: 'Fetch data from external services', icon: 'fa-solid fa-plug', color: 'var(--primary-light)' },
                { name: 'GitHub Pages', type: 'Free Hosting', desc: 'Host static sites directly from your repo', icon: 'fa-brands fa-github', color: '#e8e4dc' }
            ]
        },
        mobile: {
            title: 'Build Mobile Apps', desc: 'Create cross-platform mobile applications for iOS and Android.', stack: [
                { name: 'React Native', type: 'Framework', desc: 'Build native apps with React and JS', icon: 'fa-brands fa-react', color: '#61dafb' },
                { name: 'Expo', type: 'Toolchain', desc: 'Fastest way to build React Native apps', icon: 'fa-solid fa-bolt', color: 'var(--primary-light)' },
                { name: 'Flutter', type: 'Framework', desc: 'Google UI toolkit for mobile, web, desktop', icon: 'fa-solid fa-feather', color: '#02569B' },
                { name: 'Firebase', type: 'Backend', desc: 'Auth, database, storage, hosting', icon: 'fa-solid fa-fire', color: '#f0a030' },
                { name: 'AsyncStorage', type: 'Storage', desc: 'Simple key-value local storage', icon: 'fa-solid fa-database', color: '#8b5cf6' },
                { name: 'Play Store / App Store', type: 'Distribution', desc: 'Publish to millions of users', icon: 'fa-solid fa-store', color: '#3ecf6e' }
            ]
        },
        ai: {
            title: 'Learn AI / ML', desc: 'Get started with artificial intelligence — from APIs to training models.', stack: [
                { name: 'OpenAI API', type: 'AI API', desc: 'GPT models for text generation', icon: 'fa-solid fa-brain', color: '#10a37f' },
                { name: 'TensorFlow.js', type: 'ML Library', desc: 'Run ML models in the browser', icon: 'fa-solid fa-robot', color: '#ff6f00' },
                { name: 'Hugging Face', type: 'Models Hub', desc: 'Thousands of pre-trained models', icon: 'fa-solid fa-face-smile', color: '#ffd21e' },
                { name: 'Python + Jupyter', type: 'Environment', desc: 'Standard toolkit for data science', icon: 'fa-brands fa-python', color: '#3776ab' },
                { name: 'Kaggle', type: 'Datasets', desc: 'Free datasets and competitions', icon: 'fa-solid fa-chart-line', color: '#20beff' },
                { name: 'Replicate', type: 'Inference', desc: 'Run ML models via API calls', icon: 'fa-solid fa-cloud', color: '#8b5cf6' }
            ]
        },
        backend: {
            title: 'Build Backend / APIs', desc: 'Learn server-side applications, REST APIs, and databases.', stack: [
                { name: 'Node.js', type: 'Runtime', desc: 'JavaScript on the server', icon: 'fa-brands fa-node-js', color: '#339933' },
                { name: 'Express.js', type: 'Framework', desc: 'Minimal web framework for Node', icon: 'fa-solid fa-server', color: '#e8e4dc' },
                { name: 'PostgreSQL', type: 'Database', desc: 'Powerful relational database', icon: 'fa-solid fa-database', color: '#336791' },
                { name: 'MongoDB', type: 'Database', desc: 'Flexible NoSQL document DB', icon: 'fa-solid fa-leaf', color: '#47A248' },
                { name: 'JWT / OAuth', type: 'Auth', desc: 'Secure authentication', icon: 'fa-solid fa-shield-halved', color: 'var(--error)' },
                { name: 'Postman', type: 'Testing', desc: 'Test and debug APIs', icon: 'fa-solid fa-paper-plane', color: '#ff6c37' }
            ]
        },
        devops: {
            title: 'DevOps & Deployment', desc: 'Automate deployments, containerize apps, and manage infrastructure.', stack: [
                { name: 'Docker', type: 'Containers', desc: 'Package apps into containers', icon: 'fa-brands fa-docker', color: '#2496ed' },
                { name: 'GitHub Actions', type: 'CI/CD', desc: 'Automate build/test/deploy', icon: 'fa-brands fa-github', color: '#e8e4dc' },
                { name: 'AWS / GCP', type: 'Cloud', desc: 'Scalable cloud platforms', icon: 'fa-brands fa-aws', color: '#ff9900' },
                { name: 'Nginx', type: 'Web Server', desc: 'Reverse proxy and load balancer', icon: 'fa-solid fa-globe', color: '#009639' },
                { name: 'Terraform', type: 'IaC', desc: 'Infrastructure as code', icon: 'fa-solid fa-cubes', color: '#7b42bc' },
                { name: 'Linux / Bash', type: 'OS', desc: 'Server administration skills', icon: 'fa-brands fa-linux', color: '#fcc624' }
            ]
        }
    },

    bindRoles() {
        const roleCards = document.querySelectorAll('.role-card');
        const roleDetail = document.getElementById('role-detail');
        const roleClose = document.getElementById('role-close');
        
        if (roleCards.length === 0 || !roleDetail || !roleClose) {
            console.warn('[Stacks] Missing role elements - skipping binding');
            return;
        }
        
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                const data = this.roleData[card.dataset.role];
                if (!data) return;
                
                const titleEl = document.getElementById('role-detail-title');
                const descEl = document.getElementById('role-detail-desc');
                const stackEl = document.getElementById('role-detail-stack');
                
                if (titleEl && descEl && stackEl) {
                    roleDetail.style.display = 'block';
                    titleEl.innerHTML = `<i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>${data.title}`;
                    descEl.textContent = data.desc;
                    stackEl.innerHTML = `<div class="grid-3">${data.stack.map(s => `<div class="glass-card" style="padding:16px;"><div class="flex-gap mb-sm"><i class="${s.icon}" style="color:${s.color};font-size:1.1rem;"></i><span style="font-weight:600;font-size:0.88rem;">${s.name}</span></div><span class="tag tag-primary mb-sm">${s.type}</span><p class="text-xs text-secondary" style="line-height:1.5;margin-top:6px;">${s.desc}</p></div>`).join('')}</div>`;
                    roleDetail.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                }
            });
        });
        
        roleClose.addEventListener('click', () => { 
            roleDetail.style.display = 'none';
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
        });
    }
};
