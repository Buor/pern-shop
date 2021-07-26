import {combineReducers, createStore} from "redux"
import {authReducer} from "./auth/authReducer"

const reducers = combineReducers([authReducer]);

const store = createStore(reducers);
export default store;