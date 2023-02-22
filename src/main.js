import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index'
import firebaseConfig from './lib/firebase'
// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Initialize Firebase
 initializeApp(firebaseConfig);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
