import styled, { css } from 'styled-components';

export const PopupContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PopupWrapper = styled.div`
    padding: 60px 40px;
    background-color: #FFF;
    border-radius: 4px;
    min-width: 472px;
    display: flex;
    flex-direction: column;
    gap: 13px;
`;