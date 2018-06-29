import React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import {ACTIONS} from "../../reducers/profile"
import checked from "./../../assets/checked.svg"
import "./Form.sass"

const Username = "Username:";
const Region = "Region:";
const AccountID = "Acc ID:";

export class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxToggle : null,
            payload : {}
        };
    }

    onCheckboxToggle = () => {
        this.setState((currState) => {
            if(currState.checkboxToggle)
                return { checkboxToggle: null};
            else return { checkboxToggle: "checkbox-toggled" };
        });
    };

    onInputChange = (target, data) => {
        let obj = {};
        obj[target] = data;
        this.setState((prevState) => ({
            payload: Object.assign({}, prevState.payload, obj)
        }));
    };

    onUsernameChange = (e) => {
        this.onInputChange("username", e.target.value);
    };

    onRegionChange = (e) => {
        this.onInputChange("region", e.target.value);
    };

    onAccIDChange = (e) => {
        this.onInputChange("id", e.target.value);
    };

    onFormSubmit = () => {
        this.props.onSubmit(this.state.payload);
    };

    render = () => (
        <div className="form">
            <p className="subdivider">Account</p>
            <div className="form-container">
                <div className="form-input">
                    <p className="form-input-text">{Username}</p>
                    <input className="form-input-value" placeholder={Username} onChange={this.onUsernameChange}/>
                </div>
                <div className="form-input">
                    <p className="form-input-text">{Region}</p>
                    <input className="form-input-value" placeholder={Region} onChange={this.onRegionChange}/>
                </div>
                <div className="form-input">
                    <p className="form-input-text">{AccountID}</p>
                    <input className="form-input-value" placeholder={AccountID} onChange={this.onAccIDChange}/>
                </div>
            </div>
            <div className="form-action">
                <button className="form-submit" onClick={this.onFormSubmit}>FETCH</button>
                <div className="form-update">
                    <label className="form-update-label">Keep Updated</label>
                    <div className={"form-update-checkbox " + this.state.checkboxToggle} onClick={this.onCheckboxToggle}>
                        {
                            this.state.checkboxToggle ? (
                                <img src={checked} className="form-update-checkbox-done" alt="#"/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    "onSubmit" : (payload) => dispatch(ACTIONS.FETCH_PROFILE(payload))
});

export default connect(null, mapDispatchToProps)(Form);