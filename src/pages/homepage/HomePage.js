import { AddUser } from 'components/adduser/AddUser';
import { Button } from 'components/button/Button';
import { Input } from 'components/input/Input';
import { Modal } from 'components/modal/Modal';
import { Navigation } from 'components/navigation/Navigation'
import { Pagination } from 'components/pagination/Pagination';
import { SortButton } from 'components/sortbutton/SortButton';
import { Spinner } from 'components/spinner/Spinner';
import { UserCard } from 'components/usercard/UserCard';
import { deleteUser, editUser, getUsers } from 'mockapi/controllers/users';
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components';

const ContainerItems = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 20px;
`;

const WrapperItems = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(100px,500px));
    grid-gap: 10px;
    min-height: 918px;
`;

const Loader = styled.div`
    min-height: 918px;
    display: flex;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Tab = () => {

    const [data, setData] = useState({
        users: [],
        pages: 0,
        loading: true,
        currentPage: 1,
        sort: null,
        refresh: false
    });

    useEffect(() => {
        const callback = async () => {
            try {
                setData({
                    ...data,
                    loading: true,
                })
                const response = await getUsers(data.currentPage, data.sort);
                setData({
                    ...data,
                    users: response.data,
                    pages: response.pages,
                    loading: false,
                })
            } catch (error) {
                console.log(error)
            }
        }
        callback();
    }, [data.currentPage, data.sort, data.refresh]);

    const handlePageChange = (page) => {
        if (!data.loading)
            setData({
                ...data,
                currentPage: page
            })
    };

    const handleSortChange = (sort) => {
        if (!data.loading)
            setData({
                ...data,
                sort
            })
    };

    const handleRefresh = () => {
        setData({ ...data, refresh: !data.refresh });
    };

    return (
        <ContainerItems>
            <Header>
                <SortButton handleChange={handleSortChange} selected={data.sort} options={['name', 'address', 'email']} />
                <AddUser handleRefresh={handleRefresh} />
            </Header>
            {data.loading ?
                <Loader> <Spinner /></Loader> :
                <WrapperItems>
                    {data.users.map(user => <UserCard handleRefresh={handleRefresh} user={user} />)}
                </WrapperItems>
            }
            {data.pages > 0 && <Pagination currentPage={data.currentPage} totalPages={data.pages} onPageChange={handlePageChange} />}
        </ContainerItems>
    )
}

const tabs = [
    {
        name: 'Customers',
        icon: '/UserListIcon.png',
        content: <Tab />
    },
    {
        name: 'Games',
        icon: '/GamesListIcon.png',
        content: 'GAMES'
    },
];

export const HomePage = ({ setUserId }) => {
    return (
        <div>
            <Navigation setUserId={setUserId} tabs={tabs} />
        </div>
    )
}
