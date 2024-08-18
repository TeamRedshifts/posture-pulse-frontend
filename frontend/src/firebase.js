// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/app';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  
const storage = firebase.storage();
const storageRef = storage.ref();
const modelRef = storageRef.child('test_model.json');