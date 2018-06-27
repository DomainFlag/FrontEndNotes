const noteClassName = "introduction";

const snippets = [];
const notes = [
    "Because HTML form elements naturally keep some internal state we can manage them by" +
    " transferring its mutable state in the state property of components and update it with" +
    " setState method and establish it as the single source of truth." + "\n",

    "Single source of truth - is the practice of structuring information models and associated" +
    " data schema such that every data element is stored exactly once. Any possible linkages to" +
    " this data element are by reference only. Because all other locations of the data just" +
    " refer back to the primary \"source of truth\" location, updates to the data element in the" +
    " primary location propagate to the entire system without the possibility of a duplicate" +
    " value somewhere being forgotten." + "\n",

    "Controlled Content - " + "\n",

    "Keys only make sense in the context of the surrounding array manipulation scope but they" +
    " must be unique among siblings, but globally not when they are referenced by lists part of" +
    " estranged React components."
];

let notesContainer = [];
let snippetsContainer = [];

notes.forEach((note, index) => {
    notesContainer.push(<p key={index} className={noteClassName}>{note}</p>);
});

snippets.forEach((snippet, index) => {
    snippetsContainer.push(<pre key={index}>{snippet}</pre>);
});

let label = <p className="label">
    List and Keys
</p>;

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button onClick={this.props.clickHandler} className="button">
            {this.props.textValue}
            </button>;
    }
}

const taskmanager = {
    max : 6,
    tasks : [
        {
            "id" : 1,
            "title" : "Learn React - a declarative, efficient, and flexible JavaScript library for" +
            " building user interfaces.",
            "motivation" : 5
        }, {
            "id" : 2,
            "title" : "Learn Redux JS library - a predictable state container for JavaScript" +
            " apps for building user interfaces.",
            "motivation" : 5
        }, {
            "id" : 3,
            "title" : "Learn Python and Machine Learning & Deep Learning techniques.",
            "motivation" : 5
        }, {
            "id" : 4,
            "title" : "Learn Android and upload Android projects into Android Market.",
            "motivation" : 5
        }, {
            "id" : 5,
            "title" : "Refactor Ink-Man project with WebGL with new interactions and through the" +
            " use of React and WebGL(Monument Valley style).",
            "motivation" : 5
        }, {
            "id" : 6,
            "title" : "Refactor CUC project with solid Client/Server side, new features and" +
            " interaction, use of A.I for managing responses both for Android & Web.",
            "motivation" : 5
        }, {
            "id" : 7,
            "title" : "Refactor StarCannon with eye candy graphics, better peformance and A.I bot.",
            "motivation" : 6
        }, {
            "id" : 8,
            "title" : "Create StarCraft III.",
            "motivation" : 4
        }, {
            "id" : 9,
            "title" : "Refactor my website with an interface visually and aesthetically" +
            " refreshing and both charming and sublime.",
            "motivation" : 5
        }
    ]
};

class TaskManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tasks = this.props.tasks.map(
            (task) => {
                return <div key={task.id} className="task">
                    <p className="task_stars">
                        {
                            ((task) => {
                            let stars = [];
                            let g;

                            for(g = 0; g < task.motivation; g++) {
                                stars.push(<img className="star" src="assets/star_new.svg"/>)
                            }

                            for(; g < this.props.max; g++) {
                                stars.push(<img className="star" src="assets/star_faded.svg"/>);
                            }

                            return stars;
                            })(task)
                        }
                    </p>
                    <p className="task_title">
                        {task.title}
                    </p>
                </div>
            }
        );

        return <div>
            {tasks}
            <p>Total motivational score: {this.props.tasks.reduce((acc, task) => acc+task.motivation, 0)}</p>
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
    <TaskManager tasks={taskmanager.tasks} max={taskmanager.max}/>
</div>;

ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);