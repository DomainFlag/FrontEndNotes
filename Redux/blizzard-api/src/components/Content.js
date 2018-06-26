import React from "react"
import Profile from "./Profile"
import Ladders from "./Ladders"
import Matches from "./Matches"
import "./Content.sass"

const Content = () => (
    <div className="content">
        <Profile/>
        {/*<Ladders/>*/}
        {/*<Matches/>*/}
    </div>
);

export default Content;