import React, { useState, useCallback } from "react"
import Navbar from "./Navbar";
import "../style/create.css";
import "../style/host.css"

const HostForm = () => {
    const [telegram, setTelegram] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState('');

    const createHost = (event) => {
        event.preventDefault();
        console.log(telegram, file, fileName)
    }

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const drop = useCallback((node) => {
        if (node !== null) {
            node.addEventListener('dragover', handleDragOver);
            node.addEventListener('drop', handleDrop);
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

    return(
        <div>
            <Navbar page="/become-a-host" />
            <div className="page-content">
                <h1 className="page-header">Become a Host</h1>
                <form className="create-form host-form" onSubmit={createHost}>
                        <div className="input-container">
                            <label className="label">Your Telegram</label>
                            <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="input-field"/>
                        </div>
                        <div className="input-container">
                            <label className="label">Drop an Image</label>
                            <div className="dropzone" ref={drop}>
                                <div className="dropzone-content">
                                    {file && <div className="file-img white-img"></div>}
                                    {!file && <div className="file-img gray-img"></div>}
                                    {!fileName && <span className="file-title">Upload a file</span>}
                                    {fileName && <span className="file-title">{fileName}</span>}
                                    {!fileName && <input title="" onChange={handleChange} type="file" className="file-input"></input>}
                                </div>
                            </div>
                        </div>
                        <input type="submit" className="create-btn" placeholder="Create"></input>

                </form>
            </div>
        </div>
    )
}

export default HostForm;