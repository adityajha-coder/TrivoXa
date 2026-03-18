const Helpers = {
    debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },

    timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 }
        ];
        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
        return 'just now';
    },

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            Toast.show('Copied to clipboard', 'success');
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            Toast.show('Copied to clipboard', 'success');
        });
    },

    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
            js: { icon: 'fa-brands fa-js', color: '#f7df1e' },
            ts: { icon: 'fa-brands fa-js', color: '#3178c6' },
            jsx: { icon: 'fa-brands fa-react', color: '#61dafb' },
            tsx: { icon: 'fa-brands fa-react', color: '#61dafb' },
            py: { icon: 'fa-brands fa-python', color: '#3776ab' },
            html: { icon: 'fa-brands fa-html5', color: '#e34f26' },
            css: { icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
            json: { icon: 'fa-solid fa-brackets-curly', color: '#f59e0b' },
            md: { icon: 'fa-solid fa-file-lines', color: '#64748b' },
            yml: { icon: 'fa-solid fa-file-code', color: '#cb171e' },
            yaml: { icon: 'fa-solid fa-file-code', color: '#cb171e' },
            svg: { icon: 'fa-solid fa-image', color: '#ffb13b' },
            png: { icon: 'fa-solid fa-image', color: '#22c55e' },
            jpg: { icon: 'fa-solid fa-image', color: '#22c55e' },
            gif: { icon: 'fa-solid fa-image', color: '#a855f7' },
            go: { icon: 'fa-brands fa-golang', color: '#00add8' },
            rs: { icon: 'fa-solid fa-gear', color: '#dea584' },
            java: { icon: 'fa-brands fa-java', color: '#ed8b00' },
            rb: { icon: 'fa-solid fa-gem', color: '#cc342d' },
            php: { icon: 'fa-brands fa-php', color: '#777bb4' },
            sh: { icon: 'fa-solid fa-terminal', color: '#4eaa25' },
            dockerfile: { icon: 'fa-brands fa-docker', color: '#2496ed' },
            lock: { icon: 'fa-solid fa-lock', color: '#64748b' },
            gitignore: { icon: 'fa-brands fa-git-alt', color: '#f05032' }
        };
        return icons[ext] || { icon: 'fa-solid fa-file', color: '#64748b' };
    },

    getLanguageColor(lang) {
        const colors = {
            JavaScript: '#f7df1e',
            TypeScript: '#3178c6',
            Python: '#3776ab',
            Java: '#ed8b00',
            Go: '#00add8',
            Rust: '#dea584',
            Ruby: '#cc342d',
            PHP: '#777bb4',
            'C++': '#00599c',
            C: '#555555',
            'C#': '#239120',
            Swift: '#f05138',
            Kotlin: '#7f52ff',
            Dart: '#0175c2',
            HTML: '#e34f26',
            CSS: '#1572b6',
            Shell: '#89e051',
            Vue: '#42b883',
            Svelte: '#ff3e00'
        };
        return colors[lang] || '#64748b';
    },

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    },

    truncate(str, len = 100) {
        if (str.length <= len) return str;
        return str.substring(0, len) + '...';
    },

    randomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 60%)`;
    },

    _scriptCache: {},
    loadScript(src) {
        if (this._scriptCache[src]) return this._scriptCache[src];
        this._scriptCache[src] = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = () => reject(new Error(`Failed to load: ${src}`));
            document.head.appendChild(s);
        });
        return this._scriptCache[src];
    },

    async loadScripts(urls) {
        for (const url of urls) {
            await this.loadScript(url);
        }
    },

    _monacoPromise: null,
    async initMonaco() {
        if(this._monacoPromise) return this._monacoPromise;
        this._monacoPromise = new Promise((resolve) => {
            if (window.monaco) return resolve(window.monaco);
            require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.46.0/min/vs' }});
            require(['vs/editor/editor.main'], () => resolve(window.monaco));
        });
        return this._monacoPromise;
    },

    getExtColor(ext) {
        const map = {
            js: '#f7df1e', mjs: '#f7df1e', cjs: '#f7df1e',
            ts: '#3178c6', tsx: '#61dafb', jsx: '#61dafb',
            py: '#3776ab', ipynb: '#3776ab',
            html: '#e34f26', htm: '#e34f26',
            css: '#1572b6', scss: '#c6538c', sass: '#c6538c', less: '#1d365d',
            json: '#f59e0b', yaml: '#cb171e', yml: '#cb171e', toml: '#9c4121',
            md: '#64748b', mdx: '#fcb32c', txt: '#94a3b8',
            go: '#00add8',
            rs: '#dea584',
            java: '#ed8b00', kt: '#7f52ff', scala: '#dc322f',
            rb: '#cc342d', erb: '#cc342d',
            php: '#777bb4',
            swift: '#f05138',
            dart: '#0175c2',
            c: '#555555', h: '#555555', cpp: '#00599c', hpp: '#00599c',
            cs: '#239120',
            vue: '#42b883', svelte: '#ff3e00',
            sh: '#89e051', bash: '#89e051', zsh: '#89e051',
            sql: '#e38c00',
            r: '#276dc3',
            lua: '#000080',
            ex: '#6e4a7e', exs: '#6e4a7e',
            dockerfile: '#2496ed',
            lock: '#64748b', gitignore: '#f05032',
            svg: '#ffb13b', png: '#22c55e', jpg: '#22c55e', gif: '#a855f7', webp: '#22c55e',
            xml: '#f16529', graphql: '#e535ab', proto: '#4285f4',
            tf: '#844fba', hcl: '#844fba'
        };
        return map[ext?.toLowerCase()] || '#6b7280';
    }
};

const Toast = {
    show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
        toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(40px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};
