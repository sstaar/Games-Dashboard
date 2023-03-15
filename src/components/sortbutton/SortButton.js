import React from 'react'
import * as styled from "./SortButton.style";

export const SortButton = ({ options, selected, handleChange }) => {
    return (
        <styled.SortContainer>
            <styled.SortText>Sort by :</styled.SortText>
            {options.map((item, key) => <>
                <styled.SortOption selected={selected === item} onClick={() => handleChange(item)}>{item}</styled.SortOption>
                {key !== options.length - 1 && <styled.SortDivider />}
            </>)}
        </styled.SortContainer>
    )
}
