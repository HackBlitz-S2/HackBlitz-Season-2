import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCkVKh0tOzs21LqpNenFxbatse97ab2E0Y",
    authDomain: "jit-hackethon.firebaseapp.com",
    projectId: "jit-hackethon",
    storageBucket: "jit-hackethon.appspot.com",
    messagingSenderId: "118286498718996900416",
    appId: "1:118286498718996900416:web:AIzaSyCkVKh0tOzs21LqpNenFxbatse97ab2E0Y",
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, doc, setDoc, getDoc };
