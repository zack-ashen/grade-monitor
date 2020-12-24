import React from "react";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";

const clientId= '635569088479-k8bfdrqmsmaevd76n3sdsfnqfsnc4kqh.apps.googleusercontent.com';

function Logout() {
    let history = useHistory();

    const onSuccess = () => {
        history.push('/');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSuccess}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} id="sign_out">Sign Out</button>
                )}
            />
        </div>
    );
}

export default Logout;