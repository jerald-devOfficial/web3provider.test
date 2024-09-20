'use client'

import { useAccount, useBalance, useBlockNumber, useChainId, useConnect, useDisconnect, Connector } from 'wagmi';
import { formatEther } from 'viem';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: isLoadingBalance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [hydrated, setHydrated] = useState(false);

  const uniqueConnectors = useMemo(() => {
    if (!connectors || connectors.length === 0) return [];
    const seen = new Set();
    return connectors.filter((connector) => {
      if (seen.has(connector.name)) {
        return false;
      }
      seen.add(connector.name);
      return true;
    });
  }, [connectors]);

  const handleConnect = async (connector:Connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">web3provider.test</h1>
        <p className="text-lg">Your gateway to the decentralized world.</p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!isConnected ? (
          <>
            <h2 className="text-2xl">Connect Your Wallet</h2>
            {uniqueConnectors.length > 0 ? (
              <div className="flex gap-4">
                {uniqueConnectors.map((connector) => (
                  <Suspense key={connector.id} fallback={<Skeleton className="w-36 h-10 bg-blue-600" />}>
                    <button
                      onClick={() => handleConnect(connector)}
                      className="mt-2 p-2 bg-blue-600 text-white rounded"
                    >
                      Connect with {connector.name}
                    </button>
                  </Suspense>
                ))}
              </div>
            ) : (
              <p>No connectors available</p>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl">Account Information</h2>
            <p>Address: {address || 'Not connected'}</p>
            <p>Balance: {isLoadingBalance ? 'Loading...' : balanceData ? `${formatEther(balanceData.value)} ETH` : 'No balance data'}</p>
            <p>Current Block Number: {blockNumber?.toString() || 'Loading...'}</p>
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
          href="https://github.com/jerald-devOfficial/web3provider.testt"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}