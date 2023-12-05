/* eslint-disable no-console */

import { register } from "register-service-worker";

// if (process.env.NODE_ENV === "production") {
  console.log(`${process.env.BASE_URL}`)
register(`${process.env.BASE_URL}sw.js`, {
  ready() {
    console.log(
      "App is being served from cache by a service worker.\n" +
      "For more details, visit https://goo.gl/AFskqB"
    );
    // navigator.serviceWorker.ready.then(reg => {
    //   reg.pushManager.getSubscription().then(sub => {
    //     if (sub === undefined) {
    //       console.log('test');
    //       return
    //     } else {
    //       console.log('inside else')

    //     }
    //   })
    // })
  },
  registered(registration) {
    console.log("Service worker has been registered.");
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          registration.pushManager.getSubscription().then(existingSubscription => {
            if (existingSubscription) {
              console.log('User is already subscribed to push notifications:', existingSubscription);
              // localStorage.setItem('pushEndpoint', existingSubscription.endpoint)
            } else {
              // User is not subscribed; register for push notifications
              registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BPvsZxtTAX46GX6ZsS4CKHq0gQM5w7ow-EtXVziZzOPdXtJjG-77HcYvejfJOUbw1yNv3iwNnEPUrgC8sivKWH4', // Replace with your server key
              }).then(function (newSubscription) {
                console.log('Push subscription successful:', newSubscription);
                // localStorage.setItem('pushEndpoint', newSubscription.endpoint)

              }).catch(error => {
                console.error('Error subscribing to push notifications:', error);
              });
            }

          });
        }
      });
    }


  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    console.log("New content is downloading.");
  },
  updated() {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
