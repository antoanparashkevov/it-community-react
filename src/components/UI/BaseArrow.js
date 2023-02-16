import styled from "styled-components";

const Arrow = styled.div`
    background-image: url('https://dev.bg/wp-content/themes/jobsdevbg/images/chevron.svg');
    width: 14px;
    height: 8px;
    ${props=> props['rotate'] ? 'transform: rotateX(180deg);' : ''}
`

export default Arrow;