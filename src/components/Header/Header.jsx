import React from "react";
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import {useSelector} from "react-redux";

export const Header = () => {
    let authState = useSelector(state => state.auth)

    return (
        <header className={style.container}>
            <div>
                <h2>My site</h2>
                <NavLink activeClassName={style.active} exact to={'/'}>Home</NavLink>
            </div>
            <div>
                {!authState.isAuthorized && <NavLink activeClassName={style.active} to={'/register'}>Sign up</NavLink>}
                {!authState.isAuthorized && <NavLink activeClassName={style.active} to={'/login'}>Login</NavLink>}
                {authState.isAuthorized && <Button>Logout</Button>}
            </div>
        </header>
    )
}