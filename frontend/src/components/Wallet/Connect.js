import { useStarknet, useConnectors } from '@starknet-react/core';
import { useState } from 'react';
import "../../style/connect.css"

export default function ConnectWallet() {
  const { account } = useStarknet();
  const { connect, connectors, disconnect } = useConnectors();
  const {connectedAddress, setConnectedAddress} = useState(' ');

  if (account) {
    return (
      <div className='account-details'>
        <p>Account: {account.substring(0,5) + '...' + account.substring(account.length-5)}</p>
        <button className='connect-btn disconnect-btn' onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) =>
        connector.available() ? (
          <button className='connect-btn' key={connector.id()} onClick={() => connect(connector)}>
            Connect {connector.name()}
          </button>
        ) : (
          <p>No connector available!</p>
        )
      )}
    </div>
  );
}
