<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="showInstallPopup" class="install-popup">
      <div class="install-popup-content">
        <p>Do you want to install this app?</p>
        <button @click="installApp">Install</button>
        <button @click="dismissInstall">Dismiss</button>
      </div>
    </div>
    Abhisheknegi@fpaipl
    <HelloWorld msg="Welcome to Your Pwa Login Test" />
    <p>Version 1.3.4</p>

    <router-link to="/login" class="btn btn-primary">Login</router-link>
    <router-link to="/registration" class="btn btn-primary">Register</router-link>

    {{ users }}

    <button @click="subscribeForNotifications">Subscribe for Notifications</button>
    <!-- <button @click="storePushSubscription">Store data</button> -->

    <button @click="getNoti">Test</button>
    <button @click="pwaRedirect">Yes, switch to PWA</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import HelloWorld from "@/components/HelloWorld.vue";
// import axiosInstance from "@/axios";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      deferredPrompt: null,
      showInstallButton: false,
      showInstallPopup: false,
      noti: [],
      users: null,
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
  },
  unmounted() {
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
  },
  mounted() {
    const token = localStorage.getItem('token');

    axios.get('https://pwa.clobug.co.in/api/user', {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((response) => {
      this.users = response.data
      console.log(response.data)
    })
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
    pwaRedirect() {
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
    },
    handleInstallPrompt(event) {
      // Prevent the default behavior to show the browser's install prompt
      event.preventDefault();
      // Store the event for later use
      this.deferredPrompt = event;
      // Show a browser-style alert immediately
      this.showInstallAlert();
    },
    showInstallAlert() {
      // Set the flag to true to show the install popup
      this.showInstallPopup = true;
    },
    installApp() {
      // If the user clicks "Install," show the browser's install prompt
      this.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Reset the deferredPrompt
        this.deferredPrompt = null;
        // Close the install popup
        this.showInstallPopup = false;
      });
    },
    dismissInstall() {
      this.showInstallPopup = false;
    },
    subscribeForNotifications() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready
          .then((registration) => {
            const subscribeOptions = {
              userVisibleOnly: true,
              applicationServerKey:"BHaGoupz6SaaiUM6EOTtsVSVjAklaOV3Y4lmexYmEV7XwDDiA4LkPLfqmvpaF4FcyyHEZ2LvLQUp9sHpuW0K96s" 
              // 'BPvsZxtTAX46GX6ZsS4CKHq0gQM5w7ow-EtXVziZzOPdXtJjG-77HcYvejfJOUbw1yNv3iwNnEPUrgC8sivKWH4'
              // VAPID_PUBLIC_KEY=BHaGoupz6SaaiUM6EOTtsVSVjAklaOV3Y4lmexYmEV7XwDDiA4LkPLfqmvpaF4FcyyHEZ2LvLQUp9sHpuW0K96s
// VAPID_PRIVATE_KEY=8bhCFK8z4tcmX2t5hkwC0Av7_KFZWgoZYCrc3- 6DjOo

          };

        return registration.pushManager.subscribe(subscribeOptions);
      })
          .then((pushSubscription) => {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        // You can store the pushSubscription data as needed
        this.storePushSubscription(pushSubscription);
        localStorage.setItem('p256dhKey', pushSubscription.keys.p256dh);
        localStorage.setItem('authKey', pushSubscription.keys.auth);
      })
      .catch((error) => {
        console.error('Error subscribing for notifications:', error);
      });
  } else {
    console.warn('Push notifications are not supported in this browser.');
  }
},
storePushSubscription(pushSubscription) {
  // Implement your logic to store the pushSubscription data
  // For example, send it to your server
  const { keys, endpoint } = pushSubscription.toJSON();

  // Store the keys in localStorage
  localStorage.setItem('p256dhKey', keys.p256dh);
  localStorage.setItem('authKey', keys.auth);
  localStorage.setItem('endpoint', endpoint)

  console.log('Stored p256dhKey in localStorage:', keys.p256dh);
  console.log('Stored authKey in localStorage:', keys.auth);
},
// getNoti() {
//   const token = localStorage.getItem('token');
//   const keys = {
//     "auth": localStorage.getItem('authKey'),
//     "p256dh": localStorage.getItem('p256dhKey')
//   }

//   axios.post('https://pwa.clobug.co.in/api/push_store', {
//     headers: { "Authorization": `Bearer ${token}` },
//     endpoint: localStorage.getItem('endpoint'), keys
//   })
//     .then((response) => {
//       console.log('data sent', response)
//     })
//     .catch((error) => {
//       console.error('error sending data', error)
//     })
// }
getNoti() {
  const token = localStorage.getItem('token');
  const keys = {
    "auth": localStorage.getItem('authKey'),
    "p256dh": localStorage.getItem('p256dhKey')
  };

  const data = {
    endpoint: localStorage.getItem('endpoint'),
    keys
  };

  const config = {
    headers: { "Authorization": `Bearer ${token}` }
  };

  axios.post('https://pwa.clobug.co.in/api/push_store', data, config)
    .then((response) => {
      console.log('data sent', response);
    })
    .catch((error) => {
      console.error('error sending data', error);
    });
}

  },
};
</script>
<style> .install-popup {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: #fff;
   padding: 20px;
   border: 1px solid #ccc;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 }

 .install-popup-content {
   text-align: center;
 }

 .install-popup button {
   margin: 10px;
   padding: 8px 16px;
   cursor: pointer;
 }
</style>