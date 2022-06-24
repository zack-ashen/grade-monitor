import './Landing.css';
import Login from './Login.js';
import { useWindowSize } from '../utils';

export default function Landing() {
    const width = useWindowSize().width;

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