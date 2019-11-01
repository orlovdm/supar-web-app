import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ServiceListReducer from "./ServiseListReducer";
import AuthReducer from "./AuthReducer";
import thunkMiddleWare from "redux-thunk"
import AppReducer from "./AppReducer";
import UsersReducer from "./UsersReducer";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
    serviceListPage: ServiceListReducer,
    auth: AuthReducer,
    app: AppReducer,
    users: UsersReducer,
    form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

window.store = store;
export default store;