import React, { useState } from 'react'
import * as styled from "./Navigation.styled";

export const Navigation = ({ tabs = [], setUserId }) => {
    const [mini, setMini] = useState(false);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setUserId(null);
    }

    return (
        <styled.Container>
            <styled.Nav mini={mini}>
                <styled.Arrow mini={mini} onClick={() => setMini(!mini)} src="/Arrow.png" />
                <styled.Logo mini={mini} src='/logo.png' />
                <styled.TabsContainer>
                    {tabs.map((tab, key) =>
                        <styled.TabContainer selected={key === selectedTab} key={key} onClick={() => setSelectedTab(key)}>
                            <styled.TabIcon src={tab.icon} />
                            <styled.TabText selected={key === selectedTab}>{tab.name}</styled.TabText>
                        </styled.TabContainer>
                    )}
                </styled.TabsContainer>
                <styled.LogoutContainer onClick={handleLogout}>
                    <styled.Logout mini={mini} src='/logout.png' />
                </styled.LogoutContainer>
            </styled.Nav>
            <styled.Content>{tabs[selectedTab].content}</styled.Content>
        </styled.Container>
    )
}
