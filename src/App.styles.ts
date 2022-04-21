import styled from "styled-components";


export const Container = styled.div`
    background-color: #1a6a6b;
    color: #ffff;
    min-height: 100vh;
`;

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 30px 0;
`;

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 30px;
`;

export const Loading = styled.div`
    text-align: center;

`; 

export const ImageList = styled.div`
    
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

export const Card = styled.div`
    max-width: 100%;
    display: contents;

`;

export const UploadForm = styled.form`
    background-color: #08847e;
    border-radius: 8px;
    padding: 10px;

    input[type=file] {
        display: none;
    }

`;

export const AreaAddFile = styled.div`
    height: 100%;
`;

export const AddFile = styled.div`
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    height: 100%;
    align-content: center;
    justify-content: center;

    img{
        min-width: 30px;
        max-width: 50px;
    }

    p{
        width: 100%;
        text-align: center;
        font-weight: 600;
        margin: 0;
    }
`;