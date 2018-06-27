import React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import "./Matches.sass"

export class Matches extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="matches">
            {
                this.props.matches.map((match, index) => (
                    <div key={index} className="match">
                        <div className="row">
                            <p className="match-map">{match.map}</p>
                            <p className="match-type">{match.type}</p>
                            <p className="match-decision">{match.decision}</p>
                        </div>
                        <div className="row">
                            <p className="match-speed">{match.speed}</p>
                            <p className="match-data">{match.data}</p>
                            <p className="match-decision">{match.decision}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    "matches" : state.matches
});

export default connect(mapStateToProps, null)(Matches);