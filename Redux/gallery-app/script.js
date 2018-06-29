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
                "id": "eGYtLsZXQBo",
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
            " YOUR&API&KEY");

        return (dispatch) => {
            dispatch(ACTIONS.REQUEST_PHOTOS("pending", null));

            return fetch("https://api.unsplash.com/photos/", {headers})
                .then((response) => {
                    if(response.status >= 300)
                        return Promise.reject("error");
                    else return response.json();
                }, () => {
                    return Promise.reject("error");
                }).then((response) => {
                    dispatch(ACTIONS.REQUEST_PHOTOS(null, response))
                }, () => {
                    return Promise.reject("error");
                })
                .catch(dispatch.bind(this, ACTIONS.REQUEST_PHOTOS("error", null)));
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

class NoteHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="header">
            <p className="header-text">
                {this.props.galleryName}
            </p>
        </div>
    );
}

const mapStateToProps = (state) => ({
    galleryName: state.galleryName
});

const Header = ReactRedux.connect(mapStateToProps)(NoteHeader);

class ApiContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxToggle: null
        }
    }

    onSubmit = () => {
        this.props.fetchPhotos();
    };

    componentWillUnmount() {
        if(this.state.checkboxToggle)
            clearInterval(this.state.updateScheduler);
    }

    onCheckboxToggle = () => {
        this.setState((prevState) => {
           if(prevState.checkboxToggle) {
               clearInterval(prevState.updateScheduler);
               return {
                   checkboxToggle: null,
                   updateScheduler: null
               };
           } else return {
               checkboxToggle: "checkbox-toggled",
               updateScheduler: setInterval(() => {
                   this.props.fetchPhotos();
               }, 15*1000)
           };
        });
    };

    render = () => (
        <div className="content">
            <div className="container-modal">
                {
                    this.props.photos.map((photo) => (
                        <div key={photo.id} className="photo-container">
                            <img className="photo" src={photo.urls.small}/>
                        </div>
                    ))
                }
            </div>
            <div className="form-action">
                <button className="form-submit" onClick={this.onSubmit}>FETCH</button>
                <div className="form-update">
                    <label className="form-update-label">Keep Updated</label>
                    <div className={"form-update-checkbox " + this.state.checkboxToggle} onClick={this.onCheckboxToggle}>
                        {
                            this.state.checkboxToggle ? (
                                <img src="./assets/checked.svg" className="form-update-checkbox-done"/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

const Content = ReactRedux.connect((state) => ({
    photos: state.photos.photos
}), (dispatch) => ({
    fetchPhotos: () => dispatch(ACTIONS.FETCH_IMAGES)
}))(ApiContent);

class Footer extends React.Component {
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

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="container">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById("root")
);
