import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBEJ3ZD7gNzbb16xIBIT8_aivLgqTYglZ4",
  authDomain: "bilgisharita-61db6.firebaseapp.com",
  projectId: "bilgisharita-61db6",
  storageBucket: "bilgisharita-61db6.appspot.com",
  messagingSenderId: "712508780150",
  appId: "1:712508780150:web:23f2976bf9f86379563957",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export const db = getFirestore(app);
export { collection, addDoc };
