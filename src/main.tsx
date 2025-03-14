import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WagmiProvider } from 'wagmi'
import { config } from './config/wagmi.config.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let queryClient: QueryClient | null = null


const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient()
  }
  return queryClient;
}

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={getQueryClient()}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </WagmiProvider>,
)
