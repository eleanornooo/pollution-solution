
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js"; 
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail  // Add this
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCDZaPNh3UkGg1PJFlvgrsDOcmCpLuGCD8",
  authDomain: "pollution-solution-e2d44.firebaseapp.com",
  projectId: "pollution-solution-e2d44",
  storageBucket: "pollution-solution-e2d44.firebasestorage.app",
  messagingSenderId: "150812447205",
  appId: "1:150812447205:web:25b08d6273c86dc3a95f0c",
  measurementId: "G-WC824GJRDG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export the auth and Firestore instances for use in other modules
export { auth, db, onAuthStateChanged };

// Email/Password Sign In
export async function emailSignIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Email/Password Sign Up (and create a basic user document in Firestore)
export async function emailSignUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create a user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      createdAt: new Date()
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Google Sign-In
export async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Optionally, you can create/update the user document in Firestore here
    return result.user;
  } catch (error) {
    throw error;
  }
}


// Password Reset
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}

// Sign Out
export async function userSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
  
}


// Add to imports at top
