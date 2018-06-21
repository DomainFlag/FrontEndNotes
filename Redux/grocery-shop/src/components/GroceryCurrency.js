import React from "react"

const GroceryCurrency = ({ availableCurrencies, usedCurrency }) => (
    <div>
        <div className="currencies">
            { availableCurrencies.map((currency) => (
                <p>{currency}</p>
            ))}
        </div>
        <p>Currently used currency: {usedCurrency}</p>
    </div>
);

export default GroceryCurrency;