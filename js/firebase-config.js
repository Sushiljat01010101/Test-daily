// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

// Dynamic Firebase configuration - will be loaded from settings
function getFirebaseConfig() {
    // Try to get settings from localStorage first
    const stored = localStorage.getItem('app_settings');
    if (stored) {
        const settings = JSON.parse(stored);
        if (settings.firebase && settings.firebase.apiKey) {
            return settings.firebase;
        }
    }
    
    // Return empty config if no settings found
    return {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
    };
}

// Get Firebase configuration
const firebaseConfig = getFirebaseConfig();

// Initialize Firebase only if config is available
let app, auth, db, functions;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        functions = getFunctions(app);
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
} else {
    console.warn('Firebase configuration not found. Please configure Firebase settings.');
}

// Export Firebase services
export { auth, db, functions };
export default app;
