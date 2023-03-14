import { Navigation } from 'components/navigation/Navigation'
import React, { useState } from 'react'


const tabs = [
    {
        name: 'Customers',
        icon: '/UserListIcon.png',
        content: 'Customers'
    }, {
        name: 'Games',
        icon: '/GamesListIcon.png',
        content: 'GAMES'
    },
]


export const HomePage = ({ setUserId }) => {
    return (
        <div>
            <Navigation setUserId={setUserId} tabs={tabs} />
        </div>
    )
}
