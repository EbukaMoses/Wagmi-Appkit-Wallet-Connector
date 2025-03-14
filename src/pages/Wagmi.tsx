import { useEffect, useState } from 'react'
import { useAccount, useConnectors, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { mainnet, sepolia, lisk, liskSepolia, base, polygon } from 'wagmi/chains'

const WalletConnect = () => {
    const { address, connector, isConnected, chain } = useAccount()
    const connectors = useConnectors()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()
    const { switchChain } = useSwitchChain()

    // State types: connectClick is a boolean, and connector is the current connector or null
    const [connectClick, setConnectClick] = useState<boolean>(false)
    const [selectedConnector, setSelectedConnector] = useState<any | null>(null)

    const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon]

    useEffect(() => {
        if (!connectors || !address) return
        setSelectedConnector(connector)
        setConnectClick(false)
    }, [connector, address, connectors])

    const handleConnectWallet = () => {
        setConnectClick(true)
    }

    const handleConnector = (selected: any) => {
        connect({ connector: selected })
    }

    const handleDisconnect = () => {
        if (selectedConnector) {
            disconnect()
            setSelectedConnector(null)
            setConnectClick(false)
        }
    }

    const handleSwitchChain = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const chainId = Number(event.target.value)
        console.log('Switching to chain ID:', chainId)
        await switchChain({ chainId })
    }

    return (
        <>
            {!selectedConnector ? (
                <div>
                    {!connectClick ? (
                        <button onClick={handleConnectWallet} className='mb-40 px-4 py-2 bg-[#516EF1] rounded-3xl  shadow-2xl  text-white font-bold'>Connect Wallet</button>
                    ) : (
                        <div className='flex flex-col gap-6'>
                            <div className="flex gap-4">
                                {connectors.map((connector) => (
                                    <button key={connector.id} onClick={() => handleConnector(connector)} className='px-4 py-2 bg-gradient-to-r from-[#033AC6] via-[#1d4a71] to-[#011B68] border-[0.5px] shadow-2xl border-white rounded-lg  text-white font-bold'>
                                        {connector.name}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setConnectClick(false)} className='mb-24 px-4 py-2 bg-[#781515] rounded-lg  shadow-2xl  text-white font-bold'>Cancel Connect</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <p className='px-4 py-2 bg-gradient-to-r from-[#033AC6] via-[#1d4a71] to-[#011B68] border-[0.5px] shadow-2xl border-white rounded-lg  text-white font-bold'>Address: {address}</p>
                    <p className='px-4 py-2 bg-gradient-to-r from-[#033AC6] via-[#1d4a71] to-[#011B68] border-[0.5px] shadow-2xl border-white rounded-lg  text-white font-bold'>Connected: {isConnected && 'Wallet Connected'}</p>
                    <p className='px-4 py-2 bg-gradient-to-r from-[#033AC6] via-[#1d4a71] to-[#011B68] border-[0.5px] shadow-2xl border-white rounded-lg  text-white font-bold'>Chain: {chain?.name}</p>

                    <select className='px-4 py-2  border-[0.5px] shadow-2xl border-white rounded-lg font-bold' value={chain?.id} onChange={handleSwitchChain}>
                        {supportedChains.map((chain) => (
                            <option key={chain.id} value={chain.id}>
                                {chain.name}
                            </option>
                        ))}
                    </select>
                    <button className='px-4 py-2 bg-gradient-to-r from-[#5e1c1c] via-[#713f1d] to-[#d70a0a] border-[0.5px] shadow-2xl border-white rounded-lg mb-20  text-white font-bold' onClick={handleDisconnect}>Disconnect Wallet</button>
                </div>
            )}
        </>
    )
}

function App() {
    return (
        <>
            <WalletConnect />
        </>
    )
}

export default App
