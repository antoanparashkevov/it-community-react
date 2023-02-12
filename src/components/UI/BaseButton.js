import {NavLink} from "react-router-dom";
import styled from "styled-components";
//TODO format the Base Button component
//button is just a regular HTML tag
const Button = styled.button`
    text-decoration: none;
    padding: 0.75rem 1.75rem;
    font:inherit;
    background-color: ${props=>props.className === 'outline' ? 'transparent' : props.className === 'rounded' ? '#304FFE' : props.className === 'flat' ? '#EBF3FF' : props.className === 'square' ? '#4d4ae8' : '#3a0061'};
    border: ${props=>props.className === 'outline' ? '1px solid #270041' : props.className === 'rounded' ? 'none' : props.className === 'flat' ? 'none' : props.className === 'square' ? '1px solid #4D4AE8' : '1px solid #3a0061'};
    color:${props=> props.className === 'outline' ? '#270041' : props.className === 'rounded' ? '#FFFFFF' : props.className === 'flat' ? '#304FFE' : '#FFFFFF'};
    cursor: pointer;
    border-radius: ${props=>props.className === 'outline' ? '30px' : props.className === 'rounded' ? '50px' : props.className === 'flat' ? '5px' : props.className === 'square' ? '1rem' : '30px'};
    margin-right: 0.5rem;
    display: inline-block;

    ${props => props.className === 'square' ? 'background-image: linear-gradient(180deg,rgba(255,255,255,.15),rgba(255,255,255,0));' : ''}
    ${props => props.className === 'square' ? 'box-shadow: #ffffff26 0 1px inset, #2e365013 0 1px 1px;' : ''}
    ${props => props.className === 'square' ? 'transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;' : ''}
   
    &:focus {
        ${props => props.className === 'square' ? 'outline: 0;\n' +
                '    background-color: #413FC5;\n' +
                '    border-color: #3E3BBA;\n' +
                '    box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px, rgba(104, 101, 235, 0.5) 0 0 0 .2rem;' : ''}
    }
    
    &:active,
    &:hover {
        background-color: ${props=>props.className === 'outline' ? '#edd2ff' : props.className === 'rounded' ? '#233CC8' : props.className === 'flat' ? '#DAE9FF' : props.className === 'square' ? '#3733E5' : '#3a0061'};
        border: ${props=>props.className === 'outline' ? '1px solid #270041' : props.className === 'rounded' ? 'none' : props.className === 'flat' ? 'none' : props.className === 'square' ? '1px solid #3733E5' : '1px solid #3a0061'};
    }
    
    &:active {
        ${props => props.className === 'square' ? 'background-image: none;' : ''}
        ${props => props.className === 'square' ? 'box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset;' : ''}
    }
    
    &:active:focus {
        ${props => props.className === 'square' ? 'box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset, rgba(104, 101, 235, 0.5) 0 0 0 .2rem;' : ''}
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