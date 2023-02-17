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
	apiKey: "AIzaSyDS6epLRPAi8FC6dqaFyw_cTK1bCA914EU",
	authDomain: "testing-a9924.firebaseapp.com",
	databaseURL:
		"https://testing-a9924-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "testing-a9924",
	storageBucket: "testing-a9924.appspot.com",
	messagingSenderId: "545785958095",
	appId: "1:545785958095:web:b1aaa9bf52df4db52631ba",
	databaseURL:
		"https://testing-a9924-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
 initializeApp(firebaseConfig);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
