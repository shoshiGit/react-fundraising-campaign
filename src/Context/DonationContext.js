import { createContext, useContext, useState } from "react";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donations, setDonations] = useState([]);
    const [donationId, setDonationId] = useState(0);
    const [donorsCnt,setDonorsCnt] = useState(0)
    const [donatedAmount,setDonatedAmount] = useState(0)
    const wanted = 2000;

    const addDonation = (donationDetails) => {
        let newId = donationId + 1;
        setDonationId(newId);
        setDonorsCnt(newId);
        let amount = parseFloat(donationDetails.amount);
        setDonatedAmount((prevAmount) => prevAmount + amount);
        const newDonation = { ...donationDetails, id: donationId };
        setDonations((prevDonations) => [...prevDonations, newDonation]);
    };

    return(
        <DonationContext.Provider value={{donations, addDonation, donorsCnt,donatedAmount,wanted }}>
            {children}
        </DonationContext.Provider>
    );
};

export const useDonationContext = () => {
    return useContext(DonationContext);
};