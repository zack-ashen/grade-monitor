import React from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Login from "./Login";

const clientId= '635569088479-k8bfdrqmsmaevd76n3sdsfnqfsnc4kqh.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('Logout made successfully.');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;