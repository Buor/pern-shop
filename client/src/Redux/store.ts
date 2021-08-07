import {combineReducers, createStore} from "redux"
import {authReducer} from "./auth/authReducer"

const reducers = combineReducers({
    auth: authReducer
});

const store = createStore(reducers);
export default store;