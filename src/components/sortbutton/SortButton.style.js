import styled from 'styled-components';

export const SortContainer = styled.div`
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 6px 21px;
    background-color: #FFF;
    display: flex;
    gap: 10px;
    margin-right: auto;
`;

export const SortText = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: auto 0;
    margin-right: 20px;
`;

export const SortOption = styled.div`
    font-size: 16px;
    transition: 0.3s ease-in-out;
    font-weight: ${props => props.selected ? "600" : "500"};
    padding: 5px 12px;
    background: ${props => props.selected ? "rgba(0, 171, 228,.8)" : "none"};
    border-radius: 4px;
    cursor: pointer;
    text-transform: capitalize;
    color: ${props => props.selected ? "#FFF" : "#000"};
    &:hover{
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
        background: ${props => props.selected ? "rgba(0, 171, 228,.8)" : "rgba(0, 171, 228,.1)"};
        color: ${props => props.selected ? "#FFF" : "#000"};
    }
`;

export const SortDivider = styled.div`
    width: 1px;
    min-height: 80%;
    margin: 9px 0;
    border-radius: 50%;
    background: gray;
    margin: auto;
`;