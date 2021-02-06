import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import UserClasses from './components/UserClasses.js';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyBAU-YOiXDHIB8SE8Kxga2s0rP5HqIW1Dw",
//   authDomain: "grade-teller.firebaseapp.com",
//   projectId: "grade-teller",
//   storageBucket: "grade-teller.appspot.com",
//   messagingSenderId: "635569088479",
//   appId: "1:635569088479:web:9e18fedf576d978d45866a",
//   measurementId: "G-SPYMRFR1P4"
// };

// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/classes" component={UserClasses} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
