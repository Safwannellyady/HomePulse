import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project config
// You can copy this from the Firebase Console Project Settings
const firebaseConfig = {
    apiKey: "AIzaSyBn_doMAa3KCVkGotyD9P6TzD1Lgq3exyo",
    authDomain: "ms-world-523cb.firebaseapp.com",
    projectId: "ms-world-523cb",
    storageBucket: "ms-world-523cb.firebasestorage.app",
    messagingSenderId: "761153415903",
    appId: "1:761153415903:web:3d12c7386faaaf3407176a",
    measurementId: "G-NE7G5MWQLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
