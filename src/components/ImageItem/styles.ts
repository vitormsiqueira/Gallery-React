import styled from 'styled-components';

export const Container = styled.div`
    background-color: #08847e;
    border-radius: 8px;
    padding: 10px;
    border: 3px solid transparent;

    img{
        max-width: 100%;
        display: block;
        margin-bottom: 10px;
        border-radius: 8px;
    }

    &:hover{
        opacity: .9;
        cursor: pointer;
        border: 3px solid #ffff;
    }
`;