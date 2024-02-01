import { useState } from "react";
import { useDonationContext } from "./Context/DonationContext";
import { Box, Button, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useDollarContext } from "./Context/DollarContext";
import { toShekelFromDollar } from "./Functions/currencyFunctions";

const DonateForm = () => {
  const { rateS ,dollar} = useDollarContext();

  const { addDonation } = useDonationContext();

  const [donationDetails, setDonationDetails] = useState({
    donorName: '',
    amount: '',
    dedication: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validate();
    if (Object.keys(result).length === 0) {
      if(c=="$"){
        donationDetails.amount = toShekelFromDollar(donationDetails.amount,dollar)
      }
      addDonation({ ...donationDetails, date: new Date() });
      setDonationDetails({
        donorName: 'Anonymous',
        amount: '',
        dedication: '',
        date: ''
      });
    }
    else { setmyErrors(result); }
  };

  const validate = () => {
    let err = {};
    if (donationDetails.donorName == "") err.donorName = "*required field";
    if (donationDetails.amount < 0) err.amount = "*Required Fiels";
    else if (donationDetails.amount == "") err.amount = "*required field";
    return err;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  let [myErrors, setmyErrors] = useState({});


  const [c, setC] = useState(rateS);
  const handleChange5 = (event) => {
    setC(event.target.value);
  };
  //return toggle buttons 
  const cButtons2 = () => {
    return (
      <Select
        color="primary"
        defaultValue={c}
        value={c}
        onChange={handleChange5}
      
        sx={{width: '7ch' }}
      >
        <MenuItem value="₪">₪</MenuItem>
        <MenuItem value="$">$</MenuItem>
      </Select>
    )
  }

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '25px', maxWidth: '690px', paddingBottom: '25px' }}>
      <Paper variant="outlined" margin='40px' elevation={0} square={false}>
        <form onSubmit={handleSubmit}
          style={{ padding: "5px", display: "flex", flexDirection: "column", alignItems: "center", margin: '30px' }}>
          <h1>Donate Form</h1>
          <TextField autoFocus={true} required sx={{ m: 1, width: '25ch' }}  id="outlined-basic" label="Name" name="donorName" value={donationDetails.donorName} onChange={handleChange} variant="outlined" />
          <br />
          <Box display="flex">
            {cButtons2()}
            <TextField required placeholder="werqe" type="number" sx={{width: '19ch' }} name="amount" value={donationDetails.amount} onChange={handleChange} label="Donation Amount" id="outlined-start-adornment" />
          </Box>
          <br />
          <TextField multiline id="outlined-basic-2" sx={{ m: 1, width: '25ch' }} label="Dedication (Optional)" name="dedication" value={donationDetails.dedication} onChange={handleChange} variant="outlined" />
          <br />
          <Button type="submit" variant="contained" >Donate</Button>
        </form>

      </Paper>
    </div>


  );
};

export default DonateForm;
