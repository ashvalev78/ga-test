import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`;

export const Table = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;

    width: 80%;
    height: 80%;
    padding: 10px;
    overflow-y: auto;
    background-color: white;
`;

export const Row = styled.div`
    display: flex;
    
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid grey;
`;

export const Column = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20%;
    height: 100%;
    border-right: 1px solid black;
`;

export const Input = styled.input`
    width: 100%;
    border: none;
    padding-left: 10px;
`;