import styled from "styled-components";
import React from "react";

const Checkmark = styled.span`
    width: 25px;
    height: 25px;
    background-color: #F2F2F2;
    border: 1px solid #000000;
    
    &:after {
        content: '';
        display: none;
        position: absolute;
        right: 17px;
        top: 14px;
        width: 6px;
        height: 11px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`


const Input = styled.input.attrs( props => {
    return {
        type: 'checkbox'
    }
})`
    position: absolute;
    width: 25px;
    height: 25px;
    opacity: 0;
    right: 5px;
    cursor: pointer;
    
    //refers to the Checkmark component
    &:hover ${Checkmark} {
        background-color: #CCC;
    }
    
    //refers to the Checkmark component
    &:checked ~ ${Checkmark} {
        background-color: #2196F3;
    }

    //refers to the Checkmark component
    &:checked ~ ${Checkmark}:after {
        display: block;
    }
`

const CustomCheckbox = (props) => {
    return (
        <React.Fragment>
            <Input 
                defaultChecked={props.isChecked}
                defaultValue={props.value}
                id={props.id}
                name={props.name}
            />
            <Checkmark />
        </React.Fragment>
    )
}

export default CustomCheckbox;