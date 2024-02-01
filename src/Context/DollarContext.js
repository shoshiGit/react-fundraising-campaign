import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DollarContext = createContext();

export const DollarProvider = ({ children }) => {
    let [rate, setRate] = useState({ dollar: undefined, currencyInSite: "ILS" })
    let [rateS, setRateS] = useState("₪");


    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const apiKey = 'ed7edaf58c258ffdc61e62e8';
                const response = await axios.get(
                    `https://open.er-api.com/v6/latest/${rate.currencyInSite}?apikey=${apiKey}`
                );
                if (response.data && response.data.rates && response.data.rates.ILS) {
                    const newRate = response.data.rates.ILS;
                    setRate({ dollar: newRate, currencyInSite: rate.currencyInSite });
                    setRateS(rate.currencyInSite === "ILS" ? "₪" : "$");
                } else {
                    console.error("Invalid response format:", response);
                }
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };
        fetchExchangeRates();
    }, [rate.currencyInSite]);

    const changeCurrencyInSite = () => {
        const newCurrency = rate.currencyInSite === "ILS" ? "USD" : "ILS";
        setRate({ ...rate, currencyInSite: newCurrency });
    }

    return (
        <DollarContext.Provider value={{ dollar: rate.dollar, currencyInSite: changeCurrencyInSite, rateS }}>
            {children}
        </DollarContext.Provider>
    )
};

export const useDollarContext = () => {
    return useContext(DollarContext);
};