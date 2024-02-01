import { useDollarContext } from "./Context/DollarContext";
import { useDonationContext } from "./Context/DonationContext";
import { fromShekelTo } from "./Functions/currencyFunctions";
import { Card } from "@mui/material";

//npm i react-percentage-bar

const Summary = () => {
    const { dollar, currencyInSite, rateS } = useDollarContext();
    const { wanted, donorsCnt, donatedAmount } = useDonationContext()

    return (<>

        <Card >
        <div>
                <progress value={donatedAmount != 0 ? donatedAmount : 0} max={wanted} />
                <br /> {donatedAmount}/ {wanted}<br />
                {donatedAmount != 0 ? Math.round(donatedAmount / wanted * 100) : 0}%
            </div>
            <div >  <h1>{rateS}{fromShekelTo(donatedAmount, dollar, currencyInSite)}</h1>
            </div>
            <div>
                <h3>{wanted}</h3><br />
                <h4>Campaign Goal</h4>
            </div>
            <h5>{`${donorsCnt} donor${donorsCnt > 1 ? 's' : ''} Donated`} </h5>

        </Card>
    </>);
}

export default Summary;