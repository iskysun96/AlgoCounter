import { useWallet } from '@txnlab/use-wallet'
import Button from '@mui/material/Button';

export default function Connect() {
  const { providers, activeAccount } = useWallet()

  // Map through the providers.
  // Render account information and "connect", "set active", and "disconnect" buttons.
  return (
      <div>      
        {providers?.map((provider) => (
        <div key={'provider-' + provider.metadata.id}>
          <div>
            {provider.isConnected ? (
              <Button onClick={provider.disconnect}>
                {activeAccount?.address}
              </Button>
            ) : (
              <Button variant="contained" onClick={provider.connect}>
                Connect
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
