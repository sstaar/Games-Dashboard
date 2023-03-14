import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 25px 20px;
    font-weight: 500;
    font-size: 22px;
    border: ${props => props.error ? 'solid 1px #FF0033' : 'solid 1px #919191 '};
    outline: none;
    transition: .3s ease-in-out;
    color: #090A0A;
    &:focus {
        border:  ${props => props.error ? 'solid 1px #FF0033' : 'solid 1px #00ABE4'};
    }
    border-radius: 4px;
`;

export const HelperText = styled.p`
    font-weight: 400;
    font-size: 14px;
    margin: 0;
    color: ${props => props.error ? '#FF0033' : '#72777A'};
    text-align: left;
`;