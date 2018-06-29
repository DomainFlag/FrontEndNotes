import React from "react"
import objToStr from "./../../tools/objToStr"

import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

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

const NotesContainer = {
    "header" : {
        "title" : "Conditional Rendering"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "Conditional rendering in React works through the use of JavaScript operators" +
            "  like if or the conditional operator to create elements representing the current" +
            "  state, and let React update the UI to match them."
        }, {
            id: 2,
            type: NOTE,
            value: "You can use variables to store elements. This can help you conditionally" +
            " render  a part of the component while the rest of the output remains intact."
        }, {
            id: 3,
            type: NOTE,
            value: "You may embed any expressions in JSX by wrapping them in curly braces.  This" +
            " includes the JavaScript logical && operator. It can be handy for conditionally" +
            " including an element by using ternary operator or even {condition && react" +
            " element}  and it works well because in JavaScript, true && expression always" +
            " evaluates to expression,  thus React will render it, and false && expression" +
            " always evaluates to  false which React will ignore and skip it."
        }, {
            id: 4,
            type: SNIPPET,
            value: {
                snippet : "",
                demo : <LoggingSystem/>
            }
        }]
    }
};

export default NotesContainer;