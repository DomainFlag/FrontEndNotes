import React from "react"
import Form from "./Form"
import {connect} from "react-redux"

const Profile = ({user}) => (
    <div className="user">
        <div className="profile">
            <img src="#" className="user-portrait"/>
            <p className="user-name">{user.displayName}</p>
        </div>
        <div className="stats">
            <p className="primaryRace">{user.career.primaryRace}</p>
            <div className="stats-extra">
                {
                    Object.keys(user.career).map((key) => (
                        <p className="stat-extra-det">{key}: {user.career[key]}</p>
                    ))
                }
            </div>
        </div>
        <Form/>
    </div>
);

const mapStateToProps = (state) => ({
    user : state.user
});

export default connect(mapStateToProps)(Profile);