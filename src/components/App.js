import './App.css';
import './Blurb.css';
import Login from './Login.js';

export default function App() {
  return (
      <div className="App">
          <h1>Grade Book</h1>
          <div className="blurb" id="signin-blurb">
              <p className="blurb-text" id="signin-blurb-text">Welcome to GradeTeller. Enter your classes weighting and your assignments to dynamically see your current grade in the class and save it. You can come back throughout the semester to update your grades and see your current standing.</p>
              <Login />
          </div>
      </div>
  );
}
