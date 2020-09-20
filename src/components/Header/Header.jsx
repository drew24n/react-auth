import React from "react";
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export const Header = () => {
    return (
        <header className={style.container}>
            <div>
                <h2>My site</h2>
                <NavLink activeClassName={style.active} exact to={'/'}>Home</NavLink>
            </div>
            <div>
                <NavLink activeClassName={style.active} to={'/register'}>Sign up</NavLink>
                <NavLink activeClassName={style.active} to={'/login'}>Login</NavLink>
                <Button style={{display: 'none'}}>Logout</Button>
            </div>
        </header>
    )
}