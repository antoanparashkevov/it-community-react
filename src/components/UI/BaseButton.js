import {NavLink} from "react-router-dom";
import styled from "styled-components";

//button is just a regular HTML tag
const Button = styled.button`
    text-decoration: none;
    padding: 0.75rem 1.75rem;
    font:inherit;
    background-color: ${props=>props.className === 'outline' ? 'transparent' : props.className === 'rounded' ? '#304FFE' : props.className === 'flat' ? '#EBF3FF' : '#3a0061'};
    border: ${props=>props.className === 'outline' ? '1px solid #270041' : props.className === 'rounded' ? 'none' : props.className === 'flat' ? 'none' : '1px solid #3a0061'};
    color:${props=> props.className === 'outline' ? '#270041' : props.className === 'rounded' ? '#FFFFFF' : props.className === 'flat' ? '#304FFE' : '#FFFFFF'};
    cursor: pointer;
    border-radius: ${props=>props.className === 'outline' ? '30px' : props.className === 'rounded' ? '50px' : props.className === 'flat' ? '5px' : '30px'};
    margin-right: 0.5rem;
    display: inline-block;

    &:active,
    &:hover {
        background-color: ${props=>props.className === 'outline' ? '#edd2ff' : props.className === 'rounded' ? '#233CC8' : props.className === 'flat' ? '#DAE9FF' : '#3a0061'};
        border: ${props=>props.className === 'outline' ? '1px solid #270041' : props.className === 'rounded' ? 'none' : props.className === 'flat' ? 'none' : '1px solid #3a0061'};
    }
`

const NavigationLink = ({className, children, to}) => (
    <NavLink className={className} to={to}>{children}</NavLink>
)

const StyledLink = styled(NavigationLink)`
    display: block;
    text-decoration: none;
    padding: 0.75rem 1.75rem;
    font:inherit;
    background-color: ${props=>props.className === 'outline' ? 'transparent' : props.className === 'rounded' ? '#304FFE' : props.className === 'flat' ? '#EBF3FF' : '#3a0061'};
    border: ${props=>props.className === 'outline' ? '1px solid #270041' : props.className === 'rounded' ? 'none' : props.className === 'flat' ? 'none' : '1px solid #3a0061'};
    color:${props=> props.className === 'outline' ? '#270041' : props.className === 'rounded' ? '#FFFFFF' : props.className === 'flat' ? '#304FFE' : '#FFFFFF'};
    cursor: pointer;
    border-radius: ${props=>props.className === 'outline' ? '30px' : props.className === 'rounded' ? '50px' : props.className === 'flat' ? '5px' : '30px'};
    margin-right: 0.5rem;

    &:active,
    &:hover {
        background-color: ${props=>props.className === 'outline' ? '#edd2ff' : props.className === 'rounded' ? '#233CC8' : props.className === 'flat' ? '#DAE9FF' : '#3a0061'};
        border: ${props=>props.className === 'outline' ? '1px solid #270041' : props.className === 'rounded' ? 'none' : props.className === 'flat' ? 'none' : '1px solid #3a0061'};
        opacity: .95;
    }
    
    .active {
        background-color: ${props=>props.className === 'outline' ? '#edd2ff' : props.className === 'rounded' ? '#233CC8' : props.className === 'flat' ? '#DAE9FF' : '#3a0061'};
    }
`

//this is so-called render method, and we should define our styled components outside the render method,
//otherwise it will be recreated on every single render pass
const BaseButton = (props) => {
    
    const chosenButton = () => {
        
        if(!props.link) {
            return <Button 
                type={props.type ? props.type : 'button'} 
                className={props.mode}
            >
                {props.children}
            </Button>
        }
        return <StyledLink 
            to={props.to} 
            className={props.mode} 
            children={props.children}
        />
    };
    
    return chosenButton()
}

export default BaseButton;