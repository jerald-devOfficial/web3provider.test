import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector, walletConnect  } from 'wagmi/connectors';
import { WalletConnectConnector } from 'wagmi/connectors';

export default function WagmiModal() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <>
          {connectors.map((connector) => (
            <button key={connector.id} onClick={() => connect(connector)}>
              Connect with {connector.name}
            </button>
          ))}
          {/* Add WalletConnect */}
          <button onClick={() => connect(new WalletConnectConnector({ options: { qrcode: true } }))}>
            Connect with WalletConnect
          </button>
        </>
      )}
    </div>
  );
}