import React from "react";
import style from './Login.module.scss';
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, setEmailAction, setPasswordAction} from "../../redux/authReducer";

export const Login = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    let login = (e) => {
        e.preventDefault()
        if (authState.email && authState.password) dispatch(loginThunk(authState.email, authState.password))
    }

    return (
        <main className={style.container}>
            <div>
                <h1>Log in</h1>
                <form onSubmit={e => login(e)}>
                    <Input type={'email'} value={authState.email} autoFocus={true} placeholder={'email'}
                           onChange={e => dispatch(setEmailAction(e.target.value))}/>
                    <Input type={'password'} value={authState.password} placeholder={'password'}
                           onChange={e => dispatch(setPasswordAction(e.target.value))}/>
                    <Button type="primary" htmlType={'submit'}>Enter</Button>
                </form>
            </div>
        </main>
    )
}