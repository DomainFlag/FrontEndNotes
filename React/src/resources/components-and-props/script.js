import React from "react"
import {Component} from "react"

import "./style.sass"

const NOTE = "NOTE";
const SNIPPET = "SNIPPET";

let comments = [
    {
        "id" : 1,
        "parent" : 0,
        "depth" : 0,
        "content" : {
            "text" : "Comment 1"
        },
        "header" : {
            "avatar" : "http://www.pngmart.com/files/2/Pikachu-PNG-Photos.png",
            "date" : (new Date((Date.now()-Math.random()*50000+25000))).toDateString()
        }
    }, {
        "id" : 2,
        "parent" : 0,
        "depth" : 0,
        "content" : {
            "text" : "Comment 2"
        },
        "header" : {
            "avatar" : "http://www.pngmart.com/files/2/Pikachu-PNG-Photos.png",
            "date" : (new Date((Date.now()-Math.random()*50000+25000))).toDateString()
        }
    }, {
        "id" : 3,
        "parent" : 2,
        "depth" : 1,
        "content" : {
            "text" : "Comment 3"
        },
        "header" : {
            "avatar" : "https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png",
            "date" : (new Date((Date.now()-Math.random()*50000+25000))).toDateString()
        }
    }, {
        "id" : 4,
        "parent" : 3,
        "depth" : 2,
        "content" : {
            "text" : "Comment 5"
        },
        "header" : {
            "avatar" : "https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png",
            "date" : (new Date((Date.now()-Math.random()*50000+25000))).toDateString()
        }
    }, {
        "id" : 5,
        "parent" : 1,
        "depth" : 1,
        "content" : {
            "text" : "Comment 6"
        },
        "header" : {
            "avatar" : "http://www.pngmart.com/files/2/Pikachu-PNG-Photos.png",
            "date" : (new Date((Date.now()-Math.random()*50000+25000))).toDateString()
        }
    }, {
        "id" : 6,
        "parent" : 1,
        "depth" : 1,
        "content" : {
            "text" : "Comment 7"
        },
        "header" : {
            "avatar" : "https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png",
            "date" : (new Date((Date.now()-Math.random()*50000+25000))).toDateString()
        }
    }
];

let depthQuery = (stack, comments, depth, count = 0) => {
    let len = comments.length;

    for(let it = 0; it < len; it++) {
        if(comments[it-count].depth === depth) {
            stack.push({
                comment : comments[it-count],
                children : []
            });

            comments.splice(it-count, 1);
            count++;
        }
    }
};

class Stack {
    constructor(comments) {
        this.depth = 0;
        this.comments = comments;

        this.stack = {
            "parent" : [],
            "child" : []
        };

        depthQuery(this.stack.parent, this.comments, this.depth++);
        depthQuery(this.stack.child, this.comments, this.depth++);

        this.tree = this.stack.parent;
    }

    getTree() {
        return this.tree;
    }

    queryNext() {
        this.stack.parent = this.stack.child;
        this.stack.child = [];

        depthQuery(this.stack.child, this.comments, this.depth++);
    };
}

let queryTree = (comments) => {
    let stack = new Stack(comments);

    while(stack.stack.child.length !== 0) {

        stack.stack.parent.forEach((parentNode) => {
            stack.stack.child.forEach((childNode) => {

                if(parentNode.comment.id === childNode.comment.parent) {
                    parentNode.children.push(childNode);
                }
            });
        });

        stack.queryNext();
    }

    return stack.getTree();
};

class CommentHeader extends React.Component {
    render = () => (
        <div className="comment-header">
            <img className="comment-header-avatar" src={this.props.header.avatar}/>
            <p className="comment-header-date">{this.props.header.date}</p>
        </div>
    )
}

class CommentContent extends React.Component {
    render = () => (
        <div className="comment-content">
            <h1 className="comment-content-text">{this.props.content.text}</h1>
        </div>
    )
}

class Comment extends Component {
    render = () => (
        <div className="comment">
            <CommentHeader header={this.props.comment.comment.header}/>
            <CommentContent content={this.props.comment.comment.content}/>
            <div className="comment-child">
                {
                    this.props.comment.children.map((child) => (
                        <Comment comment={child}/>
                    ))
                }
            </div>
        </div>
    )
}

const commentSystem = queryTree(comments)
    .map((comment) => (
        <Comment comment={comment}/>
    ));

class CommentSystem extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="comment-system">
            {this.props.commentSystem}
        </div>
    );
}

const NotesContainer = {
    "header" : {
        "title" : "Components & Props"
    },
    "content" : {
        "notes": [{
            id: 1,
            type: NOTE,
            value: "Content let you split the UI into independent, reusable pieces, and think" +
            " about each piece in isolation."
        }, {
            id: 2,
            type: NOTE,
            value: "Content are alike to JavaScript object' constructor except they are being" +
            " called differently by React seeing an element representing a user-defined" +
            " component  and by passing its JSX attributes to this component as a single object." +
            " We call this object “props”. They accept arbitrary inputs by ultimately returning" +
            " React elements describing what should appear on the screen."
        }, {
            id: 3,
            type: NOTE,
            value: "Content can refer to other components in their output. This lets us use the" +
            " same component abstraction for any level of detail. A button, a form, a dialog, a" +
            " screen: in React apps, all those are commonly expressed as components. Don’t be" +
            " afraid to split components into smaller components for better reusability."
        }, {
            id: 4,
            type: NOTE,
            value: "All React components must act like pure functions with respect to their" +
            " props, it must never modify its own props!"
        }, {
            id: 5,
            type: SNIPPET,
            value: {
                snippet : null,
                demo : <CommentSystem commentSystem={commentSystem}/>
            }
        }]
    }
};

export default NotesContainer;