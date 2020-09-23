import React from "react";
import style from './Register.module.scss';
import {Button, Input, Spin} from "antd";
import {signup} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {Field, reduxForm} from "redux-form";

export const Register = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    let register = (payload) => {
        if (payload.email && payload.password) dispatch(signup(payload.email, payload.password))
    }

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Sign up</h1>
                <LoginReduxForm onSubmit={register}/>
            </Spin>
        </main>
    )
}

const AntInput = (props) => <Input {...props.input} {...props} input={null} meta={null}/>

const RegisterForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'email'} component={AntInput} name={'email'} type={'email'}/>
            <Field placeholder={'password'} component={AntInput} name={'password'} type={'password'}/>
            <Button type='primary' htmlType={'submit'}>Register</Button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "register"})(RegisterForm)