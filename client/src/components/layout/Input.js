import styled from "styled-components";

export const Input = styled.input.attrs((props)=> ({
    type: props.typeCat ||  'text'
}))`
    width: 100%;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font: inherit;
    
    &:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }
`