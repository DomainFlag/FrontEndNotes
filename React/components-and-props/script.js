const noteClassName = "note";

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

let queryTree = () => {
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

const snippets = [
    `
    class Header extends React.Component {
        render() {
            return <div className="header">
                <img className="headerAvatar" src={this.props.header.avatar}/>
                <p className="headerDate">{this.props.header.date}</p>
            </div>
        }
    }
    `, `
    class Comment extends React.Component {
        render() {
            return <div className="comment">
                <Header header={this.props.header}/>
                <Content content={this.props.content}/>
            </div>
        }
    }
    `
];

const notes = [
    "Content let you split the UI into independent, reusable pieces, and think about each piece in isolation.",
    "Content are alike to JavaScript object' constructor except they are being called differently by React seeing an element \n" +
    "representing a user-defined component and by passing its JSX attributes to this component as a single object.\n" +
    "We call this object “props”. They accept arbitrary inputs by ultimately returning React elements describing what should appear on the screen.",

    "Content can refer to other components in their output. This lets us use the same component abstraction for any level of detail. \n" +
    "A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components. \n" +
    "Don’t be afraid to split components into smaller components for better reusability.",

    "All React components must act like pure functions with respect to their props, it must never modify its own props!"
];

let notesContainer = [];
let snippetsContainer = [];

class Note extends React.Component {
    render() {
        return <p className={noteClassName}>{this.props.note}</p>
    }
}

class Snippet extends React.Component {
    render() {
        return <pre>{this.props.snippet}</pre>
    }
}

class Content extends React.Component {
    render() {
        return <div className="content">
            <h1 className="contentText">{this.props.content.text}</h1>
        </div>
    }
}

class Header extends React.Component {
    render() {
        return <div className="header">
            <img className="headerAvatar" src={this.props.header.avatar}/>
            <p className="headerDate">{this.props.header.date}</p>
        </div>
    }
}

class Comment extends React.Component {
    render() {
        this.childrens = [];

        this.props.comment.children.forEach((child) => {
            this.childrens.push((<Comment comment={child}/>));
        });

        return <div className="comment">
                   <Header header={this.props.comment.comment.header}/>
                   <Content content={this.props.comment.comment.content}/>
                   <div className="child_comment">
                       {this.childrens}
                   </div>
        </div>;
    }
}

notes.forEach((note) => {
    notesContainer.push(<Note note={note} />);
});

snippets.forEach((snippet) => {
    snippetsContainer.push(<Snippet snippet={snippet} />);
});

let label = <p className="label">
    Comment System
</p>;

let pre_processing = (<div className="pre_processing sub_container">
    <div className="sub_container_content">
        {notesContainer}
        <div className="snippets">
            {snippetsContainer}
        </div>
    </div>
</div>);

let commentsSystem = [];
let commentsTree = queryTree();
commentsTree.forEach((comment) => {
    commentsSystem.push(<Comment comment={comment}/>);
});

let post_processing = (<div className="post_processing sub_container">
    {label}
    <div className="commentSystem">
        {commentsSystem}
    </div>
</div>);

ReactDOM.render(
    <div className="container">
        {pre_processing}
        {post_processing}
    </div>,
    document.getElementById("root")
);