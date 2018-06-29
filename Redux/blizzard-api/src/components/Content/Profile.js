import React from "react"
import Form from "./Form"
import {connect} from "react-redux"
import "./Profile.sass"

const labelParser = (label) => {
    let response = "";
    let cycle = "";

    for(let g = 0; g < label.length; g++) {
        if((label.charCodeAt(g) >= 97 &&
            label.charCodeAt(g) <= 122) ||
            label[g] === cycle[0])
            cycle += label[g];
        else {
            response += " " + cycle[0].toUpperCase() + cycle.slice(1, cycle.length);
            cycle = label[g];
        }
    }

    return response;
};

class Profile extends React.Component {
    componentDidMount() {
        this.canvas.width = 100;
        this.canvas.height = 100;

        let ctx = this.canvas.getContext("2d");
        this.updateCanvasContext(ctx, this.props);
    };

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.profile.portrait) !== JSON.stringify(nextProps.profile.portrait)) {
            let ctx = this.canvas.getContext("2d");

            this.updateCanvasContext(ctx, nextProps);
        }
    }

    updateCanvasContext(ctx, props) {
        let image = document.createElement("img");
        image.src = `${props.profile.portrait.url}`;
        image.addEventListener("load", () => {
            ctx.drawImage(image,
                -props.profile.portrait.x,
                -props.profile.portrait.y,
                props.profile.portrait.w,
                props.profile.portrait.h,
                0,
                0,
                this.canvas.getBoundingClientRect().height,
                this.canvas.getBoundingClientRect().height);
        });
    }

    render = () => (
        <div className="user">
            <div className="container">
                <div className="profile">
                    <canvas className="user-portrait" ref={(el) => { this.canvas = el }}/>

                    <div className="profile-stats">
                        <p className="user-name">{this.props.profile.displayName}</p>

                        <div className="stats">
                            <p className="primaryRace">Primary race:
                                <span className="accent">{this.props.profile.primaryRace}</span>
                            </p>
                            <div className="wins">
                                {
                                    Object.keys(this.props.profile.career["wins"]).map((key, index) => (
                                        <p key={index} className="race-wins">
                                            {labelParser(key) + ": " + this.props.profile.career["wins"][key]}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    {
                        Object.keys(this.props.profile.career["stats"]).map((key, index) => (
                            <div key={index} className="state">
                                <p className="stat-label">{labelParser(key)}</p>
                                <p className="stat-value">{this.props.profile.career["stats"][key]}</p>
                            </div>
                        ))
                    }
                </div>
                <Form/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile : {
            ...state.profile,
            career: Object.keys(state.profile.career)
                .reduce((acc, key) => {
                    let match = key.match(/(\w+)Wins$/);
                    if(match)
                        acc["wins"][key] = state.profile.career[key];
                    else if(key === "primaryRace")
                        acc[key] = state.profile.career[key];
                    else acc["stats"][key] = state.profile.career[key];

                    return acc;
                }, {
                    "primaryRace" : null,
                    "wins" : {},
                    "stats" : {}
                })
        }
    }
};

export default connect(mapStateToProps)(Profile);