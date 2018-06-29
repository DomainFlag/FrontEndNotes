import React from "react"
import {Component} from "react"
import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";
import NoteFooter from "./NoteFooter";

const App = () => (
    <div className="app">
        <NoteHeader/>
        <NoteContent/>
        <NoteFooter/>
    </div>
);

export default App;