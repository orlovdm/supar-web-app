import {createSelector} from "reselect";

const getAllUsers = (state) => {
    return state.users.users;
}

export const requestUsers = createSelector(getAllUsers, (users) => users); // Так не будет запускаться mapStateToProps если не изменился state.serviceListPage.services;

export const getIsFetching = (state) => {
    return state.users.isFetching;
}

export const getUpdateInProgress = (state) => {
    return state.users.updateInProgress;
}

