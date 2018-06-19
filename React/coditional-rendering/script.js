const noteClassName = "note";

const snippets = [];
const notes = [
    "Conditional rendering in React works through the use of JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them." + "\n",
    "You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output remains intact." + "\n",
    "You may embed any expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator. It can be handy for conditionally including an element by using ternary operator or even {condition && react element} and " +
    "it works well because in JavaScript, true && expression always evaluates to expression, thus React will render it, and false && expression always evaluates to false which React will ignore and skip it." + "\n"
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
    Conditional in React
</p>;

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button onClick={this.props.clickHandler} className={"button" + " " + this.props.type}>
            {this.props.textValue}
        </button>;
    }
}

class LoggingSystem extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text;
        this.state = {"auth" : "login"};
    }

    clickHandler = () => {
        if(this.state.auth !== "login")
            this.setState({"auth" : "login"});
        else this.setState({"auth" : "logout"});
    };

    render() {
        return <div className="authentication">
            {
                this.state.auth === "login" ?
                    <div>
                        <Button clickHandler={this.clickHandler} type="auth" textValue="Login"/>
                        <Button clickHandler={this.clickHandler} type="auth" textValue="Sign Up"/>
                    </div> :
                    <Button clickHandler={this.clickHandler} type="log_out" textValue="Log Out"/>
            }
        </div>
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
    <LoggingSystem/>
</div>;

ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);