document.addEventListener('DOMContentLoaded', () => {
    Navbar.render();
    Router.init();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
});
