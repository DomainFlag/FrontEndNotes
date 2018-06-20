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
    currency : {
        availableCurrencies : [
            DOLLAR, MDL
        ],
        usedCurrency : DOLLAR
    },
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
    }),
    CHANGE_NAME : () => ({
        type : "CHANGE_NAME", name : "Fruit Store"
    }),
    CHANGE_CURRENCY : () => ({
        type : "CHANGE_CURRENCY", usedCurrency : "MDL"
    }),
    CHANGE_AVAILABLE_CURRENCIES : () => ({
        type : "CHANGE_AVAILABLE_CURRENCIES", availableCurrencies : ["€", "£"]
    })
};

const REDUCERS = {
    ADD_PRODUCT : (state, action) => {
        let newState = Object.assign({}, state);
        newState.products = newState.products.concat([{ productName : action.productName, productPrice : action.productPrice }]);

        return newState;
    },
    CHANGE_PRICE : (state, action) => {
        let newState = Object.assign({}, state);

        newState.products = newState.products.map((product) => {
            if(product.productName === action.productName) {
                return { productName : action.productName, productPrice : action.productPrice };
            } else return product;
        });

        return newState;
    },
    CHANGE_NAME : (state, action) => {
        return action.name;
    },
    CHANGE_CURRENCY : (state, action) => {
        let newState = Object.assign({}, state);

        if(newState.availableCurrencies.indexOf(newState.usedCurrency) !== -1)
            newState.usedCurrency = action.usedCurrency;

        return newState;
    },
    CHANGE_AVAILABLE_CURRENCIES : (state, action) => {
        let newState = Object.assign({}, state);

        action.availableCurrencies.forEach((currency) => {
            if(newState.availableCurrencies.indexOf(currency) !== -1)
                newState.availableCurrencies = newState.availableCurrencies.concat(currency);
        });

        return newState;
    },
};

const GROCERY_REDUCER = (state, action) => {
    if(REDUCERS.hasOwnProperty(action.type)) {
        let newState = Object.assign({}, state);

        newState.name = REDUCERS[action.type](state.name, action);
        newState.currency = REDUCERS[action.type](state.currency, action);
        newState.products = REDUCERS[action.type](state.products, action);

        return newState;
    } else return state;
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
            "header" : "It’s just a function that takes state and action as arguments, and returns the next state as" +
            " a new instance deferenced from initial state of the app with the specific action being carried out and" +
            " respecting all the principles of Immutability of the corresponding object.",
            "demo" : [
                objToStr(REDUCERS)
            ]
        }
    }, {
        id : 10,
        type : NOTE,
        value : "Immutability required by Redux employs shallow equality checking for reference changes by enabling" +
        " data being handled safer and know  if any connected React components are to be updated correctly. Shallow " +
        "equality checking (or reference equality) simply checks if two different variables reference the same object, " +
        "thus the component doesn't need to be updated or otherwise it would. If the reducer returns a new object, the " +
        "shallow equality check will fail, and combineReducers will set a hasChanged flag to true. You cannot mutate an " +
        "immutable object; instead, you must mutate a copy of it, leaving the original intact. \n" +
        "Note: shallow copying via Object.assign() only copies the top-level of the object, so nested objects aren’t" +
        " copied thus we need to handle it too. For deep cloning, we need to use other alternatives because" +
        " Object.assign() copies property values. If the source value is a reference to an object like Array or" +
        " Object,  it only copies that reference value, but it's not the case for the immutable objects like" +
        " primitives  that state cannot be changed like String, Numbers, Booleans, null, undefined."
    }, {
        id : 9,
        type : SNIPPET,
        value : {
            "header" : "And we write another reducer that manages the complete state of our app by calling all our" +
            " reducers for the corresponding state keys",
            "demo" : [
                objToStr(GROCERY_REDUCER)
            ]
        }
    }]
};

const RandomString = "Single source of truth - App's state is stored only once within a single store, single handedly" +
    " the next state of the view and makes easier.\n" +
    "\n" +
    "State is read-only - The only way to changes its state through the intent of emitting an action.\n" +
    "\n" +
    "Changes are made with pure functions - Thus the state won't be changed internally and a new changed instance" +
    " will be given back with desired changes. ";

const View = {
    SNIPPET : (note) => {
        return <div key={note.id} className="snippet">
            <div className="snippet-header">
                {note.value.header}
            </div>
            <div className="snippet-demo">
                {
                    note.value.demo instanceof Array ?
                    note.value.demo.map((demo) =>
                        <pre>
                            {demo}
                        </pre>
                    ) :
                        <pre>
                            {note.value.demo}
                        </pre>
                }
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
