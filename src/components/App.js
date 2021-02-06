import './App.css';
import './Blurb.css';
import Login from './Login.js';
import { useState, useEffect } from 'react';

export default function App() {
    const width = useWindowSize().width;
    console.log(width);
    return (
        <div className="App">
            {/* Desktop */}
            {width > 450 && <>
            <h1 className="blurbHeader">Grade Monitor</h1>
            <div className="blurb signInBlurb">
                <p className="blurb-text signInBlurbText">Welcome to Grade Monitor. Enter your classes weighting and your assignments to dynamically see your current grade in the class and save it. You can come back throughout the semester to update your grades and see your current standing.</p>
                <Login />
            </div>
            </>}

            {/* Mobile */}
            {width <= 450 && <>
            <div className="blurb signInBlurb">
                <h1 className="blurbHeader">Grade Monitor</h1>
                <p className="blurb-text signInBlurbText">Login to start tracking your grades.</p>
            </div>
            <Login />
            </>}

        </div>
    );
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
  
    return windowSize;
  }