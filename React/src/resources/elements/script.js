import React from "react"
import {Component} from "react"
import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            counter: null
        }
    }

    componentWillMount() {
        this.setState({
            counter: setInterval(() => {
                this.setState((prevState) => ({
                    count: prevState.count + 1
                }))
            }, 1000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.counter);
    }

    getPaddedNumber = (number) => {
        return number.toString().padStart(2, "0");
    };

    getTime = () => {
        let seconds = this.state.count % 60;
        let minutes = (this.state.count-seconds) / 60 % 60;
        let hours = (this.state.count-seconds-minutes*60) / 3600 % 24;

        return `${this.getPaddedNumber(hours)}h:${this.getPaddedNumber(minutes)}m:${this.getPaddedNumber(seconds)}s`
    };

    render = () => (
        <p className="counter">{this.getTime()}</p>
    );
}

const NotesContainer = {
    "header" : {
        "title" : "React Elements"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "React elements are immutable. Once you create an element, you can’t change" +
            " its children or attributes. With our knowledge so far, the only way to update the" +
            " UI is to create a new element, and pass it to ReactDOM.render(), is it so? so far?" +
            " yes, for now, but not further."
        }, {
            id: 2,
            type: NOTE,
            value: "In practice, most React apps only call ReactDOM.render() once. In the next" +
            " sections we will learn how such code gets encapsulated into stateful components."
        }, {
            id: 3,
            type: NOTE,
            value: "React Only Updates What’s Necessary React DOM compares the element and its" +
            " children to the previous one, and only applies the DOM updates necessary to bring" +
            " the DOM to the desired state."
        }, {
            id: 4,
            type: SNIPPET,
            value: {
                snippet : null,
                demo : <Counter/>
            }
        }]
    }
};

export default NotesContainer;