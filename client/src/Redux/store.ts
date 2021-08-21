import {combineReducers, createStore} from "redux"
import {authReducer} from "./auth/authReducer"
import { categoryPageReducer } from './category/categoryPageReducer'

const reducers = combineReducers({
    auth: authReducer,
    categoryPage: categoryPageReducer
});

const store = createStore(reducers);
export default store;