const GithubGitMixin = {
    prepareGitView() {
        const { repo, branches, commits } = this.repoData;
        const tagHtml = branches.slice(0, 8).map(b => {
            const cls = b.name === 'main' || b.name === 'master' ? 'branch-main' : b.name.includes('fix') ? 'branch-hotfix' : 'branch-feature';
            return `<span class="branch-label ${cls}"><i class="fa-solid fa-code-branch"></i> ${b.name}</span>`;
        }).join('');
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
                <div><span class="text-sm" style="font-weight:600;">Top Contributors</span><div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">${topContribs.map(([name, count]) => `<div class="flex-between"><span class="text-sm">${Helpers.escapeHtml(name)}</span><div class="flex-gap gap-sm"><div style="width:50px;height:3px;background:rgba(212,168,67,0.05);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${(count / topContribs[0][1]) * 100}%;background:var(--primary);border-radius:3px;"></div></div><span class="text-xs text-muted">${count}</span></div></div>`).join('')}</div></div>
                <div><span class="text-sm" style="font-weight:600;">Commit Frequency</span><div style="margin-top:10px;display:flex;align-items:flex-end;gap:5px;height:44px;">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => { const count = dayMap[d] || 0; const max = Math.max(...Object.values(dayMap), 1); const pct = Math.max(6, (count / max) * 100); return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;"><div style="width:100%;height:${pct}%;background:linear-gradient(180deg,var(--primary),var(--primary-dark));border-radius:2px 2px 0 0;min-height:2px;"></div><span class="text-xs text-muted">${d.charAt(0)}</span></div>`; }).join('')}</div></div>
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

        document.getElementById('explorer-tabs').addEventListener('click', async e => {
            if (e.target.closest('[data-view="git"]') && !this.gitScene) {
                await this._loadDeps();
                setTimeout(() => this.init3DGit(), 80);
            }
        });
    },

    init3DGit() {
        if (this.gitScene) return;
        const { branches, commits } = this.repoData;
        const container = document.getElementById('git-3d');
        const w = container.clientWidth || 800, h = container.clientHeight || 400;
        const aspect = h === 0 ? 1 : w / h;
        this.gitScene = new THREE.Scene();
        this.gitScene.background = new THREE.Color(0x000000);
        this.gitCamera = new THREE.PerspectiveCamera(50, aspect, 0.1, 500);
        this.gitCamera.position.set(5, 10, 30);
        this.gitRenderer = new THREE.WebGLRenderer({ antialias: true });
        this.gitRenderer.setSize(w, h);
        this.gitRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        // Add resize listener to prevent "ratio error" on orientation change
        const resizeHandler = () => {
            const nw = container.clientWidth, nh = container.clientHeight;
            if (nw && nh) {
                this.gitCamera.aspect = nw / nh;
                this.gitCamera.updateProjectionMatrix();
                this.gitRenderer.setSize(nw, nh);
            }
        };
        window.addEventListener('resize', resizeHandler);
        // Store for cleanup
        this._gitResizeHandler = resizeHandler;
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
            if (i > 0) { const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-(i - 1) * 2.6, 0, 0), new THREE.Vector3(x, 0, 0)]); this.gitScene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }))); }
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
                if (j > 0) { const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx - 1.4 - (j - 1) * 2.6, y, 0), new THREE.Vector3(x, y, 0)]); this.gitScene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))); }
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

    // cleanup() is consolidated in CodeGitExplorerPage to avoid Object.assign collisions
};