import React from "react"
import {render} from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import BlizzardReducer from "./reducers/BlizzardReducer"
import App from "./components/App"

const SCHEME = "https";
const AUTHORITY = "eu.api.battle.net";
const PATH = "/sc2/user";
const ID = "3898655";
const REGION = "1";
const NAME = "DomainFlag";
const MATCHES = "matches";
const LOCALE = "en_GB";
const KEY = "99j885s2ucwsqwac5af3fqd5nur68fqt";

const BlizzardProfile = {
    "title" : "Blizzard API",
    "user" : {
        "displayName" : "DomainFlag",
        "portrait" : null,
        "career": {
            "primaryRace": "TERRAN",
            "terranWins": 223,
            "protossWins": 0,
            "zergWins": 0,
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
    }]
};


render(
    <Provider store={createStore(BlizzardReducer, BlizzardProfile)}>
        <App/>
    </Provider>,
    document.getElementById("root")
);