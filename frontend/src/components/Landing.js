import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LandingCalendar } from '../illustrations/LandingCalendar.svg';
import "../style/landing.css"
const Landing = () => {
    const navigate = useNavigate();
    return(
        <div className="landing-page">
            <div className="background"></div>
            <button onClick={() => navigate("/upcoming")} className="launch-btn">LAUNCH APP</button>
            <div className="landing-logo">STARCOM</div>
            <div className="landing-container">
                <div className="landing-header">ALL YOUR STARKNET EVENTS IN ONE PLACE.</div>
                <button onClick={() => navigate("/upcoming")} className="launch-main-btn">LAUNCH APP</button>
            </div>
        </div>
    )
}
export default Landing;