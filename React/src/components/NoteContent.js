import {Component} from "react"

class NoteContent extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="container-modal">
            {
                this.props.type === "SNIPPET" ? (
                    <div className="note">
                        <div className="note-content">
                            <div className="description">
                                {this.props.value.header}
                            </div>
                        </div>
                        <div className="divider"/>
                        <div className="note-content">
                            <pre className="demo">
                                {this.props.value.demo}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="note">
                        <div className="note-content">
                            <div className="description">
                                {this.props.value}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default NoteContent;