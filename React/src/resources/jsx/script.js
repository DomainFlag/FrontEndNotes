const noteClassName = "introduction";

const snippets = [
    `
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
`, `
ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);
`
];

const notes = [
    "JSX is a preprocessor step that adds XML syntax to JavaScript. You can definitely use React without JSX but JSX makes React a lot more elegant.",
    "Just like XML, JSX tags have a tag name, attributes, and children.\n" +
    "If an attribute value is enclosed in quotes, the value is a string. Otherwise, wrap the value in braces and the value is the enclosed JavaScript expression."
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
    {reactElement}
</div>;

ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);