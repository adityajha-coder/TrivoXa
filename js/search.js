const GlobalSearch = {
    modal: null,
    input: null,
    results: null,
    isOpen: false,

    searchData: [
        { title: 'Dashboard', type: 'Page', link: 'dashboard', icon: 'fa-solid fa-house' },
        { title: 'AI Hub (Ask AI / Architect)', type: 'Page', link: 'ask-ai', icon: 'fa-solid fa-robot' },
        { title: 'My Workspace', type: 'Page', link: 'workspace', icon: 'fa-solid fa-laptop-code' },
        { title: 'Developer Docs', type: 'Page', link: 'docs', icon: 'fa-solid fa-book-open-reader' },
        { title: 'Tools Vault', type: 'Page', link: 'tools-vault', icon: 'fa-solid fa-screwdriver-wrench' },
        { title: 'GitHub Explorer', type: 'Page', link: 'code-git-explorer', icon: 'fa-brands fa-github' },
        { title: 'Package Scout', type: 'Page', link: 'package-scout', icon: 'fa-solid fa-box-open' },
        { title: 'Free APIs', type: 'Page', link: 'free-apis', icon: 'fa-solid fa-plug' },
        { title: 'Commands Reference', type: 'Page', link: 'commands', icon: 'fa-solid fa-terminal' }
    ],

    init() {
        this.modal = document.getElementById('global-search-modal');
        this.input = document.getElementById('global-search-input');
        this.results = document.getElementById('global-search-results');

        document.addEventListener('keydown', (e) => {
            // Check for ctrl+k OR cmd+k
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.toggleModal();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        this.debouncedGithubSearch = Helpers.debounce((query) => this.fetchGithub(query), 400);
        this.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
            this.debouncedGithubSearch(e.target.value);
        });
    },

    toggleModal() {
        if (this.isOpen) this.closeModal();
        else this.openModal();
    },

    openModal() {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        this.input.value = '';
        this.results.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.9rem;">Type to search pages, commands, tools, or GitHub...</div>';
        setTimeout(() => this.input.focus(), 100);
    },

    closeModal() {
        this.isOpen = false;
        this.modal.style.display = 'none';
        this.currentLocalResults = [];
    },

    handleSearch(query) {
        if (!query.trim()) {
            this.results.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.9rem;">Type to search pages, commands, tools, or GitHub...</div>';
            return;
        }

        const q = query.toLowerCase();
        
        let dynamicData = [];
        if(typeof ToolsVaultPage !== 'undefined' && ToolsVaultPage.tools) {
            ToolsVaultPage.tools.forEach(cat => {
                if (cat.items) {
                    cat.items.forEach(t => dynamicData.push({ title: t.name, type: 'Tool - ' + cat.cat, link: 'tools-vault', icon: 'fa-solid fa-cookie', desc: t.desc, action: 'navigate' }));
                }
            });
        }

        if(typeof CommandsPage !== 'undefined') {
            const cmdLists = [
                { list: CommandsPage.gitCommands, type: 'Git Command' },
                { list: CommandsPage.npmCommands, type: 'npm Command' },
                { list: CommandsPage.terminalCommands, type: 'Terminal Command' },
                { list: CommandsPage.dockerCommands, type: 'Docker Command' }
            ];
            cmdLists.forEach(ct => {
                if (ct.list) {
                    ct.list.forEach(c => {
                        dynamicData.push({
                            title: c.cmd,
                            type: ct.type,
                            desc: c.desc,
                            icon: 'fa-solid fa-terminal',
                            action: 'copy',
                            value: c.example
                        });
                    });
                }
            });
        }

        const allData = [...this.searchData.map(d => ({...d, action: 'navigate'})), ...dynamicData];
        
        const filtered = allData.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.type.toLowerCase().includes(q) ||
            (item.desc && item.desc.toLowerCase().includes(q))
        ).slice(0, 8);

        this.currentLocalResults = filtered;
        this.renderResults(filtered, query);
    },

    async fetchGithub(query) {
        if (!query || query.length < 3) return;
        try {
            const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=3`);
            if (res.ok) {
                const data = await res.json();
                if (data.items && data.items.length > 0 && this.input.value === query) {
                    const ghResults = data.items.map(repo => ({
                        title: repo.full_name,
                        type: 'GitHub Repository' + (repo.language ? ' • ' + repo.language : ''),
                        desc: repo.description ? Helpers.truncate(repo.description, 60) : 'No description',
                        icon: 'fa-brands fa-github',
                        action: 'github',
                        link: repo.html_url,
                        stars: repo.stargazers_count
                    }));
                    this.renderResults([...(this.currentLocalResults || []), ...ghResults], query);
                }
            }
        } catch (e) {}
    },

    renderResults(filtered, query) {
        if (!filtered || filtered.length === 0) {
            this.results.innerHTML = '<div style="padding:16px; text-align:center; color:var(--error); font-size:0.9rem;">No results found for "' + Helpers.escapeHtml(query) + '"</div>';
            return;
        }

        this.results.innerHTML = filtered.map(item => {
            let onClick = "GlobalSearch.navigate('" + item.link + "')";
            let badge = '';
            let rightIcon = '<i class="fa-solid fa-chevron-right" style="color:var(--text-muted); opacity:0.5; font-size:0.8rem;"></i>';
            
            if (item.action === 'copy') {
                const safeVal = Helpers.escapeHtml(item.value).replace(/'/g, "\\'").replace(/"/g, '&quot;');
                onClick = `GlobalSearch.copyCommand('${safeVal}')`;
                rightIcon = '<i class="fa-regular fa-copy" style="color:var(--text-muted); opacity:0.7; font-size:0.9rem;"></i>';
            } else if (item.action === 'github') {
                onClick = `window.open('${item.link}', '_blank'); GlobalSearch.closeModal();`;
                if (item.stars !== undefined) {
                    badge = `<span style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; margin-left:6px;"><i class="fa-solid fa-star" style="color:var(--warning); margin-right:4px;"></i>${Helpers.formatNumber(item.stars)}</span>`;
                }
                rightIcon = '<i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--text-muted); opacity:0.7; font-size:0.8rem;"></i>';
            }

            return `
            <div class="search-result-item" onclick="${onClick}" style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:4px; transition:background 0.2s;">
                <div style="width:36px; height:36px; border-radius:8px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:var(--primary-light);">
                    <i class="${item.icon}"></i>
                </div>
                <div style="flex:1; min-width:0;">
                    <div style="font-weight:600; color:var(--text); display:flex; align-items:center;">
                        <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80%;">${item.title}</span>
                        ${badge}
                    </div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${item.type}${item.desc ? ' • ' + item.desc : ''}
                    </div>
                </div>
                <div style="padding-left:12px; display:flex; align-items:center;">
                    ${rightIcon}
                </div>
            </div>`;
        }).join('');

        this.results.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('mouseenter', () => el.style.background = 'rgba(255,255,255,0.05)');
            el.addEventListener('mouseleave', () => el.style.background = 'transparent');
        });
    },

    navigate(link) {
        this.closeModal();
        Router.navigate(link);
    },

    copyCommand(val) {
        Helpers.copyToClipboard(val);
        this.closeModal();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GlobalSearch.init();
});
