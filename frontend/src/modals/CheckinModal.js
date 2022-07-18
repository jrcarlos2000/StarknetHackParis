import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openModal } from "../actions";
import {connect} from "react-redux";
import "../style/modals.css"

const CheckinModal = (props) => {

    const [code, setCode] = useState("");
    const [password, setPassword] = useState("")
    

    const navigate = useNavigate();

    const submitCodeAndPassword = (e) => {
        e.preventDefault();
        console.log(code, password)
        props.openModal({"type": "success", "title": "Success"});
    }

    return(
        <div className="modal-dim" onClick={() => document.location.reload()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal-title">{props.title}</h1>
                <form className="checkin-form" onSubmit={submitCodeAndPassword}>
                <div className="input-container checkin-input-container" id="modal-input">
                        <label className="label modal-label">Code</label>
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="input-field checkin-input"/>
                </div>
                <div className="input-container checkin-input-container" id="modal-input">
                        <label className="label modal-label">Password</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field checkin-input"/>
                </div>
                    <input type="submit" value="Check in" className="checkin-modal-btn"></input>
                </form>
            </div>
        </div>
    )
}

export default connect(null, {openModal})(CheckinModal);