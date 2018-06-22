import React from "react"
import GroceryName from "./GroceryName"
import GroceryCurrency from "./GroceryCurrency"

import GroceryImage from "./../assets/groceries.svg"

const Header = () => (
    <div className="header">
        <img src={GroceryImage} className="grocery-image"/>
        <GroceryName/>
        <GroceryCurrency/>
    </div>
);

export default Header;