import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Modal } from 'components/modal/Modal';
import { addUser } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import * as styled from "./AddUser.styled";


export const AddUser = ({ handleRefresh }) => {

    const [open, setOpen] = useState(false);

    const [data, setData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        email: '',
        loading: false
    });


    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => setData({ ...data, [event.target.name]: event.target.value });

    const handleSubmit = async () => {
        try {
            setData({ ...data, loading: true })
            const response = await addUser(data.name, data.email, data.address, data.password, data.username);
            console.log(response)
            setData({
                username: '',
                password: '',
                name: '',
                address: '',
                email: '',
                loading: false
            })
            handleRefresh();
            setOpen(false);
        } catch (errors) {
            setData({ ...data, errors });
        }
    }

    return (
        <styled.Container>
            <styled.AddButton onClick={() => setOpen(true)}>+</styled.AddButton>
            <Modal open={open} handleClose={handleClose}>
                <styled.ModalHeadline>Add</styled.ModalHeadline>
                <Input error={data.errors?.username} value={data.username} name="username" helperText="Only characters and numbers" handleChange={handleChange} label="Username" />
                <Input error={data.errors?.email} value={data.email} name="email" helperText="It should be a valid email format" handleChange={handleChange} label="Email" />
                <Input error={data.errors?.name} value={data.name} name="name" helperText="It should be at least 5 including 1 space" handleChange={handleChange} label="Name" />
                <Input error={data.errors?.address} value={data.address} name="address" helperText="Only characters and numbers" handleChange={handleChange} label="Address" />
                <Input error={data.errors?.password} value={data.password} name="password" helperText="It should be between 6 and 30 characters" handleChange={handleChange} label="Password" type='password' />
                <Button loading={data.loading} handleClick={handleSubmit}>Done</Button>
            </Modal>
        </styled.Container>
    )
}