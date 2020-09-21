import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))