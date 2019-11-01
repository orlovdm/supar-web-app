import React from "react";
import {compose} from "redux";

import {connect} from "react-redux";
import {withAuthRedirect} from "../../../HOC/withAuthRedirect";
import {getIsFetching, getUpdateInProgress, requestUsers} from "../../../app-data/UsersSelectors";
import {
    createUser,
    deleteUser,
    getUsers,
    toggleIsFetching,
    toggleUpdateInProgress,
    updateUser
} from "../../../app-data/UsersReducer";
import Preloader from "../../common/Preloader/Preloader";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: requestUsers(state),
        isFetching: getIsFetching(state),
        updateInProgress: getUpdateInProgress(state)
    }
}

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users {...this.props}/>}
        </>
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getUsers, deleteUser, updateUser, createUser, toggleIsFetching, toggleUpdateInProgress})
)(UsersContainer)