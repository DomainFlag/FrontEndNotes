import React from "react"
import {connect} from "react-redux"

const Header = ({title}) => (
    <div>
        {title}
    </div>
);

const mapStateToProps = (state) => ({
    title: state.title
});

export default connect(mapStateToProps)(Header);