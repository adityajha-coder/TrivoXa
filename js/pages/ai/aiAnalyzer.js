const AiAnalyzerMixin = {
    bindAnalyzer() {
        const dropZone = document.getElementById('drop-zone');
        const fileUpload = document.getElementById('file-upload');
        const browseBtn = document.getElementById('browse-file-btn');
        const analyzeAnother = document.getElementById('analyze-another-btn');

        if(!dropZone || !fileUpload) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); });
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => { dropZone.style.borderColor = 'var(--primary)'; dropZone.style.background = 'rgba(88,166,255,0.05)'; });
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => { dropZone.style.borderColor = 'var(--border)'; dropZone.style.background = 'transparent'; });
        });

        dropZone.addEventListener('drop', e => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if(files && files.length > 0) this.handleCodeFile(files[0]);
        });

        browseBtn.addEventListener('click', (e) => { e.stopPropagation(); fileUpload.click(); });
        dropZone.addEventListener('click', (e) => { if(e.target !== browseBtn) fileUpload.click(); });
        fileUpload.addEventListener('change', () => { if(fileUpload.files.length > 0) this.handleCodeFile(fileUpload.files[0]); });

        if(analyzeAnother) {
            analyzeAnother.addEventListener('click', () => {
                document.getElementById('analyzer-results').style.display = 'none';
                document.getElementById('drop-zone').style.display = 'block';
                fileUpload.value = '';
            });
        }
    },

    handleCodeFile(file) {
        if(file.size > 100000) return Toast.show('File is too large (max 100KB).', 'error');
        const reader = new FileReader();
        reader.onload = async (e) => {
            const code = e.target.result;
            if(!code.trim()) return Toast.show('File is empty.', 'error');
            this.analyzeCode(file.name, code);
        };
        reader.readAsText(file);
    },

    async analyzeCode(filename, codeContent) {
        document.getElementById('drop-zone').style.display = 'none';
        document.getElementById('analyzer-loading').style.display = 'block';

        const sysPrompt = `Act as an expert static code analyzer. Evaluate the source code file and return ONLY a valid JSON object matching exactly this structure, nothing else:
{
  "complexity": "e.g. O(N), O(N^2), or 'Low', 'High'",
  "security": "e.g. '0 Vulns', '1 Issue'",
  "healthScore": "e.g. '92/100'",
  "review": "A detailed 2-3 sentence technical review of the code's health and maintainability.",
  "suggestions": "2-3 bullet points on how to improve the code."
}`;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 60000);
            
            let text = '';
            try {
                const res = await API.callGroqChat([
                    { role: 'system', content: sysPrompt },
                    { role: 'user', content: "Filename: " + filename + "\n" + codeContent.substring(0, 1500) }
                ], 'llama-3.1-8b-instant', 0.7);
                clearTimeout(timeout);
                
                text = res.choices[0]?.message?.content || '';
                if (typeof AskAiPage !== 'undefined' && AskAiPage.cleanAiResponse) {
                    text = AskAiPage.cleanAiResponse(text);
                }
            } catch(e) {
                clearTimeout(timeout);
                console.error('[Code Analyzer Error]', e.message);
                throw e;
            }
            
            const startIdx = text.indexOf('{');
            const endIdx = text.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
                text = text.substring(startIdx, endIdx + 1);
            }
            
            let result;
            try {
                result = JSON.parse(text);
            } catch(parseErr) {
                try {
                    let cleaned = text.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                    result = JSON.parse(cleaned);
                } catch(cleanErr) {
                    result = { complexity: '--', security: '--', healthScore: '--', review: 'AI returned an unparseable response.', suggestions: 'Please try again.' };
                }
            }

            document.getElementById('analyzer-loading').style.display = 'none';
            document.getElementById('analyzer-results').style.display = 'flex';
            
            document.getElementById('analyze-filename').textContent = filename;
            document.getElementById('metric-complexity').textContent = result.complexity || '--';
            document.getElementById('metric-security').textContent = result.security || '--';
            document.getElementById('metric-score').textContent = result.healthScore || '--';
            
            let scoreVal = parseInt(result.healthScore);
            const scoreEl = document.getElementById('metric-score');
            if(!isNaN(scoreVal)) {
                if(scoreVal >= 85) scoreEl.style.color = 'var(--success)';
                else if(scoreVal >= 60) scoreEl.style.color = 'var(--warning)';
                else scoreEl.style.color = 'var(--error)';
            } else { scoreEl.style.color = 'var(--text)'; }

            document.getElementById('analyzer-review').textContent = result.review || 'No review generated.';
            
            let suggestions = result.suggestions || '';
            if (Array.isArray(suggestions)) {
                suggestions = suggestions.join('\n');
            } else if (typeof suggestions !== 'string') {
                suggestions = String(suggestions);
            }
            
            document.getElementById('analyzer-suggestions').innerHTML = suggestions.replace(/\n/g, '<br>');

        } catch (error) {
            document.getElementById('analyzer-loading').style.display = 'none';
            document.getElementById('drop-zone').style.display = 'block';
            Toast.show('Failed to analyze code. The model might have timed out.', 'error');
            console.error(error);
        }
    }
};
