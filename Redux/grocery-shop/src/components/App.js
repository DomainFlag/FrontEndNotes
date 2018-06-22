import React from "react"
import Header from "./Header"
import GroceryList from "./GroceryList"

const App = () => (
    <section className="app">
        <Header/>
        <div className="divider"/>
        <GroceryList/>
    </section>
);

export default App;