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
  apiKey: "AIzaSyCldtYR79m7Qlk9XYrNdRwG_G91L9hvL2U",
  authDomain: "city-multispeciality-hospital.firebaseapp.com",
  projectId: "city-multispeciality-hospital",
  storageBucket: "city-multispeciality-hospital.appspot.com",
  messagingSenderId: "175298610514",
  appId: "1:175298610514:web:57a63d0b89903cc415e68b",
  measurementId: "G-BF8H0MF778"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);