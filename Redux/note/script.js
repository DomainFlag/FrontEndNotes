const DOLLAR = "$";
const MDL = "MDL";

const REDUCER_ACTIONS = {
    ADD_PRODUCT : (state, action) => {
        return state.concat([{ productName : action.productName, productPrice : action.productPrice }]);
    },
    UPDATE_PRICE : (state, action) => {
        return state.map((product) => {
            return product.productName === action.productName ? {
                productName : action.productName,
                productPrice : action.productPrice
            } : product;
        });
    }
};

const SNIPPET = "SNIPPET";
const NOTE = "NOTE";

const Grocery = {
    groceryName : "Vegan Store",
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
    ADD_PRODUCT : (productName, productPrice) => ({
        type : "ADD_PRODUCT", productName, productPrice
    }),
    CHANGE_PRICE : (productName, productPrice) => ({
        type : "CHANGE_PRICE", productName, productPrice
    }),
    CHANGE_NAME : (groceryName) => ({
        type : "CHANGE_NAME", groceryName
    }),
    CHANGE_CURRENCY : (usedCurrency) => ({
        type : "CHANGE_CURRENCY", usedCurrency
    }),
    CHANGE_AVAILABLE_CURRENCIES : (availableCurrencies) => ({
        type : "CHANGE_AVAILABLE_CURRENCIES", availableCurrencies
    })
};

const REDUCER_VALIDATOR = (reducerActions, state, action) => {
    if(reducerActions.hasOwnProperty(action.type))
        return reducerActions[action.type](state, action);
    else return state;
};

const groceryName = (() => {
    const REDUCER_ACTIONS = {
        CHANGE_NAME : (state, action) => {
            return action.groceryName;
        }
    };

    return (state = [], action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const products = (() => {
    const REDUCER_ACTIONS = {
        ADD_PRODUCT : (state, action) => {
            return state.concat([{ productName : action.productName, productPrice : action.productPrice }]);
        },
        UPDATE_PRICE : (state, action) => {
            return state.map((product) => {
                return product.productName === action.productName ? {
                    productName : action.productName,
                    productPrice : action.productPrice
                } : product;
            });
        }
    };

    return (state = [], action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const currency = (() => {
    const REDUCER_ACTIONS = {
        CHANGE_CURRENCY : (state, action) => {
            if(action.availableCurrencies.indexOf(state) !== -1)
                return action.usedCurrency;

            return state;
        },
        CHANGE_AVAILABLE_CURRENCIES : (state, action) => {
            let newState = Object.assign({}, state);

            action.availableCurrencies.forEach((currency) => {
                if(newState.availableCurrencies.indexOf(currency) !== -1)
                    newState.availableCurrencies = newState.availableCurrencies.concat(currency);
            });

            return newState;
        }
    };

    return (state = {}, action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const COMBINE_REDUCER = (obj) => {
    return (state, action) => {
        let newState = Object.assign({}, state);

        Object.keys(obj)
            .map(key => {
                newState[key] = obj[key](state[key], action);
            });

        for(let key in newState) {
            if(newState.hasOwnProperty(key) && state.hasOwnProperty(key)) {
                if(newState[key] !== state[key]) {
                    console.log(newState[key]);
                    return {...state, ...newState};
                }
            }
        }

        return state;
    };
};

const ROOT_REDUCER = COMBINE_REDUCER({
    groceryName,
    currency,
    products
});

const createStore = (reducer, state) => {
    class Store {
        constructor(reducer, state) {
            this.state = state || undefined;
            this.reducer = reducer;
        }

        dispatch(action) {
            this.state = this.reducer(state, action);
        }

        getState() {
            return this.state;
        }
    }

    return new Store(reducer, state);
};

let NotesContainer = {
    "header" : {
        "title" : "Introduction"
    },
    "content" : {
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
            id : 10,
            type : SNIPPET,
            value : {
                "header" : "It’s just a function that takes state and action as arguments, and returns the next state as" +
                " a new instance deferenced from initial state of the app with the specific action being carried out and" +
                " respecting all the principles of Immutability of the corresponding object.",
                "demo" : [
                    objToStr(REDUCER_ACTIONS)
                ]
            }
        }, {
            id : 11,
            type : NOTE,
            value : "Immutability required by Redux employs shallow equality checking for reference changes by enabling" +
            " data being handled safer and know  if any connected React components are to be updated correctly. Shallow " +
            "equality checking (or reference equality) simply checks if two different variables reference the same object, " +
            "thus the component doesn't need to be updated or otherwise it would. If the reducer returns a new object, the " +
            "shallow equality check will fail, and combineReducers will set a hasChanged flag to true. You cannot mutate an " +
            "immutable object; instead, you must mutate a copy of it, leaving the original intact." + "\n" +
            "Note: shallow copying via Object.assign() only copies the top-level of the object, so nested objects aren’t" +
            " copied thus we need to handle it too. For deep cloning, we need to use other alternatives because" +
            " Object.assign() copies property values. If the source value is a reference to an object like Array or" +
            " Object,  it only copies that reference value, but it's not the case for the immutable objects like" +
            " primitives  that state cannot be changed like String, Numbers, Booleans, null, undefined."
        }, {
            id : 12,
            type : SNIPPET,
            value : {
                "header" : "And we write another reducer that manages the complete state of our app by calling all our" +
                " reducers for the corresponding state keys",
                "demo" : [
                    objToStr(ROOT_REDUCER)
                ]
            }
        }, {
            id : 13,
            type : NOTE,
            value : "Note that our App' store will be our single source of truth - App's state is stored only once within" +
            " a single store, single handedly becoming us the next state of the view and makes it easier doing so.\n" +
            " Note that our state will be only read-only - The only way to changes its state through the intent of" +
            " emitting an action.\n" +
            " Changes are made with pure functions - Thus the state won't be changed internally and a new changed" +
            " instance will be given back with desired changes."
        }]
    }
};

class NoteHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="header">
            <p className="header-text">
                {this.props.title}
            </p>
        </div>
    );
}

class NoteContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="container-modal">
            {
                this.props.type === "SNIPPET" ? (
                    <div className="note">
                        <div className="note-content">
                            <div className="description">
                                {this.props.value.header}
                            </div>
                        </div>
                        <div className="divider"/>
                        <div className="note-content">
                            <pre className="demo">
                                {this.props.value.demo}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="note">
                        <div className="note-content">
                            <div className="description">
                                {this.props.value}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

class NoteFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="footer">
            <div className="footer-gear">
                <img src="./assets/gear-main.svg" className="gear-main"/>
                <img src="./assets/gear-secondary.svg" className="gear-secondary"/>
                <img src="./assets/gear-connector.svg" className="gear-connector"/>
            </div>
            <p className="footer-text">© 2018 Cristian Chivriga. All rights reserved.</p>
        </div>
    )
}

class NotesManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "pagination" : 0,
            "content" : this.props.content.notes[0]
        };
    }

    onScrollListener = (e) => {
        if(e.deltaY < 0) {
            this.setState((prevState) => {
                let pagination = prevState.pagination + 1;
                if(pagination < this.props.content.notes.length)
                    return {
                        "pagination": pagination,
                        "content": this.props.content.notes[pagination]
                    }
            });
        } else {
            this.setState((prevState) => {
                let pagination = prevState.pagination - 1;
                if(pagination >= 0 && pagination < this.props.content.notes.length)
                    return {
                        "pagination": pagination,
                        "content": this.props.content.notes[pagination]
                    }
            });
        }
    };

    render = () => (
        <div className="container" onWheel={this.onScrollListener}>
            <NoteHeader {...this.props.header}/>
            <NoteContent {...this.state.content} />
            <NoteFooter/>
        </div>
    );
}

ReactDOM.render(
    <NotesManager {...NotesContainer}/>,
    document.getElementById("root")
);
