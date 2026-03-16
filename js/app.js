document.addEventListener('DOMContentLoaded', () => {
    Navbar.render();
    Router.init();

    document.getElementById('mobile-overlay').addEventListener('click', () => {
        Navbar.closeMobile();
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
});
