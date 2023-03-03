import styled from "styled-components";

export const BaseCard = styled.div.attrs(props=> {
   return {
       hide: props.hide || false,
   } 
})`
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 12px;
    
    ${props => {
       return props['hide'] ? 'display: none' : ''
    }}
`