// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1B3I-SBH4qsT6NA9qqLzJMTwDGl32Zh8",
  authDomain: "city-hospital-admin.firebaseapp.com",
  projectId: "city-hospital-admin",
  storageBucket: "city-hospital-admin.appspot.com",
  messagingSenderId: "322715294844",
  appId: "1:322715294844:web:dd5ae310ef64f30534bdf9",
  measurementId: "G-M3647DTH1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);