import axios from 'axios';
import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Modal } from 'components/modal/Modal';
import { Spinner } from 'components/spinner/Spinner';
import { deleteUser, editUser } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import * as styled from "./UserCard.styled";

export const UserCard = ({ user, handleRefresh, handleEditList }) => {

    const [loading, setLoading] = useState(false);

    const [editModal, setEditModal] = useState({
        open: false,
        name: '',
        email: '',
        address: '',
        id: null,
        loading: false,
    });

    const handleEditClick = () => {
        setEditModal({
            open: true,
            name: user.name,
            email: user.email,
            address: user.address,
            id: user.id,
            loading: false
        });
    };

    const handleClose = () => {
        setEditModal({
            open: false,
            name: '',
            email: '',
            address: '',
            id: null,
            loading: false,
        })
    }

    const handleDelete = async () => {
        try {
            if (!loading) {
                setLoading(true);
                const token = localStorage.getItem("userId");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                await axios.delete(`http://localhost:5000/api/users/${user.id}`, config);
                setLoading(false);
                handleRefresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditChange = (event) => {
        setEditModal({ ...editModal, [event.target.name]: event.target.value })
    }

    const handleEdit = async () => {
        try {
            if (!editModal.loading) {
                setEditModal({ ...editModal, loading: true })
                const token = localStorage.getItem("userId");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.patch(
                    `http://localhost:5000/api/users/${editModal.id}`,
                    { name: editModal.name, email: editModal.email, address: editModal.address },
                    config
                );
                handleEditList(response.data)
                setEditModal({
                    open: false,
                    name: '',
                    email: '',
                    address: '',
                    id: null,
                    loading: false
                })
            }
        } catch (errors) {
            setEditModal({ ...editModal, errors: errors.response.data })
        }
    };
    return (
        <styled.Container>
            <Modal open={editModal.open} handleClose={handleClose}>
                <styled.ModalHeadline>Edit</styled.ModalHeadline>
                <Input error={editModal.errors?.name} handleChange={handleEditChange} name="name" value={editModal.name} label="Name" helperText="It should be at least 5 including 1 space" />
                <Input error={editModal.errors?.email} handleChange={handleEditChange} name="email" value={editModal.email} label="Email" helperText="It should be a valid email format" />
                <Input error={editModal.errors?.address} handleChange={handleEditChange} name="address" value={editModal.address} label="Address" helperText="It should be at least 5 including 1 space" />
                <Button handleClick={handleEdit} loading={editModal.loading}>Done</Button>
            </Modal>
            <styled.Wrapper>
                <styled.Line>
                    <styled.Icon src="id-card.png" />
                    <styled.Text>{user.name}</styled.Text>
                </styled.Line>
                <styled.Line>
                    <styled.Icon src="mail.png" />
                    <styled.Text>{user.email}</styled.Text>
                </styled.Line>
                <styled.Line>
                    <styled.Icon src="location.png" />
                    <styled.Text>{user.address}</styled.Text>
                </styled.Line>
                <styled.ButtonVariation onClick={() => handleEditClick(user)}>Edit</styled.ButtonVariation>
                <styled.ButtonVariationDelete onClick={handleDelete}>{loading ? <Spinner size='16px' /> : "Delete"}</styled.ButtonVariationDelete>
            </styled.Wrapper>
        </styled.Container>
    )
}
