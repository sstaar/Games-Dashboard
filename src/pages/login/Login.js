import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { login } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import * as styled from "./Login.styled";

export const Login = () => {

    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => setData({ ...data, [event.target.name]: event.target.value });

    const handleLogin = async () => {
        try {
            const response = await login(data.username, data.password);
            setErrors({});
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <styled.Container>
            <styled.Wrapper>
                <styled.Logo src='/logo.png' />
                <styled.Headline>Login</styled.Headline>
                <Input handleChange={handleChange} label="Username" value={data.username} name="username" error={errors.username} />
                <Input handleChange={handleChange} type="password" label="Password" value={data.password} name="password" helperText="Password must be at least 6 characters" error={errors.password} />
                <Button handleClick={handleLogin}>Login</Button>
            </styled.Wrapper>
        </styled.Container>
    )
}
