import styled from "styled-components";
import React from "react";

const LabelWrapper = styled.label`
    align-items: center;
    display: flex;
    margin-right: 15px;
    width: 135px;
    height: 50px;
`

const LabelText = styled.span`
    color: var(--gray-color);
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
    width: 100%;
    white-space: ${props => props['activate_ellipsis'] ? 'nowrap' : 'unset'};
    overflow: hidden;
`

const Label = (props) => {
    return (
        <React.Fragment>
            <LabelWrapper htmlFor={props.for} style={props.style} className={props.className}>
                <LabelText activate_ellipsis={props.activate_ellipsis}>{props.children}</LabelText>
            </LabelWrapper>
        </React.Fragment>
    )    
}

export default Label;