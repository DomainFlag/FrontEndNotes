import React from "react"
import {createStore} from "redux"
import App from "./components/App"
import {Provider} from 'react-redux'
import {render} from "react-dom"
import grocery from "./reducers/grocery"

const DOLLAR = "$";
const MDL = "MDL";

const Grocery = {
    groceryName : "Grocery Store",
    currency : {
        availableCurrencies : [
            {
                currency: DOLLAR,
                quotation: 1.0
            }, {
                currency : MDL,
                quotation: 16.92
            }
        ],
        usedCurrency : DOLLAR,
        referenceCurrency : DOLLAR
    },
    products : [
        {
            "productName" : "Mango",
            "productPrice" : 6.15
        }, {
            "productName" : "Apple",
            "productPrice" : 2.34
        }, {
            "productName" : "Pineapple",
            "productPrice" : 4.78
        }
    ]
};

render(
    <Provider store={createStore(grocery, Grocery)}>
        <App/>
    </Provider>,
    document.getElementById("root")
);