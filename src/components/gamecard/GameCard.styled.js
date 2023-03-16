import styled, { css } from 'styled-components';

export const Container = styled.div`
    background: #FFF;
    padding: 15px 8px;
    border-radius: 4px;
    box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.2);
    max-height: 222px;
`;

export const Wrapper = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    width: auto;
    gap: 13px;
    max-width: 360px;
`;

export const Line = styled.div`
    display: flex;
    gap: 10px;
`;


export const Text = styled.p`
    margin: 0;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: 600;
`;


export const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin: auto 0;
`;

export const ButtonStyled = styled.button`
    width: 100%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 26px;
    text-align: center;
    border: none;
    background-color: ${props => props.disabled ? '#dcdcdc' : "rgba(0, 171, 228,.8)"};
    font-weight: 700;
    font-size: 22px;
    color: #FFF;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
       background-color: ${props => props.disabled ? '#dcdcdc' : "rgba(0, 171, 228,1)"}; 
    }
`;

export const ButtonVariation = styled(ButtonStyled)`
    padding: 9px;
    font-size: 14px;
    font-weight: 600;
`;

export const ButtonVariationDelete = styled(ButtonStyled)`
    padding: 9px;
    font-size: 14px;
    font-weight: 600;
    background-color: rgba(255, 0, 0, 0.6);
    &:hover{
       background-color: rgba(255, 0, 0, 0.8); 
    }
`;

export const ModalHeadline = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin: 0;
`;