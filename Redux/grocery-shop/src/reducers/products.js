import REDUCER_VALIDATOR from "../../../blizzard-api/src/reducers/reducer-validator"

const ACTIONS = {
    ADD_PRODUCT : (productName, productPrice) => ({
        type : "ADD_PRODUCT", productName, productPrice
    }),
    UPDATE_PRODUCT : (productName, productPrice) => ({
        type : "UPDATE_PRODUCT", productName, productPrice
    })
};

const products = (() => {
    const REDUCER_ACTIONS = {
        ADD_PRODUCT : (state, action) => {
            return state.concat([{ productName : action.productName, productPrice : action.productPrice }]);
        },
        UPDATE_PRODUCT : (state, action) => {
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

export {
    ACTIONS,
    products
};