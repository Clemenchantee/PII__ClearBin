// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmEixA53dyEF-BMgno6eiDYHT-et4oNLQ",
  authDomain: "piiclearbin.firebaseapp.com",
  databaseURL: "https://piiclearbin-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "piiclearbin",
  storageBucket: "piiclearbin.appspot.com",
  messagingSenderId: "1002132347875",
  appId: "1:1002132347875:web:ec40cc7eea166855f55ed6",
  measurementId: "G-5H2E3KYQ8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };