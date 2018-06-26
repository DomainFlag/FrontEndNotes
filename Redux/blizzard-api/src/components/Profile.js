import React from "react"
import Form from "./Form"
import {connect} from "react-redux"
import "./Profile.sass"

const labelParser = (label) => {
    let response = "";
    let cycle = "";

    for(let g = 0; g < label.length; g++) {
        if(label.charCodeAt(g) >= 97 &&
            label.charCodeAt(g) <= 122 ||
            label[g] === cycle[0])
            cycle += label[g];
        else {
            response += " " + cycle[0].toUpperCase() + cycle.slice(1, cycle.length);
            cycle = label[g];
        }
    }

    return response;
};

const Profile = ({user}) => {
    let content = Object.keys(user.career).reduce((acc, key) => {
        let match = key.match(/(\w+)Wins$/);
        if(match)
            acc["wins"][key] = user.career[key];
        else if(key === "primaryRace")
            acc[key] = user.career[key];
        else acc["stats"][key] = user.career[key];

        return acc;
    }, {
        "primaryRace" : null,
        "wins" : {},
        "stats" : {}
    });

    let image = document.createElement("img");
    image.src = `${user.portrait.url}`;
    image.addEventListener("load", () => {
        let canvas = document.querySelector(".user-portrait");
        let ctx = canvas.getContext("2d");

        canvas.width = 100;
        canvas.height = 100;

        ctx.drawImage(image, user.portrait.x, user.portrait.y, user.portrait.w, user.portrait.h, 0, 0, canvas.getBoundingClientRect().height, canvas.getBoundingClientRect().height);
    });

    return (
    <div className="user">
        <div className="container">
            <div className="profile">
                <canvas className="user-portrait"/>

                <div className="profile-stats">
                    <p className="user-name">{user.displayName}</p>

                    <div className="stats">
                        <p className="primaryRace">Primary race:
                            <span className="accent"> {content.primaryRace}</span>
                        </p>
                        <div className="wins">
                            {
                                Object.keys(content["wins"]).map((key, index) => (
                                    <p key={index} className="race-wins">
                                        {key + ": " + content["wins"][key]}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="stats">
                {
                    Object.keys(content["stats"]).map((key, index) => (
                        <div key={index} className="state">
                            <p className="stat-label">{labelParser(key)}</p>
                            <p className="stat-value">{content["stats"][key]}</p>
                        </div>
                    ))
                }
            </div>
            <Form/>
        </div>
    </div>
)};

const mapStateToProps = (state) => ({
    user : state.user
});

export default connect(mapStateToProps)(Profile);