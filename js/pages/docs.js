const DocsPage = {
    docSuggestions: [
        "Python List Comprehensions", "React useEffect Hook", "Docker Compose Basics",
        "Rust Ownership Model", "Git Rebase vs Merge", "SQL JOIN Types",
        "Java Streams", "C++ Smart Pointers", "CSS Grid Layout", "Node.js Event Loop",
        "Go Goroutines", "MongoDB Aggregation", "Bash Scripting Basics",
        "JavaScript Promises", "TypeScript Generics", "REST API Design",
        "GraphQL Queries", "Kubernetes Pods", "Redis Caching", "WebSocket Protocol"
    ],

    docsCache: {},

    render() {
        Navbar.renderTopbar('Developer Documentation');
        const content = document.getElementById('page-content');
        
        const randomSuggestionsHtml = this.docSuggestions.sort(() => 0.5 - Math.random()).slice(0, 6)
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

    _renderDocs(docs) {
        document.getElementById('docs-loading').style.display = 'none';
        document.getElementById('docs-results-area').style.display = 'block';

        if (!Array.isArray(docs) || docs.length === 0) {
            document.getElementById('docs-results-grid').innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);"><i class="fa-regular fa-face-frown mb-sm" style="font-size:1.5rem;"></i><br>Failed to retrieve documentation.</div>';
            return;
        }

        document.getElementById('docs-results-grid').innerHTML = docs.map((doc, idx) => {
            const title = doc.title || doc.name || doc.concept || 'Documentation';
            const summary = doc.summary || doc.description || doc.content || doc.explanation || '';
            const tags = doc.tags || doc.keywords || [];

            const formattedSummary = Helpers.escapeHtml(summary)
                .replace(/\\n/g, '<br>')
                .replace(/\n/g, '<br>')
                .replace(/`([^`]+)`/g, '<code style="background:rgba(212,168,67,0.1);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.8em;color:var(--primary-light);">$1</code>');

            return `
                <div class="glass-card" style="animation:slideUp 0.3s ease ${idx * 0.05}s both; display:flex; flex-direction:column;">
                    <div style="flex:1;">
                        <h4 style="font-size:1.05rem; font-weight:600; margin-bottom:8px; color:var(--primary-light);">
                            ${Helpers.escapeHtml(title)}
                        </h4>
                        <div style="margin-bottom:12px; display:flex; flex-wrap:wrap; gap:6px;">
                            ${tags.map(tag => `<span class="tag tag-primary"><i class="fa-solid fa-code"></i> ${Helpers.escapeHtml(tag)}</span>`).join('')}
                        </div>
                        <div class="text-sm text-secondary" style="line-height:1.7; white-space:pre-line;">
                            ${formattedSummary || '<span class="text-muted">No summary available.</span>'}
                        </div>
                    </div>
                </div>`;
        }).join('');
    },

    async searchDocs(query) {
        query = query.trim();
        if (!query) return Toast.show('Please enter a search term', 'warning');

        document.getElementById('docs-empty').style.display = 'none';
        document.getElementById('docs-results-area').style.display = 'none';
        document.getElementById('docs-loading').style.display = 'block';

        const btn = document.getElementById('docs-search-btn');
        btn.disabled = true;

        const cacheKey = query.toLowerCase();
        if (this.docsCache[cacheKey]) {
            setTimeout(() => {
                this._renderDocs(this.docsCache[cacheKey]);
                btn.disabled = false;
            }, 200);
            return;
        }

        const aiModel = (typeof AskAiPage !== 'undefined' && AskAiPage.currentAiModel) ? AskAiPage.currentAiModel : 'openai';

        const systemPrompt = `You are a JSON API that returns programming documentation. Return ONLY a valid JSON array with NO markdown, NO code fences, NO explanation text, NO emojis. The array must have exactly 3 objects with detailed, accurate, production-quality documentation.

Each object MUST have these exact fields:
- "title": A clear descriptive title with the language/framework name
- "tags": An array of 2 relevant category tags
- "summary": A detailed explanation with code examples. Use \\n for newlines. Include syntax, examples, and best practices. Make it thorough — at least 150 words per card.

Return ONLY the raw JSON array. Nothing else.`;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 30000);
            
            let text = '';
            try {
                const res = await fetch(`https://text.pollinations.ai/`, { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: aiModel,
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: 'Generate comprehensive documentation for: ' + query + '. Return ONLY a JSON array of 3 documentation cards.' }
                        ]
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!res.ok) throw new Error('API returned ' + res.status);
                
                text = await res.text();
            } catch(e) {
                clearTimeout(timeout);
                throw e;
            }
            text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

            let parsed = null;
            
            try { parsed = JSON.parse(text); } catch(e1) {}
            
            if (!parsed) {
                const arrStart = text.indexOf('[');
                const arrEnd = text.lastIndexOf(']');
                if (arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart) {
                    try {
                        let cleaned = text.substring(arrStart, arrEnd + 1);
                        cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/,\s*]/g, ']').replace(/,\s*}/g, '}');
                        parsed = JSON.parse(cleaned);
                    } catch(e2) {}
                }
            }
            
            if (!parsed) {
                const objStart = text.indexOf('{');
                const objEnd = text.lastIndexOf('}');
                if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
                    try {
                        let cleaned = text.substring(objStart, objEnd + 1);
                        cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                        parsed = [JSON.parse(cleaned)];
                    } catch(e3) {}
                }
            }
            
            if (!parsed) {
                const jsonObjects = [];
                const regex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    try {
                        jsonObjects.push(JSON.parse(match[0]));
                    } catch(e) {}
                }
                if (jsonObjects.length > 0) parsed = jsonObjects;
            }

            if (!parsed || (Array.isArray(parsed) && parsed.length === 0)) {
                document.getElementById('docs-loading').style.display = 'none';
                document.getElementById('docs-results-area').style.display = 'block';
                document.getElementById('docs-results-grid').innerHTML = `
                    <div class="glass-card" style="grid-column:1/-1; text-align:center; padding:30px;">
                        <i class="fa-solid fa-robot" style="font-size:2rem; color:var(--primary); margin-bottom:12px;"></i>
                        <h4 style="color:var(--text-secondary); margin-bottom:8px;">AI response couldn't be parsed</h4>
                        <p class="text-muted text-sm">The AI returned a non-standard format. Please try again or use a different search term.</p>
                    </div>`;
                return;
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

            const validDocs = docs.filter(d => d && typeof d === 'object').map(d => ({
                title: d.title || d.name || d.concept || query,
                tags: d.tags || d.keywords || [],
                summary: d.summary || d.description || d.content || d.explanation || d.details || ''
            }));

            const finalDocs = validDocs.length > 0 ? validDocs : docs;
            
            this.docsCache[cacheKey] = finalDocs;

            this._renderDocs(finalDocs);

        } catch(err) {
            console.error('Docs search error:', err);
            document.getElementById('docs-loading').style.display = 'none';
            document.getElementById('docs-empty').style.display = 'block';
            Toast.show('Failed to fetch documentation. Please try again.', 'error');
        } finally {
            btn.disabled = false;
        }
    }
};
