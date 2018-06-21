import REDUCER_VALIDATOR from "./reducer"

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

export default currency;