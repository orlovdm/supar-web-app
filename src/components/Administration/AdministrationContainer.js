import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {connect} from "react-redux";
import Administration from "./Administration";

const mapStateToProps = (state) => {
    return null
}

class AdministrationContainer extends React.Component {
    render() {
        return <Administration/>
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {})
)(AdministrationContainer)