import React, {useEffect} from "react";
import style from './App.module.scss';
import {HashRouter, Switch, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Home from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {WrongUrl} from "./components/WrongUrl/WrongUrl";
import {authMe} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/Preloader/Preloader";

export const App = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    useEffect(() => {
        let accessToken = localStorage.getItem('access_token')
        dispatch(authMe(accessToken))
    }, [dispatch])

    if (!authState.isInitialized) return <Preloader/>

    return (
        <div className={style.container}>
            <HashRouter basename={'/'}>
                <Header/>
                <Switch>
                    <Route exact path={'/'}><Home isAuthorized={authState.isAuthorized}/></Route>
                    <Route path={'/register'}><Register/></Route>
                    <Route path={'/login'}><Login/></Route>
                    <Route><WrongUrl/></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}