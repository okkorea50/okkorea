import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    projectId: "okkorea-jobboard-4268a343",
    appId: "1:883686671985:web:78923860ca27f5c3dd3dd0",
    storageBucket: "okkorea-jobboard-4268a343.firebasestorage.app",
    apiKey: "AIzaSyBraO6SJ0fZ9G2n3v2PLFkGdhsmIruv70w",
    authDomain: "okkorea-jobboard-4268a343.firebaseapp.com",
    messagingSenderId: "883686671985"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
