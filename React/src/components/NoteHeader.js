import React from "react"
import {Component} from "react"

class NoteHeader extends Component {

    render = () => (
        <div className="header">
            <p className="header-text">
                {this.props.title}
            </p>
        </div>
    );
}

export default NoteHeader;
