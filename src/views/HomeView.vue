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

    <HelloWorld msg="Welcome to Your Pwa Login Test" />
    <p>Version 1.2.1</p>

    <router-link to="/login" class="btn btn-primary">Login</router-link>

    {{ users }}

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
      headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
        this.users = response.data
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
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