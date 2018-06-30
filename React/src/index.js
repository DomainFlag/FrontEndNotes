import React from 'react';
import {render} from "react-dom"
import "./style.sass"
import NotesManager from "./components/NoteManager";
import NotesContainer from "./resources/components-and-props/script"


render(
    <NotesManager {...NotesContainer}/>,
    document.getElementById('root')
);
