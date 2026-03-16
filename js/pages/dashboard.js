const DashboardPage = {
    render() {
        Navbar.renderTopbar('Dashboard');
        const content = document.getElementById('page-content');
        const hours = new Date().getHours();
        const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

        content.innerHTML = `
            <div class="page-enter">
                <div class="dashboard-hero">
                    <h1>${greeting}, <span class="text-gradient">Developer</span> ⚡</h1>
                    <p>Explore repositories, generate code, analyze packages, and master Git — all in one place.</p>
                </div>

                <div class="grid-3 mb-lg">
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-primary"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div class="stat-value" data-count="5">0</div>
                        <div class="stat-label">Developer Tools</div>
                        <div class="dash-mini-chart" style="margin-top:10px;">
                            ${[65, 40, 80, 55, 95, 70, 45].map(h => `<div class="bar" style="height:${h}%"></div>`).join('')}
                        </div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-accent"><i class="fa-solid fa-plug"></i></div>
                        <div class="stat-value" data-count="45">0</div>
                        <div class="stat-label">Free APIs Cataloged</div>
                        <div class="dash-mini-chart" style="margin-top:10px;">
                            ${[30, 60, 45, 80, 55, 90, 70].map(h => `<div class="bar" style="height:${h}%"></div>`).join('')}
                        </div>
                    </div>
                    <div class="glass-card stat-card">
                        <div class="stat-icon icon-success"><i class="fa-solid fa-terminal"></i></div>
                        <div class="stat-value" data-count="35">0</div>
                        <div class="stat-label">Git Commands Reference</div>
                        <div class="dash-mini-chart" style="margin-top:10px;">
                            ${[50, 75, 40, 85, 60, 70, 90].map(h => `<div class="bar" style="height:${h}%"></div>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="flex-between mb-md">
                    <h2 style="font-size:1rem;font-weight:600;"><i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>All Tools</h2>
                </div>

                <div class="dashboard-tools-grid">
                    <div class="glass-card tool-card" data-page="code-generator">
                        <div class="tool-icon icon-primary"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <h3>Code Generator</h3>
                        <p>Generate production-ready UI components in HTML, React, or Vue.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="code-git-explorer">
                        <div class="tool-icon icon-success"><i class="fa-solid fa-cube"></i></div>
                        <h3>Code & Git Explorer</h3>
                        <p>Visualize any repository's file structure and branch history in 3D.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                    <div class="glass-card tool-card" data-page="package-scout">
                        <div class="tool-icon icon-warning"><i class="fa-solid fa-box-open"></i></div>
                        <h3>Package Scout</h3>
                        <p>Evaluate npm packages with quality scores and risk assessment.</p>
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
                        <p>Profile lookup, activity feed, and visual Git command reference.</p>
                        <i class="fa-solid fa-arrow-right tool-arrow"></i>
                    </div>
                </div>
            </div>`;

        this.animateCounters();
        this.bindEvents(content);
    },

    animateCounters() {
        document.querySelectorAll('.stat-value[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 25));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(interval); }
                el.textContent = current;
            }, 40);
        });
    },

    bindEvents(content) {
        content.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.page));
        });
    }
};
