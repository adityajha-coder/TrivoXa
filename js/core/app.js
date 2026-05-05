document.addEventListener('DOMContentLoaded', () => {
    Navbar.render();
    Router.init();

    // register service worker + handle updates
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/public/sw.js', { scope: '/' })
            .then(reg => {
                // check for updates every 5 min
                setInterval(() => reg.update(), 5 * 60 * 1000);

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                            Toast.show('App updated! Refresh to see changes.', 'info', 5000);
                        }
                    });
                });
            })
            .catch(() => {});
    }

    // offline/online detection
    const showOfflineBanner = () => {
        if (document.getElementById('offline-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'offline-banner';
        banner.innerHTML = '<i class="fa-solid fa-wifi" style="opacity:0.5;"></i> You\'re offline — cached pages still work';
        banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(232,69,69,0.95);color:white;text-align:center;padding:8px 16px;font-size:0.82rem;font-weight:500;backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;gap:8px;animation:slideUp .3s ease;';
        document.body.appendChild(banner);
    };

    const hideOfflineBanner = () => {
        const banner = document.getElementById('offline-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(10px)';
            banner.style.transition = 'all 0.3s ease';
            setTimeout(() => banner.remove(), 300);
            Toast.show('Back online!', 'success', 2000);
        }
    };

    window.addEventListener('offline', showOfflineBanner);
    window.addEventListener('online', hideOfflineBanner);

    // show banner if already offline on load
    if (!navigator.onLine) showOfflineBanner();
});
