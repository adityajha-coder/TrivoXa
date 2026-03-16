const CommandsPage = {
    activeTab: 'git',
    activeCat: 'All',

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
        { cmd: 'git remote -v', desc: 'List all configured remotes with URLs.', example: 'git remote -v', cat: 'Remote', step: 4 },
        { cmd: 'git push -u origin', desc: 'Push and set upstream tracking.', example: 'git push -u origin feature/login', cat: 'Remote', step: 4 },
        { cmd: 'git rm <file>', desc: 'Remove a file and stage deletion.', example: 'git rm old-file.txt', cat: 'Basics', step: 2 },
        { cmd: 'git mv <old> <new>', desc: 'Rename/move a file and stage it.', example: 'git mv old.js new.js', cat: 'Basics', step: 2 },
        { cmd: 'git bisect', desc: 'Binary search to find a bug-introducing commit.', example: 'git bisect start', cat: 'Advanced', step: 8 },
        { cmd: 'git reflog', desc: 'Show all HEAD changes; recover lost commits.', example: 'git reflog', cat: 'Advanced', step: 8 },
        { cmd: 'git clean -fd', desc: 'Remove untracked files and directories.', example: 'git clean -fd', cat: 'Advanced', step: 8 },
        { cmd: 'git submodule', desc: 'Manage sub-repositories inside your repo.', example: 'git submodule add <url>', cat: 'Advanced', step: 9 },
        { cmd: 'git archive', desc: 'Create a tar/zip archive of files from a tree.', example: 'git archive --format=zip HEAD > project.zip', cat: 'Advanced', step: 9 },
        { cmd: 'git worktree', desc: 'Manage multiple working trees for parallel work.', example: 'git worktree add ../hotfix hotfix-branch', cat: 'Advanced', step: 9 }
    ],

    npmCommands: [
        { cmd: 'npm init', desc: 'Create a new package.json file interactively.', example: 'npm init -y', cat: 'Setup', step: 1 },
        { cmd: 'npm init -y', desc: 'Create package.json with default values.', example: 'npm init -y', cat: 'Setup', step: 1 },
        { cmd: 'npm install', desc: 'Install all dependencies from package.json.', example: 'npm install', cat: 'Install', step: 2 },
        { cmd: 'npm install <pkg>', desc: 'Install a package and add to dependencies.', example: 'npm install express', cat: 'Install', step: 2 },
        { cmd: 'npm install -D <pkg>', desc: 'Install as a dev dependency.', example: 'npm install -D jest', cat: 'Install', step: 2 },
        { cmd: 'npm install -g <pkg>', desc: 'Install a package globally.', example: 'npm install -g nodemon', cat: 'Install', step: 2 },
        { cmd: 'npm uninstall <pkg>', desc: 'Remove a package from your project.', example: 'npm uninstall lodash', cat: 'Install', step: 2 },
        { cmd: 'npm update', desc: 'Update all packages to latest allowed version.', example: 'npm update', cat: 'Manage', step: 3 },
        { cmd: 'npm outdated', desc: 'Check which packages have newer versions.', example: 'npm outdated', cat: 'Manage', step: 3 },
        { cmd: 'npm list', desc: 'Show a tree of installed packages.', example: 'npm list --depth=0', cat: 'Inspect', step: 4 },
        { cmd: 'npm info <pkg>', desc: 'View detailed info about a package.', example: 'npm info react', cat: 'Inspect', step: 4 },
        { cmd: 'npm search <term>', desc: 'Search the npm registry.', example: 'npm search express', cat: 'Inspect', step: 4 },
        { cmd: 'npm run <script>', desc: 'Run a script defined in package.json.', example: 'npm run dev', cat: 'Scripts', step: 5 },
        { cmd: 'npm start', desc: 'Run the "start" script (shortcut).', example: 'npm start', cat: 'Scripts', step: 5 },
        { cmd: 'npm test', desc: 'Run the "test" script (shortcut).', example: 'npm test', cat: 'Scripts', step: 5 },
        { cmd: 'npm run build', desc: 'Run the "build" script for production.', example: 'npm run build', cat: 'Scripts', step: 5 },
        { cmd: 'npm publish', desc: 'Publish your package to npm registry.', example: 'npm publish', cat: 'Publish', step: 6 },
        { cmd: 'npm version <type>', desc: 'Bump version (patch, minor, major).', example: 'npm version patch', cat: 'Publish', step: 6 },
        { cmd: 'npm pack', desc: 'Create a tarball for testing.', example: 'npm pack', cat: 'Publish', step: 6 },
        { cmd: 'npm cache clean --force', desc: 'Clear npm cache to fix install issues.', example: 'npm cache clean --force', cat: 'Troubleshoot', step: 7 },
        { cmd: 'npm doctor', desc: 'Run diagnostics on npm environment.', example: 'npm doctor', cat: 'Troubleshoot', step: 7 },
        { cmd: 'npm audit', desc: 'Scan for vulnerabilities in dependencies.', example: 'npm audit', cat: 'Security', step: 8 },
        { cmd: 'npm audit fix', desc: 'Automatically fix vulnerable dependencies.', example: 'npm audit fix', cat: 'Security', step: 8 },
        { cmd: 'npm ci', desc: 'Clean install from lock file (for CI/CD).', example: 'npm ci', cat: 'Advanced', step: 9 },
        { cmd: 'npx <pkg>', desc: 'Run a package without installing it globally.', example: 'npx create-react-app my-app', cat: 'Advanced', step: 9 }
    ],

    terminalCommands: [
        { cmd: 'cd <dir>', desc: 'Change the current working directory.', example: 'cd ~/projects/myapp', cat: 'Navigation', step: 1 },
        { cmd: 'ls / dir', desc: 'List files and directories in current folder.', example: 'ls -la', cat: 'Navigation', step: 1 },
        { cmd: 'pwd', desc: 'Print the current working directory path.', example: 'pwd', cat: 'Navigation', step: 1 },
        { cmd: 'mkdir <name>', desc: 'Create a new directory.', example: 'mkdir my-project', cat: 'Files', step: 2 },
        { cmd: 'touch <file>', desc: 'Create a new empty file (Unix/Mac).', example: 'touch index.html', cat: 'Files', step: 2 },
        { cmd: 'cp <src> <dest>', desc: 'Copy files or directories.', example: 'cp -r src/ backup/', cat: 'Files', step: 2 },
        { cmd: 'mv <src> <dest>', desc: 'Move or rename files and directories.', example: 'mv old.js new.js', cat: 'Files', step: 2 },
        { cmd: 'rm <file>', desc: 'Delete a file. Use -rf for directories.', example: 'rm -rf node_modules/', cat: 'Files', step: 2 },
        { cmd: 'cat <file>', desc: 'Display the contents of a file.', example: 'cat package.json', cat: 'View', step: 3 },
        { cmd: 'head / tail', desc: 'Show first/last lines of a file.', example: 'tail -n 20 server.log', cat: 'View', step: 3 },
        { cmd: 'grep <pattern> <file>', desc: 'Search for text patterns in files.', example: 'grep -r "TODO" src/', cat: 'Search', step: 4 },
        { cmd: 'find <path> -name', desc: 'Find files by name or pattern.', example: 'find . -name "*.js"', cat: 'Search', step: 4 },
        { cmd: 'which <cmd>', desc: 'Show the path of a command.', example: 'which node', cat: 'Search', step: 4 },
        { cmd: 'echo <text>', desc: 'Print text to terminal or redirect to file.', example: 'echo "Hello" > file.txt', cat: 'IO', step: 5 },
        { cmd: 'pipe |', desc: 'Send output of one command to another.', example: 'cat file.txt | grep "error"', cat: 'IO', step: 5 },
        { cmd: '> / >>', desc: 'Redirect output to file (overwrite / append).', example: 'echo "log" >> debug.log', cat: 'IO', step: 5 },
        { cmd: 'chmod', desc: 'Change file permissions.', example: 'chmod +x script.sh', cat: 'System', step: 6 },
        { cmd: 'chown', desc: 'Change file ownership.', example: 'chown user:group file.txt', cat: 'System', step: 6 },
        { cmd: 'ps / top', desc: 'List running processes.', example: 'ps aux | grep node', cat: 'Process', step: 7 },
        { cmd: 'kill <pid>', desc: 'Terminate a process by ID.', example: 'kill -9 1234', cat: 'Process', step: 7 },
        { cmd: 'Ctrl+C', desc: 'Interrupt/stop a running command.', example: 'Press Ctrl+C to stop npm start', cat: 'Process', step: 7 },
        { cmd: 'curl <url>', desc: 'Make HTTP requests from terminal.', example: 'curl https://api.github.com/users/octocat', cat: 'Network', step: 8 },
        { cmd: 'ping <host>', desc: 'Test network connectivity.', example: 'ping google.com', cat: 'Network', step: 8 },
        { cmd: 'ssh user@host', desc: 'Connect to a remote server securely.', example: 'ssh deploy@myserver.com', cat: 'Network', step: 8 },
        { cmd: 'scp <file> user@host:', desc: 'Copy files to/from remote server.', example: 'scp dist.zip user@server:~/apps/', cat: 'Network', step: 8 },
        { cmd: 'tar -czf', desc: 'Compress files into an archive.', example: 'tar -czf backup.tar.gz project/', cat: 'Archive', step: 9 },
        { cmd: 'unzip / tar -xzf', desc: 'Extract compressed archives.', example: 'tar -xzf backup.tar.gz', cat: 'Archive', step: 9 },
        { cmd: 'alias', desc: 'Create shortcuts for long commands.', example: 'alias gs="git status"', cat: 'Shortcuts', step: 10 },
        { cmd: 'history', desc: 'Show command history.', example: 'history | grep "npm"', cat: 'Shortcuts', step: 10 },
        { cmd: 'clear / cls', desc: 'Clear the terminal screen.', example: 'clear', cat: 'Shortcuts', step: 10 }
    ],

    flowSteps: {
        git: [
            { id:1, label:'Setup', icon:'fa-solid fa-gear', color:'var(--primary)' },
            { id:2, label:'Edit', icon:'fa-solid fa-pen', color:'var(--accent)' },
            { id:3, label:'Commit', icon:'fa-solid fa-check', color:'var(--success)' },
            { id:4, label:'Sync', icon:'fa-solid fa-arrows-rotate', color:'var(--warning)' },
            { id:5, label:'Inspect', icon:'fa-solid fa-magnifying-glass', color:'#06b6d4' },
            { id:6, label:'Branch', icon:'fa-solid fa-code-branch', color:'#8b5cf6' },
            { id:7, label:'Merge', icon:'fa-solid fa-code-merge', color:'#ec4899' },
            { id:8, label:'Fix', icon:'fa-solid fa-wrench', color:'var(--error)' },
            { id:9, label:'Release', icon:'fa-solid fa-tag', color:'var(--primary-light)' }
        ],
        npm: [
            { id:1, label:'Setup', icon:'fa-solid fa-folder-plus', color:'var(--primary)' },
            { id:2, label:'Install', icon:'fa-solid fa-download', color:'var(--success)' },
            { id:3, label:'Manage', icon:'fa-solid fa-arrows-rotate', color:'var(--accent)' },
            { id:4, label:'Inspect', icon:'fa-solid fa-magnifying-glass', color:'#06b6d4' },
            { id:5, label:'Scripts', icon:'fa-solid fa-play', color:'#8b5cf6' },
            { id:6, label:'Publish', icon:'fa-solid fa-upload', color:'#ec4899' },
            { id:7, label:'Debug', icon:'fa-solid fa-wrench', color:'var(--warning)' },
            { id:8, label:'Secure', icon:'fa-solid fa-shield-halved', color:'var(--error)' },
            { id:9, label:'Advanced', icon:'fa-solid fa-rocket', color:'var(--primary-light)' }
        ],
        terminal: [
            { id:1, label:'Navigate', icon:'fa-solid fa-compass', color:'var(--primary)' },
            { id:2, label:'Files', icon:'fa-solid fa-file', color:'var(--success)' },
            { id:3, label:'View', icon:'fa-solid fa-eye', color:'var(--accent)' },
            { id:4, label:'Search', icon:'fa-solid fa-magnifying-glass', color:'#06b6d4' },
            { id:5, label:'I/O', icon:'fa-solid fa-right-left', color:'#8b5cf6' },
            { id:6, label:'System', icon:'fa-solid fa-lock', color:'#ec4899' },
            { id:7, label:'Process', icon:'fa-solid fa-microchip', color:'var(--warning)' },
            { id:8, label:'Network', icon:'fa-solid fa-wifi', color:'var(--error)' },
            { id:9, label:'Archive', icon:'fa-solid fa-box-archive', color:'var(--primary-light)' },
            { id:10, label:'Shortcuts', icon:'fa-solid fa-keyboard', color:'#3ecf6e' }
        ]
    },

    render() {
        Navbar.renderTopbar('Commands');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Command <span class="text-gradient">Reference</span></h1>
                    <p>Master Git, npm, and terminal commands with step-by-step workflows and searchable reference.</p>
                </div>

                <div class="grid-3 mb-lg">
                    <div class="glass-card cmd-type-card active" data-cmd="git" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(232,69,69,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-git-alt" style="font-size:1.1rem;color:var(--error);"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">Git</h3><p class="text-xs text-muted">35 commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="npm" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(203,56,55,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-npm" style="font-size:1.3rem;color:#cb3837;"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">npm</h3><p class="text-xs text-muted">25 commands</p></div>
                        </div>
                    </div>
                    <div class="glass-card cmd-type-card" data-cmd="terminal" style="cursor:pointer;">
                        <div class="flex-gap">
                            <div style="width:40px;height:40px;border-radius:var(--radius);background:rgba(62,207,110,0.06);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-terminal" style="font-size:1rem;color:var(--success);"></i></div>
                            <div><h3 style="font-size:0.92rem;font-weight:600;">Terminal</h3><p class="text-xs text-muted">30 commands</p></div>
                        </div>
                    </div>
                </div>

                <div class="glass-card-static mb-lg" style="padding:20px;">
                    <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:14px;" id="flow-title"><i class="fa-solid fa-route" style="color:var(--primary-light);margin-right:6px;"></i>Git Workflow — Step by Step</h3>
                    <p class="text-xs text-muted mb-md" id="flow-desc">Follow the flow to understand how commands connect in a typical workflow.</p>
                    <div class="cmd-flow-visual" id="cmd-flow"></div>
                    <div class="glass-card mt-md" id="flow-detail" style="padding:16px;display:none;border-left:3px solid var(--primary);"></div>
                </div>

                <div class="flex-gap mb-lg flex-wrap">
                    <div class="search-container" style="flex:1; max-width: 400px;">
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                        <input class="input-field" id="cmd-search" type="text" placeholder="Search commands..." />
                    </div>
                </div>
                <div class="tabs mb-lg" id="cmd-cat-tabs"></div>
                <div id="cmd-grid"></div>
            </div>`;

        this.bindEvents();
        this.buildFlow();
        this.renderCategories();
        this.renderCards();
    },

    getActiveCommands() {
        return this.activeTab === 'git' ? this.gitCommands : this.activeTab === 'npm' ? this.npmCommands : this.terminalCommands;
    },

    bindEvents() {
        document.querySelectorAll('.cmd-type-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.cmd-type-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.activeTab = card.dataset.cmd;
                this.activeCat = 'All';
                const titles = { git: 'Git Workflow — Step by Step', npm: 'npm Workflow — Step by Step', terminal: 'Terminal Workflow — Step by Step' };
                document.getElementById('flow-title').innerHTML = `<i class="fa-solid fa-route" style="color:var(--primary-light);margin-right:6px;"></i>${titles[this.activeTab]}`;
                document.getElementById('cmd-search').value = '';
                document.getElementById('cmd-search').placeholder = `Search ${this.activeTab} commands...`;
                this.buildFlow();
                this.renderCategories();
                this.renderCards();
            });
        });
        document.getElementById('cmd-search').addEventListener('input', Helpers.debounce(() => this.renderCards(), 200));
    },

    buildFlow() {
        const steps = this.flowSteps[this.activeTab];
        const cmds = this.getActiveCommands();
        const flow = document.getElementById('cmd-flow');
        flow.innerHTML = steps.map((s, i) => `
            ${i > 0 ? '<div class="cmd-flow-arrow"><i class="fa-solid fa-chevron-right"></i></div>' : ''}
            <div class="cmd-flow-node" data-step="${s.id}">
                <div class="node-dot" style="background:${s.color};color:#000;"><i class="${s.icon}"></i></div>
                <span class="node-label">${s.label}</span>
            </div>
        `).join('');

        flow.onclick = e => {
            const node = e.target.closest('.cmd-flow-node');
            if (!node) return;
            const stepId = parseInt(node.dataset.step);
            const step = steps.find(s => s.id === stepId);
            const matched = cmds.filter(c => c.step === stepId);
            document.querySelectorAll('#cmd-flow .cmd-flow-node').forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            const detail = document.getElementById('flow-detail');
            detail.style.display = 'block';
            detail.innerHTML = `
                <div class="flex-between mb-sm">
                    <h4 style="font-size:0.92rem;font-weight:600;color:var(--primary-light);"><i class="${step.icon}" style="margin-right:6px;"></i>${step.label}</h4>
                    <span class="tag tag-primary">Step ${step.id}</span>
                </div>
                ${matched.map(c => `
                    <div style="padding:8px 10px;border-radius:var(--radius-sm);background:rgba(0,0,0,0.4);margin-bottom:6px;border:1px solid var(--border);">
                        <span class="text-mono text-sm" style="color:var(--primary-light);">${Helpers.escapeHtml(c.cmd)}</span>
                        <p class="text-xs text-muted" style="margin-top:3px;line-height:1.5;">${c.desc}</p>
                        <div class="text-mono text-xs text-muted" style="margin-top:4px;opacity:0.6;"><i class="fa-solid fa-terminal" style="margin-right:3px;"></i>${Helpers.escapeHtml(c.example)}</div>
                    </div>`).join('')}`;
        };
        flow.querySelector('.cmd-flow-node')?.click();
    },

    renderCategories() {
        const cmds = this.getActiveCommands();
        const cats = ['All', ...new Set(cmds.map(c => c.cat))];
        const tabs = document.getElementById('cmd-cat-tabs');
        tabs.innerHTML = cats.map(c => `<button class="tab-item ${c === this.activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
        tabs.onclick = e => {
            if (!e.target.classList.contains('tab-item')) return;
            this.activeCat = e.target.dataset.cat;
            document.querySelectorAll('#cmd-cat-tabs .tab-item').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            this.renderCards();
        };
    },

    renderCards() {
        const search = (document.getElementById('cmd-search')?.value || '').toLowerCase();
        let cmds = this.getActiveCommands();
        if (this.activeCat !== 'All') cmds = cmds.filter(c => c.cat === this.activeCat);
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
    }
};
