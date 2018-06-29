import React from "react"
import {render} from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import {applyMiddleware} from "redux"
import ThunkMiddleware from "redux-thunk"
import logger from "redux-logger"
import BlizzardReducer from "./reducers/root-reducer"
import App from "./components/App"

const BlizzardProfile = {
    "title" : "Blizzard API",
    "profile" : {
        "displayName" : "Domain_1",
        "portrait": {
            "x": 0,
            "y": 0,
            "w": 90,
            "h": 90,
            "offset": 0,
            "url": "http://media.blizzard.com/sc2/portraits/0-90.jpg"
        },
        "career": {
            "primaryRace": "TERRAN",
            "terranWins": 450,
            "protossWins": 2,
            "zergWins": 5,
            "highest1v1Rank": "DIAMOND",
            "highestTeamRank": "GOLD",
            "seasonTotalGames": 427,
            "careerTotalGames": 4020
        },
    },
    "matches" : [{
        "map": "Dusty Gorge",
        "type": "TWOS",
        "decision": "LOSS",
        "speed": "FASTER",
        "date": 1529879116
    }, {
        "map": "Overgrown Facility",
        "type": "TWOS",
        "decision": "WIN",
        "speed": "FASTER",
        "date": 1529878710
    }],
    "ladders" : {
        "currentSeason": [
            {
                "ladder": [],
                "characters": [{
                    "id": 1898355,
                    "realm": 1,
                    "displayName": "Domain_1",
                    "clanName": "",
                    "clanTag": "",
                    "profilePath": "/profile/1898355/1/Domain_1/"
                }],
                "nonRanked": []
            }, {
                "ladder": [{
                    "ladderName": "Gantrithor Romeo",
                    "ladderId": 205199,
                    "division": 10,
                    "rank": 43,
                    "league": "MASTER",
                    "matchMakingQueue": "LOTV_TWOS",
                    "wins": 33,
                    "losses": 29,
                    "showcase": true
                }],
                "characters": [{
                    "id": 1898355,
                    "realm": 1,
                    "displayName": "Domain_1",
                    "clanName": "",
                    "clanTag": "",
                    "profilePath": "/profile/1898355/1/Domain_1/"
                }, {
                    "id": 4828239,
                    "realm": 1,
                    "displayName": "Domain_2",
                    "clanName": "",
                    "clanTag": "",
                    "profilePath": "/profile/4828239/1/Domain_2/"
                }],
                "nonRanked": []
            }]
    }
};

let store = createStore(BlizzardReducer, BlizzardProfile, applyMiddleware(
    ThunkMiddleware,
    logger
));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);