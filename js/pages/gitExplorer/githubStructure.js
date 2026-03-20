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
        files.forEach(f => { const parts = f.path.split('/'); let cur = structure; parts.forEach((p, i) => { if (i === parts.length - 1) cur[p] = { type: 'file', size: f.size }; else { if (!cur[p]) cur[p] = {}; cur = cur[p]; } }); });
        const renderLevel = (obj, depth = 0) => {
            let html = '';
            const sorted = Object.entries(obj).sort((a, b) => { const aD = typeof a[1] === 'object' && !a[1].type; const bD = typeof b[1] === 'object' && !b[1].type; if (aD !== bD) return aD ? -1 : 1; return a[0].localeCompare(b[0]); });
            sorted.forEach(([name, val]) => {
                const indent = depth * 14;
                const baseStyles = `padding-left:${10 + indent}px;`;
                if (val.type === 'file') { 
                    const fi = Helpers.getFileIcon(name); 
                    html += `<div class="file-tree-item" style="${baseStyles}"><i class="${fi.icon}" style="color:${fi.color}"></i><span>${name}</span></div>`; 
                }
                else { 
                    html += `<div class="file-tree-item" style="${baseStyles}"><i class="fa-solid fa-folder" style="color:var(--primary-light)"></i><span style="font-weight:500;">${name}</span></div>`; 
                    html += renderLevel(val, depth + 1); 
                }
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
        container.innerHTML = '';
        const w = container.clientWidth || 800, h = container.clientHeight || 500;

        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        // Single Root Node
        const rootId = 'root';
        nodes.push({ id: rootId, name: 'Project Root', type: 'folder', val: 10, color: '#d4a843' });
        nodeMap.set(rootId, true);

        files.forEach(f => {
            const parts = f.path.split('/');
            let parentPath = rootId;

            parts.forEach((part, i) => {
                const currentPath = i === 0 ? part : parts.slice(0, i + 1).join('/');
                const isFile = i === parts.length - 1;
                
                if (!nodeMap.has(currentPath)) {
                    let color = '#ccc';
                    let val = 3;
                    if (isFile) {
                        const ext = part.split('.').pop().toLowerCase();
                        color = Helpers.getExtColor(ext);
                        val = 2 + Math.min(f.size / 5000, 8);
                    } else {
                        color = '#4ade80';
                        val = 5;
                    }

                    nodes.push({ id: currentPath, name: part, type: isFile ? 'file' : 'folder', val, color });
                    nodeMap.set(currentPath, true);
                    links.push({ source: parentPath, target: currentPath });
                }
                parentPath = currentPath;
            });
        });

        const graphData = { nodes, links };
        
        setTimeout(() => {
            try {
                this.forceGraph = ForceGraph3D()(container)
                .width(w)
                .height(h)
                .backgroundColor('#000000')
                .graphData(graphData)
                .nodeLabel('name')
                .nodeColor(node => node.color)
                .nodeRelSize(3)
                .nodeVal('val')
                .linkColor(() => 'rgba(255,255,255,0.15)')
                .linkWidth(0.5)
                .linkDirectionalParticles(2)
                .linkDirectionalParticleWidth(1.5)
                .linkDirectionalParticleSpeed(d => 0.005 + Math.random() * 0.005)
                .onNodeClick(node => {
                    // Focus camera on node
                    const distance = 40;
                    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
                    this.forceGraph.cameraPosition(
                        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, 
                        node, 
                        3000
                    );
                });

            document.getElementById('structure-reset').onclick = () => {
                this.forceGraph.cameraPosition({ x: 0, y: 0, z: 250 }, { x:0, y:0, z:0 }, 1000);
            };

            window.addEventListener('resize', () => { 
                const nw = container.clientWidth, nh = container.clientHeight; 
                this.forceGraph.width(nw).height(nh);
            });
            } catch (err) {
                fetch('http://localhost:4444', { method: 'POST', body: '3D Graph Error: ' + (err.stack || err) });
            }
        }, 100);
    }
};
