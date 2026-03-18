const GlobalSearch = {
    modal: null,
    input: null,
    results: null,
    isOpen: false,

    searchData: [
        { title: 'Dashboard', type: 'Page', link: 'dashboard', icon: 'fa-solid fa-house' },
        { title: 'AI Hub (Ask AI / Architect)', type: 'Page', link: 'ask-ai', icon: 'fa-solid fa-robot' },
        { title: 'Code Generator', type: 'Page', link: 'code-generator', icon: 'fa-solid fa-wand-magic-sparkles' },
        { title: 'My Workspace', type: 'Page', link: 'workspace', icon: 'fa-solid fa-laptop-code' },
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

        this.input.addEventListener('input', (e) => this.handleSearch(e.target.value));
    },

    toggleModal() {
        if (this.isOpen) this.closeModal();
        else this.openModal();
    },

    openModal() {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        this.input.value = '';
        this.results.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.9rem;">Type to search Vertex Toolkit pages and tools...</div>';
        setTimeout(() => this.input.focus(), 100);
    },

    closeModal() {
        this.isOpen = false;
        this.modal.style.display = 'none';
    },

    handleSearch(query) {
        if (!query.trim()) {
            this.results.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.9rem;">Type to search Vertex Toolkit pages and tools...</div>';
            return;
        }

        const q = query.toLowerCase();
        
        let dynamicData = [];
        if(typeof ToolsVaultPage !== 'undefined' && ToolsVaultPage.tools) {
            ToolsVaultPage.tools.forEach(cat => {
                // If it has a generic items array
                if (cat.items) {
                    cat.items.forEach(t => dynamicData.push({ title: t.name, type: 'Tool - ' + cat.cat, link: 'tools-vault', icon: 'fa-solid fa-cookie', desc: t.desc }));
                }
            });
        }

        const allData = [...this.searchData, ...dynamicData];
        
        const filtered = allData.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.type.toLowerCase().includes(q) ||
            (item.desc && item.desc.toLowerCase().includes(q))
        ).slice(0, 10);

        if (filtered.length === 0) {
            this.results.innerHTML = '<div style="padding:16px; text-align:center; color:var(--error); font-size:0.9rem;">No results found for "' + Helpers.escapeHtml(query) + '"</div>';
            return;
        }

        this.results.innerHTML = filtered.map(item => `
            <div class="search-result-item" onclick="GlobalSearch.navigate('${item.link}')" style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:4px; transition:background 0.2s;">
                <div style="width:36px; height:36px; border-radius:8px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:var(--primary-light);">
                    <i class="${item.icon}"></i>
                </div>
                <div>
                    <div style="font-weight:600; color:var(--text);">${item.title}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${item.type}${item.desc ? ' • ' + item.desc : ''}</div>
                </div>
            </div>
        `).join('');

        // Add hover effect
        this.results.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('mouseenter', () => el.style.background = 'rgba(255,255,255,0.05)');
            el.addEventListener('mouseleave', () => el.style.background = 'transparent');
        });
    },

    navigate(link) {
        this.closeModal();
        Router.navigate(link);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GlobalSearch.init();
});
