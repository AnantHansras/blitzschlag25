import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAumyXCu9A3J195FZyFo_-x1imbJ2IQOHc",
    authDomain: "blitzschlag-25.firebaseapp.com",
    databaseURL: "https://blitzschlag-25-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "blitzschlag-25",
    storageBucket: "blitzschlag-25.firebasestorage.app",
    messagingSenderId: "315737505564",
    appId: "1:315737505564:web:d6853a58cc9107b48284d9"
};


const app = initializeApp(firebaseConfig);

export default app;
