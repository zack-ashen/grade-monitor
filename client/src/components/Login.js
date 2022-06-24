import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import "./Button.css";

function Login() {
    const handleCallbackResponse = (googleData) => {
        fetch("/api/auth/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: googleData.credential
            })
        });
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
            auto_select: true,
            context: "use"
        });

        google.accounts.id.renderButton(
            document.getElementById("signInButton"),
            { theme: "outline", size: "large"}
        );

    }, [])

    return (
        <button id="signInButton"></button>
    );
}

export default Login;