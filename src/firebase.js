// Import the necessary functions from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged and other functions from Firebase
import { useState, useEffect } from 'react'; // Import hooks from React

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAumyXCu9A3J195FZyFo_-x1imbJ2IQOHc",
    authDomain: "blitzschlag-25.firebaseapp.com",
    databaseURL: "https://blitzschlag-25-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "blitzschlag-25",
    storageBucket: "blitzschlag-25.firebasestorage.app",
    messagingSenderId: "315737505564",
    appId: "1:315737505564:web:d6853a58cc9107b48284d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Custom hook to check if the user is authenticated
export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the user based on the authentication state
        });

        return () => unsubscribe(); // Cleanup the listener on component unmount
    }, []); // Empty dependency array to run once when the component mounts

    return user; // Return the user object
};
