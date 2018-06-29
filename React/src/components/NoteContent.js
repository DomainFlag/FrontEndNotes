import React from "react"
import {Component} from "react"

class NoteContent extends Component {
    render = () => {

        return (
            <div className="container-modal">
                {
                    this.props.type === "SNIPPET" ? (
                        <div className="note">
                            <div className="note-content">
                                <div className="description">
                                    {this.props.value.snippet}
                                </div>
                            </div>
                            <div className="divider"/>
                            <div className="note-content">
                                {this.props.value.demo}
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
                    )}
                    </div>
        )
    };
}

export default NoteContent;