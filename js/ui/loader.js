const Loader = {
    show(container) {
        container.innerHTML = `
            <div class="empty-state" style="min-height: 300px;">
                <div class="loader-spinner"></div>
                <p class="mt-md text-muted">Loading...</p>
            </div>`;
    },

    skeleton(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="glass-card" style="padding: 20px;">
                    <div class="skeleton" style="height: 16px; width: 60%; margin-bottom: 12px;"></div>
                    <div class="skeleton" style="height: 12px; width: 90%; margin-bottom: 8px;"></div>
                    <div class="skeleton" style="height: 12px; width: 75%;"></div>
                </div>`;
        }
        return html;
    }
};
