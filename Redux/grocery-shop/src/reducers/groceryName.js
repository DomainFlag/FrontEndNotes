import REDUCER_VALIDATOR from "./reducer"

const ACTIONS = {
    CHANGE_NAME : (groceryName) => ({
        type : "CHANGE_NAME", groceryName
    })
};

const groceryName = (() => {
    const REDUCER_ACTIONS = {
        CHANGE_NAME : (state, action) => {
            return action.groceryName;
        }
    };

    return (state = [], action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

export {
    ACTIONS,
    groceryName
};