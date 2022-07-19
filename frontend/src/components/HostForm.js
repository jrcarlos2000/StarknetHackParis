import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import "../style/create.css";
import "../style/host.css";
import { create } from "ipfs-http-client";

const url = "https://ipfs.infura.io:5001/api/v0";
const client = create(url);

const HostForm = () => {
  const [telegram, setTelegram] = useState("");
  const [fileName, setFileName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [file, setFile] = useState("");
  const [imageIPFS, setImageIPFS] = useState("");

  const createHost = async (event) => {
    event.preventDefault();
    const hostData = {
      telegram: telegram,
      imageIPFS: imageIPFS,
    };
    console.log("host data: ", hostData);
    const { cid } = await client.add({ content: JSON.stringify(hostData) });
    const url = `https://ipfs.infura.io/ipfs/${cid}`;
    console.log("url:", url);
  };

  const handleChange = async (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    const file = event.target.files[0];
    try {
      const { cid } = await client.add(
        { content: file },
        {
          cidVersion: 1,
          hashAlg: "sha3-224",
        }
      );
      const url = `https://ipfs.infura.io/ipfs/${cid}`;
      console.log("url: ", url);
      setImageIPFS(url);
      setEnabled(true);
    } catch (err) {
      console.error("Error uploading file: ", err);
    }
  };

  const drop = useCallback((node) => {
    if (node !== null) {
      node.addEventListener("dragover", handleDragOver);
      node.addEventListener("drop", handleDrop);
    }
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const { files } = await e.dataTransfer;
    const droppedFile = files[0];
    setFile(droppedFile);
    setFileName(droppedFile.name);
    e.stopPropagation();
  };

  return (
    <div>
      <Navbar page="/become-a-host" />
      <div className="page-content">
        <h1 className="page-header">Become a Host</h1>
        <form className="create-form host-form" onSubmit={createHost}>
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
            <label className="label">Drop an Image</label>
            <div className="dropzone" ref={drop}>
              <div className="dropzone-content">
                {file && <div className="file-img white-img"></div>}
                {!file && <div className="file-img gray-img"></div>}
                {!fileName && <span className="file-title">Upload a file</span>}
                {fileName && <span className="file-title">{fileName}</span>}
                {!fileName && (
                  <input
                    title=""
                    onChange={handleChange}
                    type="file"
                    className="file-input"
                  ></input>
                )}
              </div>
            </div>
          </div>
          {enabled ? (
            <input type="submit" className="create-btn" placeholder="Create" />
          ) : (
            <input
              type="submit"
              className="create-btn"
              placeholder="Create"
              disabled
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default HostForm;
