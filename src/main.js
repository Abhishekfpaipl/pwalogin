import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
// main.js
// function subscribeUser() {
//     navigator.serviceWorker.ready
//         .then((registration) => {
//             const subscribeOptions = {
//                 userVisibleOnly: true,
//                 applicationServerKey: 'BPvsZxtTAX46GX6ZsS4CKHq0gQM5w7ow-EtXVziZzOPdXtJjG-77HcYvejfJOUbw1yNv3iwNnEPUrgC8sivKWH4', // Replace with your server key
//             };

//             return registration.pushManager.subscribe(subscribeOptions);
//         })
//         .then((pushSubscription) => {
//             console.log('Received PushSubscription:', JSON.stringify(pushSubscription));
//             storePushSubscription(pushSubscription);
//         })
//         .catch((err) => {
//             console.error('Error subscribing to push notifications:', err);
//         });
// }

// subscribeUser();

// // main.js

// function storePushSubscription(pushSubscription) {
//     const token = document.querySelector('meta[name=csrf-token]').getAttribute('content');
//     const token1 = localStorage.getItem('token');

//     fetch('/push_store', {
//         method: 'POST',
//         body: JSON.stringify(pushSubscription),
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'X-CSRF-Token': token
//         }
//     })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.error('Error storing push subscription:', err);
//         });
// }

