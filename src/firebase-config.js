// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT1Bch5TIe19kfA3LqNbf0dFdyuvaDGJU",
  authDomain: "chat-app-75be0.firebaseapp.com",
  projectId: "chat-app-75be0",
  storageBucket: "chat-app-75be0.appspot.com",
  messagingSenderId: "874799850591",
  appId: "1:874799850591:web:9c0c2d083f579c6be1e7ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
