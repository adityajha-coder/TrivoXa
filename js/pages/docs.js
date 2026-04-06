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
    docsHistory: [],

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

                <div id="docs-history-wrapper" style="display:none; margin-top: 20px; padding-top: 30px; border-top: 1px solid var(--border);">
                    <div class="flex-between mb-md">
                        <h3 style="font-weight:600;"><i class="fa-solid fa-clock-rotate-left" style="color:var(--primary-light);margin-right:8px;"></i> Search History</h3>
                        <button class="btn btn-ghost btn-sm" id="clear-docs-history"><i class="fa-solid fa-trash-can" style="margin-right:6px;"></i> Clear All</button>
                    </div>
                    <div id="docs-history-grid" style="display:flex; overflow-x:auto; gap:16px; padding-bottom:12px; scrollbar-width:thin;"></div>
                </div>

                <div id="docs-loading" style="display:none; text-align:center; padding:40px 0;">
                    <div class="spinner" style="margin: 0 auto 16px; width:40px; height:40px; border:4px solid rgba(88,166,255,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
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
        // Load history, but wait a tick for auth to potentially initialize if not already
        setTimeout(() => this.loadHistory(), 800);
    },

    bindEvents() {
        const btn = document.getElementById('docs-search-btn');
        const input = document.getElementById('docs-search-input');
        const suggestionsArea = document.getElementById('docs-suggestions');
        
        if (!btn || !input) {
            console.warn('[Docs] Missing search elements - skipping binding');
            return;
        }
        
        btn.addEventListener('click', () => this.searchDocs(input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.searchDocs(input.value);
        });

        if (suggestionsArea) {
            suggestionsArea.addEventListener('click', (e) => {
                if(e.target.classList.contains('ai-suggest-chip')) {
                    input.value = e.target.dataset.q;
                    this.searchDocs(input.value);
                }
            });
        }
    },

    async loadHistory() {
        const userId = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        if (userId && window.db) {
            try {
                const snap = await window.db.collection('users').doc(userId).collection('docs_history').orderBy('timestamp', 'desc').limit(15).get();
                this.docsHistory = snap.docs.map(doc => doc.data());
            } catch(e) {
                console.error('[Docs] Failed to load history from DB:', e);
                this.docsHistory = JSON.parse(localStorage.getItem('docs_history') || '[]');
            }
        } else {
            this.docsHistory = JSON.parse(localStorage.getItem('docs_history') || '[]');
        }
        this.renderHistory();
    },

    async saveHistory(query) {
        if (!query) return;
        // Check duplicates
        if (this.docsHistory.some(h => h.query.toLowerCase() === query.toLowerCase())) return;
        
        const item = { id: 'doc_' + Date.now().toString(36), query, timestamp: Date.now() };
        this.docsHistory.unshift(item);
        if (this.docsHistory.length > 15) this.docsHistory.pop();
        
        this.renderHistory();

        const userId = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        if (userId && window.db) {
            try {
                await window.db.collection('users').doc(userId).collection('docs_history').doc(item.id).set(item);
            } catch(e) {
                console.error('[Docs] Failed to save history to DB:', e);
            }
        } else {
            localStorage.setItem('docs_history', JSON.stringify(this.docsHistory));
        }
    },

    async deleteHistory(id) {
        this.docsHistory = this.docsHistory.filter(h => h.id !== id);
        this.renderHistory();

        const userId = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        if (userId && window.db) {
            try { await window.db.collection('users').doc(userId).collection('docs_history').doc(id).delete(); } catch(e) {}
        } else {
            localStorage.setItem('docs_history', JSON.stringify(this.docsHistory));
        }
    },
    
    async clearAllHistory() {
        if(!confirm('Clear all search history?')) return;
        this.docsHistory = [];
        this.renderHistory();
        
        const userId = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        if (userId && window.db) {
            try { 
                const snap = await window.db.collection('users').doc(userId).collection('docs_history').get();
                const batch = window.db.batch();
                snap.docs.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
            } catch(e) {}
        } else {
            localStorage.removeItem('docs_history');
        }
    },

    renderHistory() {
        const wrapper = document.getElementById('docs-history-wrapper');
        const grid = document.getElementById('docs-history-grid');
        const empty = document.getElementById('docs-empty');
        if(!wrapper || !grid) return;

        if (this.docsHistory.length === 0) {
            wrapper.style.display = 'none';
            if (empty) empty.style.display = 'block';
            return;
        }

        wrapper.style.display = 'block';
        if (empty) empty.style.display = 'none'; // hide the standard empty state
        
        grid.innerHTML = this.docsHistory.map((h, i) => 
            `<div class="glass-card-static doc-history-card" data-idx="${i}" style="min-width: 260px; max-width: 260px; flex: 0 0 auto; padding: 16px; cursor: pointer; transition: all 0.2s;">
                <div class="flex-between mb-xs" style="align-items:flex-start;">
                    <h4 style="font-size:0.95rem; font-weight:600; text-overflow:ellipsis; overflow:hidden; max-width:80%;" title="${Helpers.escapeHtml(h.query)}">
                        <i class="fa-solid fa-magnifying-glass" style="color:var(--text-muted); font-size:0.8rem; margin-right:6px;"></i> ${Helpers.escapeHtml(h.query)}
                    </h4>
                    <button class="btn btn-ghost btn-xs delete-doc-history" data-id="${h.id}" style="color:var(--error); margin-top:-4px; margin-right:-8px;" title="Delete">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="text-xs text-muted"><i class="fa-regular fa-clock"></i> ${new Date(h.timestamp).toLocaleString()}</div>
            </div>`
        ).join('');

        // Bind clicks to replay search
        grid.querySelectorAll('.doc-history-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = card.dataset.idx;
                const h = this.docsHistory[idx];
                const input = document.getElementById('docs-search-input');
                if (input && h) {
                    input.value = h.query;
                    this.searchDocs(h.query);
                }
            });
        });

        // Bind delete
        grid.querySelectorAll('.delete-doc-history').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent clicking the card
                this.deleteHistory(e.currentTarget.dataset.id);
            });
        });

        const clearBtn = document.getElementById('clear-docs-history');
        if (clearBtn && !clearBtn.dataset.bound) {
            clearBtn.dataset.bound = 'true';
            clearBtn.addEventListener('click', () => this.clearAllHistory());
        }
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
                .replace(/`([^`]+)`/g, '<code style="background:rgba(88,166,255,0.1);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.8em;color:var(--primary-light);">$1</code>');

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

    async searchDocs(query, retryCount = 0) {
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

        const systemPrompt = `You are a documentation API. You MUST return ONLY a valid JSON array with exactly 3 documentation objects. No markdown, no explanation, no code fences.

Each object must have these exact keys:
- "title": a descriptive title string
- "tags": an array of 2 keyword strings
- "summary": a detailed 150+ word explanation string

Example format:
[{"title":"Topic Name","tags":["tag1","tag2"],"summary":"Detailed explanation here..."}]

IMPORTANT: Return ONLY the JSON array. Start your response with [ and end with ]. No other text.`;

        try {
            let text = '';
            try {
                const res = await API.callGroqChat([
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: query }
                ], 'llama-3.1-8b-instant', 0.3);

                text = res.choices?.[0]?.message?.content || "";
            } catch(e) {
                console.error('[Docs Search Error]', e.message);
                throw e;
            }
            
            // Robust JSON extraction
            let parsed = this._parseJsonResponse(text);

            // Retry once if parsing failed
            if (!parsed && retryCount < 1) {
                console.warn('[Docs] First parse failed, retrying...');
                btn.disabled = false;
                document.getElementById('docs-loading').style.display = 'none';
                return this.searchDocs(query + ' ', 1);
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

            let docs = Array.isArray(parsed) ? parsed : [parsed];

            const validDocs = docs.filter(d => d && typeof d === 'object').map(d => ({
                title: d.title || d.name || d.concept || query,
                tags: Array.isArray(d.tags || d.keywords) ? (d.tags || d.keywords) : [],
                summary: d.summary || d.description || d.content || d.explanation || d.details || ''
            }));

            const finalDocs = validDocs.length > 0 ? validDocs : docs;
            
            this.docsCache[cacheKey] = finalDocs;
            this._renderDocs(finalDocs);
            this.saveHistory(query);

        } catch(err) {
            console.error('Docs search error:', err);
            document.getElementById('docs-loading').style.display = 'none';
            document.getElementById('docs-empty').style.display = 'block';
            Toast.show('Failed to fetch documentation. Please try again.', 'error');
        } finally {
            btn.disabled = false;
        }
    },

    _parseJsonResponse(text) {
        if (!text || !text.trim()) return null;

        // Step 1: Strip markdown code fences
        text = text.replace(/```(?:json)?\s*/gi, '').replace(/```\s*/g, '').trim();

        // Step 2: Try direct parse
        try { return JSON.parse(text); } catch(e) {}

        // Step 3: Extract JSON array between first [ and last ]
        const arrStart = text.indexOf('[');
        const arrEnd = text.lastIndexOf(']');
        if (arrStart !== -1 && arrEnd > arrStart) {
            let chunk = text.substring(arrStart, arrEnd + 1);
            // Clean control characters and trailing commas
            chunk = chunk.replace(/[\x00-\x1F\x7F]/g, ' ')
                         .replace(/,\s*]/g, ']')
                         .replace(/,\s*}/g, '}');
            try { return JSON.parse(chunk); } catch(e) {}

            // Step 3b: Try fixing common LLM issues (unescaped quotes in strings)
            try {
                // Replace unescaped newlines inside strings
                chunk = chunk.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
                return JSON.parse(chunk);
            } catch(e) {}
        }

        // Step 4: Extract JSON object  
        const objStart = text.indexOf('{');
        const objEnd = text.lastIndexOf('}');
        if (objStart !== -1 && objEnd > objStart) {
            let chunk = text.substring(objStart, objEnd + 1);
            chunk = chunk.replace(/[\x00-\x1F\x7F]/g, ' ')
                         .replace(/,\s*}/g, '}')
                         .replace(/,\s*]/g, ']');
            try {
                const obj = JSON.parse(chunk);
                // If the object contains an array value, use that
                const arrayVal = Object.values(obj).find(v => Array.isArray(v));
                return arrayVal || [obj];
            } catch(e) {}
        }

        // Step 5: Extract individual JSON objects via regex
        const jsonObjects = [];
        const regex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            try {
                const cleaned = match[0].replace(/[\x00-\x1F\x7F]/g, ' ');
                jsonObjects.push(JSON.parse(cleaned));
            } catch(e) {}
        }
        return jsonObjects.length > 0 ? jsonObjects : null;
    }
};
