import styled from "styled-components";

/* BASIC COMPONENTS START */

export const Button = styled.button`
    font: inherit;
    padding: 0.75rem 1.75rem;
    background-color: #9000ff;
    border: 1px solid #9000ff;
    color: var(--header-bg-color);
    cursor: pointer;
    border-radius: 30px;
    margin-right: 0.5rem;
    display: inline-block;

    &:disabled {
        opacity: .65;
        cursor: not-allowed;
    }

    &:hover,
    &:active {
        background-color: #8000e3;
        border-color: #8000e3;
    }

`

/* BASIC COMPONENTS END */

export const OutlineButton = styled(Button)`
    background-color: transparent;
    border: 1px solid #304FFE;
    color: #304FFE;
    
    &:active,
    &:hover {
       background-color: #edd2ff;
        border: 1px solid #270041;
    }
`

export const RoundedButton = styled(Button)`
    background-color: var(--blue-bg-color);
    border: none;
    border-radius: 50px;
    color: var(--header-bg-color);
    
    &:active,
    &:hover {
        background-color: var(--purple-bg-color);
        border: none;
    }

    &:hover:disabled {
        background-color: var(--blue-bg-color);
    }
    
`

export const FlatButton = styled(Button)`
    background-color: var(--nav-btn-bg-color);
    border: none;
    border-radius: 5px;
    color: var(--blue-bg-color);

    &:active,
    &:hover {
        background-color: var(--nav-hover-btn-bg-color);
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
    
    &:disabled {
        background-image: none;
        box-shadow: none;
        opacity: .65;
        pointer-events: none;
    }
`

export const DeleteButton = styled(Button)`
    background-color: transparent;
    border: 1px solid #d26b6b;
    color: #d26b6b;
    pointer-events: auto;
    
    &:hover,
    &:active {
        background-color: transparent;
        border: 1px solid #e07c7c;
        opacity: .75;
    }
    
    &:disabled {
        opacity: .4;
        pointer-events: none;
    }
`

export const EditButton = styled(Button)`
    background-color: transparent;
    border: 1px solid darkseagreen;
    color: darkseagreen;
    pointer-events: auto;
    
    &:hover,
    &:active {
        background-color: transparent;
        border: 1px solid darkolivegreen;
        opacity: .75;
    }
    
    &:disabled {
        opacity: .4;
        pointer-events: none;
    }
`
