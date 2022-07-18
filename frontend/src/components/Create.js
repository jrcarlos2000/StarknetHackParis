import React, { useState } from "react";
import Navbar from "./Navbar";
import "../style/create.css";
import { Web3Storage } from "web3.storage";

const Create = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [eventName, setEventName] = useState("");
  const [notion, setNotion] = useState("");
  const [checkboxSelected, setCheckboxSelected] = useState(false);

  const client = new Web3Storage({ token: process.env.REACT_APP_API_TOKEN });

  const createEvent = async (event) => {
    event.preventDefault();
    const eventData = {
      telegram: telegram,
      discord: discord,
      twitter: twitter,
      eventName: eventName,
      notion: notion,
      checkboxSelected: checkboxSelected,
    };
    const blob = new Blob([JSON.stringify(eventData)], {
      type: "application/json",
    });

    const file = [new File([blob], "event.json")];
    const cid = await client.put(file);
    console.log("stored files with cid:", cid);

    const data = await fetch(cid + ".ipfs.dweb.link");
    console.log("data", data);
  };

  return (
    <div>
      <Navbar page="/create" />
      <div className="page-content">
        <h1 className="page-header">Create New Event</h1>
        <form className="create-form" onSubmit={createEvent}>
          <div className="first-col">
            <div className="input-container">
              <label className="label">Your Telegram</label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="input-container">
              <label className="label">Your Discord</label>
              <input
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="input-container">
              <label className="label">Your Twitter handle</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="input-container">
              <label className="label">Event name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          <div className="second-col">
            <div className="input-container">
              <label className="label">Notion proposal link</label>
              <input
                type="text"
                value={notion}
                onChange={(e) => setNotion(e.target.value)}
                className="input-field"
              />
              <a className="how-to-link">How to write a proposal?</a>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                value={checkboxSelected}
                onChange={(e) => setCheckboxSelected(!checkboxSelected)}
                className=" checkbox"
              />
              <label className="label-checkbox">
                I’ve submitted a right proposal format
              </label>
            </div>
            <input
              type="submit"
              className="create-btn"
              placeholder="Create"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
