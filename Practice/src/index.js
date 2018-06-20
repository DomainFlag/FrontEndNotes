import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import registerServiceWorker from './registerServiceWorker';

const changeHandler = () => {
    console.log("changed");
};

const DOLLAR = "$";
const MDL = "MDL";

const Grocery = {
    name : "Vegan Store",
    currency : {
        availableCurrencies : [
            DOLLAR, MDL
        ],
        usedCurrency : DOLLAR
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

const ACTIONS = {
    ADD_PRODUCT : (productName, productPrice) => ({
        type : "ADD_PRODUCT", productName : productName, productPrice : productPrice
    }),
    UPDATE_PRICE : (productName, productPrice) => ({
        type : "UPDATE_PRICE", productName : productName, productPrice : productPrice
    }),
    CHANGE_NAME : () => ({
        type : "CHANGE_NAME", name : "Fruit Store"
    }),
    CHANGE_CURRENCY : (usedCurrency, availableCurrencies) => ({
        type : "CHANGE_CURRENCY", usedCurrency : usedCurrency, availableCurrencies : availableCurrencies
    }),
    CHANGE_AVAILABLE_CURRENCIES : (availableCurrencies) => ({
        type : "CHANGE_AVAILABLE_CURRENCIES", availableCurrencies : availableCurrencies
    })
};

const name = (state = "", action) => {
    const HELPER_ACTIONS = {
        CHANGE_NAME : (state, action) => {
            return action.name;
        }
    };

    if(HELPER_ACTIONS.hasOwnProperty(action.type))
        return HELPER_ACTIONS[action.type](state, action);
    else return state;
};

const products = (state = [], action) => {
    const HELPER_ACTIONS = {
        ADD_PRODUCT : (state, action) => {
            return state.concat([{ productName : action.productName, productPrice : action.productPrice }]);
        },
        UPDATE_PRICE : (state, action) => {
            return state.map((product) => {
                return product.productName === action.productName ? {
                    productName : action.productName,
                    productPrice : action.productPrice
                } : product;
            });
        }
    };

    if(HELPER_ACTIONS.hasOwnProperty(action.type))
        return HELPER_ACTIONS[action.type](state, action);
    else return state;
};

const currency = (state = "", action) => {
    const HELPER_ACTIONS = {
        CHANGE_CURRENCY : (state, action) => {
            if(action.availableCurrencies.indexOf(state) !== -1)
                return action.usedCurrency;

            return state;
        },
        CHANGE_AVAILABLE_CURRENCIES : (state, action) => {
            let newState = Object.assign({}, state);

            action.availableCurrencies.forEach((currency) => {
                if(newState.availableCurrencies.indexOf(currency) !== -1)
                    newState.availableCurrencies = newState.availableCurrencies.concat(currency);
            });

            return newState;
        }
    };

    if(HELPER_ACTIONS.hasOwnProperty(action.type))
        return HELPER_ACTIONS[action.type](state, action);
    else return state;
};

let rootReducer = combineReducers({
    name,
    currency : combineReducers({
        usedCurrency : currency,
        availableCurrencies : currency
    }),
    products
});

let groceryStore = createStore(rootReducer, Grocery);

console.log(groceryStore.getState());
groceryStore.dispatch(ACTIONS.CHANGE_CURRENCY("MDL", groceryStore.getState().currency.availableCurrencies));
console.log(groceryStore.getState());

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

