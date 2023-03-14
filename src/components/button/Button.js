import { Spinner } from 'components/spinner/Spinner';
import React from 'react'
import * as styled from "./Button.styled";

export const Button = ({ children, handleClick, loading }) => {
    if (loading)
        return (
            <styled.Button disabled onClick={handleClick}>
                <Spinner size='26px' />
            </styled.Button>
        )
    return (
        <styled.Button onClick={handleClick}>{children}</styled.Button>
    )
}
