import axios from 'axios';
import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Modal } from 'components/modal/Modal';
import { Spinner } from 'components/spinner/Spinner';
import { deleteGame, editGame } from 'mockapi/controllers/games';
import { deleteUser, editUser } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import * as styled from "./GameCard.styled";

export const GameCard = ({ game, handleRefresh, handleEditList }) => {
    const [loading, setLoading] = useState(false);

    const [editModal, setEditModal] = useState({
        open: false,
        name: '',
        category: '',
        date: '',
        id: null,
        loading: false,
    });

    const handleEditClick = () => {
        setEditModal({
            open: true,
            name: game.name,
            category: game.category,
            date: game.date,
            id: game.id,
            loading: false
        });
    };

    const handleClose = () => {
        setEditModal({
            open: false,
            name: '',
            category: '',
            date: '',
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
                await axios.delete(`http://localhost:5000/api/games/${game.id}`, config);
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
                // const response = await editGame(editModal.id, editModal.name, editModal.category, editModal.date);
                const token = localStorage.getItem("userId");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.patch(
                    `http://localhost:5000/api/games/${editModal.id}`,
                    { name: editModal.name, category: editModal.category, date: editModal.date },
                    config
                );
                handleEditList(response.data)
                setEditModal({
                    open: false,
                    name: '',
                    category: '',
                    date: '',
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
                <Input error={editModal.errors?.category} handleChange={handleEditChange} name="category" value={editModal.category} label="Category" helperText="It should be a text without space" />
                <Input error={editModal.errors?.date} handleChange={handleEditChange} name="date" value={editModal.date} label="Creation date" helperText="It should be a valid date with the format DD/MM/YYYY" />
                <Button handleClick={handleEdit} loading={editModal.loading}>Done</Button>
            </Modal>
            <styled.Wrapper>
                <styled.Line>
                    <styled.Icon src="id-card.png" />
                    <styled.Text>{game.name}</styled.Text>
                </styled.Line>
                <styled.Line>
                    <styled.Icon src="tag.png" />
                    <styled.Text>{game.category}</styled.Text>
                </styled.Line>
                <styled.Line>
                    <styled.Icon src="calendar.png" />
                    <styled.Text>{game.date}</styled.Text>
                </styled.Line>
                <styled.ButtonVariation onClick={() => handleEditClick(game)}>Edit</styled.ButtonVariation>
                <styled.ButtonVariationDelete onClick={handleDelete}>{loading ? <Spinner size='16px' /> : "Delete"}</styled.ButtonVariationDelete>
            </styled.Wrapper>
        </styled.Container>
    )
}
