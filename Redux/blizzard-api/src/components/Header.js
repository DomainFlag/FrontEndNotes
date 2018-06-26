import React from "react"
import {connect} from "react-redux"
import logo from "./../assets/logo.svg"

const Header = ({title}) => (
    <div className="header">
        <img src={logo} className="header-logo"/>
        <p className="header-title">
            {title}
        </p>
    </div>
);

const mapStateToProps = (state) => ({
    title: state.title
});

export default connect(mapStateToProps)(Header);