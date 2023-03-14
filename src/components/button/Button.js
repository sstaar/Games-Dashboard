import React from 'react'
import * as styled from "./Button.styled";

export const Button = ({ children, handleClick }) => {
    return (
        <styled.Button onClick={handleClick}>{children}</styled.Button>
    )
}
