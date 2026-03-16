const PackageScoutPage = {
    render() {
        Navbar.renderTopbar('Package Scout');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Package <span class="text-gradient">Scout</span></h1>
                    <p>Search npm packages visually. See what each package does, quality scores, and risk warnings.</p>
                </div>
                <div class="flex-gap mb-lg flex-wrap">
                    <div class="search-container" style="flex: 1; min-width: 300px; max-width: 600px;">
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                        <input class="input-field" id="pkg-search-input" type="text" placeholder="Search npm packages..." />
                    </div>
                    <button class="btn btn-primary" id="pkg-search-btn">
                        <i class="fa-solid fa-search"></i> Search
                    </button>
                </div>
                <div id="pkg-results" class="grid-2"></div>
                <div id="pkg-empty">
                    <div class="empty-state">
                        <i class="fa-solid fa-box-open"></i>
                        <h3>Discover Packages</h3>
                        <p>Search for npm packages to see detailed information, quality metrics, and safety assessments.</p>
                    </div>
                </div>
            </div>`;

        this.bindEvents();
        this.searchPackages('react');
    },

    bindEvents() {
        document.getElementById('pkg-search-btn').addEventListener('click', () => {
            const q = document.getElementById('pkg-search-input').value.trim();
            if (q) this.searchPackages(q);
        });
        document.getElementById('pkg-search-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q = e.target.value.trim();
                if (q) this.searchPackages(q);
            }
        });
    },

    async searchPackages(query) {
        const results = document.getElementById('pkg-results');
        const empty = document.getElementById('pkg-empty');
        empty.style.display = 'none';
        results.innerHTML = Loader.skeleton(4);

        try {
            const data = await API.searchNpmPackages(query, 20);
            if (!data.objects || data.objects.length === 0) {
                results.innerHTML = '';
                empty.style.display = 'block';
                return;
            }

            results.innerHTML = data.objects.map(obj => {
                const pkg = obj.package;
                const score = obj.score;
                const quality = Math.round((score.detail?.quality || 0) * 100);
                const popularity = Math.round((score.detail?.popularity || 0) * 100);
                const maintenance = Math.round((score.detail?.maintenance || 0) * 100);
                const overall = Math.round((score.final || 0) * 100);

                const qualityColor = quality > 70 ? 'var(--success)' : quality > 40 ? 'var(--warning)' : 'var(--error)';
                const maintColor = maintenance > 70 ? 'var(--success)' : maintenance > 40 ? 'var(--warning)' : 'var(--error)';

                const isOutdated = pkg.date && (new Date() - new Date(pkg.date)) > 365 * 24 * 60 * 60 * 1000;
                const warnings = [];
                if (isOutdated) warnings.push('Potentially outdated');
                if (quality < 40) warnings.push('Low quality score');
                if (maintenance < 30) warnings.push('Poor maintenance');

                return `
                    <div class="glass-card pkg-card">
                        <div class="pkg-header">
                            <a href="https://www.npmjs.com/package/${pkg.name}" target="_blank" rel="noopener" class="pkg-name">${pkg.name}</a>
                            <span class="pkg-version">${pkg.version || ''}</span>
                        </div>
                        <p class="pkg-desc">${Helpers.escapeHtml(pkg.description || 'No description available.')}</p>
                        ${warnings.length > 0 ? `
                            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                ${warnings.map(w => `<span class="tag tag-warning"><i class="fa-solid fa-triangle-exclamation"></i> ${w}</span>`).join('')}
                            </div>` : ''}
                        <div>
                            <div class="flex-between mb-sm">
                                <span class="text-xs text-muted">Quality</span>
                                <span class="text-xs" style="color:${qualityColor}">${quality}%</span>
                            </div>
                            <div class="pkg-score"><div class="pkg-score-fill" style="width:${quality}%; background:${qualityColor};"></div></div>
                        </div>
                        <div>
                            <div class="flex-between mb-sm">
                                <span class="text-xs text-muted">Maintenance</span>
                                <span class="text-xs" style="color:${maintColor}">${maintenance}%</span>
                            </div>
                            <div class="pkg-score"><div class="pkg-score-fill" style="width:${maintenance}%; background:${maintColor};"></div></div>
                        </div>
                        <div class="pkg-meta">
                            <span><i class="fa-solid fa-fire"></i> ${popularity}% popular</span>
                            <span><i class="fa-solid fa-star"></i> ${overall}% overall</span>
                            ${pkg.date ? `<span><i class="fa-solid fa-clock"></i> ${Helpers.timeAgo(pkg.date)}</span>` : ''}
                        </div>
                        ${pkg.links?.npm ? `<a href="${pkg.links.npm}" target="_blank" rel="noopener" class="api-link mt-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> npm</a>` : ''}
                    </div>`;
            }).join('');
        } catch (err) {
            Toast.show('Failed to search packages: ' + err.message, 'error');
            results.innerHTML = '';
            empty.style.display = 'block';
        }
    }
};
