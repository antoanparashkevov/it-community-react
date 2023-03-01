import React, { useState, useContext }  from "react";
import styles from './TheHeader.module.css';
import styled from "styled-components";


//UI components
import { NavigationLink, NavigationLinkAsButton } from "../UI/BaseLinks";

//context
import AuthContext from "../../store/auth-context";

const HamburgerBar = styled.span`
        display: block;
        background-color: #CECECE;
        height: 3px;
        width: 40px;
        border-radius: 10px;
    `

const CloseBar = styled(HamburgerBar)`
    border: 3px solid #E0E0E0;
    background-color: #E0E0E0;
    position: absolute;
    transform: rotate(-45deg);
    
    &:nth-child(2) {
        transform: rotate(45deg);
    }
`

const TheHeader = () => {
    let [activateBar, updateActivateBar] = useState(false)
    const authCtx = useContext(AuthContext);
    
    const toggleNavbar = () => {
        updateActivateBar((prevState)=> {
            return prevState === false
        })
    }
    
    const chooseButton = () => {
        if(activateBar) {
            return (
                <div className={styles['close_bar_btn']}>
                    <CloseBar />
                    <CloseBar />
                </div>
            )
        } else {
            return (
                <>
                    <HamburgerBar />
                    <HamburgerBar />
                    <HamburgerBar />
                </>
            )
        }
    }
    
    return (
        <nav className={`${styles['navbar']} ${activateBar ? styles['navbar_mobile_height'] : ''}`}>
            <div className={styles['navbar_title']}>
                <NavigationLink to="/">IT-COMMUNITY</NavigationLink>
            </div>
            <div className={styles['toggle_buttons']} onClick={toggleNavbar}>
                {chooseButton()}
            </div>
            <div className={`${styles['navbar_links']} ${activateBar ? styles['activate_bar'] : ''}`}>
                <ul role='list'>
                    <li className={styles['navbar_link']}>
                        <NavigationLink to="posters" className={({isActive})=> isActive ? 'active' : undefined}>Job Ads</NavigationLink>
                    </li>
                    <li className={styles['navbar_link']}>
                        <NavigationLink to="companies" className={({isActive})=> isActive ? 'active' : undefined}>Companies</NavigationLink>
                    </li>
                    <li className={styles['navbar_link']}>
                        <NavigationLinkAsButton 
                            to="messages"
                            className={({isActive})=> isActive ? 'active' : undefined}
                        >
                            Messages
                        </NavigationLinkAsButton>
                    </li>
                    <li className={styles['navbar_link']}>
                        <NavigationLinkAsButton 
                            to="/" 
                            className={({isActive})=> isActive ? 'active' : undefined}
                        >
                            Sign in
                        </NavigationLinkAsButton>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TheHeader;