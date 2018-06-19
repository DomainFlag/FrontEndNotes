const noteClassName = "note";

const snippets = [
    `
class Clock extends React.Component {
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
`, `
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

    render() {
        return <h1 className="date">
            {this.state.date.toUTCString()}
        </h1>
    }
}
`
];

const notes = [
    "However, during the last lessons we managed the dynamic interaction, basically updating the component by actually rerendering: In contrast we can manage the lifecycle of the component and control its state.",
    "Ideally we want to write this once and have the Component update itself: thus we'll have a Clock component implemented to update itself, the time, as a courtesy of its implementation.",
    "To implement this, we need to add “state” to the Clock component. State is similar to props, but it is private and fully controlled by the component. Thus, the objects instances that extends the React.Component have a special private state object that can be updated by the setState method, so the component automatically rerenders by itself. \n" +
    "Even though, props(properties) and state both manages the output of a React component, they are distinct to each other by the fact that the props are supplied externally and state is managed only internally. \n" +
    "Do not modify state directly & use setState internal method.",
    "State updates may be asynchronous, thus in order to synchronize we can provide a callback function with prevState and props parameters that represents the most current state of the component",
    "State updates are merged, thus you can update state properties independently.",
    "Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class."
];

let notesContainer = [];
let snippetsContainer = [];

notes.forEach((note) => {
    notesContainer.push(<p className={noteClassName}>{note}</p>);
});

snippets.forEach((snippet) => {
    snippetsContainer.push(<pre>{snippet}</pre>);
});

let label = <p className="label">
    React Component with internal state
</p>;

class Clock extends React.Component {
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

    render() {
        return <h1 className="date">
            {this.state.date.toUTCString()}
        </h1>
    }
}

let pre_processing = <div className="pre_processing sub_container">
    <div className="sub_container_content">
        {notesContainer}
        <div className="snippets">
            {snippetsContainer}
        </div>
    </div>
</div>;

let post_processing = <div className="post_processing sub_container">
    {label}
    <Clock />
</div>;

ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);