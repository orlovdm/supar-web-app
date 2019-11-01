import {getUserData} from "./AuthReducer";

const INITIALIZED = 'app/INITIALIZED';

let initialState = {
    isInitialized: false
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }

        default: {
            return state;
        }
    }
}

/* ---Actions--- */
export const initialized = () => ({ type: INITIALIZED });

/* ---Thunks--- */
export const initApp = () => {
    return (dispatch) => {
        let promise = dispatch(getUserData())
        Promise.all([promise])
            .then(() => {
                dispatch(initialized())
            })
    }
}

export default AppReducer;