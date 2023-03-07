// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCB_pq8MBkaB9WEoRai2FxZTeuU5XKOmI4",
  authDomain: "ingresy-ab377.firebaseapp.com",
  projectId: "ingresy-ab377",
  storageBucket: "ingresy-ab377.appspot.com",
  messagingSenderId: "1014453367068",
  appId: "1:1014453367068:web:1357b894ab74f7b0910ad9",
  measurementId: "G-X0J90WKQYV"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth()