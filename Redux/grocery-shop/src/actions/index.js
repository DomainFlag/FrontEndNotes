const ACTIONS = {
    ADD_PRODUCT : (productName, productPrice) => ({
        type : "ADD_PRODUCT", productName, productPrice
    }),
    CHANGE_PRICE : (productName, productPrice) => ({
        type : "CHANGE_PRICE", productName, productPrice
    }),
    CHANGE_NAME : (groceryName) => ({
        type : "CHANGE_NAME", groceryName
    }),
    CHANGE_CURRENCY : (usedCurrency) => ({
        type : "CHANGE_CURRENCY", usedCurrency
    }),
    CHANGE_AVAILABLE_CURRENCIES : (availableCurrencies) => ({
        type : "CHANGE_AVAILABLE_CURRENCIES", availableCurrencies
    })
};

export default ACTIONS;