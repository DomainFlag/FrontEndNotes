import REDUCER_VALIDATOR from "./reducer"

export const ACTIONS = {
    UPDATE_PROFILE : (username, region, accountID) => ({
        "type" : "UPDATE_PROFILE", username, region, accountID
    })
};

const user = (() => {
    const ACTION_REDUCERS = {
        UPDATE_PROFILE : (state, action) => {
            console.log(action);

            return Object.assign({}, state);
        }
    };

    return (state = {}, action) => REDUCER_VALIDATOR(ACTION_REDUCERS, state, action);
})();

export default user;