import REDUCER_VALIDATOR from "./reducer-validator"
import UriBuilder from "./../utils/uri-builder";

const UPDATE_PROFILE = "UPDATE_PROFILE";

const SCHEME = "https";
const AUTHORITY = "eu.api.battle.net";
const GAME = "sc2";
const PROFILE = "profile";
const LOCALE = "en_GB";
const APIKEY = "YOUR&API&KEY";


export const ACTIONS = {
    UPDATE_PROFILE : (status, response = null) => {
        let action = {type: UPDATE_PROFILE};

        if(status === "error")
            return {...action, status, response: null};
        else if(status === "success")
            return {...action, status, response};
        //Pending case
        else  return {...action, status, response: null};
    },
    FETCH_PROFILE : (payload) => {
        let headers = new Headers();
        headers.append("method", "GET");

        let url = new UriBuilder()
            .setScheme(SCHEME)
            .setAuthority(AUTHORITY)
            .appendPath(GAME)
            .appendPath(PROFILE)
            .appendPath(payload.id)
            .appendPath(payload.region)
            .appendPath(payload.username)
            .appendQueryParameter({LOCALE})
            .appendQueryParameter({APIKEY})
            .build();

        return (dispatch) => {
            dispatch(ACTIONS.UPDATE_PROFILE("pending"));

            return fetch(url, {headers})
                .then((data) => data.json())
                .then((data) => dispatch(ACTIONS.UPDATE_PROFILE("success", data)))
                .catch(console.error);
        }
    }
};


const profile = (() => {
    const REDUCER_ACTIONS = {
        UPDATE_PROFILE : (state, action) => {
            if(action.status === "success") {
                return Object.assign({}, state, {
                    displayName: action.response.displayName,
                    portrait: action.response.portrait,
                    career: action.response.career,
                });
            } else return state;
        }
    };

    return (state = [], action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

export default profile;