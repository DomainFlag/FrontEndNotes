import {combineReducers} from "redux"
import title from "./title"
import profile from "./profile"
import ladders from "./ladders"
import matches from "./matches"

export default combineReducers({
    title,
    profile,
    ladders,
    matches
})