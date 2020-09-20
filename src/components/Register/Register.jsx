import React from "react";
import style from './Register.module.scss';
import {Button, Form, Input} from "antd";

export const Register = () => {
    return (
        <main className={style.container}>
            <div>
                <h1>Sign up</h1>
                <Form>
                    <Form.Item name={'email'} rules={[{required: true, message: "Email can't be empty!"}]}>
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item name={'password'} rules={[{required: true, message: "Password can't be empty!"}]}>
                        <Input type="password"/>
                    </Form.Item>
                    <Button type="primary" htmlType={"submit"}>Register</Button>
                </Form>
            </div>
        </main>
    )
}