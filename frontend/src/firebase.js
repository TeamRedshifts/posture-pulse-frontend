// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAal3YV80Y5X7pv5oeVyox2ahCu6nDirJo",
  authDomain: "my-db-6a8e5.firebaseapp.com",
  databaseURL: "https://my-db-6a8e5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-db-6a8e5",
  storageBucket: "my-db-6a8e5.appspot.com",
  messagingSenderId: "670415538010",
  appId: "1:670415538010:web:4a424d581b2f8281c99563",
  measurementId: "G-2R1PB6BVDQ"
};

  
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);