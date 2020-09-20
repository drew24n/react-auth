import React from "react";
import style from './Login.module.scss';
import {Button, Form, Input} from "antd";

export const Login = () => {
    return (
        <main className={style.container}>
            <div>
                <h1>Log in</h1>
                <Form>
                    <Form.Item name={'email'} rules={[{required: true, message: 'Please input your email!'}]}>
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item name={'password'} rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input type="password"/>
                    </Form.Item>
                    <Button type="primary" htmlType={"submit"}>Enter</Button>
                </Form>
            </div>
        </main>
    )
}