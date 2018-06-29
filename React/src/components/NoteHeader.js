import {Component} from "react"

class NoteHeader extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="header">
            <p className="header-text">
                {this.props.title}
            </p>
        </div>
    );
}

export default NoteHeader;
