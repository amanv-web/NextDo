import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
    signInAnonymously,

  signOut
  
} from "firebase/auth";
const FirebaseContext = createContext(null);

import { getFirestore } from "firebase/firestore";
export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyAq5wpz2IALznqNUyY-ndq9dMFX8r3badc",
  authDomain: "taskly-2634d.firebaseapp.com",
  projectId: "taskly-2634d",
  storageBucket: "taskly-2634d.firebasestorage.app",
  messagingSenderId: "697562166674",
  appId: "1:697562166674:web:9b924217a64001be527d4b",
  measurementId: "G-V9XGHZ7G8M",
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

 

export { db }; 
export const FirebaseProvider = (props) => {
  const googleProvider = new GoogleAuthProvider();
  const signupUserWithEmailAndPassword = (email, password ,displayName) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password ,displayName);
  const signIn = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  const logout = () => signOut(firebaseAuth);
 const guestLogin = async () => {
    try {
      await signInAnonymously(firebaseAuth);
    } catch (error) {
      console.error("Guest login error:", error.message);
    }
  };

  const [user, setUser] = useState(null);
  const isLoggedIn = user ? true : false;
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {

        setUser(user);
      }

    else
      setUser(null);
    });
  }, []);
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signIn,
        signInWithGoogle,
        isLoggedIn,
        logout,
        user,
        useFirebase,
        guestLogin
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
