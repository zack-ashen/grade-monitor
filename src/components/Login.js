import React from "react";
import "./Button.css";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

import { refreshTokenSetup } from '../utils/refreshToken';

const clientId= '635569088479-k8bfdrqmsmaevd76n3sdsfnqfsnc4kqh.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(clientId);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
}

function Login() {
    let history = useHistory();

    const onSuccess= (res) => {
        // console.log("[Login Success] currentUser:", res.profileObj);
        refreshTokenSetup(res);
        var id_token= res.getAuthResponse().id_token;
        verify(id_token).catch(console.error);
        history.push("/classes");

    };

    const onFailure= (res) => {
        console.log("[Login Failed] res:", res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} id="sign_in">Sign In</button>
                )}
                buttonText="Sign In"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;