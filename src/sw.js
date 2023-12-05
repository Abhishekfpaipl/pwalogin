// self.addEventListener('push', function (e) {
//     if (!(self.Notification && self.Notification.permission === 'granted')) {
//         //notifications aren't supported or permission not granted!
//         return;
//     }

//     if (e.data) {
//         var msg = e.data.json();
//         console.log(msg)
//         e.waitUntil(self.registration.showNotification(msg.title, {
//             body: msg.body,
//             icon: msg.icon,
//             actions: msg.actions
//         }));
//     }
// });
self.addEventListener('push', function (e) {
    console.log('inside')
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (e.data) {
        console.log('resr')
        var msg = e.data.json();
        console.log(msg)
        e.waitUntil(self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: msg.icon,
            actions: msg.actions
        }));
    }
})
// navigator.serviceWorker.ready.then(reg => {
//     reg.pushManager.getSubscription().then(sub => {
//         if (sub === undefined) {
//             console.log('test');
//             return
//         } else {
//             console.log('inside else')
//             self.addEventListener('push', function (e) {
//                 console.log('inside')
//                 if (!(self.Notification && self.Notification.permission === 'granted')) {
//                     //notifications aren't supported or permission not granted!
//                     return;
//                 }

//                 if (e.data) {
//                     console.log('resr')
//                     var msg = e.data.json();
//                     console.log(msg)
//                     e.waitUntil(self.registration.showNotification(msg.title, {
//                         body: msg.body,
//                         icon: msg.icon,
//                         actions: msg.actions
//                     }));
//                 }
//             })
//         }
//     })
// })