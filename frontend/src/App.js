import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Checkin from "./components/Checkin";
import Profile from "./components/Profile";
import PastEvents from "./components/PastEvents";
import Create from "./components/Create";
import Upcoming from "./components/Upcoming"

import "./style/main.css"
import Navbar from "./components/Navbar";
import HostForm from "./components/HostForm";
import Landing from "./components/Landing";
const App = () => {
    return(
        <Router>
        <Routes>
                <Route exact path="/" element={<Landing />}/>
                <Route exact path="/upcoming" element={<Upcoming />}/>
                <Route exact path="/create" element={<Create />}/>
                <Route exact path="/past-events" element={<PastEvents />}/>
                <Route exact path="/profile" element={<Profile />}/>
                <Route exact path="/checkin" element={<Checkin />}/>
                <Route exact path="/become-a-host" element={<HostForm/>}/>
        </Routes>
    </Router>
    )
}

export default App;