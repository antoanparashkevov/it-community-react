import styled from "styled-components";

const SeparationLine = styled.span`
    min-width: ${props => props['min-width'] ? props['min-width'] : '100px'};
    display: block;
    width: 100%;
    height: ${props=> props['height'] ? props['height'] : '3px'};
    background-color: ${props => props['bgColor'] ? props['bgColor'] : '#F2F2F2'};
    transform: rotate(${props => props['degrees'] ? props['degrees'] : 0});
    border-radius: 3px;
`


export default SeparationLine;