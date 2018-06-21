import React from "react"
import {connect} from "react-redux"
import GroceryCurrency from "./../components/GroceryCurrency"


const mapStateToProps = (state) => {
    return {
        "availableCurrencies" : state.currency.availableCurrencies,
        "usedCurrency" : state.currency.usedCurrency
    }
};

export default connect(mapStateToProps)(GroceryCurrency);