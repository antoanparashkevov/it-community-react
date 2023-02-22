import styled from "styled-components";

const Arrow = styled.div.attrs((props) => {
    return {
        // Transient prop ($rotate)
        $rotate: props.$rotate || false,
        width: props.width || '14px',
        height: props.height || '8px'
    }
})`
    background-image: url('https://dev.bg/wp-content/themes/jobsdevbg/images/chevron.svg');
    width: ${props => props.width};
    height: ${props => props.height};
    ${props=> props.$rotate === true ? 'transform: rotateX(180deg);' : ''}
`

export default Arrow;