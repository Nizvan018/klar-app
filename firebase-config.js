// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDAC2e7y83gGTiC6hspcmWPWDR5T0t6RMU',
    authDomain: 'klar-app-cfe47.firebaseapp.com',
    projectId: 'klar-app-cfe47',
    storageBucket: 'klar-app-cfe47.appspot.com',
    messagingSenderId: '633006653359',
    appId: '1:633006653359:web:23ee22d35e4a7b8a03795a'
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);