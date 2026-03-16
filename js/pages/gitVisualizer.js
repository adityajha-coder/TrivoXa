const GitVisualizerPage = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    animationId: null,
    commitNodes: [],

    render() {
        Navbar.renderTopbar('Git Visualizer');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Git <span class="text-gradient">Visualizer</span></h1>
                    <p>Visualize Git branch history, commit graphs, and contributor activity of any GitHub repository.</p>
                </div>
                <div class="flex-gap mb-lg flex-wrap">
                    <div class="input-group" style="flex:1; min-width: 300px;">
                        <i class="input-icon fa-brands fa-github"></i>
                        <input class="input-field has-icon" id="git-repo-input" type="text" placeholder="e.g. facebook/react or https://github.com/vuejs/core" />
                    </div>
                    <button class="btn btn-primary" id="git-explore-btn">
                        <i class="fa-solid fa-code-branch"></i> Visualize
                    </button>
                </div>
                <div id="git-info-panel" style="display:none;">
                    <div class="glass-card mb-md" style="padding: 18px 22px;">
                        <div class="flex-between flex-wrap gap-md">
                            <div class="flex-gap">
                                <i class="fa-solid fa-code-branch" style="color: var(--success)"></i>
                                <strong id="git-repo-name"></strong>
                            </div>
                            <div class="flex-gap gap-md flex-wrap" id="git-branch-tags"></div>
                        </div>
                    </div>
                </div>
                <div id="git-main-content" style="display:none;">
                    <div class="grid-2 mb-lg" style="grid-template-columns: 1fr 1fr;">
                        <div class="glass-card-static" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-diagram-project" style="color:var(--primary-light);margin-right:6px;"></i> 3D Branch Graph</span>
                                <button class="btn btn-ghost btn-sm" id="git-reset-btn"><i class="fa-solid fa-rotate"></i> Reset</button>
                            </div>
                            <div class="three-canvas-wrap" id="git-three-wrap" style="height: 420px; min-height: 420px;"></div>
                        </div>
                        <div class="glass-card-static" style="padding: 0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-chart-bar" style="color:var(--primary-light);margin-right:6px;"></i> Repository Insights</span>
                            </div>
                            <div style="padding: 18px; overflow-y: auto; max-height: 420px;" id="git-insights"></div>
                        </div>
                    </div>
                    <div class="glass-card-static">
                        <div class="flex-between mb-md">
                            <h3 style="font-size: 1rem; font-weight: 600;">
                                <i class="fa-solid fa-clock-rotate-left" style="color: var(--primary-light); margin-right: 8px;"></i>Commit History
                            </h3>
                            <span class="text-xs text-muted" id="commit-count-label"></span>
                        </div>
                        <div id="git-commits-list"></div>
                    </div>
                </div>
                <div id="git-empty">
                    <div class="empty-state">
                        <i class="fa-solid fa-code-branch"></i>
                        <h3>Visualize Git History</h3>
                        <p>Enter a GitHub repo URL to see branch history, commit timelines, and contributor insights rendered in 3D.</p>
                    </div>
                </div>
            </div>`;
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('git-explore-btn').addEventListener('click', () => this.loadRepo());
        document.getElementById('git-repo-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.loadRepo();
        });
    },

    async loadRepo() {
        const input = document.getElementById('git-repo-input').value;
        const parsed = API.parseGitHubUrl(input);
        if (!parsed) { Toast.show('Invalid GitHub URL format', 'error'); return; }

        const btn = document.getElementById('git-explore-btn');
        btn.innerHTML = '<div class="loader-spinner" style="width:18px;height:18px;border-width:2px;"></div>';
        btn.disabled = true;

        try {
            const [repoInfo, branches, commits] = await Promise.all([
                API.getRepoInfo(parsed.owner, parsed.repo),
                API.getRepoBranches(parsed.owner, parsed.repo),
                API.getRepoCommits(parsed.owner, parsed.repo, '', 30)
            ]);

            document.getElementById('git-empty').style.display = 'none';
            document.getElementById('git-info-panel').style.display = 'block';
            document.getElementById('git-main-content').style.display = 'block';
            document.getElementById('git-repo-name').textContent = repoInfo.full_name;

            const tagHtml = branches.slice(0, 8).map(b => {
                const cls = b.name === 'main' || b.name === 'master' ? 'branch-main' :
                    b.name.includes('fix') || b.name.includes('hot') ? 'branch-hotfix' : 'branch-feature';
                return `<span class="branch-label ${cls}"><i class="fa-solid fa-code-branch"></i> ${b.name}</span>`;
            }).join('');
            document.getElementById('git-branch-tags').innerHTML = tagHtml;

            this.renderInsights(repoInfo, branches, commits);
            this.renderCommitsList(commits);
            setTimeout(() => this.init3D(branches, commits), 100);
        } catch (err) {
            Toast.show(err.message, 'error');
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-code-branch"></i> Visualize';
            btn.disabled = false;
        }
    },

    renderInsights(repo, branches, commits) {
        const contributors = {};
        commits.forEach(c => {
            const name = c.commit.author.name;
            contributors[name] = (contributors[name] || 0) + 1;
        });
        const topContribs = Object.entries(contributors).sort((a, b) => b[1] - a[1]).slice(0, 5);

        const dayMap = {};
        commits.forEach(c => {
            const day = new Date(c.commit.author.date).toLocaleDateString('en-US', { weekday: 'short' });
            dayMap[day] = (dayMap[day] || 0) + 1;
        });

        const avgPerDay = commits.length > 1 ?
            ((new Date(commits[0].commit.author.date) - new Date(commits[commits.length - 1].commit.author.date)) / (1000 * 60 * 60 * 24) / commits.length).toFixed(1) : 'N/A';

        document.getElementById('git-insights').innerHTML = `
            <div style="display:flex;flex-direction:column;gap:18px;">
                <div>
                    <div class="flex-between mb-sm">
                        <span class="text-sm" style="font-weight:600;">Repository Stats</span>
                    </div>
                    <div class="grid-2 gap-sm">
                        <div style="padding:12px;background:rgba(212,168,67,0.04);border-radius:var(--radius);border:1px solid var(--border);">
                            <div class="text-xs text-muted mb-sm">Stars</div>
                            <div style="font-size:1.1rem;font-weight:700;color:var(--primary-light);">${Helpers.formatNumber(repo.stargazers_count)}</div>
                        </div>
                        <div style="padding:12px;background:rgba(212,168,67,0.04);border-radius:var(--radius);border:1px solid var(--border);">
                            <div class="text-xs text-muted mb-sm">Forks</div>
                            <div style="font-size:1.1rem;font-weight:700;color:var(--primary-light);">${Helpers.formatNumber(repo.forks_count)}</div>
                        </div>
                        <div style="padding:12px;background:rgba(212,168,67,0.04);border-radius:var(--radius);border:1px solid var(--border);">
                            <div class="text-xs text-muted mb-sm">Branches</div>
                            <div style="font-size:1.1rem;font-weight:700;color:var(--success);">${branches.length}</div>
                        </div>
                        <div style="padding:12px;background:rgba(212,168,67,0.04);border-radius:var(--radius);border:1px solid var(--border);">
                            <div class="text-xs text-muted mb-sm">Open Issues</div>
                            <div style="font-size:1.1rem;font-weight:700;color:var(--warning);">${Helpers.formatNumber(repo.open_issues_count)}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="text-sm" style="font-weight:600;">Top Contributors (recent)</span>
                    <div style="margin-top:10px;display:flex;flex-direction:column;gap:8px;">
                        ${topContribs.map(([name, count]) => `
                            <div class="flex-between" style="padding:6px 0;">
                                <span class="text-sm">${Helpers.escapeHtml(name)}</span>
                                <div class="flex-gap gap-sm">
                                    <div style="width:60px;height:4px;background:rgba(212,168,67,0.06);border-radius:4px;overflow:hidden;">
                                        <div style="height:100%;width:${(count / topContribs[0][1]) * 100}%;background:var(--primary);border-radius:4px;"></div>
                                    </div>
                                    <span class="text-xs text-muted">${count}</span>
                                </div>
                            </div>`).join('')}
                    </div>
                </div>
                <div>
                    <span class="text-sm" style="font-weight:600;">Commit Frequency</span>
                    <div style="margin-top:12px;display:flex;align-items:flex-end;gap:6px;height:50px;">
                        ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => {
                            const count = dayMap[d] || 0;
                            const maxCount = Math.max(...Object.values(dayMap), 1);
                            const pct = Math.max(8, (count / maxCount) * 100);
                            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                                <div style="width:100%;height:${pct}%;background:linear-gradient(180deg,var(--primary),var(--primary-dark));border-radius:3px 3px 0 0;min-height:3px;"></div>
                                <span class="text-xs text-muted">${d.charAt(0)}</span>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
                ${repo.language ? `
                <div>
                    <span class="text-sm" style="font-weight:600;">Primary Language</span>
                    <div class="flex-gap mt-sm">
                        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${Helpers.getLanguageColor(repo.language)};"></span>
                        <span class="text-sm">${repo.language}</span>
                    </div>
                </div>` : ''}
                <div>
                    <span class="text-xs text-muted">~${avgPerDay} days between commits (recent avg)</span>
                </div>
            </div>`;
    },

    renderCommitsList(commits) {
        document.getElementById('commit-count-label').textContent = `${commits.length} commits loaded`;
        document.getElementById('git-commits-list').innerHTML = commits.slice(0, 20).map((c, i) => `
            <div class="commit-detail-card" style="animation: slideUp 0.3s ease ${i * 0.03}s both;">
                <div class="flex-between mb-sm">
                    <div class="flex-gap" style="flex:1;min-width:0;">
                        <img src="${c.author?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${c.commit.author.name}`}" alt="" style="width:28px;height:28px;border-radius:50%;border:1px solid var(--border-light);flex-shrink:0;" />
                        <div style="min-width:0;">
                            <div style="font-size:0.85rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${Helpers.escapeHtml(c.commit.message.split('\n')[0])}</div>
                            <div class="flex-gap gap-sm" style="margin-top:3px;">
                                <span class="text-xs text-muted">${Helpers.escapeHtml(c.commit.author.name)}</span>
                                <span class="text-xs text-muted">&middot;</span>
                                <span class="text-xs text-muted">${Helpers.timeAgo(c.commit.author.date)}</span>
                            </div>
                        </div>
                    </div>
                    <span class="commit-hash">${c.sha.substring(0, 7)}</span>
                </div>
                ${c.commit.message.split('\n').length > 1 ? `<p class="text-xs text-muted" style="margin-top:6px;padding-left:38px;line-height:1.5;">${Helpers.escapeHtml(Helpers.truncate(c.commit.message.split('\n').slice(1).join(' ').trim(), 120))}</p>` : ''}
            </div>`).join('');
    },

    init3D(branches, commits) {
        this.cleanup();
        const container = document.getElementById('git-three-wrap');
        const w = container.clientWidth;
        const h = container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x030308);
        this.scene.fog = new THREE.FogExp2(0x030308, 0.012);

        this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
        this.camera.position.set(5, 12, 35);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;

        this.scene.add(new THREE.AmbientLight(0x302818, 0.4));
        const pl = new THREE.PointLight(0xd4a843, 1.8, 100);
        pl.position.set(5, 20, 15);
        this.scene.add(pl);
        const pl2 = new THREE.PointLight(0x3ecf6e, 0.8, 60);
        pl2.position.set(-15, -5, 10);
        this.scene.add(pl2);
        const pl3 = new THREE.PointLight(0xc9952a, 0.6, 50);
        pl3.position.set(20, 5, -10);
        this.scene.add(pl3);

        this.buildGitGraph(branches, commits);

        document.getElementById('git-reset-btn').addEventListener('click', () => {
            this.camera.position.set(5, 12, 35);
            this.controls.target.set(0, 0, 0);
        });

        window.addEventListener('resize', () => {
            const nw = container.clientWidth;
            const nh = container.clientHeight;
            this.camera.aspect = nw / nh;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(nw, nh);
        });

        this.animate();
    },

    buildGitGraph(branches, commits) {
        this.commitNodes = [];
        const branchColors = [0x3ecf6e, 0xd4a843, 0xc9952a, 0xe8c547, 0xf0a030, 0xe84545, 0x6366f1, 0x06b6d4];

        const mainGeo = new THREE.SphereGeometry(0.5, 24, 24);
        commits.forEach((commit, i) => {
            const x = -i * 2.8;
            const color = branchColors[0];
            const mat = new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: i === 0 ? 0.4 : 0.15 });
            const node = new THREE.Mesh(i === 0 ? new THREE.SphereGeometry(0.6, 24, 24) : mainGeo, mat);
            node.position.set(x, 0, 0);
            this.scene.add(node);
            this.commitNodes.push(node);

            if (i === 0) {
                const glowGeo = new THREE.SphereGeometry(1.2, 16, 16);
                const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08 });
                const glow = new THREE.Mesh(glowGeo, glowMat);
                glow.position.copy(node.position);
                this.scene.add(glow);
            }

            if (i > 0) {
                const prevX = -(i - 1) * 2.8;
                const points = [];
                for (let t = 0; t <= 10; t++) {
                    points.push(new THREE.Vector3(prevX + (x - prevX) * (t / 10), 0, 0));
                }
                const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                this.scene.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 })));
            }
        });

        branches.slice(1, Math.min(6, branches.length)).forEach((branch, bi) => {
            const color = branchColors[(bi + 1) % branchColors.length];
            const y = (bi + 1) * 4.5;
            const startIdx = Math.floor(Math.random() * Math.min(8, commits.length - 2)) + 1;
            const startX = -startIdx * 2.8;
            const len = Math.floor(Math.random() * 5) + 3;

            const forkPoints = [
                new THREE.Vector3(startX, 0, 0),
                new THREE.Vector3(startX - 1, y * 0.5, 0),
                new THREE.Vector3(startX - 1.5, y, 0)
            ];
            const forkGeo = new THREE.BufferGeometry().setFromPoints(forkPoints);
            this.scene.add(new THREE.Line(forkGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })));

            for (let j = 0; j < len; j++) {
                const x = startX - 1.5 - j * 2.8;
                const node = new THREE.Mesh(
                    new THREE.SphereGeometry(0.35, 16, 16),
                    new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.12 })
                );
                node.position.set(x, y, 0);
                this.scene.add(node);
                this.commitNodes.push(node);

                if (j > 0) {
                    const prevX = startX - 1.5 - (j - 1) * 2.8;
                    const lg = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(prevX, y, 0),
                        new THREE.Vector3(x, y, 0)
                    ]);
                    this.scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })));
                }
            }

            if (Math.random() > 0.4) {
                const mergeX = startX - 1.5 - (len - 1) * 2.8;
                const mergeTargetX = mergeX - 2;
                const mergePoints = [
                    new THREE.Vector3(mergeX, y, 0),
                    new THREE.Vector3(mergeX - 1, y * 0.5, 0),
                    new THREE.Vector3(mergeTargetX, 0, 0)
                ];
                const mergeGeo = new THREE.BufferGeometry().setFromPoints(mergePoints);
                this.scene.add(new THREE.Line(mergeGeo, new THREE.LineBasicMaterial({ color: 0xd4a843, transparent: true, opacity: 0.2 })));
            }
        });

        const gridGeo = new THREE.BufferGeometry();
        const gridVerts = [];
        for (let x = 10; x >= -100; x -= 5) {
            gridVerts.push(x, -3, -20, x, -3, 20);
        }
        for (let z = -20; z <= 20; z += 5) {
            gridVerts.push(10, -3, z, -100, -3, z);
        }
        gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridVerts, 3));
        this.scene.add(new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({ color: 0x151520, transparent: true, opacity: 0.3 })));
    },

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.controls.update();
        const t = Date.now() * 0.001;
        this.commitNodes.forEach((node, i) => {
            node.position.y += Math.sin(t + i * 0.3) * 0.002;
        });
        this.renderer.render(this.scene, this.camera);
    },

    cleanup() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
        this.commitNodes = [];
        this.scene = null;
    }
};
