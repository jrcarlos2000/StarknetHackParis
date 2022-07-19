import React, { useState, useCallback, useMemo } from "react";
import {
  useStarknet,
  useStarknetInvoke,
  useStarknetCall,
} from "@starknet-react/core";
import { useVaultContract, useDummyTokenContract } from "../hooks/contracts.ts";
import { toBN } from "starknet/dist/utils/number";
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";
import Navbar from "./Navbar";
import "../style/create.css";
import "../style/host.css";
import { create } from "ipfs-http-client";

const url = "https://ipfs.infura.io:5001/api/v0";
const client = create(url);

const HostForm = () => {
  const [telegram, setTelegram] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [imageIPFS, setImageIPFS] = useState("");
  const { account } = useStarknet();
  const { contract } = useVaultContract();

  const { loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: "register_as_host",
  });

  const onCreateHost = useCallback(
    async (event) => {
      event.preventDefault();
      console.log(telegram, file, fileName);
      const hostData = {
        telegram: telegram,
        imageIPFS: imageIPFS,
      };
      const { cid } = await client.add({ content: JSON.stringify(hostData) });
      const url = `https://ipfs.infura.io/ipfs/${cid}`;
      console.log("url:", url);

      reset();

      console.log("account", account);

      if (account) {
        const message = `Registering host => ${account}`;
        const prefix = "88314279774552";
        const suffix = "91625716336984";

        invoke({
          args: [prefix, suffix],
          metadata: { method: "register_as_host", message },
        });
      }
    },
    [account, invoke, reset]
  );

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

        <form className="create-form host-form" onSubmit={onCreateHost}>
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
                  />
                )}
              </div>
            </div>
          </div>
        </form>

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
        <div>
          <UserDummyBalance></UserDummyBalance>
          {/* <button onClick={onCreateHost}>Create Host</button> */}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

function UserDummyBalance() {
  const { account } = useStarknet();
  const { contract } = useDummyTokenContract();

  const { data, loading, error } = useStarknetCall({
    contract,
    method: "balanceOf",
    args: account ? [account] : undefined,
  });

  const content = useMemo(() => {
    if (loading || !data?.length) {
      return <div>Loading Dummy balance</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const balance = uint256ToBN(data[0]);
    return <div>{balance.toString(10)}</div>;
  }, [data, loading, error]);

  return (
    <div>
      <h2>User dummy balance</h2>
      {content}
    </div>
  );
}

export default HostForm;
