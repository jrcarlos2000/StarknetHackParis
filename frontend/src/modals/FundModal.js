import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openModal } from "../actions";
import {connect} from "react-redux";
import "../style/modals.css"

const FundModal = (props) => {

    const [fundValue, setFundValue] = useState(0);

    const navigate = useNavigate();

    const fund = (e) => {
        e.preventDefault();
        console.log(fundValue);
        props.openModal({"type": "success", "title": "Success"});
    }

    return(
        <div className="modal-dim" onClick={() => document.location.reload()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal-title">{props.title}</h1>
                <form className="modal-form" onSubmit={fund}>
                <div className="input-container" id="modal-input">
                        <label className="label modal-label">Amount</label>
                        <input type="number" min={0} value={fundValue} onChange={(e) => setFundValue(e.target.value)} className="input-field modal-input"/>
                </div>
                    <input type="submit" value="Fund" className="fund-modal-btn"></input>
                </form>
            </div>
        </div>
    )
}

export default connect(null, {openModal})(FundModal);