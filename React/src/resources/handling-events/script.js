import React from "react"
import {Component} from "react"
import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

class Label extends Component {
    constructor(props) {
        super(props);
        this.text = props.text;
    }

    render = () => (
        <p className="label">{this.text}</p>
    )
}

class Button extends Component {
    constructor(props) {
        // Calling the super Constructor
        super(props);
    }

    // Babel automatically transpiles it to a function attached to the context of the object instance
    handleClick = () => {
        alert("Yeah!");
    };

    render = () => (
        <div className="event">
            <button className="button" onClick={this.handleClick}>
                Click me!
            </button>
        </div>
    )
}

class ColorPicker extends Component {
    constructor(props) {
        // Calling the super Constructor - Component
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

    render = () => (
        <div className="event">
            <p>{this.state.color}</p>
            <canvas id="palette" onMouseMove={this.detectColorRegion.bind(this)}/>
        </div>
    )
}

class EventParade extends Component {
    render = () => (
        <div className="events">
            <div className="event-container">
                <Label text="Click Event"/>
                <Button />
            </div>
            <div className="event-container">
                <Label text="OnMouseMove Event"/>
                <ColorPicker width="150" height="30" rate="10"/>
            </div>
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
            value: "Handling events with React elements especially with JSX you pass a function" +
            " as the event handler, rather than a string."
        }, {
            id: 2,
            type: NOTE,
            value: "By defining a component by ES6 class usage, event handler may be a class'" +
            " method defined as an arrow function, no more context binding headache."

        }, {
            id: 3,
            type: NOTE,
            value: "Passing arguments to Event Handlers can be done by calling inner method or" +
            " by binding by attaching a context with desired arguments to newly created function."
        }, {
            id: 4,
            type: SNIPPET,
            value: {
                snippet : null,
                demo : <EventParade/>
            }
        }]
    }
};

export default NotesContainer;