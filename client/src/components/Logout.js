import React from 'react';
import "./Button.css";

function Logout(props) {
    const logout = () => {
      /* global google */
      google.accounts.id.disableAutoSelect();

      localStorage.clear();
    }

    return (
        <button onClick={logout} id="sign_out">{props.text}</button>
    );
}

export default Logout;