import React from "react"
import Header from "./Header/Header"
import Profile from "./Content/Profile"
import Footer from "./Footer/Footer"
import "./App.sass"

const App = () => (
    <div id="app">
        <Header/>
        <div className="content">
            <Profile/>
            {/*<Ladders/>*/}
            {/*<Matches/>*/}
        </div>
        <Footer/>
    </div>
);

export default App;