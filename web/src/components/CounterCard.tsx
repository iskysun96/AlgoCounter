import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import algosdk from 'algosdk'
import {useWallet} from "@txnlab/use-wallet";
import CircularProgress from '@mui/material/CircularProgress';

import {Counter} from '../counter_client'; 

const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '')

type CounterCardProps = {
  appID: number 
}

export default function CounterCard(props: CounterCardProps) {
  const [count, setCount] = useState(0);
  const {activeAddress, signer} = useWallet();
    const [loading, setLoading] = useState(false);

  const handleIncrement = async (creator?: string) => {
    if (!creator) {
      throw new Error("Missing transaction params.");
    }
    setLoading(true)

    const appClient = new Counter({
      client: algodClient,
      signer: signer,
      sender: creator,
      appId: props.appID
    });

    let result = await (await appClient.increment()).returnValue
    let str_result = result?.toString()
    console.log(str_result)
    setCount(Number(str_result));
    console.log(count)
    setLoading(false)
  };

  return (
    <div>
      <Card style={{ width: 500, height: 300, margin: '0 auto' }}>
        <CardActionArea onClick={() => handleIncrement(activeAddress)} style={{ height: '100%' }}>
          <CardContent>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </div>
            ) : (
              <Typography variant="h1" align="center" >
                {count}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
