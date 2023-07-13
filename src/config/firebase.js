// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu1NP3h2YiMLiaTtoT5Lf97ZMaIKLCQCo",
  authDomain: "blog-believemy-2936c.firebaseapp.com",
  databaseURL: "https://blog-believemy-2936c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blog-believemy-2936c",
  storageBucket: "blog-believemy-2936c.appspot.com",
  messagingSenderId: "978595184281",
  appId: "1:978595184281:web:6a9670d029e3e6f8cd8208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;