import { useEffect, useState } from "react";


export const TimeSince = (donationDate) => {
    const [timeSince, setTimeSince] = useState(calculateTimeSince(donationDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeSince(calculateTimeSince(donationDate));
        }, 1000);
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [donationDate]);

    function calculateTimeSince(date) {

        const now = new Date();
        const then = new Date(date);
        const difference = now - then;
        const minutes = Math.floor(difference / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (then.getFullYear() != now.getFullYear()) {
            let year = now.getFullYear() - then.getFullYear();
            return `${year} year${year > 1 ? 's' : ''} ago`;
        }
        else if (then.getMonth() > now.getMonth()) {
            let month = now.getMonth() - then.getMonth();
            return `${month} month${month > 1 ? 's' : ''} ago`;
        }
        else if (days > 0) {
            console.log(then.getFullYear())
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `less than a minute ago`;
        }
    }
    return timeSince;
};