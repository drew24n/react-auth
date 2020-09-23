import React from "react";
import style from './Login.module.scss';
import {Button, Input, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer";
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";

export const Login = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    let loginFunc = (payload) => {
        if (payload.email && payload.password) dispatch(login(payload.email, payload.password))
    }

    if (authState.isAuthorized) return <Redirect to={'/'}/>

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Log in</h1>
                <LoginReduxForm onSubmit={loginFunc}/>
            </Spin>
        </main>
    )
}

const AntInput = (props) => <Input {...props.input} {...props} input={null} meta={null}/>

const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'email'} component={AntInput} name={"email"} type={'email'}/>
            <Field placeholder={'password'} component={AntInput} name={"password"} type={'password'}/>
            <Button type="primary" htmlType={'submit'}>Enter</Button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)