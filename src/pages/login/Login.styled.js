import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    margin: auto;
    display: flex;
`;

export const Wrapper = styled.div`
    width: 597px;
    margin: auto;
    box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.25);
    padding: 55px 90px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    text-align: center;
    background-color: #FFF;
    border-radius: 4px;
`;

export const Logo = styled.img`
    width: 50%;
    margin: 0 auto ;
`;

export const Headline = styled.p`
    font-weight: 700;
    font-size: 32px;
`;