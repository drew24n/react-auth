import React, {useEffect} from "react";
import style from './App.module.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Home from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {WrongUrl} from "./components/WrongUrl/WrongUrl";
import {authMeThunk} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";

export const App = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMeThunk(authState.token))
    }, [dispatch, authState.token])

    return (
        <div className={style.container}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header/>
                <Switch>
                    <Route exact path={'/'}><Home isAuthorized={authState.isAuthorized}/></Route>
                    <Route path={'/register'}><Register/></Route>
                    <Route path={'/login'}><Login/></Route>
                    <Route><WrongUrl/></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}