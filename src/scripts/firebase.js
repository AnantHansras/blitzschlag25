import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged and other functions from Firebase
import { useState, useEffect } from 'react'; // Import hooks from React
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    where,
    getDocs,
    updateDoc,
    setDoc
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAumyXCu9A3J195FZyFo_-x1imbJ2IQOHc",
    authDomain: "blitzschlag-25.firebaseapp.com",
    databaseURL: "https://blitzschlag-25-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "blitzschlag-25",
    storageBucket: "blitzschlag-25.appspot.com",
    messagingSenderId: "315737505564",
    appId: "1:315737505564:web:d6853a58cc9107b48284d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Custom hook to monitor authentication state
export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update the user state
        });

        return () => unsubscribe(); // Clean up the listener when the component unmounts
    }, []);

    return user; // Return the current user
};

// Initialize Firestore
const firestore = getFirestore(app);

// Function to add a new document to a collection
export const write = async (path, obj) => {
    try {
        // Create a document reference at the specific path
        const docRef = doc(firestore, path);

        // Set the document data (merge option ensures existing data is not overwritten)
        await setDoc(docRef, obj, { merge: true });

        console.log("Document written with ID: ", docRef.id);
        return docRef; // Return the document reference
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
};

// Function to read a specific document by ID
export const read = async (path) => {
    try {
        const docRef = doc(firestore, path); // Use firestore instance here
        const docSnap = await getDoc(docRef); // Use getDoc to fetch the document

        if (docSnap.exists()) {
            return docSnap.data(); // Return the document data
        } else {
            console.warn(`No document found at path: ${path}`);
            return null; // Explicitly return null
        }
    } catch (error) {
        console.error(`Error reading document at ${path}:`, error);
        throw error;
    }
};

// Function to query documents in a collection
export const getDocByQuery = async (collectionName, field, operator, value) => {
    try {
        const collectionRef = collection(firestore, collectionName);
        const q = query(collectionRef, where(field, operator, value));
        const querySnapshot = await getDocs(q);

        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });

        console.log("Query results: ", results);
        return results;
    } catch (error) {
        console.error("Error querying documents: ", error);
        throw error;
    }
};

// Function to update a document
export const update = async (collectionName, id, obj) => {
    try {
        const docRef = doc(firestore, collectionName, id);
        await updateDoc(docRef, obj);
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
};
