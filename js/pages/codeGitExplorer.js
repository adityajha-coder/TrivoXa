const CodeGitExplorerPage = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    animationId: null,
    nodes: [],
    activeView: 'structure',
    searchType: 'repo',
    _libsLoaded: false,

    async _loadDeps() {
        if (this._libsLoaded) return;
        Toast.show('Loading 3D engine...', 'info', 2000);
        await Helpers.loadScripts([
            'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js'
        ]);
        this._libsLoaded = true;
    },

    render() {
        Navbar.renderTopbar('Code & Git Explorer');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <style>
                @media (max-width: 768px) {
                    .explorer-layout-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .explorer-layout-grid > div:first-child {
                        height: 350px;
                        max-height: 350px;
                    }
                }
                .file-tree-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 0;
                    font-size: 0.82rem;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: color 0.15s;
                    position: relative;
                }
                .file-tree-item:hover {
                    color: var(--text);
                }
                .file-tree-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: -4px;
                    bottom: 0;
                    width: 1px;
                    background: rgba(255, 255, 255, 0.05);
                }
            </style>
            <div class="page-enter">
                <div class="page-header">
                    <h1>GitHub <span class="text-gradient">Explorer</span></h1>
                    <p>Visualize repository map, branches, commit history, or look up user profiles in one unified view.</p>
                </div>
                <div class="tabs mb-md" id="explorer-type-tabs" style="display:inline-flex;">
                    <button class="tab-item active" data-type="repo"><i class="fa-solid fa-book-bookmark"></i> Repository</button>
                    <button class="tab-item" data-type="user"><i class="fa-solid fa-user"></i> Username</button>
                    <button class="tab-item" data-type="local"><i class="fa-solid fa-folder-open"></i> Local Folder</button>
                </div>
                <div class="flex-gap mb-lg flex-wrap">
                    <div class="input-group" style="flex:1; min-width: 280px;" id="explorer-input-wrapper">
                        <i class="input-icon fa-brands fa-github"></i>
                        <input class="input-field has-icon" id="explorer-input" type="text" placeholder="e.g. facebook/react or https://github.com/vuejs/core" />
                        <input type="file" id="local-folder-input" webkitdirectory directory multiple style="display:none;" />
                        <label for="local-folder-input" id="local-upload-btn" class="btn btn-secondary" style="display:none; width:100%; justify-content:center;">Browse Folder to Visualize API / Dependencies</label>
                    </div>
                    <button class="btn btn-primary" id="explorer-btn"><i class="fa-solid fa-search"></i> Explore</button>
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
                    <div class="grid-2 explorer-layout-grid" style="grid-template-columns: 280px 1fr;">
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
                            <div class="three-canvas-wrap" id="structure-3d" style="min-height:350px;height:100%;"></div>
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
                </div>
                <div id="explorer-user-view" style="display:none;" class="mt-lg">
                    <div id="gh-profile-area"></div>
                    <div id="gh-repos-area" class="mt-lg"></div>
                    <div id="gh-events-area" class="mt-lg"></div>
                </div>
                <div id="explorer-empty">
                    <div class="empty-state">
                        <i class="fa-brands fa-github"></i>
                        <h3>Explore GitHub</h3>
                        <p>Enter a GitHub repository or username to visualize code structure, branches, or user activity.</p>
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

        document.getElementById('explorer-type-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#explorer-type-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            this.searchType = tab.dataset.type;
            const input = document.getElementById('explorer-input');
            const localBtn = document.getElementById('local-upload-btn');
            const exploreBtn = document.getElementById('explorer-btn');
            
            if (this.searchType === 'local') {
                input.style.display = 'none';
                localBtn.style.display = 'flex';
                exploreBtn.style.display = 'none';
                document.querySelector('.input-icon.fa-github').style.display = 'none';
            } else {
                input.style.display = 'block';
                localBtn.style.display = 'none';
                exploreBtn.style.display = 'block';
                document.querySelector('.input-icon.fa-github').style.display = 'block';
                if (this.searchType === 'user') {
                    input.placeholder = "e.g. torvalds or vuejs";
                } else {
                    input.placeholder = "e.g. facebook/react or https://github.com/vuejs/core";
                }
            }
        });

        document.getElementById('local-folder-input').addEventListener('change', (e) => {
            if (e.target.files.length) {
                this.loadLocalFolder(e.target.files);
            }
        });
    },

    async load() {
        const input = document.getElementById('explorer-input').value.trim();
        if (!input) { Toast.show(this.searchType === 'user' ? 'Enter a GitHub username' : 'Enter a GitHub repo URL', 'error'); return; }
        
        const btn = document.getElementById('explorer-btn');
        btn.innerHTML = '<div class="loader-spinner" style="width:16px;height:16px;border-width:2px;"></div>';
        btn.disabled = true;

        if (this.searchType === 'user') {
            await this.loadUser(input);
            btn.innerHTML = '<i class="fa-solid fa-search"></i> Explore';
            btn.disabled = false;
            return;
        }

        const parsed = API.parseGitHubUrl(input);

        if (!parsed) {
            Toast.show('Enter a valid GitHub repo (e.g. owner/repo)', 'error');
            btn.innerHTML = '<i class="fa-solid fa-search"></i> Explore';
            btn.disabled = false;
            return;
        }

        try {
            const [repo, tree, branches, commits] = await Promise.all([
                API.getRepoInfo(parsed.owner, parsed.repo),
                API.getRepoTree(parsed.owner, parsed.repo),
                API.getRepoBranches(parsed.owner, parsed.repo),
                API.getRepoCommits(parsed.owner, parsed.repo, '', 30)
            ]);
            this.repoData = { repo, tree: tree.tree || [], branches, commits };
            document.getElementById('explorer-empty').style.display = 'none';
            document.getElementById('explorer-user-view').style.display = 'none';
            
            document.getElementById('explorer-tabs-area').style.display = 'block';
            document.getElementById('explorer-info').style.display = 'block';
            document.getElementById('explorer-repo-name').textContent = repo.full_name;
            document.getElementById('explorer-lang').textContent = repo.language || '';
            document.getElementById('explorer-stars').innerHTML = `<i class="fa-solid fa-star"></i> ${Helpers.formatNumber(repo.stargazers_count)}`;
            document.getElementById('explorer-forks').innerHTML = `<i class="fa-solid fa-code-fork"></i> ${Helpers.formatNumber(repo.forks_count)}`;
            
            this.activeView = 'structure';
            document.querySelectorAll('#explorer-tabs .tab-item').forEach((t, i) => {
                if (i===0) t.classList.add('active'); else t.classList.remove('active');
            });
            document.getElementById('explorer-git-view').style.display = 'none';
            this.showStructure();
            this.prepareGitView();
        } catch (err) { Toast.show(err.message, 'error'); }
        finally { btn.innerHTML = '<i class="fa-solid fa-search"></i> Explore'; btn.disabled = false; }
    },
    async loadLocalFolder(fileList) {
        if (!fileList || fileList.length === 0) return;
        Toast.show('Parsing local directory...', 'info');
        
        const filesArray = [];
        for (let i = 0; i < fileList.length; i++) {
             const f = fileList[i];
             if (!f.webkitRelativePath.includes('.git/') && !f.webkitRelativePath.includes('node_modules/')) {
                 filesArray.push({
                     path: f.webkitRelativePath,
                     size: f.size,
                     type: 'blob',
                     fileObj: f
                 });
             }
        }
        
        this.repoData = { tree: filesArray };
        
        document.getElementById('explorer-empty').style.display = 'none';
        document.getElementById('explorer-user-view').style.display = 'none';
        document.getElementById('explorer-git-view').style.display = 'none';
        
        document.getElementById('explorer-info').style.display = 'block';
        document.getElementById('explorer-repo-name').textContent = 'Local Directory';
        document.getElementById('explorer-lang').textContent = Object.keys(filesArray).length + ' Files';
        document.getElementById('explorer-stars').innerHTML = '';
        document.getElementById('explorer-forks').innerHTML = '';
        
        document.getElementById('explorer-tabs-area').style.display = 'none';
        
        this.activeView = 'structure';
        this.showStructure();
    },


    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        if(this.controls && this.renderer && this.scene && this.camera) {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        }
    },

    cleanup() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
        if (this.gitAnimId) cancelAnimationFrame(this.gitAnimId);
        if (this.gitRenderer) this.gitRenderer.dispose();
        
        if (this.forceGraph) {
            try { this.forceGraph._destructor(); } catch(e) {}
            const oldContainer = document.getElementById('structure-3d');
            if (oldContainer) {
                const newContainer = oldContainer.cloneNode(false);
                oldContainer.parentNode.replaceChild(newContainer, oldContainer);
            }
            this.forceGraph = null;
        }
        
        this.scene = null;
        this.gitScene = null;
        this.nodes = [];
        this.gitNodes = [];
    }
};

Object.assign(CodeGitExplorerPage, GithubUserMixin, GithubStructureMixin, GithubGitMixin);
