import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openModal } from "../actions";
import {connect} from "react-redux";
import "../style/modals.css"

const FundModal = (props) => {

    const [fundValue, setFundValue] = useState(0);

    const navigate = useNavigate();

    return(
        <div className="modal-dim" onClick={() => document.location.reload()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal-title">Success</h1>
                <div className="modal-image-container">
                    <div className="modal-image"></div>
                </div>
            </div>
        </div>
    )
}

export default FundModal;