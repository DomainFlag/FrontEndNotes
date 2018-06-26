import React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import "./Ladders.sass"

export class Ladders extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.ladders);
    }

    render = () => (
        <div className="ladders">
            {
                this.props.ladders.map((ladder, index1) => (
                    <div key={index1} className="ladder">
                        {
                            ladder.ladder.map((ladd, index2) => (
                                <div key={index2} className="ladder-extra">
                                    <div className="row">
                                        <p className="ladder-ladderName">{ladd.ladderName}</p>
                                        <p className="ladder-division">{ladd.division}</p>
                                        <p className="ladder-rank">{ladd.rank}</p>
                                    </div>
                                    <div className="row">
                                        <p className="ladder-league">{ladd.ladderName}</p>
                                        <p className="ladder-matchMakingQueue">{ladd.division}</p>
                                        <p className="ladder-rank">{ladd.rank}</p>
                                    </div>
                                    <div className="row">
                                        <p className="ladder-wins">{ladd.wins}</p>
                                        <p className="ladder-losses">{ladd.losses}</p>
                                        <p className="ladder-showcase">{ladd.showcase}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    ladders: state.ladders.currentSeason
});

export default connect(mapStateToProps)(Ladders);