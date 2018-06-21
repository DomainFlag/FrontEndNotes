import React from "react"
import GroceryName from "./../containers/GroceryName"
import Currency from "../containers/GroceryCurrency"

const Header = ({ groceryName }) => {
    return <div>
        <GroceryName/>
        <Currency/>
    </div>
};

export default Header;