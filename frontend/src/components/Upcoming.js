import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../actions";
import "../style/events.css";
import Navbar from "./Navbar";
import FundModal from "../modals/FundModal";
import SuccessModal from "../modals/SuccessModal";
import upcoming from "../testData/upcoming";

const Upcoming = (props) => {

    const navigate = useNavigate();

    const attendEvent = () => {
        navigate("/profile");
    }
    
    const renderUpcomingEvents = () => {
        const events = upcoming.map((event) => {
            return(
                <div className="event-container">
                    <h2 className="event-header">{event.title}</h2>
                    <div className="event-description">
                        {event.description} 
                    </div>
                    <div className="event-buttons">
                        <button onClick={() => props.openModal({"type": "fund", "title": event.title})} className="event-button fund-btn">Fund</button>
                        <button onClick={attendEvent} className="event-button attend-btn">Attend</button>
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
        <div className="upcoming-page">
            <Navbar page="/" />
            {(props.openedModal.type === "fund" && props.openedModal.title) && <FundModal title={props.openedModal.title}/>}
            {props.openedModal.type === "success" && <SuccessModal title="Success" />}
            <h1 className="page-header">Upcoming Events</h1>
            <div className="page-content">
                {renderUpcomingEvents()}
            </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { openedModal: state.openModal };
};
export default connect(mapStateToProps, { openModal })(Upcoming);
