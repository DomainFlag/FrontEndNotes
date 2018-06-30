import React from "react"
import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

let label = <p className="label">
    React Element
</p>;

let reactElement = React.createElement(
    "button",
    {
        style: {
            backgroundColor: "red"
        },
        className: "button"
    },
    'Click Me'
);

class JSXElements extends React.Component {
    render = () => (
        <div>
            {label}
            {reactElement}
        </div>
    );
}

const NotesContainer = {
    "header" : {
        "title" : "Forms"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "JSX is a preprocessor step that adds XML syntax to JavaScript. You can" +
            " definitely use React without JSX but JSX makes React a lot more elegant."
        }, {
            id: 2,
            type: NOTE,
            value: "Just like XML, JSX tags have a tag name, attributes, and children. If an" +
            " attribute value is enclosed in quotes, the value is a string. Otherwise, wrap the" +
            " value in braces and the value is the enclosed JavaScript expression."

        }, {
            id: 3,
            type: SNIPPET,
            value: {
                snippet : null,
                demo : <JSXElements/>
            }
        }]
    }
};

export default NotesContainer;