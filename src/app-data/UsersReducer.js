import {UsersAPI} from "../Api/api";

const SET_USERS = 'SET_USERS';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_UPDATE_IN_PROGRESS = 'TOGGLE_UPDATE_IN_PROGRESS';

let initialState = {
    users: [],
    /*selectedAll: false,*/
    isFetching: false,
    updateInProgress: false,
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        case TOGGLE_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }

        case TOGGLE_UPDATE_IN_PROGRESS:
            return {
                ...state,
                updateInProgress: action.updateInProgress
            }

        default:
            return state;
    }
}

/* ---Actions--- */
export const setUsers = (users) => ({type: SET_USERS, users});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});
export const toggleUpdateInProgress = (updateInProgress) => ({type: TOGGLE_UPDATE_IN_PROGRESS, updateInProgress });

/* ---Thunks--- */
export const getUsers = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        UsersAPI.requestUsers().then(data => {
            dispatch(setUsers(data.data));
            dispatch(toggleIsFetching(false));
        })
    }
}

export const deleteUser = (userId) => {
    return (dispatch) => {
        dispatch(toggleUpdateInProgress(true));
        UsersAPI.deleteUser(userId).then(data => {
            debugger;
            dispatch(toggleUpdateInProgress(false));
        })
    }
}

export const updateUser = (user) => {
    return (dispatch) => {
        dispatch(toggleUpdateInProgress(true));
        UsersAPI.updateUser(user).then(data => {
            debugger;
            dispatch(toggleUpdateInProgress(false));
        })
    }
}

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(toggleUpdateInProgress(true));
        UsersAPI.createUser(user).then(data => {
            debugger;
            dispatch(toggleUpdateInProgress(false));
        })
    }
}

export default UsersReducer;