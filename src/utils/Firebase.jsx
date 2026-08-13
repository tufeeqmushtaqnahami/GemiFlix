// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFNhQUOhOrNiYY958FcpEhuyYXfc-4V9U",
  authDomain: "netflixgpt-43756.firebaseapp.com",
  projectId: "netflixgpt-43756",
  storageBucket: "netflixgpt-43756.firebasestorage.app",
  messagingSenderId: "52651598610",
  appId: "1:52651598610:web:1e3c6188c2b2637d0a49cb",
  measurementId: "G-PNJ46977LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const db = getFirestore(app);