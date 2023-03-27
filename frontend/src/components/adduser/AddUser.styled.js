import styled from 'styled-components';

export const ModalHeadline = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin: 0;
`;

export const Container = styled.div`
    
`;

export const AddButton = styled.button`
    width: 100%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 9px 22px;
    text-align: center;
    border: none;
    background-color:rgba(0,255,0,.8);
    font-weight: 700;
    font-size: 22px;
    color: #FFF;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
    background-color:rgba(0,255,0,.9);
    }
`;