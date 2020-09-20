import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({auth: authReducer})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))