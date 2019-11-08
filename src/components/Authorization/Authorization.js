import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column;

    border-radius: 15px;
    width: 80%;
    max-width: 400px;
    padding: 50px 20px;

    background-color: white;
`;

export const Text = styled.span`
    font-size: 14px;
    color: black;
    margin-bottom: 10px;
`;

export const StyledInput = styled.input`
    width: 100%;
    height: 25px;
    border-radius: 5px;
    border: solid grey 1px;
    padding-left: 10px;
`;

export const Button = styled.button`
    width: 40%;
    height: 25px;
    border-radius: 5px;
    margin-top: 20px;
    align-self: center;
    background-color: green;
`;