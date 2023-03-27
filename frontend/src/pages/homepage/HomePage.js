import React from 'react'
import { Navigation } from 'components/navigation/Navigation'
import { UsersTab } from 'components/userstab/UsersTab';
import { GamesTab } from 'components/gamestab/GamesTab';

const tabs = [
    {
        name: 'Customers',
        icon: '/UserListIcon.png',
        content: <UsersTab />
    },
    {
        name: 'Games',
        icon: '/GamesListIcon.png',
        content: <GamesTab />
    },
];

export const HomePage = ({ setUserId }) => {
    return (
        <div>
            <Navigation setUserId={setUserId} tabs={tabs} />
        </div>
    )
}
