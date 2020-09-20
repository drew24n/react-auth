import React from "react";
import style from './App.module.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Home from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {WrongUrl} from "./components/WrongUrl/WrongUrl";

export const App = () => {
    return (
        <div className={style.container}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header/>
                <Switch>
                    <Route exact path={'/'}><Home/></Route>
                    <Route path={'/register'}><Register/></Route>
                    <Route path={'/login'}><Login/></Route>
                    <Route><WrongUrl/></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}