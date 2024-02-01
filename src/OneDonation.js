import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TimeSince } from './Functions/dateFunction';
import {  useDollarContext } from './Context/DollarContext';
import { fromShekelTo } from './Functions/currencyFunctions';

const OneDonation = ({ donation }) => {
  const { dollar,currencyInSite, rateS } = useDollarContext();

  
  const dedicationFunc = () => {
    if (donation.dedication != '')
      return (
        <Typography variant='p' sx={{ fontSize: '14px', color: "text.secondary" }}>
          {donation.dedication}
        </Typography>
      )
  }

  return (
    <Paper style={{ margin: "8px 0", padding: '8px' }} className='boxP' elevation={2} >
      <CardContent>
        <Typography variant="h5" component="div">
          {donation.donorName}
        </Typography>
        <Typography className='amountC' variant="h4">
        {rateS}
        {fromShekelTo(donation.amount,dollar,currencyInSite)}
         {/* {donation.amount} */}
        </Typography>
        {dedicationFunc()}
        <Typography  variant="body2">
          {TimeSince(donation.date)}
        </Typography>
      </CardContent>
    </Paper>

  );
}

export default OneDonation;