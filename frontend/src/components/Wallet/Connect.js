import { useStarknet, useConnectors } from '@starknet-react/core';

export default function ConnectWallet() {
  const { account } = useStarknet();
  const { connect, connectors, disconnect } = useConnectors();

  if (account) {
    return (
      <div>
        <p>Account: {account}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) =>
        connector.available() ? (
          <button key={connector.id()} onClick={() => connect(connector)}>
            Connect {connector.name()}
          </button>
        ) : (
          <p>No connector available!</p>
        )
      )}
    </div>
  );
}
