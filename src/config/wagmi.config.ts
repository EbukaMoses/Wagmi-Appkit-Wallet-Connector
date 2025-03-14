import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, lisk, liskSepolia, base, polygon } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

// Ensure that `import.meta.env` is correctly typed (See step below for typing in `vite-env.d.ts`)

export const config = createConfig({
    chains: [mainnet, sepolia, lisk, liskSepolia, base, polygon],
    connectors: [
        walletConnect({
            projectId: import.meta.env.VITE_PROVIDER,  // Ensure VITE_PROVIDER is set correctly in your environment
        }),
    ],
    multiInjectedProviderDiscovery: true,
    transports: {
        [mainnet.id]: http(), // Transport for mainnet
        [sepolia.id]: http(), // Transport for sepolia
    } as Record<number, ReturnType<typeof http>>,
})
