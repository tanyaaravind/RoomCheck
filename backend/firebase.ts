// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCisTwyS_lP-HhRK8GVyzfDo5ehq3uhGJg",
  authDomain: "roomcheckusers.firebaseapp.com",
  projectId: "roomcheckusers",
  storageBucket: "roomcheckusers.appspot.com",
  messagingSenderId: "456651936811",
  appId: "1:456651936811:web:65f2cd2e9de6477ed0066e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);