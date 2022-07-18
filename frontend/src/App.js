import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Checkin from "./components/Checkin";
import Profile from "./components/Profile";
import PastEvents from "./components/PastEvents";
import Create from "./components/Create";
import Upcoming from "./components/Upcoming"

import "./style/main.css"
import Navbar from "./components/Navbar";
const App = () => {
    return(
        <Router>
        <Routes>
                <Route exact path="/" element={<Upcoming />}/>
                <Route exact path="/create" element={<Create />}/>
                <Route exact path="/past-events" element={<PastEvents />}/>
                <Route exact path="/profile" element={<Profile />}/>
                <Route exact path="/checkin" element={<Checkin />}/>
        </Routes>
    </Router>
    )
}

export default App;