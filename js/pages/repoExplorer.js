const RepoExplorerPage = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    nodes: [],
    lines: [],
    raycaster: null,
    mouse: null,
    animationId: null,

    render() {
        Navbar.renderTopbar('Repo Explorer');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Repo <span class="text-gradient">Explorer</span></h1>
                    <p>Paste a GitHub repository URL to visualize its structure as an interactive 3D graph.</p>
                </div>
                <div class="flex-gap mb-lg flex-wrap">
                    <div class="input-group" style="flex:1; min-width: 300px;">
                        <i class="input-icon fa-brands fa-github"></i>
                        <input class="input-field has-icon" id="repo-url-input" type="text" placeholder="e.g. facebook/react or https://github.com/facebook/react" />
                    </div>
                    <button class="btn btn-primary" id="explore-btn">
                        <i class="fa-solid fa-cube"></i> Explore
                    </button>
                </div>
                <div id="repo-info-bar" style="display:none;" class="glass-card mb-md" style="padding: 16px 20px;">
                    <div class="flex-between flex-wrap gap-md">
                        <div class="flex-gap">
                            <i class="fa-solid fa-book" style="color: var(--primary-light)"></i>
                            <strong id="repo-name-display"></strong>
                        </div>
                        <div class="flex-gap gap-md" id="repo-stats-display"></div>
                    </div>
                </div>
                <div id="explorer-container" style="display:none;">
                    <div class="split-view">
                        <div class="glass-card-static split-pane" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-folder-tree"></i> File Tree</span>
                                <span class="text-xs text-muted" id="file-count"></span>
                            </div>
                            <div class="pane-body" id="file-tree-container" style="font-size: 0.82rem;"></div>
                        </div>
                        <div class="glass-card-static split-pane" style="padding:0;">
                            <div class="pane-header">
                                <span><i class="fa-solid fa-cube"></i> 3D View</span>
                                <div class="flex-gap">
                                    <button class="btn btn-ghost btn-sm" id="reset-camera-btn">Reset View</button>
                                </div>
                            </div>
                            <div class="three-canvas-wrap" id="three-container"></div>
                        </div>
                    </div>
                </div>
                <div id="repo-empty-state">
                    <div class="empty-state">
                        <i class="fa-solid fa-cube"></i>
                        <h3>Explore a Repository</h3>
                        <p>Enter a GitHub repository URL above to see its file structure rendered as a 3D visualization.</p>
                    </div>
                </div>
            </div>`;

        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('explore-btn').addEventListener('click', () => this.exploreRepo());
        document.getElementById('repo-url-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.exploreRepo();
        });
    },

    async exploreRepo() {
        const input = document.getElementById('repo-url-input').value;
        const parsed = API.parseGitHubUrl(input);
        if (!parsed) {
            Toast.show('Invalid GitHub URL. Use format: owner/repo', 'error');
            return;
        }

        document.getElementById('repo-empty-state').style.display = 'none';
        document.getElementById('explorer-container').style.display = 'none';
        document.getElementById('repo-info-bar').style.display = 'none';

        const btn = document.getElementById('explore-btn');
        btn.innerHTML = '<div class="loader-spinner" style="width:18px;height:18px;border-width:2px;"></div> Loading...';
        btn.disabled = true;

        try {
            const [repoInfo, tree] = await Promise.all([
                API.getRepoInfo(parsed.owner, parsed.repo),
                API.getRepoTree(parsed.owner, parsed.repo)
            ]);

            document.getElementById('repo-info-bar').style.display = 'block';
            document.getElementById('repo-name-display').textContent = repoInfo.full_name;
            document.getElementById('repo-stats-display').innerHTML = `
                <span class="tag tag-primary"><i class="fa-solid fa-star"></i> ${Helpers.formatNumber(repoInfo.stargazers_count)}</span>
                <span class="tag tag-accent"><i class="fa-solid fa-code-fork"></i> ${Helpers.formatNumber(repoInfo.forks_count)}</span>
                ${repoInfo.language ? `<span class="tag tag-secondary">${repoInfo.language}</span>` : ''}`;

            const files = tree.tree || [];
            document.getElementById('file-count').textContent = `${files.length} items`;

            this.renderFileTree(files);
            document.getElementById('explorer-container').style.display = 'block';

            setTimeout(() => this.init3D(files), 100);
        } catch (err) {
            Toast.show(err.message, 'error');
            document.getElementById('repo-empty-state').style.display = 'block';
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-cube"></i> Explore';
            btn.disabled = false;
        }
    },

    renderFileTree(files) {
        const container = document.getElementById('file-tree-container');
        const dirs = new Set();
        const treeFiles = [];

        files.forEach(f => {
            if (f.type === 'tree') dirs.add(f.path);
            else treeFiles.push(f);
        });

        const structure = {};
        treeFiles.forEach(f => {
            const parts = f.path.split('/');
            let current = structure;
            parts.forEach((part, i) => {
                if (i === parts.length - 1) {
                    current[part] = { type: 'file', path: f.path, size: f.size };
                } else {
                    if (!current[part]) current[part] = {};
                    current = current[part];
                }
            });
        });

        const renderLevel = (obj, depth = 0) => {
            let html = '';
            const sorted = Object.entries(obj).sort((a, b) => {
                const aIsDir = typeof a[1] === 'object' && !a[1].type;
                const bIsDir = typeof b[1] === 'object' && !b[1].type;
                if (aIsDir && !bIsDir) return -1;
                if (!aIsDir && bIsDir) return 1;
                return a[0].localeCompare(b[0]);
            });

            sorted.forEach(([name, val]) => {
                const indent = depth * 16;
                if (val.type === 'file') {
                    const fileInfo = Helpers.getFileIcon(name);
                    html += `<div class="file-tree-item" style="padding-left: ${12 + indent}px;">
                        <i class="${fileInfo.icon}" style="color: ${fileInfo.color}"></i>
                        <span>${name}</span>
                        ${val.size ? `<span class="text-xs text-muted" style="margin-left:auto;">${Helpers.formatBytes(val.size)}</span>` : ''}
                    </div>`;
                } else {
                    html += `<div class="file-tree-item" style="padding-left: ${12 + indent}px;">
                        <i class="fa-solid fa-folder" style="color: var(--warning)"></i>
                        <span style="font-weight: 500;">${name}</span>
                    </div>`;
                    html += renderLevel(val, depth + 1);
                }
            });
            return html;
        };

        container.innerHTML = renderLevel(structure);
    },

    init3D(files) {
        this.cleanup();
        const container = document.getElementById('three-container');
        const w = container.clientWidth;
        const h = container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050510);
        this.scene.fog = new THREE.Fog(0x050510, 40, 120);

        this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
        this.camera.position.set(0, 20, 40);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 100;

        const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
        this.scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x6366f1, 1.5, 100);
        pointLight.position.set(10, 20, 10);
        this.scene.add(pointLight);
        const pointLight2 = new THREE.PointLight(0x06b6d4, 1, 80);
        pointLight2.position.set(-10, -10, 15);
        this.scene.add(pointLight2);

        this.buildGraph(files);

        const resetBtn = document.getElementById('reset-camera-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.camera.position.set(0, 20, 40);
                this.controls.target.set(0, 0, 0);
            });
        }

        const onResize = () => {
            const nw = container.clientWidth;
            const nh = container.clientHeight;
            this.camera.aspect = nw / nh;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(nw, nh);
        };
        window.addEventListener('resize', onResize);

        this.animate();
    },

    buildGraph(files) {
        const folders = {};
        const fileNodes = [];

        files.forEach(f => {
            const parts = f.path.split('/');
            if (f.type === 'tree') {
                folders[f.path] = parts;
            } else {
                fileNodes.push({ path: f.path, parts });
            }
        });

        const centerNode = new THREE.Mesh(
            new THREE.SphereGeometry(1.2, 32, 32),
            new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3 })
        );
        this.scene.add(centerNode);
        this.nodes.push(centerNode);

        const topDirs = new Set();
        fileNodes.forEach(f => {
            if (f.parts.length > 1) topDirs.add(f.parts[0]);
        });

        const dirArr = Array.from(topDirs);
        const dirPositions = {};

        dirArr.forEach((dir, i) => {
            const angle = (i / dirArr.length) * Math.PI * 2;
            const radius = 12;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 6;

            const colors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x22c55e, 0xf59e0b, 0xef4444];
            const color = colors[i % colors.length];

            const node = new THREE.Mesh(
                new THREE.SphereGeometry(0.7, 24, 24),
                new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.2 })
            );
            node.position.set(x, y, z);
            this.scene.add(node);
            this.nodes.push(node);
            dirPositions[dir] = { x, y, z, color };

            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(x, y, z)
            ]);
            const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x2a2a4a, transparent: true, opacity: 0.4 }));
            this.scene.add(line);
            this.lines.push(line);
        });

        const cap = Math.min(fileNodes.length, 200);
        for (let i = 0; i < cap; i++) {
            const f = fileNodes[i];
            const topDir = f.parts.length > 1 ? f.parts[0] : null;
            const parent = topDir && dirPositions[topDir] ? dirPositions[topDir] : { x: 0, y: 0, z: 0, color: 0x64748b };
            const angle = Math.random() * Math.PI * 2;
            const dist = 3 + Math.random() * 5;
            const fx = parent.x + Math.cos(angle) * dist;
            const fz = parent.z + Math.sin(angle) * dist;
            const fy = parent.y + (Math.random() - 0.5) * 4;

            const fileColor = parent.color || 0x64748b;
            const fNode = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 12, 12),
                new THREE.MeshPhongMaterial({ color: fileColor, emissive: fileColor, emissiveIntensity: 0.1 })
            );
            fNode.position.set(fx, fy, fz);
            this.scene.add(fNode);

            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(parent.x, parent.y, parent.z),
                new THREE.Vector3(fx, fy, fz)
            ]);
            const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x1a1a3a, transparent: true, opacity: 0.2 }));
            this.scene.add(line);
        }
    },

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.nodes.forEach((node, i) => {
            node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });
        this.renderer.render(this.scene, this.camera);
    },

    cleanup() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
        this.nodes = [];
        this.lines = [];
        this.scene = null;
    }
};
