import React from "react"
import {Component} from "react"

class NoteContent extends Component {
    render = () => {

        return (
            <div className="container-modal">
                {
                    this.props.type === "SNIPPET" ? (
                        <div className="note">
                            {
                                this.props.value.snippet ? (
                                    <div className="note-content">
                                        <div className="description">
                                            {this.props.value.snippet}
                                        </div>
                                    </div>
                                ) : null
                            }
                            {
                                Object.keys(this.props.value)
                                    .every((key) => this.props.value[key] != null) ? (
                                    <div className="divider"/>
                                ) : null
                            }
                            {
                                this.props.value.demo ? (
                                    <div className="note-content">
                                        {this.props.value.demo}
                                    </div>
                                ) : null
                            }
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