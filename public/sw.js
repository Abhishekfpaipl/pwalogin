
self.addEventListener('push', function (e) {
    console.log('inside')
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (e.data) {
        console.log('resr')
        //var msg = e.data.json();
        // console.log(msg)
        // e.waitUntil(self.registration.showNotification(msg.title, {
        //     body: msg.body,
        //     icon: msg.icon,
        //     actions: msg.actions
        // }));

        e.waitUntil(self.registration.showNotification('aaaaa', {
            body: 'bbbbb',
            icon: '',
            actions: [
                { action: 'cccc', title: 'ddddd' }
            ]
        }));
    }
});

const manifestURL = '/manifest.json';
window.addEventListener('load', async () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const manifest = await window.fetch(manifestURL).then(response => response.json());
    const startURL = new URL(manifest.start_url, window.location.origin).href;

    // If the PWA is installed and the current URL is not the start URL, redirect the user
    if (isStandalone && window.location.href !== startURL) {
        window.location.href = startURL;
    }
});