import styled from 'styled-components';

export const Button = styled.button`
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