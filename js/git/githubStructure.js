const GithubStructureMixin = {
    async showStructure() {
        document.getElementById('explorer-structure-view').style.display = 'block';
        const files = this.repoData.tree.filter(f => f.type === 'blob');
        document.getElementById('file-count-label').textContent = `${files.length} files`;
        this.renderTree(files);
        this.renderBreakdown(files);
        await this._loadDeps();
        setTimeout(() => this.init3DStructure(files), 80);
    },

    renderTree(files) {
        const structure = {};
        files.forEach(f => {
            const parts = f.path.split('/');
            let cur = structure;
            parts.forEach((p, i) => {
                if (i === parts.length - 1) cur[p] = { type: 'file', size: f.size };
                else { if (!cur[p]) cur[p] = {}; cur = cur[p]; }
            });
        });

        const renderLevel = (obj, depth = 0) => {
            let html = '';
            const sorted = Object.entries(obj).sort((a, b) => {
                const aDir = typeof a[1] === 'object' && !a[1].type;
                const bDir = typeof b[1] === 'object' && !b[1].type;
                if (aDir !== bDir) return aDir ? -1 : 1;
                return a[0].localeCompare(b[0]);
            });
            sorted.forEach(([name, val]) => {
                const pad = `padding-left:${10 + depth * 14}px;`;
                if (val.type === 'file') {
                    const fi = Helpers.getFileIcon(name);
                    html += `<div class="file-tree-item" style="${pad}"><i class="${fi.icon}" style="color:${fi.color}"></i><span>${name}</span></div>`;
                } else {
                    html += `<div class="file-tree-item" style="${pad}"><i class="fa-solid fa-folder" style="color:var(--primary-light)"></i><span style="font-weight:500;">${name}</span></div>`;
                    html += renderLevel(val, depth + 1);
                }
            });
            return html;
        };
        document.getElementById('file-tree').innerHTML = renderLevel(structure);
    },

    renderBreakdown(files) {
        const extCount = {};
        files.forEach(f => {
            const ext = f.path.split('.').pop().toLowerCase();
            extCount[ext] = (extCount[ext] || 0) + 1;
        });
        const sorted = Object.entries(extCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
        const total = files.length;
        document.getElementById('file-breakdown').innerHTML = sorted.map(([ext, count]) => {
            const pct = Math.round((count / total) * 100);
            const fi = Helpers.getFileIcon(`f.${ext}`);
            return `<div class="glass-card" style="padding:14px;"><div class="flex-gap mb-sm"><i class="${fi.icon}" style="color:${fi.color}"></i><span style="font-weight:600;font-size:0.82rem;">.${ext}</span></div><div class="flex-between text-xs text-muted mb-sm"><span>${count}</span><span>${pct}%</span></div><div class="pkg-score"><div class="pkg-score-fill" style="width:${pct}%;background:${fi.color};"></div></div></div>`;
        }).join('');
    },

    // green -> yellow -> red based on how big the file is
    _heatColor(size, max) {
        const t = Math.min(size / (max || 1), 1);
        const r = Math.round(t < 0.5 ? t * 2 * 255 : 255);
        const g = Math.round(t < 0.5 ? 255 : (1 - (t - 0.5) * 2) * 255);
        return `rgb(${r},${g},60)`;
    },

    _fmtSize(b) {
        if (b < 1024) return b + ' B';
        if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
        return (b / 1048576).toFixed(1) + ' MB';
    },

    init3DStructure(files) {
        this.cleanup();
        const el = document.getElementById('structure-3d');
        if (!el) return;
        el.innerHTML = '';
        el.style.display = 'block';

        const box = el.getBoundingClientRect();
        const w = box.width || el.clientWidth || 300;
        const h = box.height || el.clientHeight || 300;

        const nodes = [];
        const links = [];
        const seen = new Map();

        const maxFileSize = Math.max(...files.map(f => f.size || 0), 1);

        // root node - blue so it pops
        nodes.push({ id: 'root', name: 'Project Root', type: 'folder', val: 10, color: '#3b82f6' });
        seen.set('root', true);

        for (const f of files) {
            const parts = f.path.split('/');
            let parent = 'root';

            for (let i = 0; i < parts.length; i++) {
                const id = i === 0 ? parts[0] : parts.slice(0, i + 1).join('/');
                const isFile = i === parts.length - 1;

                if (!seen.has(id)) {
                    const size = f.size || 0;
                    const color = isFile ? this._heatColor(size, maxFileSize) : '#4ade80';
                    const val = isFile ? 2 + Math.min(size / 5000, 8) : 5;
                    const label = isFile ? `${parts[i]} (${this._fmtSize(size)})` : parts[i];

                    nodes.push({ id, name: label, type: isFile ? 'file' : 'folder', val, color });
                    seen.set(id, true);
                    links.push({ source: parent, target: id });
                }
                parent = id;
            }
        }

        setTimeout(() => {
            try {
                this.forceGraph = ForceGraph3D()(el)
                    .width(w).height(h)
                    .backgroundColor('#000000')
                    .graphData({ nodes, links })
                    .nodeLabel('name')
                    .nodeColor(n => n.color)
                    .nodeRelSize(3)
                    .nodeVal('val')
                    .linkColor(() => 'rgba(212, 168, 67, 0.45)')
                    .linkWidth(1.2)
                    .linkOpacity(0.6)
                    .linkDirectionalParticles(3)
                    .linkDirectionalParticleWidth(2.5)
                    .linkDirectionalParticleColor(() => 'rgba(240, 197, 109, 0.9)')
                    .linkDirectionalParticleSpeed(() => 0.004 + Math.random() * 0.004)
                    .onNodeClick(node => {
                        const dist = Math.hypot(node.x, node.y, node.z) || 1;
                        const ratio = 1 + 40 / dist;
                        this.forceGraph.cameraPosition(
                            { x: node.x * ratio, y: node.y * ratio, z: node.z * ratio },
                            node, 2000
                        );
                    });

                document.getElementById('structure-reset').onclick = () => {
                    this.forceGraph.cameraPosition({ x: 0, y: 0, z: 250 }, { x: 0, y: 0, z: 0 }, 1000);
                };

                const onResize = () => {
                    const r = el.getBoundingClientRect();
                    if (r.width && r.height) this.forceGraph.width(r.width).height(r.height);
                };
                window.addEventListener('resize', onResize);
                window.addEventListener('orientationchange', () => setTimeout(onResize, 200));
                this._resizeHandler = onResize;

            } catch (err) {
                console.error('3D Graph Error:', err);
            }
        }, 100);
    },

    // cleanup() is consolidated in CodeGitExplorerPage to avoid Object.assign collisions
};
