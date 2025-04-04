"use client";

import { auth, provider, db, doc, setDoc, getDoc } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      
      console.log("User signed in:", user);
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      localStorage.setItem("user", user.uid);
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("photo", user.photoURL);
  
      if (!userSnap.exists()) {
        console.log("User does not exist. Creating document...");
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email:  user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
        console.log("User saved in Firestore successfully!");
    
   

      } else {
        console.log("User already exists in Firestore.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

    router.push("/dashboard")
  };
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.clear();

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-4 text-center">
      {user ? (
        <div>
          <img src={user.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full mx-auto" />
          <h3>Welcome, {user.displayName}!</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
          <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sign in with Google
        </button>
      )}


    </div>
  );
}
