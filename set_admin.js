import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    projectId: "okkorea-jobboard-4268a343",
    appId: "1:883686671985:web:78923860ca27f5c3dd3dd0",
    storageBucket: "okkorea-jobboard-4268a343.firebasestorage.app",
    apiKey: "AIzaSyBraO6SJ0fZ9G2n3v2PLFkGdhsmIruv70w",
    authDomain: "okkorea-jobboard-4268a343.firebaseapp.com",
    messagingSenderId: "883686671985"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uid = "holS7n4XwDgPxcJni8dh6e4OHb33";

async function setAdmin() {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            role: 'admin'
        });
        console.log("Successfully updated user role to admin");
        process.exit(0);
    } catch (error) {
        console.error("Error updating user role:", error);
        process.exit(1);
    }
}

setAdmin();
