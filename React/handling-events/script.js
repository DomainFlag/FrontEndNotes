const noteClassName = "note";

const snippets = [];
const notes = [
    "Handling events with React elements especially with JSX you pass a function as the event handler, rather than a string.",
    "By defining a component by ES6 class usage, event handler may be a class' method defined as an arrow function, no more context binding headache.",
    "Passing arguments to Event Handlers can be done by calling inner method or by binding by attaching a context with desired arguments to newly created function."
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
    Event Handling with React
</p>;

class Label extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text;
    }

    render() {
        return <p className="sublabel">{this.text}</p>
    }
}

class Button extends React.Component {
    constructor(props) {
        // Calling the super Constructor
        super(props);
    }

    // Babel automatically transpiles it to a function attached to the context of the object instance
    handleClick = () => {
        alert("Yeah!");
    };

    render() {
        return <button className="button" onClick={this.handleClick}>
            Click me!
        </button>
    }
}

class ColorPicker extends React.Component {
    constructor(props) {
        // Calling the super Constructor
        super(props);

        this.width = props.width;
        this.height = props.height;
        this.rate = props.rate;

        this.partition = this.width/this.rate;

        this.state = {color: "Not picked yet :("};
    }

    componentDidMount() {
        let canvas = document.querySelector("#palette");
        canvas.width = this.width;
        canvas.height = this.height;

        this.leftEl = canvas.getBoundingClientRect().left;
        this.topEl = canvas.getBoundingClientRect().top;

        this.ctx = canvas.getContext("2d");
        for (let g = 0; g < canvas.width; g += this.partition) {
            this.ctx.fillStyle = "hsl(" + 360 / canvas.width * g + ", 75%, 50%)";
            this.ctx.fillRect(g, 0, g + this.partition, 300);
        }
    }

    detectColorRegion(e) {
        let posX = e.clientX - this.leftEl;
        let posY = e.clientY - this.topEl;

        let imageData = this.ctx.getImageData(posX, posY, 1, 1);
        this.setState({color: `rgb(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]})`});
    }

    render() {
        return <div>
            <p>{this.state.color}</p>
            <canvas id="palette" onMouseMove={this.detectColorRegion.bind(this)}></canvas>
        </div>
    }
}

let components = [
    <Label text="Click Event"/>,
    <Button />,
    <Label text="On mouse over"/>,
    <ColorPicker width="300" height="125" rate="10"/>
];

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
    {components}
</div>;

ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);