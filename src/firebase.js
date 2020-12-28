import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAU-YOiXDHIB8SE8Kxga2s0rP5HqIW1Dw",
  authDomain: "grade-teller.firebaseapp.com",
  projectId: "grade-teller",
  storageBucket: "grade-teller.appspot.com",
  messagingSenderId: "635569088479",
  appId: "1:635569088479:web:9e18fedf576d978d45866a",
  measurementId: "G-SPYMRFR1P4"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();