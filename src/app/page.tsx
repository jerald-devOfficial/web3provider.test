'use client'

import { useAccount, useBalance, useBlockNumber, useChainId, useConnect, useDisconnect } from 'wagmi';
import { formatEther } from 'viem';
import { useMemo } from 'react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const uniqueConnectors = useMemo(() => {
    const seen = new Set();
    return connectors.filter((connector) => {
      if (seen.has(connector.name)) {
        return false;
      }
      seen.add(connector.name);
      return true;
    });
  }, [connectors]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">web3provider.test</h1>
        <p className="text-lg">Your gateway to the decentralized world.</p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!isConnected ? (
          <div>
            <h2 className="text-2xl">Connect Your Wallet</h2>
            {uniqueConnectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="mt-2 p-2 bg-blue-600 text-white rounded"
              >
                Connect with {connector.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl">Account Information</h2>
            <p>Address: {address}</p>
            <p>Balance: {balanceData ? `${formatEther(balanceData.value)} ETH` : 'Loading...'}</p>
            <p>Current Block Number: {blockNumber?.toString()}</p>
            <p>Chain ID: {chainId}</p>
            <button onClick={() => disconnect()} className="mt-2 p-2 bg-red-600 text-white rounded">
              Disconnect
            </button>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm">
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://docs.web3provider.test"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://community.web3provider.test"
          target="_blank"
          rel="noopener noreferrer"
        >
          Community
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://support.web3provider.test"
          target="_blank"
          rel="noopener noreferrer"
        >
          Support
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://github.com/web3provider/test"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}