import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import UserClasses from './components/UserClasses.js';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/classes" component={UserClasses} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
