import OneDonation from "./OneDonation";
import { useDonationContext } from "./Context/DonationContext";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, TextField } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

const DonationList = () => {
  const { donations } = useDonationContext();
  //search for donation acc to name or dedicaction
  const [searchInput, setSearchInput] = useState('');
  const [sampleData, setSampleData] = useState([]);


  const changeSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    // Filter donations based on search input
    const filteredData = donations.filter((donation) =>
      donation.donorName.toLowerCase().includes(inputValue) ||
      donation.dedication.toLowerCase().includes(inputValue)
    );

    setSampleData(filteredData);
  }

  //filter acc 2 old/ new/ amount

  // const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    if (donations && Array.isArray(donations))
      setSampleData(donations)
  }, [donations]);

  //sort functions
  const sortByAmountAsc = () => {
    const donationsByAmntAsc = [...donations].sort((a, b) => a.amount - b.amount);
    setSampleData(donationsByAmntAsc);
  }
  const sortByAmountDesc = () => {
    const donationsByAmntDesc = [...donations].sort((a, b) => b.amount - a.amount);
    setSampleData(donationsByAmntDesc)
  }
  const sortByNewest = () => {
    const donationsByNew = [...donations].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSampleData(donationsByNew);
  }
  const sortByOldest = () => {
    const donationsByNew = [...donations].sort((a, b) => new Date(a.date) - new Date(b.date));
    setSampleData(donationsByNew);
  }

  // mui- sort value to show
  const [sort, setSort] = useState('');
  const handleChange1 = (event) => {
    setSort(event.target.value);
  };
  return (
    <div>
      <h2 style={{ margin: '0', textDecorationLine: 'underline', marginBottom: '8px' }}>Recent Donations:</h2>
      <div style={{ display: 'flex', flexFlow: 'wrap', alignItems: 'center', flexDirection: 'row', lineHeight: '1.15' }}>
        <div style={{ flexDirection: 'row', width: '35%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" data-shrink='true'>Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort By"
              onChange={handleChange1}
              height='56px'
            >
              <MenuItem value="Low to High" onClick={sortByAmountAsc}>Sort by Amount Asc</MenuItem>
              <MenuItem value="High to Low" onClick={sortByAmountDesc}>Sort by Amount Desc</MenuItem>
              <MenuItem value="Newest to Oldest" onClick={sortByNewest}>Sort by New</MenuItem>
              <MenuItem value="Oldest to Newest" onClick={sortByOldest}>Sort by Old</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TextField
            // onChange={changeSearch}
            value={searchInput}
            label="Search Donors"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
            onChange={changeSearch}
          />
        </div>

      </div>
      <div style={{ maxHeight: '65vh', overflowY: 'auto', flexFlow: 'row-wrap', flexWrap: "wrap", alignItems: "center" }}>
        {sampleData && sampleData.map((donation) => (
          <OneDonation key={donation.id} donation={donation} />
        ))}
      </div>
    </div>
  );
}

export default DonationList;