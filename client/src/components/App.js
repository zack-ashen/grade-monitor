import './App.css';
import './Blurb.css';
import UserClasses from './UserClasses'
import AuthContext from '../contexts/auth'
import { useState, useEffect } from 'react';
 
export default function App() {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        fetch("/api/auth/", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            token: token
          })
        })
          .then(res => res.json())
          .then(user => setUser(user));

        setLoggedIn(true)
      }
    })
 
    return (
        <div className="App">
          {!loggedIn && <Landing />}
          {loggedIn && 
            <AuthContext.Provider user={user} logout={() => setLoggedIn(false)}>
              <UserClasses />
            </AuthContext.Provider>
          }
        </div>
    );
}
