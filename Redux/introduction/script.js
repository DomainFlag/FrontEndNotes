const DOLLAR = "$";
const MDL = "MDL";

const CONVERSION = {
    default : DOLLAR,
    other : {
        MDL : 16.78
    }
};

const SNIPPET = "SNIPPET";
const NOTE = "NOTE";

const Grocery = {
    name : "Vegan Store",
    availableCurrencies : [
        DOLLAR, MDL
    ],
    usedCurrency : DOLLAR,
    products : [
        {
            "productName" : "Mango",
            "productPrice" : 6.15
        }, {
            "productName" : "Apple",
            "productPrice" : 2.34
        }, {
            "productName" : "Pineapple",
            "productPrice" : 4.78
        }
    ]
};

const ACTIONS = {
    ADD_PRODUCT : () => ({
        type : "ADD_PRODUCT", productName : "Orange", productPrice : 3.56
    }),
    CHANGE_PRICE : () => ({
        type : "CHANGE_PRICE", productName : "Mango", productPrice : 6.25
    })
};

const REDUCER = {

};

let NotesContainer = {
    "title" : "Introduction",
    "notes" : [{
        id : 1,
        type : NOTE,
        value : "Single-page applications have become increasingly complicated, our code must manage more state" +
        " than ever: server responses, cached data, locally created state of data, active Redux routes and various" +
        " DOM components."
    }, {
        id : 2,
        type : NOTE,
        value : "An environment where the state of user interface is in a ever changing mode it's hard to keep track" +
        " of state changed in ever changing through cascade mode-view updates of state."
    }, {
        id : 3,
        type : NOTE,
        value : "Libraries like React attempt to solve this problem in the view layer by removing both asynchrony" +
        " and direct DOM manipulation. However, managing the state of your data is left up to you, thus Redux enters" +
        "which will help us make state mutations(changes) predictable by imposing restrictions when and how updates" +
        " should be taken."
    }, {
        id : 4,
        type : NOTE,
        value : "Any app can be described by a state object that acts as a model that updates the view, except we" +
        " don't actually define any setters in an usual JS vanilla app, this can become root of various unexpected" +
        " bugs. To change the state in our App we'll need to dispatch actions - speed in carrying out action, by all" +
        " these means they will be well defined type of actions that we will certainly know what is" +
        " happening in the App' state internally and to be able to track the root of our problem."
    }, {
        id : 5,
        type : SNIPPET,
        value : {
            "header" : "Grocery App' state - basic model that does not do anything to the view but defines its content",
            "demo" : objToStr(Grocery)
}
    }, {
        id: 6,
        type : NOTE,
        value : "As you can see our App' state looks bleak for now and motionless, thus you can't change it and" +
        " there cannot be fun running a grocery store without being able to add new fruits & vegetables or even" +
        " change current prices for our store, thus Actions come to help"
    }, {
        id: 7,
        type : NOTE,
        value : "An action is a plain JavaScript object that describes what should happen and" +
        " how a specific change  will happen to the current state of our App(Store). It can be" +
        " any meaningful action that can be useful to our store either to add a new fruit" +
        " or delete one or even change its prices."
    }, {
        id : 8,
        type : SNIPPET,
        value : {
            "header" : "Some Action examples that might be useful for us to change our Grocery App' state, it can be" +
            " expressed into a JS object that describes the type of change we are expecting and the actual change to" +
            " the state object.",
            "demo" : objToStr(ACTIONS)
        }
    }, {
        id : 9,
        type : NOTE,
        value : "An action only describes what should happen and what will happen to" +
            " the application's state, but it doesn't handle any change by itself. That's why" +
            " reducers come to play that will specify how the application's state changes in" +
            " response to actions sent to the store."
    }, {
        id : 9,
        type : SNIPPET,
        value : {
            "header" : "It’s just a function that takes state and action as arguments, and" +
            " returns the next state as a new instance deferenced from initial state of the app" +
            " with the specific action being carried out.",
            "demo" : objToStr(REDUCER)
        }
    }]
};

const View = {
    SNIPPET : (note) => {
        return <div key={note.id} className="snippet">
            <div className="snippet-header">
                {note.value.header}
            </div>
            <div className="snippet-demo">
                <pre>
                    {note.value.demo}
                </pre>
            </div>
        </div>;
    },
    NOTE : (note) => {
        return <p key={note.id} className="note">
            {note.value + "\n\n"}
        </p>;
    }
};



class NotesManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.notes.map((note) => {
            if(View.hasOwnProperty(note.type))
                return View[note.type](note);
            else return null;
        });
    }
}

ReactDOM.render(
    <div className="container">
        <div className="header">
            <p className="header-title">
                {NotesContainer.title}
            </p>
        </div>
        <div className="contents">
            <div className="content">
                <div className="content-container demos">

                </div>
            </div>
            <div className="content">
                <div className="content-container notes">
                    <NotesManager notes={NotesContainer.notes}/>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById("root")
);
