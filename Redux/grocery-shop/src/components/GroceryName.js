import React from "react"
import {connect} from "react-redux"

export const GroceryName = ({ groceryName }) => (
    <p className="grocery-name">{groceryName}</p>
);

const mapStateToProps = (state) => {
    return {
        "groceryName" : state.groceryName
    }
};

export default connect(mapStateToProps)(GroceryName)