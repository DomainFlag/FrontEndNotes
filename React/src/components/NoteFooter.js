import {Component} from "react"

class NoteFooter extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="footer">
            <div className="footer-gear">
                <img src="./assets/gear-main.svg" className="gear-main"/>
                <img src="./assets/gear-secondary.svg" className="gear-secondary"/>
                <img src="./assets/gear-connector.svg" className="gear-connector"/>
            </div>
            <p className="footer-text">© 2018 Cristian Chivriga. All rights reserved.</p>
        </div>
    )
}


export default NoteFooter;