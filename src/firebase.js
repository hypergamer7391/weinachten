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
  apiKey: "AIzaSyA6Bbfy3-c-cfnA0_Ccguzio25wIP56OBI",
  authDomain: "coding-im-advent.firebaseapp.com",
  projectId: "coding-im-advent",
  storageBucket: "coding-im-advent.firebasestorage.app",
  messagingSenderId: "641322089819",
  appId: "1:641322089819:web:87bd24e7dd95b6b88cee7e",
  measurementId: "G-NNLW5E0KVV"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };