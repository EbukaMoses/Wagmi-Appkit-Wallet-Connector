import { useState } from 'react'
import './App.css'
import Header from './ui/Header'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import Wagmi from './pages/Wagmi'
import Footer from './ui/Footer'

// 1. Get projectId
const projectId = '3641eb845066fc8188c4f639191a0f12'

// 2. Set the networks
const networks: any = [arbitrum, mainnet]

// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})



function App() {
  const [side, setSide] = useState('Wagmi')

  return (
    <div className='relative bg-gradient-to-r from-[#033AC6] via-[#1d4a71] to-[#011B68] w-full h-auto'>
      <br />
      <Header />
      <div className="flex flex-col items-center justify-center mt-24 pb-20 ">
        <div className="flex items-center justify-between  gap-2 rounded-lg border-[1.5px] border-white p-2">
          <span className={`transition-normal text-white font-semibold text-lg px-8 py-2 rounded-lg cursor-pointer ${side === 'Wagmi' ? 'bg-gradient-to-r from-[#2703c6] via-[#1d4a71] to-[#031857] border-[0.5px] shadow-2xl border-white' : ''}`} onClick={() => setSide('Wagmi')}>Wagmi</span>
          <span className={`transition-normal text-white font-semibold text-lg px-8 py-2 rounded-lg cursor-pointer ${side === 'Appkit' ? 'bg-gradient-to-r from-[#2703c6] via-[#1d4a71] to-[#031857] border-[0.5px] shadow-2xl border-white' : ''}`} onClick={() => setSide('Appkit')}>Appkit</span>
        </div>
        <div className="flex items-center justify-center mt-10">
          {side === 'Appkit' ? <appkit-button /> : <Wagmi />}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
