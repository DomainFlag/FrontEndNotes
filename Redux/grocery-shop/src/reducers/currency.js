import REDUCER_VALIDATOR from "../../../blizzard-api/src/reducers/reducer"

const ACTIONS = {
    CHANGE_CURRENCY : (usedCurrency) => ({
        type : "CHANGE_CURRENCY", usedCurrency
    }),
    CHANGE_AVAILABLE_CURRENCIES : (availableCurrencies) => ({
        type : "CHANGE_AVAILABLE_CURRENCIES", availableCurrencies
    })
};

const currency = (() => {
    const REDUCER_ACTIONS = {
        CHANGE_CURRENCY : (state, action) => {
            let newState = Object.assign({}, state);

            if(state.availableCurrencies.some((currCurrency) => currCurrency.currency === action.usedCurrency))
                return {
                    ...newState,
                    usedCurrency: action.usedCurrency
                };

            return state;
        },
        CHANGE_AVAILABLE_CURRENCIES : (state, action) => {
            let newState = Object.assign({}, state);

            action.availableCurrencies.forEach((currency) => {
                if(state.availableCurrencies.some((currCurrency) => currCurrency.currency === currency))
                    state.availableCurrencies = state.availableCurrencies.concat(currency);
            });

            return newState;
        }
    };

    return (state = {}, action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

export {
    ACTIONS,
    currency
};