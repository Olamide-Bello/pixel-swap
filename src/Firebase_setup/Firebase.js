// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCf9E5jCyD62qtdcNbU9Qj6pqOc2ZskRA",
  authDomain: "pixelswap-cd4a6.firebaseapp.com",
  projectId: "pixelswap-cd4a6",
  storageBucket: "pixelswap-cd4a6.appspot.com",
  messagingSenderId: "202315468788",
  appId: "1:202315468788:web:cccefbe665823b2ba833a1",
  measurementId: "G-YMNJ4NPDZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);