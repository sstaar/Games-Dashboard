import { AddUser } from 'components/adduser/AddUser';
import { Pagination } from 'components/pagination/Pagination';
import { SortButton } from 'components/sortbutton/SortButton';
import { Spinner } from 'components/spinner/Spinner';
import { UserCard } from 'components/usercard/UserCard';
import { getUsers } from 'mockapi/controllers/users';
import React, { useEffect, useState } from 'react'
import * as styled from "./UsersTab.styled";

export const UsersTab = () => {
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
        <styled.ContainerItems>
            <styled.Header>
                <SortButton handleChange={handleSortChange} selected={data.sort} options={['name', 'address', 'email']} />
                <AddUser handleRefresh={handleRefresh} />
            </styled.Header>
            {data.loading ?
                <styled.Loader> <Spinner /></styled.Loader> :
                <styled.WrapperItems>
                    {data.users.map(user => <UserCard handleRefresh={handleRefresh} user={user} />)}
                </styled.WrapperItems>
            }
            {data.pages > 0 && <Pagination currentPage={data.currentPage} totalPages={data.pages} onPageChange={handlePageChange} />}
        </styled.ContainerItems>
    )
}
