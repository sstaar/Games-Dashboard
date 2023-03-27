import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: 50%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #00ABE4;
    animation: ${spinAnimation} 1s ease-in-out infinite;
    margin: auto;
`;