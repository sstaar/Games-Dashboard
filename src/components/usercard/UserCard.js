import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Modal } from 'components/modal/Modal';
import { Spinner } from 'components/spinner/Spinner';
import { deleteUser, editUser } from 'mockapi/controllers/users';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    background: #FFF;
    padding: 15px 8px;
    border-radius: 4px;
    box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.2);
    max-height: 222px;
`;

const Wrapper = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    width: auto;
    gap: 13px;
    max-width: 360px;
`;

const Line = styled.div`
    display: flex;
    gap: 10px;
`;


const Text = styled.p`
    margin: 0;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: 600;
`;


const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin: auto 0;
`;

const ButtonStyled = styled.button`
    width: 100%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 26px;
    text-align: center;
    border: none;
    background-color: ${props => props.disabled ? '#dcdcdc' : "rgba(0, 171, 228,.8)"};
    font-weight: 700;
    font-size: 22px;
    color: #FFF;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
       background-color: ${props => props.disabled ? '#dcdcdc' : "rgba(0, 171, 228,1)"}; 
    }
`;

const ButtonVariation = styled(ButtonStyled)`
    padding: 9px;
    font-size: 14px;
    font-weight: 600;
`;

const ButtonVariationDelete = styled(ButtonStyled)`
    padding: 9px;
    font-size: 14px;
    font-weight: 600;
    background-color: rgba(255, 0, 0, 0.6);
    &:hover{
       background-color: rgba(255, 0, 0, 0.8); 
    }
`;

const ModalHeadline = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin: 0;
`;

export const UserCard = ({ user, handleRefresh }) => {

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
                await deleteUser(user.id);
                setLoading(false);
                handleRefresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditChange = (event) => {
        console.log("first")
        setEditModal({ ...editModal, [event.target.name]: event.target.value })
    }

    const handleEdit = async () => {
        try {
            if (!editModal.loading) {
                setEditModal({ ...editModal, loading: true })
                const response = await editUser(editModal.id, editModal.name, editModal.email, editModal.address);
                console.log(response)
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
            console.log(errors)
            setEditModal({ ...editModal, errors })
        }
    };
    return (
        <Container>
            <Modal open={editModal.open} handleClose={handleClose}>
                <ModalHeadline>Edit</ModalHeadline>
                <Input error={editModal.errors?.name} handleChange={handleEditChange} name="name" value={editModal.name} label="Name" helperText="It should be at least 5 including 1 space" />
                <Input error={editModal.errors?.email} handleChange={handleEditChange} name="email" value={editModal.email} label="Email" helperText="It should be a valid email format" />
                <Input error={editModal.errors?.address} handleChange={handleEditChange} name="address" value={editModal.address} label="Address" helperText="It should be at least 5 including 1 space" />
                <Button handleClick={handleEdit} loading={editModal.loading}>Done</Button>
            </Modal>
            <Wrapper>
                <Line>
                    <Icon src="id-card.png" />
                    <Text>{user.name}</Text>
                </Line>
                <Line>
                    <Icon src="mail.png" />
                    <Text>{user.email}</Text>
                </Line>
                <Line>
                    <Icon src="location.png" />
                    <Text>{user.address}</Text>
                </Line>
                <ButtonVariation onClick={() => handleEditClick(user)}>Edit</ButtonVariation>
                <ButtonVariationDelete onClick={handleDelete}>{loading ? <Spinner size='16px' /> : "Delete"}</ButtonVariationDelete>
            </Wrapper>
        </Container>
    )
}
