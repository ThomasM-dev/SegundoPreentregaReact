import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1TQnvagFT7IZRu2eolKEc2t5J93LL9Vs",
  authDomain: "react-site-web-ecommerce.firebaseapp.com",
  projectId: "react-site-web-ecommerce",
  storageBucket: "react-site-web-ecommerce.firebasestorage.app",
  messagingSenderId: "29463651514",
  appId: "1:29463651514:web:088fed1f2e2725368b0e83"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)