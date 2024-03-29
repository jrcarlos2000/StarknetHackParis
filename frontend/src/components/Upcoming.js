import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../actions";
import "../style/events.css";
import Navbar from "./Navbar";
import FundModal from "../modals/FundModal";
import SuccessModal from "../modals/SuccessModal";
import StakeModal from "../modals/StakeModal";
import upcoming from "../testData/upcoming";
import ConnectWallet from "./Wallet/Connect";

const Upcoming = (props) => {
  const navigate = useNavigate();

  const attendEvent = () => {
    navigate("/profile");
  };

  const renderUpcomingEvents = () => {
    const events = upcoming.map((event) => {
      return (
        <div className="event-container">
          <a className="event-header" href={event.link}>{event.title}</a>
          <div className="event-description">{event.description}</div>
          <div className="event-buttons">
            <button
              onClick={() =>
                props.openModal({ type: "fund", title: event.title })
              }
              className="event-button fund-btn"
            >
              Fund
            </button>
            <button
              onClick={() =>
                props.openModal({ type: "stake", title: event.title })
              }
              className="event-button attend-btn"
            >
              Attend
            </button>
          </div>
        </div>
      );
    });
    return <div className="events-container">{events}</div>;
  };

  return (
    <div className="upcoming-page">
      <Navbar page="/upcoming" />
      <ConnectWallet></ConnectWallet>
      {props.openedModal.type === "fund" && props.openedModal.title && (
        <FundModal title={props.openedModal.title} />
      )}
      {props.openedModal.type === "stake" && props.openedModal.title && (
        <StakeModal title={props.openedModal.title} />
      )}
      {props.openedModal.type === "success" && <SuccessModal title="Success" />}
      <h1 className="page-header">Upcoming Events</h1>
      <div className="page-content">{renderUpcomingEvents()}</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { openedModal: state.openModal };
};
export default connect(mapStateToProps, { openModal })(Upcoming);
