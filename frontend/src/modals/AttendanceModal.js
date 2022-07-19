import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openModal } from "../actions";
import { connect } from "react-redux";
import "../style/modals.css";

const AttendanceModal = (props) => {
  const [password, setPassword] = useState(0);

  const save = (e) => {
    e.preventDefault();
    props.openModal({"type": "success", "title": "Success"});
    console.log(password);
  };

  return (
    <div className="modal-dim" onClick={() => document.location.reload()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">{props.title}</h1>
        <div className="modal-description">Set your checki-in password</div>
        <form className="modal-form" onSubmit={save}>
          <div className="input-container stake-input" id="modal-input">
            <label className="label modal-label">Password</label>
            <input
              type="text"
              min={0}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field modal-input"
            />
          </div>
          <input type="submit" value="Save" className="fund-modal-btn"></input>
        </form>
      </div>
    </div>
  );
};

export default connect(null, {openModal})(AttendanceModal);
