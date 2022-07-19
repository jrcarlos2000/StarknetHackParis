import React from "react";
import Navbar from "./Navbar";
import attendedEvents from "../testData/attended";
import attendedTokens from "../testData/attendedTokens";
import "../style/profile.css";
import "../style/events.css";
import { connect } from "react-redux";
import { openModal } from "../actions";
import AttendanceModal from "../modals/AttendanceModal";
import SuccessModal from "../modals/SuccessModal";

const Profile = (props) => {
  const renderAttendedEvents = attendedEvents.map((event) => (
    <div className="event-container">
      <h2 className="event-header">{event.title}</h2>
      <div className="event-description">{event.description}</div>
      <div className="event-buttons">
        <button
          onClick={() =>
            props.openModal({ type: "attendance", title: event.title })
          }
          className="event-button fund-btn"
        >
          Call Attendance
        </button>
        <button className="event-button attend-btn">Close</button>
      </div>
    </div>
  ));

  const renderAttendedNFTs = attendedTokens.map((event) => (
    <div className="event-container">
      <h2 className="event-header">{event.title}</h2>
      <div className="nft-image">
        <img src={event.image} alt={event.title} width="100px" height="100px" />
      </div>
    </div>
  ));

  return (
    <div>
      {props.openedModal.type === "attendance" && props.openedModal.title && (
        <AttendanceModal title={props.openedModal.title} />
      )}
      {props.openedModal.type === "success" && <SuccessModal title="Success" />}
      <Navbar page="/profile" />
      <h1 className="page-header">Your Profile</h1>
      <div className="page-content">
        <div>
          <h2 className="first-header">Your Events</h2>
          <div className="user-events-container">{renderAttendedEvents}</div>
        </div>
        <div>
          <h2 className="second-header">Events You Attended</h2>
          <div className="user-events-container">{renderAttendedNFTs}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { openedModal: state.openModal };
};
export default connect(mapStateToProps, { openModal })(Profile);
