import styled from 'styled-components';

export const ContainerItems = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 20px;
`;

export const WrapperItems = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(100px,500px));
    grid-gap: 10px;
    min-height: 918px;
`;

export const Loader = styled.div`
    min-height: 918px;
    display: flex;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;