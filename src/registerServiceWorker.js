/* eslint-disable no-console */

import { register } from "register-service-worker";

// if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered(registration) {
      console.log("Service worker has been registered.");

      // Register for push notifications
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BPvsZxtTAX46GX6ZsS4CKHq0gQM5w7ow-EtXVziZzOPdXtJjG-77HcYvejfJOUbw1yNv3iwNnEPUrgC8sivKWH4', // Replace with your server key
      }).then(function (subscription) {
        console.log('Push subscription successful:', subscription);

      });
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
// }
