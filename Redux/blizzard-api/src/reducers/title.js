import REDUCER_VALIDATOR from "./reducer-validator"

export const ACTIONS = {};

const title = (() => {
    const REDUCER_ACTIONS = {};

    return (state = {}, action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

export default title;