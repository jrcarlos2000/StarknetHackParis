import React from "react"
import { Router, Route, Switch} from 'react-router-dom';

import history from "../history";
import Checkin from "./Checkin";
import Create from "./Create";
import PastEvents from "./PastEvents";
import Profile from "./Profile";
import Upcoming from "./Upcoming";

const App = () => {
    return(
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Upcoming}/>
                <Route exact path="/create" component={Create}/>
                <Route exact path="/past-events" component={PastEvents}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/checkin" component={Checkin}/>
            </Switch>
        </Router>
    )
}

export default App;