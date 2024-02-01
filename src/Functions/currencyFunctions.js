export function fromShekelTo(sum, dollar, currencyType) {
    if (currencyType == "ILS")
        return sum;
    else {
        return Math.round(sum / dollar);
    }
}

export function toShekelFromDollar(sum, dollar) {
    return Math.round(sum * dollar);
}

export function toShekelFrom(sum, dollar, currencyType) {
    if (currencyType == "ILS") {
        return sum;
    }
    else {
        return Math.round(sum * dollar);
    }
}