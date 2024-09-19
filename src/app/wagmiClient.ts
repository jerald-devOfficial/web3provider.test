import { createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { defineChain } from 'viem';

// Define the Skale Europa Testnet chain
const skaleEuropaTestnet = defineChain({
  id: 1444673419, // Skale Europa Testnet chain ID
  name: 'Skale Europa Testnet',
  network: 'skale-europa-testnet',
  nativeCurrency: {
    name: 'SKALE',
    symbol: 'SKL',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.europa.skale.network'] }, // RPC URL
  },
  blockExplorers: {
    default: { name: 'Skale Explorer', url: 'https://explorer.skale.network' }, // Block explorer URL
  },
});

// Configure the chains
const { chains, provider } = configureChains([skaleEuropaTestnet], [publicProvider()]);

// Create the Wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  provider,
});