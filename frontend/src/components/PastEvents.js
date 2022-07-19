import React from "react"
import Navbar from "./Navbar";
import upcoming from "../testData/upcoming";
import ConnectWallet from "./Wallet/Connect";
import "../style/events.css"

const PastEvents = () => {

    const shareOnTwitter = () =>  {
        console.log("share");
    }

    const renderEvents = (props) => {
        const events = upcoming.map((event) => {
            return(
                <div className="event-container">
                    <a className="event-header" href={event.link}>{event.title}</a>
                    <div className="event-description">
                        {event.description} 
                    </div>
                    <button onClick={shareOnTwitter} className="share-on-twitter"></button>
                </div>
            )
        })
        return(
            <div className="events-container">
                {events}
            </div>
        )
    }

    return(
        <div>
            <Navbar page="/past-events" />
            <ConnectWallet></ConnectWallet>
            <h1 className="page-header">Explore Past Events</h1>
            <div className="page-content">
                {renderEvents()}
            </div>
        </div>
    )
}

export default PastEvents;