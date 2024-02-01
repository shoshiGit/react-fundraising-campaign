import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import DonationList from './DonationList';
import DonateForm from './DonateForm';
import Summary from './Summary';
import Home from './Home';
import { DonationProvider } from './Context/DonationContext';
import { DollarProvider } from './Context/DollarContext';

//npm install react-router-dom@6     
//npm install react-hook-form 
//npm install @mui/material @emotion/react @emotion/styled 
//npm install @mui/material @mui/styled-engine-sc styled-components
//npm install @fontsource/roboto    
//npm install @mui/icons-material 
//npm install axios     
//npm install --save react-customizable-progressbar  
//npm i react-percentage-bar   

//install react-aria                                       
// npm i @react-aria/progress               
//npm install react-progress --save
//npm install react-bootstrap bootstrap     

//npm install @mui/x-data-grid       



function App() {
  return (
    <div className="App">
      {/* PROVIDERבקומפוננטה אפ אטתי כל המקומות שאני רוצה להתמש בקונטקס שבניתי עם ה    */}
        <DonationProvider>
          <DollarProvider>
            <NavBar />
            <Routes>
              <Route path='/Home' element={<Home />} />
              <Route path='/donationList' element={<DonationList />} />
              <Route path='/Donations' element={<DonationList />} />
              <Route path='/form' element={<DonateForm />} />
              <Route path='/Summary' element={<Summary />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </DollarProvider>
        </DonationProvider>
    </div>
  );
}

export default App;