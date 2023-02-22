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

export default firebaseConfig