import React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import {ACTIONS} from "../reducers/user"
import "./Form.sass"

const Username = "Username:";
const Region = "Region:";
const AccountID = "Acc ID:";

export class Form extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.onSubmit("DomainFlag", 1, "3898655");
    };

    render = () => (
        <div className="form">
            <p className="subdivider">Account</p>
            <div className="form-container">
                <div className="form-input">
                    <p className="form-input-text">{Username}</p>
                    <input className="form-input-value" placeholder={Username}/>
                </div>
                <div className="form-input">
                    <p className="form-input-text">{Region}</p>
                    <input className="form-input-value" placeholder={Region}/>
                </div>
                <div className="form-input">
                    <p className="form-input-text">{AccountID}</p>
                    <input className="form-input-value" placeholder={AccountID}/>
                </div>
            </div>
            <div className="form-action">
                <button className="form-submit" onClick={this.onSubmit}>FETCH</button>
                <div className="form-update">
                    <label className="form-update-label">Keep Updated</label>
                    <input className="form-update-submit" type="checkbox" value="Keep Updated"/>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    "onSubmit" : (username, region, accountID) => dispatch(ACTIONS.UPDATE_PROFILE(username, region, accountID))
});

export default connect(null, mapDispatchToProps)(Form);