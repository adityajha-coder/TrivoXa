// AI Architect is now merged into AskAiPage. This file is kept for backward compatibility.
const AiArchitectPage = {
    render() {
        // Redirect to the Ask AI page, Architect tab
        AskAiPage.render();
        // Auto-switch to the architect tab
        setTimeout(() => {
            const archTab = document.querySelector('#ai-hub-tabs [data-tab="architect"]');
            if(archTab) archTab.click();
        }, 100);
    }
};
