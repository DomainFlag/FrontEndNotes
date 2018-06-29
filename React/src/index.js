import React from 'react';
import ReactDOM from 'react-dom';
import {render} from "react-dom"
import "./style.sass"
import NotesManager from "./components/NoteManager";
import NotesContainer from "./resources/coditional-rendering/script"


render(
    <NotesManager {...NotesContainer}/>,
    document.getElementById('root')
);
