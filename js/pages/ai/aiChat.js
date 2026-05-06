const AiChatMixin = {
    bindChat() {
        console.log('[AI Chat] Starting chat binding...');
        
        const input = document.getElementById('ai-bot-input');
        const send = document.getElementById('ai-bot-send');
        const explain = document.getElementById('ai-bot-explain');
        const debug = document.getElementById('ai-bot-debug');
        
        console.log('[AI Chat] Elements found:', {
            input: !!input,
            send: !!send,
            explain: !!explain,
            debug: !!debug
        });
        
        if (!input || !send || !explain || !debug) {
            console.warn('[AI Chat] Missing chat elements - skipping binding');
            console.warn('[AI Chat] input:', input, 'send:', send, 'explain:', explain, 'debug:', debug);
            return;
        }
        
        // Bind send button
        send.addEventListener('click', () => {
            console.log('[AI Chat] Send button clicked');
            const q = input.value.trim();
            console.log('[AI Chat] Query:', q);
            if (!q) {
                console.log('[AI Chat] Empty query, not sending');
                return;
            }
            console.log('[AI Chat] Adding user message');
            this.addMsg(q, 'user');
            input.value = '';
            console.log('[AI Chat] Generating reply');
            setTimeout(() => this.genReply(q), 400);
        });
        
        // Bind explain button
        explain.addEventListener('click', () => {
            console.log('[AI Chat] Explain button clicked');
            const code = input.value.trim();
            if (!code) {
                Toast.show('Paste code first, then click Explain', 'warning');
                return;
            }
            const q = "Explain this code to me like I'm a beginner:\n\n" + code;
            this.addMsg("Explain this code to me like a beginner:\n" + code, 'user');
            input.value = '';
            setTimeout(() => this.genReply(q), 400);
        });
        
        // Bind debug button
        debug.addEventListener('click', () => {
            console.log('[AI Chat] Debug button clicked');
            const code = input.value.trim();
            if (!code) {
                Toast.show('Paste the error or code first', 'warning');
                return;
            }
            const q = "Debug this error or code. Tell me what's wrong and how to fix it:\n\n" + code;
            this.addMsg("Debug this:\n" + code, 'user');
            input.value = '';
            setTimeout(() => this.genReply(q), 400);
        });
        
        // Bind Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                console.log('[AI Chat] Enter key pressed');
                e.preventDefault();
                e.stopPropagation();
                const q = input.value.trim();
                if (!q) return;
                this.addMsg(q, 'user');
                input.value = '';
                setTimeout(() => this.genReply(q), 400);
            }
        });
        
        // Bind clear button
        const clearBtn = document.getElementById('ai-clear-chat');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const msgs = document.getElementById('ai-bot-messages');
                if (msgs) {
                    msgs.innerHTML = `<div class="ai-msg bot-msg"><div class="msg-avatar"><i class="fa-solid fa-robot"></i></div><div class="msg-bubble">Chat cleared. How can I help you?</div></div>`;
                    Toast.show('Chat cleared', 'success');
                }
            });
        }
        
        // Bind suggestion chips
        document.querySelectorAll('.ai-suggest-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const q = chip.dataset.q;
                console.log('[AI Chat] Suggestion clicked:', q);
                this.addMsg(q, 'user');
                setTimeout(() => this.genReply(q), 400);
            });
        });
        
        console.log('[AI Chat] Chat binding complete - all event listeners attached');
    },

    addMsg(text, sender) {
        const msgs = document.getElementById('ai-bot-messages');
        const isBot = sender === 'bot';
        const div = document.createElement('div');
        div.className = `ai-msg ${isBot ? 'bot-msg' : 'user-msg'}`;
        div.innerHTML = `${isBot ? '<div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>' : ''}<div class="msg-bubble">${text}</div>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    },

    async genReply(query) {
        document.getElementById('ai-bot-send').disabled = true;
        document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        
        const q = query.toLowerCase();
        let match = null;
        for (const [key, data] of Object.entries(this.recommendations)) { if (q.includes(key)) { match = data; break; } }
        
        if (match) {
            let html = `<strong>${match.reply}</strong><div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">`;
            match.tools.forEach((t, i) => { html += `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid var(--border);"><span style="color:var(--primary-light);font-weight:700;min-width:18px;">${i+1}.</span><div><span style="font-weight:600;font-size:0.84rem;">${t.name}</span><p style="font-size:0.76rem;color:var(--text-muted);margin-top:2px;">${t.why}</p></div></div>`; });
            html += '</div>';
            this.addMsg(html, 'bot');
            document.getElementById('ai-bot-send').disabled = false;
            document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
            return;
        }

        try {
            let replyText = '';
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 60000);
                
                let sysPrompt = "You are Vertex AI, an expert programming assistant embedded in a developer toolkit. Format your answer clearly with numbered steps when appropriate. If they paste code and ask to explain or debug it, break it down simply. Keep answers concise but thorough.";
                
                const res = await API.callGroqChat([
                    { role: 'system', content: sysPrompt },
                    { role: 'user', content: query }
                ], 'llama-3.1-8b-instant', 0.7);

                clearTimeout(timeout);
                replyText = res.choices[0]?.message?.content || "No response generated";
                if (typeof AskAiPage !== 'undefined' && AskAiPage.cleanAiResponse) {
                    replyText = AskAiPage.cleanAiResponse(replyText);
                }
            } catch(e) {
                console.error('AI Chat error:', e);
                const errorMsg = e.message || 'API service error. Check console for details.';
                let displayMsg = errorMsg;
                
                // Make error messages user-friendly
                if (errorMsg.includes('CORS')) {
                    displayMsg = '❌ CORS Error: Cannot reach Groq API from browser. Use a backend proxy.';
                } else if (errorMsg.includes('Invalid Groq API key')) {
                    displayMsg = '❌ ' + errorMsg;
                } else if (errorMsg.includes('401')) {
                    displayMsg = '❌ Unauthorized: API key is invalid or expired. Update it in settings.';
                } else if (errorMsg.includes('429')) {
                    displayMsg = '❌ Rate limited: Too many requests. Wait a moment and try again.';
                } else if (errorMsg.includes('Network error')) {
                    displayMsg = '❌ Network error. Check your internet connection.';
                }
                
                this.addMsg(displayMsg, 'bot');
                document.getElementById('ai-bot-send').disabled = false;
                document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                return;
            }
            
            let formattedReply = this.formatMarkdown(replyText);
            
            this.addMsg(formattedReply.trim(), 'bot');
            
            if (this.saveAiHistory) {
                this.saveAiHistory('chat', query, formattedReply.trim());
            }
        } finally {
            document.getElementById('ai-bot-send').disabled = false;
            document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
        }
    },

    /**
     * Lightweight Markdown → HTML renderer for AI chat responses.
     * Handles code blocks, headings, bold, italic, inline code,
     * numbered/bullet lists, and line breaks so responses look
     * clean and structured instead of a wall of text.
     */
    formatMarkdown(text) {
        if (!text) return '';

        // Step 1: Protect code blocks from being processed
        const codeBlocks = [];
        text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
            const idx = codeBlocks.length;
            codeBlocks.push(`<pre style="background:rgba(0,0,0,0.4);padding:12px;border-radius:8px;border:1px solid var(--border);margin:8px 0;font-size:12px;overflow-x:auto;font-family:var(--font-mono);line-height:1.6;"><code>${code.replace(/</g,'&lt;').replace(/>/g,'&gt;').trim()}</code></pre>`);
            return `__CODE_BLOCK_${idx}__`;
        });

        // Step 2: Process line-by-line to handle lists and headings properly
        const lines = text.split('\n');
        let html = '';
        let inList = false;     // Are we currently inside a <ul> or <ol>?
        let listType = '';      // 'ul' or 'ol'

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // --- Headings ---
            if (line.startsWith('### '))      { line = `<h4 style="margin:12px 0 6px;font-weight:600;color:var(--primary-light);">${line.slice(4)}</h4>`; }
            else if (line.startsWith('## '))   { line = `<h3 style="margin:14px 0 6px;font-weight:700;color:var(--primary-light);">${line.slice(3)}</h3>`; }
            else if (line.startsWith('# '))    { line = `<h2 style="margin:16px 0 8px;font-weight:700;color:var(--primary-light);">${line.slice(2)}</h2>`; }

            // --- Numbered list items (e.g. "1. ", "2. ") ---
            else if (/^\d+\.\s/.test(line)) {
                if (!inList || listType !== 'ol') {
                    if (inList) html += `</${listType}>`;
                    html += '<ol style="margin:8px 0;padding-left:20px;line-height:1.8;">';
                    inList = true; listType = 'ol';
                }
                line = `<li style="margin-bottom:4px;">${line.replace(/^\d+\.\s/, '')}</li>`;
            }

            // --- Bullet list items (e.g. "- " or "* ") ---
            else if (/^[\-\*]\s/.test(line)) {
                if (!inList || listType !== 'ul') {
                    if (inList) html += `</${listType}>`;
                    html += '<ul style="margin:8px 0;padding-left:20px;line-height:1.8;">';
                    inList = true; listType = 'ul';
                }
                line = `<li style="margin-bottom:4px;">${line.replace(/^[\-\*]\s/, '')}</li>`;
            }

            // --- Regular line: close any open list ---
            else {
                if (inList) { html += `</${listType}>`; inList = false; listType = ''; }
                // Empty lines become spacing
                if (line.trim() === '') { line = '<br>'; }
                else { line = `<p style="margin:4px 0;line-height:1.7;">${line}</p>`; }
            }

            html += line;
        }
        // Close any remaining open list
        if (inList) html += `</${listType}>`;

        // Step 3: Inline formatting (bold, italic, inline code)
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(88,166,255,0.12);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.82em;color:var(--primary-light);">$1</code>');

        // Step 4: Restore protected code blocks
        codeBlocks.forEach((block, idx) => {
            html = html.replace(`__CODE_BLOCK_${idx}__`, block);
        });

        return html;
    }
};
