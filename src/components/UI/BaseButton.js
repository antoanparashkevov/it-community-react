import styled from "styled-components";

/* BASIC COMPONENTS START */

export const Button = styled.button`
    font:inherit;
    padding: 0.75rem 1.75rem;
    background-color: #3a0061;
    border: 1px solid #3a0061;
    color: #FFFFFF;
    cursor: pointer;
    border-radius: 30px;
    margin-right: 0.5rem;
    display: inline-block;
`

/* BASIC COMPONENTS END */

export const OutlineButton = styled(Button)`
    background-color: transparent;
    border: 1px solid #270041;
    color: #270041;
    
    &:active,
    &:hover {
       background-color: #edd2ff;
        border: 1px solid #270041;
    }
`

export const RoundedButton = styled(Button)`
    background-color: #304FFE;
    border: none;
    border-radius: 50px;
    color: #FFFFFF;
    
    &:active,
    &:hover {
        background-color: #233CC8;
        border: none;
    }
`

export const FlatButton = styled(Button)`
    background-color: #EBF3FF;
    border: none;
    border-radius: 5px;
    color: #304FFE;

    &:active,
    &:hover {
        background-color: #DAE9FF;
        border: none;
    }
`

export const SquareButton = styled(Button)`
    background-color: #4d4ae8;
    border: 1px solid #4D4AE8;
    border-radius: 1rem;

    &:active,
    &:hover {
        background-color: #3733E5;
        border: 1px solid #3733E5;
        
    }
    
    &:active {
        background-image: none;
        box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset;
    }
    
    &:active:focus {
        box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset, rgba(104, 101, 235, 0.5) 0 0 0 .2rem;
    }
`

// todo make an example with 'as' 
