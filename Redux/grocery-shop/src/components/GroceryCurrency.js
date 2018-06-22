import React from "react"
import {connect} from "react-redux"
import {ACTIONS} from "./../reducers/currency"

import CurrencyAdder from "./../assets/add.svg"

export class GroceryCurrency extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            usedCurrency: this.props.usedCurrency,
            inputValue: "",
            value: null,
            toggleCurrencyModifier: "none"
        });
    }

    changeUsedCurrency = (e) => {
        this.setState({ usedCurrency : e.target.childNodes[e.target.selectedIndex].value }, () => {
            this.props.changeCurrency(this.state.usedCurrency);
        });
    };

    onChangeValue = (e) => {
        this.setState({ inputValue : e.target.value });
    };

    toggleCurrency = (e) => {
        if(this.state.toggleCurrencyModifier === "initial")
            this.setState({
                toggleCurrencyModifier: "none"
            });
        else this.setState({
            toggleCurrencyModifier: "initial"
        });
    };

    addNewCurrency = () => {
        this.props.addCurrency([
            this.state.inputValue
        ]);
    };

    render() {
        return <div className="currencies">
            <label className="availableCurrenciesLabel">Used currency:</label>
            <select className="availableCurrencies" defaultValue={this.props.usedCurrency} onChange={this.changeUsedCurrency}>
                {this.props.availableCurrencies.map((currency, index) => (
                    <option key={index} className="availableCurrency">{currency.currency}</option>
                ))}
            </select>
            <div className="currency-modifier">
                <img className="content-adder" src={CurrencyAdder} onClick={this.toggleCurrency}/>
                <div className={`content-form ${this.state.value}`} style={{display: this.state.toggleCurrencyModifier}}>
                    <input className="form-input" type="text" onChange={this.onChangeValue} value={this.state.inputValue} placeholder="Currency here..."/>
                    <button className="form-submit" onClick={this.addNewCurrency}>ADD</button>
                </div>
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrency : (inputValue) => dispatch(ACTIONS.CHANGE_CURRENCY(inputValue)),
        addCurrency : (currencies) => dispatch(ACTIONS.CHANGE_AVAILABLE_CURRENCIES(currencies))
    }
};

const mapStateToProps = (state) => {
    return {
        "availableCurrencies" : state.currency.availableCurrencies,
        "usedCurrency" : state.currency.usedCurrency
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroceryCurrency);