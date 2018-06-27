import React from "react"
import {render} from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import BlizzardReducer from "./reducers/BlizzardReducer"
import App from "./components/App"
const SCHEME = "https";
const AUTHORITY = "eu.api.battle.net";
const PATH = "/sc2/user";
const ID = "3899655";
const REGION = "1";
const NAME = "UserName";
const MATCHES = "matches";
const LOCALE = "en_GB";
const KEY = "API&KEY";

const BlizzardProfile = {
    "title" : "Blizzard API",
    "user" : {
        "displayName" : "Dude1",
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
            "terranWins": 223,
            "protossWins": 5,
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
                    "id": 3898455,
                    "realm": 1,
                    "displayName": "Dude1",
                    "clanName": "",
                    "clanTag": "",
                    "profilePath": "/profile/3898455/1/Dude1/"
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
                    "id": 3898455,
                    "realm": 1,
                    "displayName": "Dude1",
                    "clanName": "",
                    "clanTag": "",
                    "profilePath": "/profile/3898455/1/Dude1/"
                }, {
                    "id": 4828939,
                    "realm": 1,
                    "displayName": "Dude2",
                    "clanName": "",
                    "clanTag": "",
                    "profilePath": "/profile/4828939/1/Dude2/"
                }],
                "nonRanked": []
            }]
    }
};


render(
    <Provider store={createStore(BlizzardReducer, BlizzardProfile)}>
        <App/>
    </Provider>,
    document.getElementById("root")
);