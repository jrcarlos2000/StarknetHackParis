import { Link } from "react-router-dom";
import "../style/navbar.css"

const Navbar = (props) => {

    return(
        <div className="navbar">
            <Link to="/"><div className="logo desktop">Logo</div></Link>
            <div className="navbar-links">
                {props.page === "/create" ? <Link to="/create" ><p className="link-selected navbar-link">Create</p></Link> :  <Link to="/create" ><p className="navbar-link">Create</p></Link>}
                {props.page === "/" ? <Link to="/" ><p className="link-selected navbar-link">Upcoming</p></Link> :  <Link to="/" ><p className="navbar-link">Upcoming</p></Link>}
                {props.page === "/past-events" ? <Link to="/past-events" ><p className="link-selected navbar-link">Past Events</p></Link> :  <Link to="/past-events" ><p className="navbar-link">Past Events</p></Link>}
                {props.page === "/checkin" ? <Link to="/checkin" ><p className="link-selected navbar-link">Checkin</p></Link> :  <Link to="/checkin" ><p className="navbar-link">Checkin</p></Link>} 
                {props.page === "/profile" ? <Link to="/profile"><p className="link-selected navbar-link">Profile</p></Link> :  <Link to="/profile" ><p className="navbar-link">Profile</p></Link>}
            </div>
        </div>
    )
}

export default Navbar;