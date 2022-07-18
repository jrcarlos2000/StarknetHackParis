import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import { openModal } from "../actions";
import "../style/modals.css"

const SuccessModal = (props) => {

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate("/profile");
        props.openModal({"title": " ", "type": " "});

    }
    return(
        <div className="modal-dim" onClick={() => document.location.reload()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal-title">{props.title}</h1>
                <div className="modal-image-container">
                    <div className="modal-image"></div>
                </div>
                <button onClick={navigateToProfile} className="fund-modal-btn" id="success-profile-btn">View profile</button>
            </div>
        </div>
    )
}

export default connect(null, {openModal})(SuccessModal);