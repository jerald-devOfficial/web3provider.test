import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { skaleEuropaTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [skaleEuropaTestnet],
    connectors: [
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [skaleEuropaTestnet.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}