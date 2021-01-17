import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8pGUbSqoBSn5ju472mJbJ_XkZEj6ltyI",
    authDomain: "grade-monitor-424a1.firebaseapp.com",
    projectId: "grade-monitor-424a1",
    storageBucket: "grade-monitor-424a1.appspot.com",
    messagingSenderId: "430105818915",
    appId: "1:430105818915:web:8de01224017a4dfda83e96",
    measurementId: "G-EQ1J7ZRLQB"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
