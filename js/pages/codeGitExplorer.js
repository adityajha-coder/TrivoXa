const CodeGitExplorerPage = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    animationId: null,
    nodes: [],
    activeView: 'structure',

    render() {
        Navbar.renderTopbar('Code & Git Explorer');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Code & Git <span class="text-gradient">Explorer</span></h1>
                    <p>Visualize repository structure, file relationships, branches, and commit history in one unified view.</p>
                </div>
                <div class="flex-gap mb-lg flex-wrap">
                    <div class="input-group" style="flex:1; min-width: 280px;">
                        <i class="input-icon fa-brands fa-github"></i>
                        <input class="input-field has-icon" id="explorer-input" type="text" placeholder="e.g. facebook/react or https://github.com/vuejs/core" />
                    </div>
                    <button class="btn btn-primary" id="explorer-btn"><i class="fa-solid fa-cube"></i> Explore</button>
                </div>
                <div id="explorer-tabs-area" style="display:none;">
                    <div class="tabs mb-lg" id="explorer-tabs">
                        <button class="tab-item active" data-view="structure"><i class="fa-solid fa-diagram-project"></i> Structure</button>
                        <button class="tab-item" data-view="git"><i class="fa-solid fa-code-branch"></i> Git History</button>
                    </div>
                </div>
                <div id="explorer-info" style="display:none;" class="glass-card mb-md" style="padding:16px 20px;">
                    <div class="flex-between flex-wrap gap-md">
                        <div class="flex-gap">
                            <i class="fa-brands fa-github" style="color:var(--primary-light)"></i>
                            <strong id="explorer-repo-name" style="font-size:0.92rem;"></strong>
                            <span class="text-xs text-muted" id="explorer-lang"></span>
                        </div>
                        <div class="flex-gap gap-sm text-xs text-muted">
                            <span id="explorer-stars"></span>
                            <span id="explorer-forks"></span>
                        </div>
                    </div>
                </div>
                <div id="explorer-structure-view" style="display:none;">
                    <div class="grid-2" style="grid-template-columns: 280px 1fr;">
                        <div class="glass-card-static" style="padding:0; max-height: 500px; display: flex; flex-direction: column;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-folder-tree" style="color:var(--primary-light);margin-right:5px;"></i> Files</span>
                                <span class="text-xs text-muted" id="file-count-label"></span>
                            </div>
                            <div style="flex:1;overflow:auto;padding:10px;" id="file-tree"></div>
                        </div>
                        <div class="glass-card-static" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-diagram-project" style="color:var(--primary-light);margin-right:5px;"></i> 3D Map</span>
                                <button class="btn btn-ghost btn-sm" id="structure-reset"><i class="fa-solid fa-rotate"></i></button>
                            </div>
                            <div class="three-canvas-wrap" id="structure-3d" style="min-height:440px;"></div>
                        </div>
                    </div>
                    <div class="mt-lg">
                        <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-chart-pie" style="color:var(--primary-light);margin-right:6px;"></i>File Breakdown</h3>
                        <div class="grid-4" id="file-breakdown"></div>
                    </div>
                </div>
                <div id="explorer-git-view" style="display:none;">
                    <div class="grid-2 mb-lg" style="grid-template-columns: 1fr 1fr;">
                        <div class="glass-card-static" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-code-branch" style="color:var(--success);margin-right:5px;"></i> Branch Graph</span>
                                <button class="btn btn-ghost btn-sm" id="git-reset"><i class="fa-solid fa-rotate"></i></button>
                            </div>
                            <div class="three-canvas-wrap" id="git-3d" style="min-height:400px;"></div>
                        </div>
                        <div class="glass-card-static" style="padding:0;">
                            <div class="pane-header"><span><i class="fa-solid fa-chart-bar" style="color:var(--primary-light);margin-right:5px;"></i> Insights</span></div>
                            <div style="padding:16px;overflow-y:auto;max-height:400px;" id="git-insights"></div>
                        </div>
                    </div>
                    <div class="flex-gap mb-md flex-wrap" id="branch-tags"></div>
                    <div class="glass-card-static">
                        <div class="flex-between mb-md">
                            <h3 style="font-size:0.95rem;font-weight:600;"><i class="fa-solid fa-clock-rotate-left" style="color:var(--primary-light);margin-right:6px;"></i>Commits</h3>
                            <span class="text-xs text-muted" id="commit-count"></span>
                        </div>
                        <div id="commits-list"></div>
                    </div>
                </div>
                <div id="explorer-empty">
                    <div class="empty-state">
                        <i class="fa-solid fa-cube"></i>
                        <h3>Explore a Repository</h3>
                        <p>Enter a GitHub repo to visualize file structure, dependency relationships, branches, and commit history.</p>
                    </div>
                </div>
            </div>`;
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('explorer-btn').addEventListener('click', () => this.load());
        document.getElementById('explorer-input').addEventListener('keydown', e => { if (e.key === 'Enter') this.load(); });
        document.getElementById('explorer-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#explorer-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            this.activeView = tab.dataset.view;
            document.getElementById('explorer-structure-view').style.display = this.activeView === 'structure' ? 'block' : 'none';
            document.getElementById('explorer-git-view').style.display = this.activeView === 'git' ? 'block' : 'none';
        });
    },

    async load() {
        const input = document.getElementById('explorer-input').value;
        const parsed = API.parseGitHubUrl(input);
        if (!parsed) { Toast.show('Enter a valid GitHub repo URL', 'error'); return; }
        const btn = document.getElementById('explorer-btn');
        btn.innerHTML = '<div class="loader-spinner" style="width:16px;height:16px;border-width:2px;"></div>';
        btn.disabled = true;
        try {
            const [repo, tree, branches, commits] = await Promise.all([
                API.getRepoInfo(parsed.owner, parsed.repo),
                API.getRepoTree(parsed.owner, parsed.repo),
                API.getRepoBranches(parsed.owner, parsed.repo),
                API.getRepoCommits(parsed.owner, parsed.repo, '', 30)
            ]);
            this.repoData = { repo, tree: tree.tree || [], branches, commits };
            document.getElementById('explorer-empty').style.display = 'none';
            document.getElementById('explorer-tabs-area').style.display = 'block';
            document.getElementById('explorer-info').style.display = 'block';
            document.getElementById('explorer-repo-name').textContent = repo.full_name;
            document.getElementById('explorer-lang').textContent = repo.language || '';
            document.getElementById('explorer-stars').innerHTML = `<i class="fa-solid fa-star"></i> ${Helpers.formatNumber(repo.stargazers_count)}`;
            document.getElementById('explorer-forks').innerHTML = `<i class="fa-solid fa-code-fork"></i> ${Helpers.formatNumber(repo.forks_count)}`;
            this.showStructure();
            this.prepareGitView();
        } catch (err) { Toast.show(err.message, 'error'); }
        finally { btn.innerHTML = '<i class="fa-solid fa-cube"></i> Explore'; btn.disabled = false; }
    },

    showStructure() {
        document.getElementById('explorer-structure-view').style.display = 'block';
        const files = this.repoData.tree.filter(f => f.type === 'blob');
        document.getElementById('file-count-label').textContent = `${files.length} files`;
        this.renderTree(files);
        this.renderBreakdown(files);
        setTimeout(() => this.init3DStructure(files), 80);
    },

    renderTree(files) {
        const structure = {};
        files.forEach(f => { const parts = f.path.split('/'); let cur = structure; parts.forEach((p, i) => { if (i === parts.length - 1) cur[p] = { type: 'file', size: f.size }; else { if (!cur[p]) cur[p] = {}; cur = cur[p]; } }); });
        const renderLevel = (obj, depth = 0) => {
            let html = '';
            const sorted = Object.entries(obj).sort((a, b) => { const aD = typeof a[1] === 'object' && !a[1].type; const bD = typeof b[1] === 'object' && !b[1].type; if (aD !== bD) return aD ? -1 : 1; return a[0].localeCompare(b[0]); });
            sorted.forEach(([name, val]) => {
                const indent = depth * 14;
                if (val.type === 'file') { const fi = Helpers.getFileIcon(name); html += `<div class="file-tree-item" style="padding-left:${10+indent}px;"><i class="${fi.icon}" style="color:${fi.color}"></i><span>${name}</span></div>`; }
                else { html += `<div class="file-tree-item" style="padding-left:${10+indent}px;"><i class="fa-solid fa-folder" style="color:var(--primary-light)"></i><span style="font-weight:500;">${name}</span></div>`; html += renderLevel(val, depth + 1); }
            });
            return html;
        };
        document.getElementById('file-tree').innerHTML = renderLevel(structure);
    },

    renderBreakdown(files) {
        const extCount = {};
        files.forEach(f => { const ext = f.path.split('.').pop().toLowerCase(); extCount[ext] = (extCount[ext] || 0) + 1; });
        const sorted = Object.entries(extCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
        const total = files.length;
        document.getElementById('file-breakdown').innerHTML = sorted.map(([ext, count]) => {
            const pct = Math.round((count / total) * 100);
            const fi = Helpers.getFileIcon(`f.${ext}`);
            return `<div class="glass-card" style="padding:14px;"><div class="flex-gap mb-sm"><i class="${fi.icon}" style="color:${fi.color}"></i><span style="font-weight:600;font-size:0.82rem;">.${ext}</span></div><div class="flex-between text-xs text-muted mb-sm"><span>${count}</span><span>${pct}%</span></div><div class="pkg-score"><div class="pkg-score-fill" style="width:${pct}%;background:${fi.color};"></div></div></div>`;
        }).join('');
    },

    init3DStructure(files) {
        this.cleanup();
        const container = document.getElementById('structure-3d');
        const w = container.clientWidth, h = container.clientHeight;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
        this.camera.position.set(0, 14, 28);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.scene.add(new THREE.AmbientLight(0x201810, 0.5));
        const pl = new THREE.PointLight(0xd4a843, 1.5, 80);
        pl.position.set(8, 15, 10);
        this.scene.add(pl);
        const topDirs = {};
        files.forEach(f => { const top = f.path.split('/')[0]; if (!topDirs[top]) topDirs[top] = []; topDirs[top].push(f); });
        const dirs = Object.keys(topDirs);
        const colors = [0xd4a843, 0x3ecf6e, 0x06b6d4, 0xf0a030, 0xe84545, 0xc9952a, 0xec4899, 0x14b8a6];
        const center = new THREE.Mesh(new THREE.OctahedronGeometry(1, 1), new THREE.MeshPhongMaterial({ color: 0xd4a843, emissive: 0xd4a843, emissiveIntensity: 0.25, flatShading: true }));
        this.scene.add(center);
        this.nodes = [center];
        dirs.forEach((dir, i) => {
            const angle = (i / dirs.length) * Math.PI * 2;
            const r = 9 + Math.random() * 3;
            const x = Math.cos(angle) * r, z = Math.sin(angle) * r, y = (Math.random() - 0.5) * 3;
            const color = colors[i % colors.length];
            const node = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.12, flatShading: true }));
            node.position.set(x, y, z);
            this.scene.add(node);
            this.nodes.push(node);
            const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]);
            this.scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })));
            const fc = Math.min(topDirs[dir].length, 12);
            for (let j = 0; j < fc; j++) {
                const fa = Math.random() * Math.PI * 2, fd = 1.8 + Math.random() * 2.5;
                const fn = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.08 }));
                fn.position.set(x + Math.cos(fa) * fd, y + (Math.random() - 0.5) * 1.5, z + Math.sin(fa) * fd);
                this.scene.add(fn);
            }
        });
        document.getElementById('structure-reset').onclick = () => { this.camera.position.set(0, 14, 28); this.controls.target.set(0, 0, 0); };
        window.addEventListener('resize', () => { const nw = container.clientWidth, nh = container.clientHeight; this.camera.aspect = nw / nh; this.camera.updateProjectionMatrix(); this.renderer.setSize(nw, nh); });
        this.animate();
    },

    prepareGitView() {
        const { repo, branches, commits } = this.repoData;
        const tagHtml = branches.slice(0, 8).map(b => { const cls = b.name === 'main' || b.name === 'master' ? 'branch-main' : b.name.includes('fix') ? 'branch-hotfix' : 'branch-feature'; return `<span class="branch-label ${cls}"><i class="fa-solid fa-code-branch"></i> ${b.name}</span>`; }).join('');
        document.getElementById('branch-tags').innerHTML = tagHtml;

        const contributors = {};
        commits.forEach(c => { const n = c.commit.author.name; contributors[n] = (contributors[n] || 0) + 1; });
        const topContribs = Object.entries(contributors).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const dayMap = {};
        commits.forEach(c => { const d = new Date(c.commit.author.date).toLocaleDateString('en-US', { weekday: 'short' }); dayMap[d] = (dayMap[d] || 0) + 1; });

        document.getElementById('git-insights').innerHTML = `
            <div style="display:flex;flex-direction:column;gap:16px;">
                <div class="grid-2 gap-sm">
                    <div style="padding:10px;background:rgba(212,168,67,0.03);border-radius:var(--radius);border:1px solid var(--border);"><div class="text-xs text-muted mb-sm">Stars</div><div style="font-size:1rem;font-weight:700;color:var(--primary-light);">${Helpers.formatNumber(repo.stargazers_count)}</div></div>
                    <div style="padding:10px;background:rgba(212,168,67,0.03);border-radius:var(--radius);border:1px solid var(--border);"><div class="text-xs text-muted mb-sm">Forks</div><div style="font-size:1rem;font-weight:700;color:var(--primary-light);">${Helpers.formatNumber(repo.forks_count)}</div></div>
                    <div style="padding:10px;background:rgba(212,168,67,0.03);border-radius:var(--radius);border:1px solid var(--border);"><div class="text-xs text-muted mb-sm">Branches</div><div style="font-size:1rem;font-weight:700;color:var(--success);">${branches.length}</div></div>
                    <div style="padding:10px;background:rgba(212,168,67,0.03);border-radius:var(--radius);border:1px solid var(--border);"><div class="text-xs text-muted mb-sm">Issues</div><div style="font-size:1rem;font-weight:700;color:var(--warning);">${Helpers.formatNumber(repo.open_issues_count)}</div></div>
                </div>
                <div><span class="text-sm" style="font-weight:600;">Top Contributors</span><div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">${topContribs.map(([name, count]) => `<div class="flex-between"><span class="text-sm">${Helpers.escapeHtml(name)}</span><div class="flex-gap gap-sm"><div style="width:50px;height:3px;background:rgba(212,168,67,0.05);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${(count/topContribs[0][1])*100}%;background:var(--primary);border-radius:3px;"></div></div><span class="text-xs text-muted">${count}</span></div></div>`).join('')}</div></div>
                <div><span class="text-sm" style="font-weight:600;">Commit Frequency</span><div style="margin-top:10px;display:flex;align-items:flex-end;gap:5px;height:44px;">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => { const count = dayMap[d] || 0; const max = Math.max(...Object.values(dayMap), 1); const pct = Math.max(6, (count / max) * 100); return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;"><div style="width:100%;height:${pct}%;background:linear-gradient(180deg,var(--primary),var(--primary-dark));border-radius:2px 2px 0 0;min-height:2px;"></div><span class="text-xs text-muted">${d.charAt(0)}</span></div>`; }).join('')}</div></div>
            </div>`;

        document.getElementById('commit-count').textContent = `${commits.length} loaded`;
        document.getElementById('commits-list').innerHTML = commits.slice(0, 18).map((c, i) => `
            <div class="commit-detail-card" style="animation:slideUp 0.3s ease ${i * 0.02}s both;">
                <div class="flex-between">
                    <div class="flex-gap" style="flex:1;min-width:0;">
                        <img src="${c.author?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${c.commit.author.name}`}" alt="" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border-light);flex-shrink:0;" />
                        <div style="min-width:0;"><div style="font-size:0.82rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${Helpers.escapeHtml(c.commit.message.split('\n')[0])}</div><div class="flex-gap gap-sm" style="margin-top:2px;"><span class="text-xs text-muted">${Helpers.escapeHtml(c.commit.author.name)}</span><span class="text-xs text-muted">&middot; ${Helpers.timeAgo(c.commit.author.date)}</span></div></div>
                    </div>
                    <span class="commit-hash">${c.sha.substring(0, 7)}</span>
                </div>
            </div>`).join('');

        document.getElementById('explorer-tabs').addEventListener('click', e => {
            if (e.target.closest('[data-view="git"]') && !this.gitScene) {
                setTimeout(() => this.init3DGit(), 80);
            }
        });
    },

    init3DGit() {
        if (this.gitScene) return;
        const { branches, commits } = this.repoData;
        const container = document.getElementById('git-3d');
        const w = container.clientWidth, h = container.clientHeight;
        this.gitScene = new THREE.Scene();
        this.gitScene.background = new THREE.Color(0x000000);
        this.gitCamera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
        this.gitCamera.position.set(5, 10, 30);
        this.gitRenderer = new THREE.WebGLRenderer({ antialias: true });
        this.gitRenderer.setSize(w, h);
        this.gitRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(this.gitRenderer.domElement);
        this.gitControls = new THREE.OrbitControls(this.gitCamera, this.gitRenderer.domElement);
        this.gitControls.enableDamping = true;
        this.gitScene.add(new THREE.AmbientLight(0x201810, 0.4));
        const pl = new THREE.PointLight(0xd4a843, 1.5, 80);
        pl.position.set(5, 18, 12);
        this.gitScene.add(pl);
        const pl2 = new THREE.PointLight(0x3ecf6e, 0.6, 50);
        pl2.position.set(-12, -4, 8);
        this.gitScene.add(pl2);

        const branchColors = [0x3ecf6e, 0xd4a843, 0xc9952a, 0xe8c547, 0xf0a030, 0xe84545];
        this.gitNodes = [];
        commits.forEach((c, i) => {
            const x = -i * 2.6;
            const color = branchColors[0];
            const geo = i === 0 ? new THREE.SphereGeometry(0.55, 20, 20) : new THREE.SphereGeometry(0.38, 16, 16);
            const node = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: i === 0 ? 0.35 : 0.12 }));
            node.position.set(x, 0, 0);
            this.gitScene.add(node);
            this.gitNodes.push(node);
            if (i > 0) { const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-(i-1)*2.6, 0, 0), new THREE.Vector3(x, 0, 0)]); this.gitScene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }))); }
        });
        branches.slice(1, 5).forEach((b, bi) => {
            const color = branchColors[(bi + 1) % branchColors.length];
            const y = (bi + 1) * 4;
            const si = Math.floor(Math.random() * Math.min(6, commits.length - 2)) + 1;
            const sx = -si * 2.6;
            const len = Math.floor(Math.random() * 4) + 2;
            const fp = [new THREE.Vector3(sx, 0, 0), new THREE.Vector3(sx - 1, y * 0.5, 0), new THREE.Vector3(sx - 1.4, y, 0)];
            this.gitScene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fp), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })));
            for (let j = 0; j < len; j++) {
                const x = sx - 1.4 - j * 2.6;
                const nd = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.1 }));
                nd.position.set(x, y, 0);
                this.gitScene.add(nd);
                this.gitNodes.push(nd);
                if (j > 0) { const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx-1.4-(j-1)*2.6, y, 0), new THREE.Vector3(x, y, 0)]); this.gitScene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))); }
            }
        });
        document.getElementById('git-reset').onclick = () => { this.gitCamera.position.set(5, 10, 30); this.gitControls.target.set(0, 0, 0); };
        this.animateGit();
    },

    animateGit() {
        this.gitAnimId = requestAnimationFrame(() => this.animateGit());
        this.gitControls.update();
        const t = Date.now() * 0.001;
        this.gitNodes.forEach((n, i) => { n.position.y += Math.sin(t + i * 0.3) * 0.0015; });
        this.gitRenderer.render(this.gitScene, this.gitCamera);
    },

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    },

    cleanup() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
        if (this.gitAnimId) cancelAnimationFrame(this.gitAnimId);
        if (this.gitRenderer) this.gitRenderer.dispose();
        this.scene = null;
        this.gitScene = null;
        this.nodes = [];
        this.gitNodes = [];
    }
};
