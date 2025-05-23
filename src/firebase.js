// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnOvaNONK6xqfpaqwe8S22-NR4tCVqmqk",
  authDomain: "team-project-onboarding.firebaseapp.com",
  projectId: "team-project-onboarding",
  storageBucket: "team-project-onboarding.firebasestorage.app",
  messagingSenderId: "641788183294",
  appId: "1:641788183294:web:dcb883c9a1089045e6dbaf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
export { db };