const GitHubHubPage = {
    gitCommands: [
        { cmd: 'git init', desc: 'Initialize a new Git repository in the current directory.', example: 'git init', cat: 'Setup', step: 1 },
        { cmd: 'git clone <url>', desc: 'Create a local copy of a remote repository.', example: 'git clone https://github.com/user/repo.git', cat: 'Setup', step: 1 },
        { cmd: 'git config', desc: 'Set your name, email, and preferences.', example: 'git config --global user.name "Your Name"', cat: 'Setup', step: 1 },
        { cmd: 'git status', desc: 'Show the current state of your working directory.', example: 'git status', cat: 'Basics', step: 2 },
        { cmd: 'git add <file>', desc: 'Stage changes for the next commit. Use "." to stage all.', example: 'git add .', cat: 'Basics', step: 2 },
        { cmd: 'git commit -m "<msg>"', desc: 'Record staged changes as a new commit.', example: 'git commit -m "feat: add login"', cat: 'Basics', step: 3 },
        { cmd: 'git push', desc: 'Upload local commits to a remote repository.', example: 'git push origin main', cat: 'Basics', step: 4 },
        { cmd: 'git pull', desc: 'Fetch and merge changes from remote.', example: 'git pull origin main', cat: 'Basics', step: 4 },
        { cmd: 'git fetch', desc: 'Download remote changes without merging.', example: 'git fetch origin', cat: 'Basics', step: 4 },
        { cmd: 'git log', desc: 'Show commit history with hashes and messages.', example: 'git log --oneline --graph', cat: 'Inspect', step: 5 },
        { cmd: 'git diff', desc: 'Show differences between working dir and staging.', example: 'git diff HEAD~1', cat: 'Inspect', step: 5 },
        { cmd: 'git show <hash>', desc: 'Display detailed info about a specific commit.', example: 'git show abc1234', cat: 'Inspect', step: 5 },
        { cmd: 'git blame <file>', desc: 'Show who last modified each line of a file.', example: 'git blame index.js', cat: 'Inspect', step: 5 },
        { cmd: 'git shortlog', desc: 'Summarize git log grouped by author.', example: 'git shortlog -sn', cat: 'Inspect', step: 5 },
        { cmd: 'git branch', desc: 'List, create, or delete branches.', example: 'git branch feature/login', cat: 'Branch', step: 6 },
        { cmd: 'git checkout', desc: 'Switch to a different branch or restore files.', example: 'git checkout develop', cat: 'Branch', step: 6 },
        { cmd: 'git switch', desc: 'Modern way to switch between branches.', example: 'git switch -c new-feature', cat: 'Branch', step: 6 },
        { cmd: 'git merge <branch>', desc: 'Combine changes from another branch into current.', example: 'git merge feature/login', cat: 'Branch', step: 7 },
        { cmd: 'git rebase <branch>', desc: 'Reapply commits on top of another base tip.', example: 'git rebase main', cat: 'Branch', step: 7 },
        { cmd: 'git cherry-pick', desc: 'Apply a specific commit to the current branch.', example: 'git cherry-pick abc1234', cat: 'Advanced', step: 8 },
        { cmd: 'git stash', desc: 'Temporarily save uncommitted changes.', example: 'git stash && git stash pop', cat: 'Advanced', step: 8 },
        { cmd: 'git reset <hash>', desc: 'Undo commits or unstage files.', example: 'git reset --soft HEAD~1', cat: 'Advanced', step: 8 },
        { cmd: 'git revert <hash>', desc: 'Create a new commit that undoes another commit.', example: 'git revert abc1234', cat: 'Advanced', step: 8 },
        { cmd: 'git tag <name>', desc: 'Mark a specific point in history for releases.', example: 'git tag -a v1.0.0 -m "Release 1.0"', cat: 'Advanced', step: 9 },
        { cmd: 'git remote', desc: 'Manage remote repository connections.', example: 'git remote add origin <url>', cat: 'Remote', step: 4 },
        { cmd: 'git remote -v', desc: 'List all configured remotes with their URLs.', example: 'git remote -v', cat: 'Remote', step: 4 },
        { cmd: 'git push -u origin', desc: 'Push and set upstream tracking for a branch.', example: 'git push -u origin feature/login', cat: 'Remote', step: 4 },
        { cmd: 'git rm <file>', desc: 'Remove a file and stage deletion.', example: 'git rm old-file.txt', cat: 'Basics', step: 2 },
        { cmd: 'git mv <old> <new>', desc: 'Rename/move a file and stage it.', example: 'git mv old.js new.js', cat: 'Basics', step: 2 },
        { cmd: 'git bisect', desc: 'Binary search to find a bug-introducing commit.', example: 'git bisect start', cat: 'Advanced', step: 8 },
        { cmd: 'git reflog', desc: 'Show all HEAD changes; recover lost commits.', example: 'git reflog', cat: 'Advanced', step: 8 },
        { cmd: 'git clean -fd', desc: 'Remove untracked files and directories.', example: 'git clean -fd', cat: 'Advanced', step: 8 },
        { cmd: 'git submodule', desc: 'Manage sub-repositories inside your repo.', example: 'git submodule add <url>', cat: 'Advanced', step: 9 },
        { cmd: 'git archive', desc: 'Create a tar/zip archive of files from a tree.', example: 'git archive --format=zip HEAD > project.zip', cat: 'Advanced', step: 9 },
        { cmd: 'git worktree', desc: 'Manage multiple working trees for parallel work.', example: 'git worktree add ../hotfix hotfix-branch', cat: 'Advanced', step: 9 }
    ],

    activeTab: 'activity',
    activeCmdCat: 'All',

    render() {
        Navbar.renderTopbar('GitHub Hub');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>GitHub <span class="text-gradient">Hub</span></h1>
                    <p>Explore GitHub profiles, activity feeds, and master Git with interactive command workflows.</p>
                </div>

                <div class="grid-2 mb-lg">
                    <div class="glass-card hub-feature-card" data-tab-target="activity" style="cursor:pointer;">
                        <div class="flex-gap mb-sm">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(212,168,67,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-github" style="font-size:1.1rem;color:var(--primary-light);"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">GitHub Activity</h3>
                                <p class="text-xs text-muted">Look up profiles, repos, and recent activity</p>
                            </div>
                        </div>
                        <div class="flex-gap text-xs text-secondary" style="margin-top:8px;">
                            <span><i class="fa-solid fa-user"></i> Profile Lookup</span>
                            <span><i class="fa-solid fa-book"></i> Repositories</span>
                            <span><i class="fa-solid fa-bolt"></i> Activity Feed</span>
                        </div>
                    </div>
                    <div class="glass-card hub-feature-card" data-tab-target="commands" style="cursor:pointer;">
                        <div class="flex-gap mb-sm">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(62,207,110,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-terminal" style="font-size:1.1rem;color:var(--success);"></i></div>
                            <div>
                                <h3 style="font-size:0.95rem;font-weight:600;">Git Commands</h3>
                                <p class="text-xs text-muted">35+ commands with workflow visualization</p>
                            </div>
                        </div>
                        <div class="flex-gap text-xs text-secondary" style="margin-top:8px;">
                            <span><i class="fa-solid fa-route"></i> 9-Step Workflow</span>
                            <span><i class="fa-solid fa-filter"></i> Category Filter</span>
                            <span><i class="fa-solid fa-search"></i> Search</span>
                        </div>
                    </div>
                </div>

                <div class="tabs mb-lg" id="hub-tabs">
                    <button class="tab-item active" data-tab="activity"><i class="fa-brands fa-github" style="margin-right:4px;"></i> GitHub Activity</button>
                    <button class="tab-item" data-tab="commands"><i class="fa-solid fa-terminal" style="margin-right:4px;"></i> Git Commands</button>
                </div>
                <div id="hub-activity-section">
                    <div class="flex-gap mb-lg flex-wrap">
                        <div class="input-group" style="flex:1; min-width: 250px;">
                            <i class="input-icon fa-brands fa-github"></i>
                            <input class="input-field has-icon" id="gh-user-input" type="text" placeholder="Enter GitHub username..." />
                        </div>
                        <button class="btn btn-primary" id="gh-user-btn"><i class="fa-solid fa-search"></i> Lookup</button>
                    </div>
                    <div id="gh-profile-area"></div>
                    <div id="gh-repos-area" class="mt-lg"></div>
                    <div id="gh-events-area" class="mt-lg"></div>
                </div>
                <div id="hub-commands-section" style="display:none;">
                    <div class="glass-card-static mb-lg" style="padding:20px;">
                        <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:14px;"><i class="fa-solid fa-route" style="color:var(--primary-light);margin-right:6px;"></i>Git Workflow — Step by Step</h3>
                        <p class="text-xs text-muted mb-md">Follow the flow from left to right to understand how Git commands connect in a typical workflow.</p>
                        <div class="cmd-flow-visual" id="cmd-flow"></div>
                        <div class="glass-card mt-md" id="flow-detail" style="padding:16px;display:none;border-left:3px solid var(--primary);">
                            <div class="flex-between mb-sm">
                                <h4 id="flow-detail-title" style="font-size:0.92rem;font-weight:600;color:var(--primary-light);"></h4>
                                <span class="tag tag-primary" id="flow-detail-step"></span>
                            </div>
                            <p id="flow-detail-desc" class="text-sm text-secondary" style="line-height:1.6;"></p>
                            <div id="flow-detail-cmds" style="margin-top:12px;"></div>
                        </div>
                    </div>
                    <div class="flex-gap mb-lg flex-wrap">
                        <div class="search-container" style="flex:1; max-width: 400px;">
                            <i class="fa-solid fa-magnifying-glass search-icon"></i>
                            <input class="input-field" id="cmd-search" type="text" placeholder="Search git commands..." />
                        </div>
                    </div>
                    <div class="tabs mb-lg" id="cmd-cat-tabs"></div>
                    <div id="cmd-grid"></div>
                </div>
            </div>`;

        this.bindEvents();
        this.renderCmdCategories();
        this.renderCommands();
    },

    bindEvents() {
        document.getElementById('hub-tabs').addEventListener('click', e => {
            if (!e.target.closest('.tab-item')) return;
            document.querySelectorAll('#hub-tabs .tab-item').forEach(t => t.classList.remove('active'));
            e.target.closest('.tab-item').classList.add('active');
            this.activeTab = e.target.closest('.tab-item').dataset.tab;
            document.getElementById('hub-activity-section').style.display = this.activeTab === 'activity' ? 'block' : 'none';
            document.getElementById('hub-commands-section').style.display = this.activeTab === 'commands' ? 'block' : 'none';
            if (this.activeTab === 'commands' && !this._flowBuilt) {
                this.buildFlow();
                this._flowBuilt = true;
            }
        });
        document.getElementById('gh-user-btn').addEventListener('click', () => this.lookupUser());
        document.getElementById('gh-user-input').addEventListener('keydown', e => { if (e.key === 'Enter') this.lookupUser(); });
        document.getElementById('cmd-search').addEventListener('input', Helpers.debounce(() => this.renderCommands(), 200));

        document.querySelectorAll('.hub-feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const tab = card.dataset.tabTarget;
                document.querySelectorAll('#hub-tabs .tab-item').forEach(t => t.classList.remove('active'));
                document.querySelector(`#hub-tabs .tab-item[data-tab="${tab}"]`).classList.add('active');
                this.activeTab = tab;
                document.getElementById('hub-activity-section').style.display = tab === 'activity' ? 'block' : 'none';
                document.getElementById('hub-commands-section').style.display = tab === 'commands' ? 'block' : 'none';
                if (tab === 'commands' && !this._flowBuilt) { this.buildFlow(); this._flowBuilt = true; }
            });
        });
    },

    buildFlow() {
        const steps = [
            { id: 1, label: 'Setup', icon: 'fa-solid fa-gear', color: 'var(--primary)', desc: 'Initialize your project or clone a remote repository to get started.' },
            { id: 2, label: 'Edit', icon: 'fa-solid fa-pen', color: 'var(--accent)', desc: 'Modify files and stage your changes to prepare for a commit.' },
            { id: 3, label: 'Commit', icon: 'fa-solid fa-check', color: 'var(--success)', desc: 'Save staged changes as a snapshot in your local repository history.' },
            { id: 4, label: 'Sync', icon: 'fa-solid fa-arrows-rotate', color: 'var(--warning)', desc: 'Push your commits to a remote and pull changes from your team.' },
            { id: 5, label: 'Inspect', icon: 'fa-solid fa-magnifying-glass', color: '#06b6d4', desc: 'Review history, compare changes, and trace issues in your codebase.' },
            { id: 6, label: 'Branch', icon: 'fa-solid fa-code-branch', color: '#8b5cf6', desc: 'Create isolated branches for features and bug fixes.' },
            { id: 7, label: 'Merge', icon: 'fa-solid fa-code-merge', color: '#ec4899', desc: 'Integrate branch changes back into main via merge or rebase.' },
            { id: 8, label: 'Fix', icon: 'fa-solid fa-wrench', color: 'var(--error)', desc: 'Undo mistakes, stash work temporarily, and recover lost commits.' },
            { id: 9, label: 'Release', icon: 'fa-solid fa-tag', color: 'var(--primary-light)', desc: 'Tag releases, archive builds, and manage sub-repositories.' }
        ];

        const flow = document.getElementById('cmd-flow');
        flow.innerHTML = steps.map((s, i) => `
            ${i > 0 ? '<div class="cmd-flow-arrow"><i class="fa-solid fa-chevron-right"></i></div>' : ''}
            <div class="cmd-flow-node" data-step="${s.id}">
                <div class="node-dot" style="background:${s.color};color:#000;"><i class="${s.icon}"></i></div>
                <span class="node-label">${s.label}</span>
            </div>
        `).join('');

        flow.addEventListener('click', e => {
            const node = e.target.closest('.cmd-flow-node');
            if (!node) return;
            const stepId = parseInt(node.dataset.step);
            const step = steps.find(s => s.id === stepId);
            const cmds = this.gitCommands.filter(c => c.step === stepId);

            document.querySelectorAll('.cmd-flow-node').forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const detail = document.getElementById('flow-detail');
            detail.style.display = 'block';
            document.getElementById('flow-detail-title').textContent = step.label;
            document.getElementById('flow-detail-step').textContent = `Step ${step.id}`;
            document.getElementById('flow-detail-desc').textContent = step.desc;
            document.getElementById('flow-detail-cmds').innerHTML = cmds.map(c => `
                <div style="padding:8px 10px;border-radius:var(--radius-sm);background:rgba(0,0,0,0.4);margin-bottom:6px;border:1px solid var(--border);">
                    <div class="flex-between">
                        <span class="text-mono text-sm" style="color:var(--primary-light);">${Helpers.escapeHtml(c.cmd)}</span>
                    </div>
                    <p class="text-xs text-muted" style="margin-top:3px;line-height:1.5;">${c.desc}</p>
                    <div class="text-mono text-xs text-muted" style="margin-top:4px;opacity:0.6;"><i class="fa-solid fa-terminal" style="margin-right:3px;"></i>${Helpers.escapeHtml(c.example)}</div>
                </div>`).join('');
        });

        flow.querySelector('.cmd-flow-node').click();
    },

    renderCmdCategories() {
        const cats = ['All', ...new Set(this.gitCommands.map(c => c.cat))];
        const tabs = document.getElementById('cmd-cat-tabs');
        tabs.innerHTML = cats.map(c => `<button class="tab-item ${c === this.activeCmdCat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
        tabs.addEventListener('click', e => {
            if (!e.target.classList.contains('tab-item')) return;
            this.activeCmdCat = e.target.dataset.cat;
            document.querySelectorAll('#cmd-cat-tabs .tab-item').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            this.renderCommands();
        });
    },

    renderCommands() {
        const search = (document.getElementById('cmd-search')?.value || '').toLowerCase();
        let cmds = this.gitCommands;
        if (this.activeCmdCat !== 'All') cmds = cmds.filter(c => c.cat === this.activeCmdCat);
        if (search) cmds = cmds.filter(c => c.cmd.toLowerCase().includes(search) || c.desc.toLowerCase().includes(search));
        const grid = document.getElementById('cmd-grid');
        if (!cmds.length) { grid.innerHTML = '<div class="empty-state"><i class="fa-solid fa-terminal"></i><h3>No commands found</h3></div>'; return; }
        grid.innerHTML = `<div class="grid-2">${cmds.map(c => `
            <div class="glass-card git-cmd-card">
                <div class="cmd-syntax">${Helpers.escapeHtml(c.cmd)}</div>
                <p class="cmd-desc">${c.desc}</p>
                <div class="cmd-example"><i class="fa-solid fa-terminal" style="margin-right:4px;opacity:0.4;"></i>${Helpers.escapeHtml(c.example)}</div>
                <div class="mt-sm flex-gap gap-sm"><span class="tag tag-primary">${c.cat}</span><span class="text-xs text-muted">Step ${c.step}</span></div>
            </div>`).join('')}</div>`;
    },

    async lookupUser() {
        const username = document.getElementById('gh-user-input').value.trim();
        if (!username) { Toast.show('Enter a GitHub username', 'error'); return; }
        const btn = document.getElementById('gh-user-btn');
        btn.innerHTML = '<div class="loader-spinner" style="width:16px;height:16px;border-width:2px;"></div>';
        btn.disabled = true;
        try {
            const [user, repos, events] = await Promise.all([API.getUserInfo(username), API.getUserRepos(username, 'updated', 12), API.getUserEvents(username, 20)]);
            this.renderProfile(user);
            this.renderRepos(repos);
            this.renderEvents(events);
        } catch (err) { Toast.show(err.message, 'error'); }
        finally { btn.innerHTML = '<i class="fa-solid fa-search"></i> Lookup'; btn.disabled = false; }
    },

    renderProfile(user) {
        document.getElementById('gh-profile-area').innerHTML = `
            <div class="glass-card github-profile-card">
                <img src="${user.avatar_url}" alt="${user.login}" />
                <div class="profile-info">
                    <h2>${user.name || user.login}</h2>
                    <p>${user.bio || 'No bio available'}</p>
                    <div class="profile-stats">
                        <span><strong>${user.public_repos}</strong> repos</span>
                        <span><strong>${Helpers.formatNumber(user.followers)}</strong> followers</span>
                        <span><strong>${user.following}</strong> following</span>
                    </div>
                    <div class="flex-gap mt-sm flex-wrap">
                        ${user.location ? `<span class="text-xs text-muted"><i class="fa-solid fa-location-dot"></i> ${user.location}</span>` : ''}
                        ${user.blog ? `<a href="${user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}" target="_blank" class="text-xs api-link"><i class="fa-solid fa-link"></i> Website</a>` : ''}
                        <span class="text-xs text-muted"><i class="fa-solid fa-calendar"></i> Joined ${new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>`;
    },

    renderRepos(repos) {
        const langCount = {};
        repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
        document.getElementById('gh-repos-area').innerHTML = `
            <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-book" style="color:var(--primary-light);margin-right:6px;"></i>Recent Repositories</h3>
            <div class="grid-2 mb-lg">
                ${repos.slice(0, 6).map(r => `
                    <div class="glass-card" style="padding:16px;">
                        <div class="flex-between mb-sm">
                            <a href="${r.html_url}" target="_blank" rel="noopener" class="api-link" style="font-weight:600;">${r.name}</a>
                            ${r.private ? '<span class="tag tag-warning">Private</span>' : '<span class="tag tag-success">Public</span>'}
                        </div>
                        <p class="text-sm text-secondary" style="line-height:1.5;">${Helpers.escapeHtml(Helpers.truncate(r.description || 'No description', 80))}</p>
                        <div class="flex-gap text-xs text-muted mt-sm">
                            ${r.language ? `<span><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${Helpers.getLanguageColor(r.language)};margin-right:3px;"></span>${r.language}</span>` : ''}
                            <span><i class="fa-solid fa-star"></i> ${r.stargazers_count}</span>
                            <span>${Helpers.timeAgo(r.updated_at)}</span>
                        </div>
                    </div>`).join('')}
            </div>
            ${topLangs.length ? `
            <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-chart-pie" style="color:var(--primary-light);margin-right:6px;"></i>Languages</h3>
            <div class="glass-card-static" style="padding:18px;">
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${topLangs.map(([lang, count]) => { const pct = Math.round((count / repos.length) * 100); return `<div><div class="flex-between mb-sm"><div class="flex-gap"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${Helpers.getLanguageColor(lang)};"></span><span class="text-sm">${lang}</span></div><span class="text-xs text-muted">${pct}%</span></div><div class="pkg-score"><div class="pkg-score-fill" style="width:${pct}%;background:${Helpers.getLanguageColor(lang)};"></div></div></div>`; }).join('')}
                </div>
            </div>` : ''}`;
    },

    renderEvents(events) {
        const eventTypes = {
            PushEvent: { icon: 'fa-solid fa-arrow-up', label: 'pushed to', color: 'var(--success)' },
            CreateEvent: { icon: 'fa-solid fa-plus', label: 'created', color: 'var(--primary-light)' },
            DeleteEvent: { icon: 'fa-solid fa-trash', label: 'deleted', color: 'var(--error)' },
            IssuesEvent: { icon: 'fa-solid fa-circle-dot', label: 'issue', color: 'var(--warning)' },
            PullRequestEvent: { icon: 'fa-solid fa-code-pull-request', label: 'PR', color: 'var(--accent)' },
            WatchEvent: { icon: 'fa-solid fa-star', label: 'starred', color: 'var(--primary-light)' },
            ForkEvent: { icon: 'fa-solid fa-code-fork', label: 'forked', color: 'var(--secondary)' },
            IssueCommentEvent: { icon: 'fa-solid fa-comment', label: 'commented on', color: 'var(--text-secondary)' },
            ReleaseEvent: { icon: 'fa-solid fa-tag', label: 'released', color: 'var(--success)' }
        };
        document.getElementById('gh-events-area').innerHTML = `
            <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-bolt" style="color:var(--primary-light);margin-right:6px;"></i>Recent Activity</h3>
            <div class="glass-card-static" style="padding:6px 18px;">
                ${events.slice(0, 12).map(e => { const info = eventTypes[e.type] || { icon: 'fa-solid fa-circle', label: e.type, color: 'var(--text-muted)' }; return `<div class="activity-item"><div style="width:32px;height:32px;border-radius:50%;background:var(--glass);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="${info.icon}" style="font-size:0.75rem;color:${info.color}"></i></div><div class="activity-info"><h4>${info.label} <span style="color:var(--primary-light)">${e.repo.name.split('/')[1]}</span></h4><p>${e.repo.name}</p><span class="activity-time">${Helpers.timeAgo(e.created_at)}</span></div></div>`; }).join('')}
            </div>`;
    },

    cleanupCmd() {}
};
