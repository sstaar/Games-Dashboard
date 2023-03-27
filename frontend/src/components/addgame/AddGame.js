import axios from 'axios';
import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Modal } from 'components/modal/Modal';
import { addGame } from 'mockapi/controllers/games';
import { addUser } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import * as styled from "./AddGame.styled";

export const AddGame = ({ handleRefresh }) => {

    const [open, setOpen] = useState(false);

    const [data, setData] = useState({
        name: '',
        category: '',
        date: '',
        loading: false
    });


    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => setData({ ...data, [event.target.name]: event.target.value });

    const handleSubmit = async () => {
        try {
            setData({ ...data, loading: true })
            const token = localStorage.getItem("userId");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post(
                'http://localhost:5000/api/games',
                { name: data.name, category: data.category, date: data.date },
                config
            );
            setData({
                name: '',
                address: '',
                date: '',
                loading: false
            })
            handleRefresh();
            setOpen(false);
        } catch (errors) {
            setData({ ...data, errors: errors.response.data });
        }
    }

    return (
        <styled.Container>
            <styled.AddButton onClick={() => setOpen(true)}>+</styled.AddButton>
            <Modal open={open} handleClose={handleClose}>
                <styled.ModalHeadline>Add</styled.ModalHeadline>
                <Input error={data.errors?.name} value={data.name} name="name" helperText="It should be at least 5 including 1 space" handleChange={handleChange} label="Name" />
                <Input error={data.errors?.category} value={data.category} name="category" helperText="It should be a text with no space" handleChange={handleChange} label="Category" />
                <Input error={data.errors?.date} value={data.date} name="date" helperText="It should be a valid date with the format DD/MM/YYYY" handleChange={handleChange} label="Creation Date" />
                <Button loading={data.loading} handleClick={handleSubmit}>Done</Button>
            </Modal>
        </styled.Container>
    )
}
