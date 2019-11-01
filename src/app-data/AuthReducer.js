import {AuthAPI} from "../Api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ADMIN = 'SET_ADMIN';

let initialState = {
    UserID: null,
    UserName: null,
    UserDesc: null,
    Role: -1,
    MachineID: -1,
    isAdmin: false,
    isAuth: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.data.isAuth
            }

        case SET_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin
            }

        default: {
            return state;
        }
    }
}

/* ---Actions--- */
export const setUserData = (data) => ({type: SET_USER_DATA, data});
export const setIsAdmin = (isAdmin) => ({type: SET_ADMIN, isAdmin});

/* ---Thunks--- */
export const getUserData = () => {
    return async (dispatch) => {
        let data = await AuthAPI.getAuth();
        if (data.resultCode === 0) {
            dispatch(setUserData({...data.data, isAuth: true}));
            data.data.Role === 1 ? dispatch(setIsAdmin(true)) : dispatch(setIsAdmin(false))
        }
    }
}

export default AuthReducer;