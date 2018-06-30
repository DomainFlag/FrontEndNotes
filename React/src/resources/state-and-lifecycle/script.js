import React from "react"
import {Component} from "react"
import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

class Clock extends Component {
    constructor(props) {
        // Invoke the super class constructor React.Component with the props object
        super(props);
        // Initialize the state object
        this.state = {date: new Date()};
    }

    /**
     * Special method called during Reconciliation process
     * at DOM tree being torn down during rerendering
     * Only at the presence of the corresponding
     * React Element in the React DOM tree
     */
    componentDidMount() {
        this.timer = setInterval(
            // Note hte arrow
            () => {
                this.tick()
            }, 1000);
    }

    /**
     * Special method called during Reconciliation process
     * at DOM tree being torn down during rerendering
     * Only at the absence of the corresponding
     * React Element in the React DOM tree
     */
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render = () => (
        <h1 className="date">
            {this.state.date.toUTCString()}
        </h1>
    )
}

const NotesContainer = {
    "header" : {
        "title" : "State & Lifecycle"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "However, during the last lessons we managed the dynamic interaction," +
            " basically updating the component by actually re-rendering: In contrast we can" +
            " manage the lifecycle of the component and control its state."
        }, {
            id: 2,
            type: NOTE,
            value: "Ideally we want to write this once and have the Component update itself:" +
            " thus we'll have a Clock component implemented to update itself, basically the time," +
            " as a courtesy of its implementation."

        }, {
            id: 3,
            type: NOTE,
            value: "To implement this, we need to add “state” to the Clock component. State is" +
            " similar to props, but it is private and fully controlled by the component. Thus," +
            " the objects instances that extends the React.Component have a special private" +
            " state object that can be updated by the setState method, so the component" +
            " automatically re-renders by itself."
        }, {
            id: 4,
            type: NOTE,
            value: "Even though, props(properties) and state both manages the output of a React" +
            " component, they are distinct to each other by the fact that the props are supplied" +
            " externally and state is managed only internally."
        }, {
            id: 5,
            type: NOTE,
            value: "Do not modify state directly & use setState internal method."
        }, {
            id: 6,
            type: NOTE,
            value: "State updates may be asynchronous, thus in order to synchronize we can" +
            " provide a callback function with prevState and props parameters that represents" +
            " the most current state of the component."
        }, {
            id: 7,
            type: NOTE,
            value: "State updates are merged, thus you can update state properties independently."
        }, {
            id: 8,
            type: NOTE,
            value: "Neither parent nor child components can know if a certain component is" +
            " stateful or stateless, and they should not care whether it is defined as a" +
            " function or a class."
        }, {
            id: 9,
            type: SNIPPET,
            value: {
                snippet : null,
                demo : <Clock />
            }
        }]
    }
};

export default NotesContainer;