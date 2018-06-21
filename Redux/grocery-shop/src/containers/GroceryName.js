import React from "react"
import {connect} from "react-redux"
import GroceryName from "./../components/GroceryName"

const mapStateToProps = (state) => {
    return {
        "groceryName" : state.groceryName
    }
};

export default connect(mapStateToProps)(GroceryName);