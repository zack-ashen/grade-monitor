import React from 'react';

import { auth, db, provider } from '../firebase';

import { useHistory } from "react-router-dom";

import "./Button.css";

function Login() {
    let history = useHistory();

    const login = () => auth.signInWithPopup(provider).then(function(result) {
        var user = result.user;
        var docRef = db.collection('users').doc(auth.currentUser.uid);
        docRef.get().then(doc => {
            if (doc.exists) {
                console.log("user already exists");
                return user
            } else {
                db.collection("users").doc(auth.currentUser.uid).set({
                    name: user.displayName
                }).then(function() {
                    console.log("Document successfully written!");
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        })
        
        history.push("/classes");
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        
        console.error(errorCode + errorMessage + email);
    });

    return (
        <button onClick={login} id="sign_in">Login</button>
    );
}

export default Login;