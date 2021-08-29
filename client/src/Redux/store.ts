import {combineReducers, createStore} from "redux"
import {authReducer} from "./auth/authReducer"
import { categoryPageReducer } from './category/categoryPageReducer'
import { basketReducer } from './basket/basketReducer'

const reducers = combineReducers({
    auth: authReducer,
    categoryPage: categoryPageReducer,
    basket: basketReducer
});

const store = createStore(reducers);
export default store;