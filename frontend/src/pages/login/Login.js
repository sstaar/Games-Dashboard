import axios from 'axios';
import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Spinner } from 'components/spinner/Spinner';
import { login } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import * as styled from "./Login.styled";

export const Login = ({ setUserId }) => {

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => setData({ ...data, [event.target.name]: event.target.value });

    const handleLogin = async () => {
        try {
            setLoading(true)
            // const response = await login(data.username, data.password);
            const response = await axios.post('http://localhost:5000/api/users/login', data);
            console.log(response.data.token)
            localStorage.setItem("userId", response.data.token);
            setUserId(response.data.token);
            setLoading(false)
            setErrors({});
        } catch (error) {
            setLoading(false)
            setErrors(error.response.data);
        }
    };

    return (
        <styled.Container>
            <styled.Wrapper>
                <styled.Logo src='/logo.png' />
                <styled.Headline>Login</styled.Headline>
                <Input handleChange={handleChange} label="Username" value={data.username} name="username" error={errors.username} />
                <Input handleChange={handleChange} type="password" label="Password" value={data.password} name="password" helperText="Password must be at least 6 characters" error={errors.password} />
                <Button handleClick={handleLogin} loading={loading} >Login</Button>
            </styled.Wrapper>
        </styled.Container>
    )
}
