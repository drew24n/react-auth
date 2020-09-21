import React from "react";
import style from './Login.module.scss';
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../redux/authReducer";
import {Preloader} from "../Preloader/Preloader";
import {Field, reduxForm} from "redux-form";

export const Login = () => {
    let authState = useSelector(state => state.auth)
    let dispatch = useDispatch()

    let login = (payload) => {
        debugger
        if (payload.email && payload.password) dispatch(loginThunk(payload.email, payload.password))
    }

    if (authState.isFetching) return <Preloader/>

    return (
        <main className={style.container}>
            <div>
                <h1>Log in</h1>
                <LoginReduxForm onSubmit={login}/>
            </div>
        </main>
    )
}

//for passing redux-form props to ant design input
const AntInput = (props) => <Input {...props.input} {...props} input={null} meta={null}/>

const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'email'} component={AntInput} name={"email"}/>
            <Field placeholder={'password'} component={AntInput} name={"password"}/>
            <Button type="primary" htmlType={'submit'}>Enter</Button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)