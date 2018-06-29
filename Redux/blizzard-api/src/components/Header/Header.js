import React from "react"
import {connect} from "react-redux"
import logo from "../../assets/logo.svg"
import "./Header.sass"

const Header = ({title}) => (
    <div className="header">
        <img src={logo} className="header-logo" alt="#"/>
        <p className="header-title">
            {title}
        </p>
    </div>
);

const mapStateToProps = (state) => ({
    title: state.title
});

export default connect(mapStateToProps)(Header);