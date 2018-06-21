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
        type : "ADD_PRODUCT", productName, productPrice
    }),
    CHANGE_PRICE : (productName, productPrice) => ({
        type : "CHANGE_PRICE", productName, productPrice
    }),
    CHANGE_NAME : (name) => ({
        type : "CHANGE_NAME", name
    }),
    CHANGE_CURRENCY : (usedCurrency, availableCurrencies) => ({
        type : "CHANGE_CURRENCY", usedCurrency, availableCurrencies
    }),
    CHANGE_AVAILABLE_CURRENCIES : (availableCurrencies) => ({
        type : "CHANGE_AVAILABLE_CURRENCIES", availableCurrencies
    })
};

const REDUCER_VALIDATOR = (reducerActions, state, action) => {
    if(reducerActions.hasOwnProperty(action.type))
        return reducerActions[action.type](state, action);
    else return state;
};

const name = (() => {
    const REDUCER_ACTIONS = {
        CHANGE_NAME : (state, action) => {
            return action.name;
        }
    };

    return (state = "", action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const products = (() => {
    const REDUCER_ACTIONS = {
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

    return (state = [], action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const currency = (() => {
    const REDUCER_ACTIONS = {
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

    return (state = {}, action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

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
groceryStore.dispatch(ACTIONS.CHANGE_CURRENCY("MDL", groceryStore.getState().currency.availableCurrencies));
console.log(groceryStore.getState());

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

