import React from 'react'
import * as styled from "./Input.styled";

export const Input = ({ value, handleChange, error, label, helperText, type = "text", name }) => {
    return (
        <styled.Container>
            <styled.Input type={type} placeholder={label} onChange={handleChange} value={value} error={error} name={name} />
            <styled.HelperText error={error}>{error ? error : helperText}</styled.HelperText>
        </styled.Container>
    )
}
