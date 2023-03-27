import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    display: flex;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Nav = styled.div`
    background-color: #FFF;
    padding: 50px 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    max-width: ${props => props.mini ? '95px' : '200px'};
    transition: .3s ease-in-out;
    box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.2);
    height: 100vh;
    @media only screen and (max-width: 768px) {
        max-width: 100%;
        flex-direction: row;
        padding: 5px;
        height: auto;

    }
`;

export const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media only screen and (max-width: 768px) {
        flex-direction: row;
    }
`;

export const TabContainer = styled.div`
    display: flex;
    gap: 26px;
    background-color: ${props => props.selected ? '#E6EFFC' : '#FFF'};
    &:hover{
        background-color:#E6EFFC;
    }
    padding: 8px 22px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    
`;

export const TabIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const TabText = styled.div`
    font-size: 16px;
    font-weight: 500;
    font-weight: ${props => props.selected ? '600' : '500'};
`;

export const Content = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    overflow-y: auto;
`;

export const Arrow = styled.img`
    width: 28px;
    height: 28px;
    border: rgba(0, 0, 0, 0.1) solid 1px;
    padding: 6px;
    border-radius: 50%;
    position: absolute;
    top: 10%;
    right: -14px;
    background-color: #FFF;
    transform: ${props => props.mini ? 'rotate(0)' : 'rotate(180deg)'};
    cursor: pointer;
    transition: 0.3s ease-in-out;
    box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.2);
    z-index: 2;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

export const Logo = styled.img`
    width: 80%;
    margin: 0 auto;
    margin-bottom: ${props => props.mini ? '20px' : '60px'};
    transition: 0.3s ease-in-out;
    @media only screen and (max-width: 768px) {
        width: 32px;
        height: 32px;
        float: left;
        margin: auto auto auto 10px;
    }
`;

export const LogoutContainer = styled.div`
    width: 80%;
    margin: auto auto 0 auto;
    display: flex;
    background-color: rgba(255,0,0,.1);
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
        background-color: rgba(255,0,0,.2);
    }

    @media only screen and (max-width: 768px) {
        max-width: 42px;
        margin: auto 10px auto auto;
    }
`;

export const Logout = styled.img`
    width: 24px;
    height: 24px;
    margin:  auto;
    cursor: pointer;
    transition: 0.3s ease-in-out;
`;