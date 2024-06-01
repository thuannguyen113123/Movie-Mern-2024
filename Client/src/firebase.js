// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FireBase_Key,
  authDomain: "mern-movie-2024.firebaseapp.com",
  projectId: "mern-movie-2024",
  storageBucket: "mern-movie-2024.appspot.com",
  messagingSenderId: "231510230380",
  appId: "1:231510230380:web:216240bb83868635889f49",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
