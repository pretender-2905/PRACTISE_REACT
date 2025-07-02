// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp3_vucD8V1RaFJl1TomR8DDvf8BJCOeg",
  authDomain: "ecommercereact-e0dad.firebaseapp.com",
  projectId: "ecommercereact-e0dad",
  storageBucket: "ecommercereact-e0dad.firebasestorage.app",
  messagingSenderId: "154329727923",
  appId: "1:154329727923:web:c51a89e10a09328be1c1c6",
  measurementId: "G-M2D6L22GVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export{

  app,
  auth,
}