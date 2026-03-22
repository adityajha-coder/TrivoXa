const AiChatMixin = {
    bindChat() {
        const input = document.getElementById('ai-bot-input');
        const send = document.getElementById('ai-bot-send');
        const explain = document.getElementById('ai-bot-explain');
        const debug = document.getElementById('ai-bot-debug');
        
        const handleSend = () => { const q = input.value.trim(); if (!q) return; this.addMsg(q, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        const handleExplain = () => { const code = input.value.trim(); if (!code) return Toast.show('Paste code first, then click Explain', 'warning'); const q = "Explain this code to me like I'm a beginner:\n\n" + code; this.addMsg("Explain this code to me like a beginner:\n" + code, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        const handleDebug = () => { const code = input.value.trim(); if (!code) return Toast.show('Paste the error or code first', 'warning'); const q = "Debug this error or code. Tell me what's wrong and how to fix it:\n\n" + code; this.addMsg("Debug this:\n" + code, 'user'); input.value = ''; setTimeout(() => this.genReply(q), 400); };
        
        send.addEventListener('click', handleSend);
        explain.addEventListener('click', handleExplain);
        debug.addEventListener('click', handleDebug);
        
        input.addEventListener('keydown', e => { 
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(); 
            }
        });
        document.querySelectorAll('.ai-suggest-chip').forEach(chip => {
            chip.addEventListener('click', () => { const q = chip.dataset.q; this.addMsg(q, 'user'); setTimeout(() => this.genReply(q), 400); });
        });

        document.getElementById('ai-clear-chat').addEventListener('click', () => {
            const msgs = document.getElementById('ai-bot-messages');
            msgs.innerHTML = `<div class="ai-msg bot-msg"><div class="msg-avatar"><i class="fa-solid fa-robot"></i></div><div class="msg-bubble">Chat cleared. How can I help you?</div></div>`;
            Toast.show('Chat cleared', 'success');
        });
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
                
                const res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: sysPrompt },
                            { role: 'user', content: query }
                        ],
                        model: 'openai',
                        seed: Math.floor(Math.random() * 100000)
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!res.ok) throw new Error('API failed with status ' + res.status);
                replyText = await res.text();
                if (typeof AskAiPage !== 'undefined' && AskAiPage.cleanAiResponse) {
                    replyText = AskAiPage.cleanAiResponse(replyText);
                }
            } catch(e) {
                console.error('AI Chat error:', e);
                this.addMsg('Sorry, the AI service is temporarily unavailable. Please try again in a moment.', 'bot');
                document.getElementById('ai-bot-send').disabled = false;
                document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                return;
            }
            
            let formattedReply = replyText.replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.4);padding:10px;border-radius:8px;border:1px solid var(--border);margin-top:8px;font-size:12px;overflow-x:auto;">$1</pre>');
            
            this.addMsg(formattedReply.trim(), 'bot');
        } finally {
            document.getElementById('ai-bot-send').disabled = false;
            document.getElementById('ai-bot-send').innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
        }
    }
};
