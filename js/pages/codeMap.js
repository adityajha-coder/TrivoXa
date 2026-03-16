const CodeMapPage = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    animationId: null,

    render() {
        Navbar.renderTopbar('Visual Code Map');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Visual <span class="text-gradient">Code Map</span></h1>
                    <p>Visualize project structure as file tree and function relationship diagram.</p>
                </div>
                <div class="flex-gap mb-lg flex-wrap">
                    <div class="input-group" style="flex:1; min-width: 300px;">
                        <i class="input-icon fa-brands fa-github"></i>
                        <input class="input-field has-icon" id="map-repo-input" type="text" placeholder="e.g. vuejs/core" />
                    </div>
                    <button class="btn btn-primary" id="map-explore-btn">
                        <i class="fa-solid fa-diagram-project"></i> Map It
                    </button>
                </div>
                <div id="map-container" style="display:none;">
                    <div class="split-view">
                        <div class="glass-card-static split-pane" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-folder-tree"></i> Directory Structure</span>
                                <span class="text-xs text-muted" id="map-file-count"></span>
                            </div>
                            <div class="pane-body" id="map-tree" style="font-size: 0.82rem;"></div>
                        </div>
                        <div class="glass-card-static split-pane" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-diagram-project"></i> Relationship Graph</span>
                                <button class="btn btn-ghost btn-sm" id="map-reset-btn">Reset</button>
                            </div>
                            <div class="three-canvas-wrap" id="map-three-wrap"></div>
                        </div>
                    </div>
                </div>
                <div id="map-details" style="display:none;" class="mt-lg">
                    <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 14px;">
                        <i class="fa-solid fa-chart-pie" style="color: var(--primary-light)"></i> File Type Breakdown
                    </h3>
                    <div class="grid-4" id="map-breakdown"></div>
                </div>
                <div id="map-empty">
                    <div class="empty-state">
                        <i class="fa-solid fa-diagram-project"></i>
                        <h3>Map a Codebase</h3>
                        <p>Enter a GitHub repo to visualize its structure and understand file relationships.</p>
                    </div>
                </div>
            </div>`;

        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('map-explore-btn').addEventListener('click', () => this.loadMap());
        document.getElementById('map-repo-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.loadMap();
        });
    },

    async loadMap() {
        const input = document.getElementById('map-repo-input').value;
        const parsed = API.parseGitHubUrl(input);
        if (!parsed) {
            Toast.show('Invalid GitHub URL format', 'error');
            return;
        }

        const btn = document.getElementById('map-explore-btn');
        btn.innerHTML = '<div class="loader-spinner" style="width:18px;height:18px;border-width:2px;"></div>';
        btn.disabled = true;

        try {
            const tree = await API.getRepoTree(parsed.owner, parsed.repo);
            const files = tree.tree || [];

            document.getElementById('map-empty').style.display = 'none';
            document.getElementById('map-container').style.display = 'block';
            document.getElementById('map-details').style.display = 'block';
            document.getElementById('map-file-count').textContent = `${files.length} items`;

            this.renderTree(files);
            this.renderBreakdown(files);
            setTimeout(() => this.init3DMap(files), 100);
        } catch (err) {
            Toast.show(err.message, 'error');
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-diagram-project"></i> Map It';
            btn.disabled = false;
        }
    },

    renderTree(files) {
        const container = document.getElementById('map-tree');
        const structure = {};

        files.filter(f => f.type === 'blob').forEach(f => {
            const parts = f.path.split('/');
            let current = structure;
            parts.forEach((part, i) => {
                if (i === parts.length - 1) {
                    current[part] = { type: 'file', size: f.size, path: f.path };
                } else {
                    if (!current[part]) current[part] = {};
                    current = current[part];
                }
            });
        });

        const renderLevel = (obj, depth = 0) => {
            let html = '';
            const sorted = Object.entries(obj).sort((a, b) => {
                const aD = typeof a[1] === 'object' && !a[1].type;
                const bD = typeof b[1] === 'object' && !b[1].type;
                if (aD !== bD) return aD ? -1 : 1;
                return a[0].localeCompare(b[0]);
            });
            sorted.forEach(([name, val]) => {
                const indent = depth * 16;
                if (val.type === 'file') {
                    const fi = Helpers.getFileIcon(name);
                    html += `<div class="file-tree-item" style="padding-left:${12 + indent}px;">
                        <i class="${fi.icon}" style="color:${fi.color}"></i>
                        <span>${name}</span>
                    </div>`;
                } else {
                    html += `<div class="file-tree-item" style="padding-left:${12 + indent}px;">
                        <i class="fa-solid fa-folder" style="color:var(--warning)"></i>
                        <span style="font-weight:500;">${name}</span>
                    </div>`;
                    html += renderLevel(val, depth + 1);
                }
            });
            return html;
        };

        container.innerHTML = renderLevel(structure);
    },

    renderBreakdown(files) {
        const extCount = {};
        files.filter(f => f.type === 'blob').forEach(f => {
            const ext = f.path.split('.').pop().toLowerCase();
            extCount[ext] = (extCount[ext] || 0) + 1;
        });

        const sorted = Object.entries(extCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
        const total = files.filter(f => f.type === 'blob').length;

        document.getElementById('map-breakdown').innerHTML = sorted.map(([ext, count]) => {
            const pct = Math.round((count / total) * 100);
            const fi = Helpers.getFileIcon(`file.${ext}`);
            return `
                <div class="glass-card" style="padding: 16px;">
                    <div class="flex-gap mb-sm">
                        <i class="${fi.icon}" style="color: ${fi.color}"></i>
                        <span style="font-weight: 600; font-size: 0.85rem;">.${ext}</span>
                    </div>
                    <div class="flex-between text-xs text-muted mb-sm">
                        <span>${count} files</span>
                        <span>${pct}%</span>
                    </div>
                    <div class="pkg-score">
                        <div class="pkg-score-fill" style="width:${pct}%; background: ${fi.color};"></div>
                    </div>
                </div>`;
        }).join('');
    },

    init3DMap(files) {
        this.cleanup();
        const container = document.getElementById('map-three-wrap');
        const w = container.clientWidth;
        const h = container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050510);

        this.camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 500);
        this.camera.position.set(0, 15, 30);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.scene.add(new THREE.AmbientLight(0x404060, 0.6));
        const pl = new THREE.PointLight(0x8b5cf6, 1.5, 80);
        pl.position.set(10, 15, 10);
        this.scene.add(pl);

        const topDirs = {};
        files.filter(f => f.type === 'blob').forEach(f => {
            const top = f.path.split('/')[0];
            if (!topDirs[top]) topDirs[top] = [];
            topDirs[top].push(f);
        });

        const dirs = Object.keys(topDirs);
        const center = new THREE.Mesh(
            new THREE.OctahedronGeometry(1.2),
            new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 0.3, flatShading: true })
        );
        this.scene.add(center);

        const colors = [0x6366f1, 0x22c55e, 0x06b6d4, 0xf59e0b, 0xef4444, 0x8b5cf6, 0xec4899, 0x14b8a6];

        dirs.forEach((dir, i) => {
            const angle = (i / dirs.length) * Math.PI * 2;
            const r = 10 + Math.random() * 4;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 4;
            const color = colors[i % colors.length];

            const node = new THREE.Mesh(
                new THREE.BoxGeometry(0.8, 0.8, 0.8),
                new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.15, flatShading: true })
            );
            node.position.set(x, y, z);
            node.rotation.set(Math.random(), Math.random(), 0);
            this.scene.add(node);

            const lg = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(x, y, z)
            ]);
            this.scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })));

            const fileCount = Math.min(topDirs[dir].length, 15);
            for (let j = 0; j < fileCount; j++) {
                const fa = Math.random() * Math.PI * 2;
                const fd = 2 + Math.random() * 3;
                const fx = x + Math.cos(fa) * fd;
                const fz = z + Math.sin(fa) * fd;
                const fy = y + (Math.random() - 0.5) * 2;

                const fn = new THREE.Mesh(
                    new THREE.SphereGeometry(0.15, 8, 8),
                    new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.1 })
                );
                fn.position.set(fx, fy, fz);
                this.scene.add(fn);
            }
        });

        document.getElementById('map-reset-btn').addEventListener('click', () => {
            this.camera.position.set(0, 15, 30);
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

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    },

    cleanup() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
        this.scene = null;
    }
};
