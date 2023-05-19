import {useState} from 'react';
import CounterCard from './CounterCard';
import algosdk from 'algosdk'
import {useWallet} from "@txnlab/use-wallet";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import {Counter} from '../counter_client'; 

const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '')

export default function ContractInteraction() {
  const {activeAddress, signer} = useWallet();
  const [appID, setAppID] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCreation(creator?: string) {
    if (!creator) {
      throw new Error("Missing transaction params.");
    }
    setLoading(true)

    const appClient = new Counter({
      client: algodClient,
      signer: signer,
      sender: creator,
    });
    
    const {appId, appAddress, txId} = await appClient.createApplication();
    setAppID(appId);
    console.log(`Created app ${appId} with address ${appAddress} in tx ${txId}`);
    setLoading(false)
    setShowCounter(true);
  }

  if (!activeAddress) {
    return null
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {showCounter ? (
        <CounterCard appID={appID}/>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={() => handleCreation(activeAddress)}>Create Counter</Button>
          )}
        </div>
      )}
    </div>
  )
}
