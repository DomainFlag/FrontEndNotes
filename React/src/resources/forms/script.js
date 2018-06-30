import React from "react"
import {Component} from "react"
import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

const TASKS = {
    max : 6,
    tasks : [
        {
            "id" : 1,
            "title" : "Learn React",
            "motivation" : 5
        }, {
            "id" : 2,
            "title" : "Learn Redux library",
            "motivation" : 5
        }, {
            "id" : 3,
            "title" : "Learn Python and Machine Learning & Deep Learning techniques.",
            "motivation" : 5
        }, {
            "id" : 4,
            "title" : "Learn better Android.",
            "motivation" : 5
        }, {
            "id" : 5,
            "title" : "Refactor Ink-Man project with WebGL with new interactions and through the" +
            " use of React and WebGL.",
            "motivation" : 5
        }, {
            "id" : 6,
            "title" : "Refactor CUC project with solid Client/Server side, new features and" +
            " interaction, use of A.I for managing responses both for Android & Web.",
            "motivation" : 5
        }, {
            "id" : 7,
            "title" : "Refactor StarCannon with eye candy graphics, better performance and use" +
            " of A.I for playability.",
            "motivation" : 6
        }, {
            "id" : 8,
            "title" : "Create StarCraft III.",
            "motivation" : 4
        }, {
            "id" : 9,
            "title" : "Refactor personal website with an interface visually and aesthetically" +
            " refreshing and both charming and sublime.",
            "motivation" : 5
        }
    ]
};

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button onClick={this.props.clickHandler} className="button">
            {this.props.textValue}
        </button>;
    }
}

class TaskManager extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div>
            <p className="tasks_intake">Total motivational score: {this.props.tasks.reduce((acc, task) => acc+task.motivation, 0)}</p>
            {
                this.props.tasks.map(
                    (task) => (
                        <div key={task.id} className="task">
                            <p className="task_mark">
                                {task.motivation}
                            </p>
                            <p className="task_title">
                                {task.title}
                            </p>
                        </div>
                    )
                )
            }
        </div>
    )
}

const NotesContainer = {
    "header" : {
        "title" : "Forms"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "Because HTML form elements naturally keep some internal state we can manage" +
            " them by transferring its mutable state in the state property of components and" +
            " update it with setState method and establish it as the single source of truth."
        }, {
            id: 2,
            type: NOTE,
            value: "Single source of truth - is the practice of structuring information models" +
            " and associated data schema such that every data element is stored exactly once." +
            " Any possible linkages to this data element are by reference only. Because all" +
            " other locations of the data just refer back to the primary \"source of truth\"" +
            " location, updates to the data element in the primary location propagate to the" +
            " entire system without the possibility of a duplicate value somewhere being" +
            " forgotten."

        }, {
            id: 3,
            type: NOTE,
            value: "Keys only make sense in the context of the surrounding array manipulation" +
            " scope but they must be unique among siblings, but globally not when they are" +
            " referenced by lists part of estranged React components."
        }, {
            id: 4,
            type: SNIPPET,
            value: {
                snippet : null,
                demo : <TaskManager {...TASKS}/>
            }
        }]
    }
};

export default NotesContainer;