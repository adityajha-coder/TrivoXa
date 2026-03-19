const DocsPage = {
    docSuggestions: [
        "Python List Comprehensions", "React useEffect Hook", "Docker Compose Basics",
        "Rust Ownership Model", "Git Rebase vs Merge", "SQL JOIN Types",
        "Java Streams", "C++ Smart Pointers", "CSS Grid Layout", "Node.js Event Loop",
        "Go Goroutines", "MongoDB Aggregation", "Bash Scripting Basics"
    ],

    render() {
        Navbar.renderTopbar('Developer Documentation');
        const content = document.getElementById('page-content');
        
        const randomSuggestionsHtml = this.docSuggestions.sort(() => 0.5 - Math.random()).slice(0, 4)
            .map(s => `<button class="ai-suggest-chip" data-q="${s}">${s}</button>`).join('');

        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Developer <span class="text-gradient">Docs</span></h1>
                    <p>Instantly search for documentation across ANY programming language, framework, or tool.</p>
                </div>
                
                <div class="glass-card mb-md" style="display:flex; gap:12px; align-items:center;">
                    <div class="input-group" style="flex:1;">
                        <i class="input-icon fa-solid fa-magnifying-glass"></i>
                        <input class="input-field has-icon" id="docs-search-input" type="text" placeholder="e.g. Python list comprehension, React hooks, Rust ownership..." />
                    </div>
                    <button class="btn btn-primary" id="docs-search-btn">Search Docs</button>
                </div>

                <div class="ai-bot-suggestions mb-lg" id="docs-suggestions" style="justify-content:flex-start;">
                    ${randomSuggestionsHtml}
                </div>

                <div id="docs-loading" style="display:none; text-align:center; padding:40px 0;">
                    <div class="spinner" style="margin: 0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                    <p class="text-muted">AI is retrieving documentation...</p>
                </div>

                <div id="docs-results-area" style="display:none;">
                    <h3 class="mb-md" style="font-weight:600;"><i class="fa-solid fa-book" style="color:var(--primary-light);margin-right:8px;"></i> Search Results</h3>
                    <div class="grid-3" id="docs-results-grid"></div>
                </div>

                <div id="docs-empty" style="text-align:center; padding: 60px 0;">
                    <i class="fa-solid fa-book-open-reader text-muted mb-md" style="font-size:3rem; opacity:0.5;"></i>
                    <h3 style="color:var(--text-secondary); margin-bottom:8px;">Search for any development concept</h3>
                    <p class="text-muted text-sm" style="max-width:400px; margin:0 auto;">Leverages AI to instantly generate accurate documentation, syntax guides, and explanations for literally any programming language.</p>
                </div>
            </div>
        `;

        this.bindEvents();
    },

    bindEvents() {
        const btn = document.getElementById('docs-search-btn');
        const input = document.getElementById('docs-search-input');
        
        btn.addEventListener('click', () => this.searchDocs(input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.searchDocs(input.value);
        });

        document.getElementById('docs-suggestions').addEventListener('click', (e) => {
            if(e.target.classList.contains('ai-suggest-chip')) {
                input.value = e.target.dataset.q;
                this.searchDocs(input.value);
            }
        });
    },

    async searchDocs(query) {
        query = query.trim();
        if (!query) return Toast.show('Please enter a search term', 'warning');

        document.getElementById('docs-empty').style.display = 'none';
        document.getElementById('docs-results-area').style.display = 'none';
        document.getElementById('docs-loading').style.display = 'block';

        const btn = document.getElementById('docs-search-btn');
        btn.disabled = true;

        const systemPrompt = `You are a Developer Documentation Generator API. The user will ask for documentation on a programming concept, function, or library in any language. 
Return a JSON array of exactly 3 documentation blocks. Format for each block:
{
  "title": "Concept Name / Signature (Language)",
  "tags": ["tag1", "tag2"],
  "summary": "Detailed explanation, syntax structure, and a concise clear code example if applicable."
}
Return ONLY a valid JSON array and absolutely nothing else. Do not use markdown blocks.`;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 20000);
            
            let res;
            try {
                res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: query }
                        ],
                        jsonMode: true
                    }),
                    signal: controller.signal
                });
            } catch(e) { }
            clearTimeout(timeout);

            if(!res || !res.ok) {
                res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(systemPrompt + "\n\nQuery: " + query));
            }

            let text = await res.text();
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch(e) {
                const startIdx = text.indexOf('[');
                const endIdx = text.lastIndexOf(']');
                if(startIdx !== -1 && endIdx !== -1) {
                    parsed = JSON.parse(text.substring(startIdx, endIdx + 1));
                } else {
                    throw e;
                }
            }

            let docs = [];
            if (Array.isArray(parsed)) {
                docs = parsed;
            } else if (parsed && typeof parsed === 'object') {
                const arrayVal = Object.values(parsed).find(v => Array.isArray(v));
                if (arrayVal) {
                    docs = arrayVal;
                } else {
                    docs = [parsed];
                }
            }

            document.getElementById('docs-loading').style.display = 'none';
            document.getElementById('docs-results-area').style.display = 'block';

            if (!Array.isArray(docs) || docs.length === 0) {
                document.getElementById('docs-results-grid').innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);"><i class="fa-regular fa-face-frown mb-sm" style="font-size:1.5rem;"></i><br>Failed to retrieve documentation.</div>';
                return;
            }

            document.getElementById('docs-results-grid').innerHTML = docs.map((doc, idx) => `
                <div class="glass-card" style="animation:slideUp 0.3s ease ${idx * 0.05}s both; display:flex; flex-direction:column;">
                    <div style="flex:1;">
                        <h4 style="font-size:1.05rem; font-weight:600; margin-bottom:8px; color:var(--primary-light);">
                            ${Helpers.escapeHtml(doc.title || 'Documentation')}
                        </h4>
                        <div style="margin-bottom:12px; display:flex; flex-wrap:wrap; gap:6px;">
                            ${(doc.tags || []).map(tag => `<span class="tag tag-primary"><i class="fa-solid fa-code"></i> ${Helpers.escapeHtml(tag)}</span>`).join('')}
                        </div>
                        <p class="text-sm text-secondary" style="line-height:1.6; white-space:pre-wrap;">
                            ${Helpers.escapeHtml(doc.summary || 'No summary available.')}
                        </p>
                    </div>
                </div>
            `).join('');

        } catch(err) {
            console.error(err);
            document.getElementById('docs-loading').style.display = 'none';
            document.getElementById('docs-empty').style.display = 'block';
            Toast.show('Failed to fetch documentation. Please try again.', 'error');
        } finally {
            btn.disabled = false;
        }
    }
};
