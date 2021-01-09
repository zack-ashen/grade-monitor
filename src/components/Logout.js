import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { useHistory } from "react-router-dom";

import "./Button.css";

function Logout(props) {
    let history = useHistory();

    const logout = () => firebase.auth().signOut().then(function() {
        console.log("Logged Out!");
        history.push("/");
      }).catch(function(error) {
        // An error happened.
      });

    return (
        <button onClick={logout} id="sign_out">{props.text}</button>
    );
}

export default Logout;