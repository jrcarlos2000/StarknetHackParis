import React from "react"
import Navbar from "./Navbar";
import upcoming from "../testData/upcoming";
import "../style/events.css"
import CheckinModal from "../modals/CheckinModal";
import SuccessModal from "../modals/SuccessModal"
import { openModal } from "../actions";
import { connect } from "react-redux";

const Checkin = (props) => {

    const renderEvents = () => {
        const events = upcoming.map((event) => {
            return(
                <div className="event-container">
                    <h2 className="event-header">{event.title}</h2>
                    <div className="event-description">
                        {event.description} 
                    </div>
                    <div className="checkin-container">
                        <button onClick={() => props.openModal({"type": "checkin", "title": event.title})} className="event-button checkin-btn">Check in</button>
                    </div>
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
            <Navbar page="/checkin" />
            {props.openedModal.type === "checkin" && <CheckinModal title={props.openedModal.title}/>}
            {props.openedModal.type === "success" && <SuccessModal title="Success" />}
            <div className="page-content">
                <h1 className="page-header">Check in</h1>
                {renderEvents()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {openedModal: state.openModal};
}
export default connect(mapStateToProps, {openModal})(Checkin);