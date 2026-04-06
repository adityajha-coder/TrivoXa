// js/utils/firebase-init.js

const firebaseConfig = {
    apiKey: "AIzaSyDmUXb1KOOJtomzZdHc4mOoSXlT-7RiPyw",
    authDomain: "vertex-devkit.firebaseapp.com",
    projectId: "vertex-devkit",
    storageBucket: "vertex-devkit.firebasestorage.app",
    messagingSenderId: "498533276358",
    appId: "1:498533276358:web:5dd7fac204050a6c0755c7",
    measurementId: "G-XF1D53BYTR"
};

// Initialize Firebase using the Compat SDK (Best for projects without a bundler)
firebase.initializeApp(firebaseConfig);

// Create global references for the rest of the application
window.db = firebase.firestore();
window.auth = firebase.auth();

console.log("🔥 Vertex: Firebase Initialized and Connected to Cloud!");
