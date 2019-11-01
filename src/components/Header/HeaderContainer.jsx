import React from "react";
import {Header} from '@storaensods/seeds-react';
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.UserID,
        name: state.auth.UserName,
        role: state.auth.Role
    }
}

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header title={'SUPAR Web Application. Hello, ' + this.props.name}/>
        )
    }
}

export default connect(mapStateToProps, {})(HeaderContainer)