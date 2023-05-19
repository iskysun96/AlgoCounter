import React from 'react';
import NavBar from './components/NavBar';
import ContractInteraction from './components/ContractInteraction';
import LandingMessage from './components/LandingMessage'
import { useWallet, reconnectProviders, initializeProviders, WalletProvider, PROVIDER_ID, pera } from '@txnlab/use-wallet'

const walletProviders = initializeProviders( [PROVIDER_ID.PERA], {
  network: 'testnet',
  nodeServer: 'https://testnet-api.algonode.cloud',
  nodeToken: '',
  nodePort: ''
})

function App() {
  const {activeAddress} = useWallet()
  // Reconnect the session when the user returns to the dApp
  React.useEffect(() => {
    reconnectProviders(walletProviders)
  }, [])

  return (
    <div>
      <WalletProvider value={walletProviders}>
        <NavBar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
          {activeAddress ? (
            <ContractInteraction />
          ) : (
            <LandingMessage />
          )}
        </div>
      </WalletProvider>
    </div>

  );
}

export default App;
