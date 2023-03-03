import styled from "styled-components";
import React from "react";

const LabelWrapper = styled.label`
    align-items: center;
    display: flex;
    margin-right: 15px;
`

const LabelText = styled.span`
    color: #000000;
    font-size: 16px;
`

const Label = (props) => {
    return (
        <React.Fragment>
            <LabelWrapper htmlFor={props.for}>
                <LabelText>{props.children}</LabelText>
            </LabelWrapper>
        </React.Fragment>
    )    
}

export default Label;