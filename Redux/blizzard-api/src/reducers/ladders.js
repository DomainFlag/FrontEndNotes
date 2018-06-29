import REDUCER_VALIDATOR from "./reducer-validator"

export const ACTIONS = {

};

const ladders = (() => {
    const REDUCER_ACTIONS = {};

    return (state = {}, action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

export default ladders;