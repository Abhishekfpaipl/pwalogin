
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

