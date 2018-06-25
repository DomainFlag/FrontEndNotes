import React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import {ACTIONS} from "../reducers/user"

const Username = "Username:";
const Region = "Region:";
const AccountID = "Acc ID:";

export class Form extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        console.log(this.props);
        this.props.onSubmit("DomainFlag", 1, "3898655");
    };

    render = () => (
        <div className="form">
            <p className="form-label">Account:</p>
            <div className="form-input-label">
                <p className="form-input-text">{Username}</p>
                <input className="form-input" placeholder={Username}/>
            </div>
            <div className="form-input-label">
                <p className="form-input-text">{Region}</p>
                <input className="form-input" placeholder={Region}/>
            </div>
            <div className="form-input-label">
                <p className="form-input-text">{AccountID}</p>
                <input className="form-input" placeholder={AccountID}/>
            </div>
            <button className="form-submit" onClick={this.onSubmit}>Submit</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    "onSubmit" : (username, region, accountID) => dispatch(ACTIONS.UPDATE_PROFILE(username, region, accountID))
});

export default connect(null, mapDispatchToProps)(Form);