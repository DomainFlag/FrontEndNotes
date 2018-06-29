import {Component} from "react"

class NotesManager extends Component {
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

export default NotesManager;