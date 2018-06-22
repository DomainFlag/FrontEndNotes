import { combineReducers } from "redux"
import {currency} from "./currency"
import {products} from "./products"
import {groceryName} from "./groceryName"

export default combineReducers({
    groceryName,
    products,
    currency
});