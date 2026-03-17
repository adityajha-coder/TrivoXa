const WorkspacePage = {
    snippets: JSON.parse(localStorage.getItem('vertex_snippets') || '[]'),

    render() {
        Navbar.renderTopbar('My Workspace');
        const content = document.getElementById('page-content');
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>My <span class="text-gradient">Workspace</span></h1>
                    <p>Save your personal code snippets and access common project boilerplates.</p>
                </div>
                
                <div id="snippets-view">
                    <div class="glass-card mb-lg">
                        <div class="flex-between mb-sm">
                            <h3 class="mb-0">Add New Snippet</h3>
                        </div>
                        <input type="text" id="snip-title" class="input-field mb-sm" placeholder="Snippet Title" style="width:100%; border-radius: var(--radius-sm);">
                        <textarea id="snip-code" class="input-field mb-sm" placeholder="Paste your code here..." style="width:100%; min-height:100px; resize:vertical; font-family:var(--font-mono); border-radius: var(--radius-sm);"></textarea>
                        <button id="save-snip-btn" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Save Snippet</button>
                    </div>
                    
                    <h3>Saved Snippets</h3>
                    <div class="grid-2 mt-sm" id="snippets-grid"></div>
                </div>
            </div>
        `;
        
        this.renderSnippets();
        this.bindEvents();
    },

    renderSnippets() {
        const grid = document.getElementById('snippets-grid');
        if(!this.snippets.length) {
            grid.innerHTML = '<p class="text-muted" style="grid-column: span 2;">No snippets saved yet. Add one above!</p>';
            return;
        }
        grid.innerHTML = this.snippets.map((s, idx) => `
            <div class="glass-card">
                <div class="flex-between mb-sm">
                    <div style="font-weight:600;">${Helpers.escapeHtml(s.title)}</div>
                    <div class="flex-gap">
                        <button class="btn btn-ghost btn-xs copy-snip-btn" data-idx="${idx}"><i class="fa-solid fa-copy"></i></button>
                        <button class="btn btn-ghost btn-xs del-snip-btn" data-idx="${idx}" style="color:var(--error);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                    <pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">${Helpers.escapeHtml(s.code)}</pre>
                </div>
            </div>
        `).join('');
    },

    saveSnippet(title, code) {
        this.snippets.push({ title, code });
        localStorage.setItem('vertex_snippets', JSON.stringify(this.snippets));
        if (document.getElementById('snippets-grid')) {
            this.renderSnippets();
        }
    },

    bindEvents() {

        document.getElementById('save-snip-btn').addEventListener('click', () => {
            const title = document.getElementById('snip-title').value.trim();
            const code = document.getElementById('snip-code').value.trim();
            if(!title || !code) return Toast.show('Please fill both fields', 'error');
            
            this.saveSnippet(title, code);
            
            document.getElementById('snip-title').value = '';
            document.getElementById('snip-code').value = '';
            Toast.show('Snippet saved!', 'success');
        });

        document.getElementById('page-content').addEventListener('click', (e) => {
            if(e.target.closest('.copy-snip-btn')) {
                const idx = e.target.closest('.copy-snip-btn').dataset.idx;
                Helpers.copyToClipboard(this.snippets[idx].code);
                Toast.show('Snippet copied!', 'success');
            }
            if(e.target.closest('.del-snip-btn')) {
                const idx = e.target.closest('.del-snip-btn').dataset.idx;
                this.snippets.splice(idx, 1);
                localStorage.setItem('vertex_snippets', JSON.stringify(this.snippets));
                this.renderSnippets();
                Toast.show('Snippet deleted', 'success');
            }
        });
    }
};
