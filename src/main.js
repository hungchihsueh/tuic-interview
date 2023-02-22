import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index'

// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	databaseURL: import.meta.env.VITE_FIREBASE_DBURL,
};

// Initialize Firebase
 initializeApp(firebaseConfig);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
