import React from "react";
import { GoogleLogin } from "react-google-login";

import { refreshTokenSetup } from '../utils/refreshToken';

const clientId= '635569088479-k8bfdrqmsmaevd76n3sdsfnqfsnc4kqh.apps.googleusercontent.com';

function Login() {
    const onSuccess= (res) => {
        console.log("[Login Success] currentUser:", res.profileObj);

        refreshTokenSetup(res);
    };

    const onFailure= (res) => {
        console.log("[Login Failed] res:", res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign In"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;