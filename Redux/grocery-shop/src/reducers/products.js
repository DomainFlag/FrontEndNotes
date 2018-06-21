import REDUCER_VALIDATOR from "./reducer"

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

export default products;