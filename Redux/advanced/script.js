const FETCH_IMAGES = "FETCH_IMAGES";
const REQUEST_PHOTOS = "REQUEST_PHOTOS";

const SNIPPET = "SNIPPET";
const NOTE = "NOTE";

const Gallery = {
    galleryName : "Unsplash API",
    photos : {
        status : {
            "isFetching" : false,
            "didInvalidate" : false,
            "lastUpdated" : Number(new Date())
        },
        photos : [
            {
                "created_at":"2018-06-25T23:21:41-04:00",
                "updated_at":"2018-06-26T07:15:36-04:00",
                "likes" : 12,
                "description" : "A man drinking a coffee.",
                "urls":{
                    "full":"https://images.unsplash.com/photo-1529982860593-e13b3baf49a8?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI5OTk3fQ&s=42e611412498371546edf455d12a58f8",
                    "small":"https://images.unsplash.com/photo-1529982860593-e13b3baf49a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI5OTk3fQ&s=0478e496c9c480dc45289d8e1837dd32"
                },
                "user": {
                    "updated_at": "2018-06-27T01:10:17-04:00",
                    "username": "reinaldokevin",
                    "name": "Reinaldo Kevin",
                    "location": "Jakarta"
                }
            }
            // More photos...
        ]
    }
};

const ACTIONS = {
    REQUEST_PHOTOS: (status, response) => {
        let action = {type : REQUEST_PHOTOS, response, status: null};

        if(status === "pending") {
            return {...action, status : {
                    isFetching : true,
                    didInvalidate : false}};
        } else if(status === "error") {
            return {...action, status : {
                    isFetching : false,
                    didInvalidate : true
                }};
        } else return action;
    },
    FETCH_IMAGES: (() => {
        let headers = new Headers();
        headers.append("Method", "GET");
        headers.append("Authorization", "Client-ID" +
            " c18c1e6f1bcfcae201eaa1e9b994e5e7e71f3f71c8ff06dfcd1399e3152d1612");

        return (dispatch) => {
            dispatch(ACTIONS.REQUEST_PHOTOS("pending", null));

            return fetch("https://api.unsplash.com/photos/", {headers})
                .then((response) => response.json())
                .then((response) => dispatch(ACTIONS.REQUEST_PHOTOS(null, response)));
        }
    })()
};

const REDUCER_VALIDATOR = (reducerActions, state, action) => {
    if(reducerActions.hasOwnProperty(action.type))
        return reducerActions[action.type](state, action);
    else return state;
};

const galleryName = (() => {
    const REDUCER_ACTIONS = {
        CHANGE_NAME : (state, action) => {
            return action.groceryName;
        }
    };

    return (state = [], action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const photos = (() => {
    const REDUCER_ACTIONS = {
        REQUEST_PHOTOS: (state, action) => {
            if(action.status) {
                return Object.assign({}, state, {status: action.status});
            } else {
                return Object.assign({}, state, {photos: action.response});
            }
        }
    };

    return (state = {}, action) => REDUCER_VALIDATOR(REDUCER_ACTIONS, state, action);
})();

const rootReducer = Redux.combineReducers({
    galleryName,
    photos
});

const store = Redux.createStore(rootReducer, Gallery, Redux.applyMiddleware(
    ReduxThunk.default,
    reduxLogger.createLogger()
));

store
    .dispatch(ACTIONS.FETCH_IMAGES);


let NotesContainer = {
    "header" : {
        "title" : "Introduction"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "By an asynchronous request there are 2 moments the one when we fire the" +
            " request and the time we'll have to wait in the meantime becoming the observer of a" +
            " non-blocking UI and ultimately the dissolution of our callback."
        }, {
            id: 2,
            type: SNIPPET,
            value: {
                "header": "Actually we'll need more actions the only one that will dispatch teh" +
                " our App's state synchronously, but an action in advanced that the request for" +
                " fetching was fired and invoke something informative on UI thread like a" +
                " spinner. And also not forget the error case, thus change the state and inform" +
                " the user of the unsuccessful request.",
                "demo": objToStr(ACTIONS)
            }
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
