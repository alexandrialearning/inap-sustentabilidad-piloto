import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "inap-piloto",
  appId: "1:1000616102403:web:e941e37489c9d2172a5c36",
  storageBucket: "inap-piloto.firebasestorage.app",
  apiKey: "AIzaSyB80Jz3L9T4LgV5uLZ3W5DmPUb6l1Bj3Q0",
  authDomain: "inap-piloto.firebaseapp.com",
  messagingSenderId: "1000616102403",
  measurementId: "G-SNX9TZ26GF",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
