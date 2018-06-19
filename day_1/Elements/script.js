const noteClassName = "note";

const snippets = [
    `
    let counter = 0;
    let times = 0;
    let element = <h1>{counter}</h1>;
    
    setInterval(() => {
        ReactDOM.render(
            element,
            document.querySelector("#root")
        );
    
        element = <h1>{counter}</h1>;
    
        if(times++ === 4) {
            times = 0;
            counter++;
        }
    }, 1000);
`
];

const notes = [
    "React elements are immutable. Once you create an element, you can’t change its children or attributes.\n" +
    "With our knowledge so far, the only way to update the UI is to create a new element, and pass it to ReactDOM.render(), is it so? so far? yes, for now, but not further.",

    "In practice, most React apps only call ReactDOM.render() once. In the next sections we will learn how such code \n" +
    "gets encapsulated into stateful components.",

    "React Only Updates What’s Necessary\n" +
    "React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary \n" +
    "to bring the DOM to the desired state."
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

let pre_processing = <div className="pre_processing sub_container">
    <div className="sub_container_content">
        {notesContainer}
        <div className="snippets">
            {snippetsContainer}
        </div>
    </div>
</div>;

let counter = 0;
let times = 0;

setInterval(() => {
    let reactElement = <p className="counter">{counter}</p>

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

    if(times++ === 5) {
        times = 0;
        counter++;
    }
}, 1000);