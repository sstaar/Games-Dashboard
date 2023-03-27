import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 100%;
`;

export const Button = styled.button`
    border: none;
    background-color: #ffffff;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => (props.active ? '#ffffff' : '#000000')};
    background-color: ${props => props.active ? 'rgba(0, 171, 228,.8)' : "#ffffff"};
    margin: 0 5px;
    border-radius: 4px;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    &:hover{
            background-color: ${props => props.active ? 'rgba(0, 171, 228,.8)' : "rgba(0, 171, 228,.1)"};
        }
`;

export const Dots = styled.span`
  margin: 0 5px;
`;