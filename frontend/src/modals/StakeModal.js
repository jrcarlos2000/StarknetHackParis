import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openModal } from "../actions";
import { connect } from "react-redux";
import "../style/modals.css";

const StakeModal = (props) => {
  const [fundValue, setFundValue] = useState(0);
  const navigate = useNavigate();

  const fund = (e) => {
    e.preventDefault();
    props.openModal({"type": "success", "title": "Success"});
    console.log(fundValue);
  };

  return (
    <div className="modal-dim" onClick={() => document.location.reload()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">{props.title}</h1>
        <div className="modal-description">Stake to secure your spot!</div>
        <form className="modal-form" onSubmit={fund}>
          <div className="input-container stake-input" id="modal-input">
            <label className="label modal-label">Amount</label>
            <input
              type="number"
              min={0}
              value={fundValue}
              onChange={(e) => setFundValue(e.target.value)}
              className="input-field modal-input"
            />
          </div>
          <input type="submit" value="Stake" className="fund-modal-btn"></input>
        </form>
      </div>
    </div>
  );
};

export default connect(null, {openModal})(StakeModal);
