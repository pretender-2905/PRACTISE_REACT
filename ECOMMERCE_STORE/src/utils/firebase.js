// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0XWCQLtDuL-e9RyT0RhiGvKx0WrNEEM0",
  authDomain: "ecommerce-store-9a372.firebaseapp.com",
  projectId: "ecommerce-store-9a372",
  storageBucket: "ecommerce-store-9a372.firebasestorage.app",
  messagingSenderId: "524003539351",
  appId: "1:524003539351:web:423d662bf550f7556eacd2",
  measurementId: "G-B1JVK0NFS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);