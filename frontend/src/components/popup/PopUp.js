import React from 'react'
import * as styled from "./PopUp.styled";

export const PopUp = ({ children }) => {
    return (
        <styled.Container>
            {children}
        </styled.Container>
    )
}
