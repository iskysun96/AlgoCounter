import Typography from '@mui/material/Typography';
import Connect from '../wallet/Connect';

export default function MenuAppBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 16, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6">AlgoCounter</Typography>
      <div style={{ flex: 1 }} />
      <Connect /> 
    </div>
  );
}
