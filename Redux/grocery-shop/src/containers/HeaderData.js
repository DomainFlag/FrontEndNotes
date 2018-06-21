import React from 'react'
import { connect } from 'react-redux'
import Header from "./../components/Header"

const mapStateToProps = (state) => {
    return {
        "groceryName" : state.groceryName
    }
};

export default connect(mapStateToProps)(Header);