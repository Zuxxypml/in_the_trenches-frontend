import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import "firebase/firestore";
import "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5j0ZxLik5phfD6rqjTQGN_Ea39dN6ud4",
  authDomain: "memories-357616.firebaseapp.com",
  projectId: "memories-357616",
  storageBucket: "memories-357616.appspot.com",
  messagingSenderId: "958667484320",
  appId: "1:958667484320:web:7c3f47d197c7c58c70adc5",
  measurementId: "G-FLDM9BPGH4",
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};
const createUserProfileDocument = async (userAuth, additionalData) => {
  const createdAt = new Date();
  const { displayName } = userAuth;
  const { email } = userAuth;
  const { uid } = userAuth;
  if (!userAuth) return;
  const userRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userRef);
  console.log(userSnap);
  if (!userSnap.exists()) {
    try {
      await setDoc(doc(db, "users", `${userAuth.uid}`), {
        displayName,
        email,
        uid,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return userSnap;
};

export { auth, signInWithGoogle, createUserProfileDocument };
export default initializeApp;
