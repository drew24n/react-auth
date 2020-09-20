import React from "react";
import style from './Register.module.scss';
import {Button, Input} from "antd";
import {registerThunk, setEmailAction, setPasswordAction} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";

export const Register = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    let register = (e) => {
        e.preventDefault()
        if (authState.email && authState.password) dispatch(registerThunk(authState.email, authState.password))
    }

    return (
        <main className={style.container}>
            <div>
                <h1>Sign up</h1>
                <form onSubmit={e => register(e)}>
                    <Input value={authState.email} autoFocus={true} placeholder={'email'}
                           onChange={e => dispatch(setEmailAction(e.target.value))}/>
                    <Input value={authState.password} placeholder={'password'}
                           onChange={e => dispatch(setPasswordAction(e.target.value))}/>
                    <Button type="primary" htmlType={'submit'}>Register</Button>
                </form>
            </div>
        </main>
    )
}