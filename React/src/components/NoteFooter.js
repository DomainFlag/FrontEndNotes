import React from "react"
import {Component} from "react"

import gear_main from "./../assets/gear-main.svg"
import gear_secondary from "./../assets/gear-secondary.svg"
import gear_connector from "./../assets/gear-connector.svg"

class NoteFooter extends Component {
    render = () => (
        <div className="footer">
            <div className="footer-gear">
                <img src={gear_main} className="gear-main" alt="#"/>
                <img src={gear_secondary} className="gear-secondary" alt="#"/>
                <img src={gear_connector} className="gear-connector" alt="#"/>
            </div>
            <p className="footer-text">© 2018 Cristian Chivriga. All rights reserved.</p>
        </div>
    )
}


export default NoteFooter;