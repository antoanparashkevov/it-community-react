import React, {useState}  from "react";
import { NavLink } from "react-router-dom";
import styles from './TheHeader.module.css';
import BaseButton from "../UI/BaseButton";
import styled from "styled-components";

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
        <nav className={`${styles['navbar']} ${activateBar ? styles['navbar_mobile_height'] : undefined}`}>
            <div className={styles['navbar_title']}>
                <NavLink to="/">IT-COMMUNITY</NavLink>
            </div>
            <div className={styles['toggle_buttons']} onClick={toggleNavbar}>
                {chooseButton()}
            </div>
            <div className={`${styles['navbar_links']} ${activateBar ? styles['activate_bar'] : undefined}`}>
                <ul role='list'>
                    <li className={styles['navbar_link']}>
                        <NavLink to="/posters" className={({isActive})=> isActive ? 'active' : undefined}>Job Ads</NavLink>
                    </li>
                    <li className={styles['navbar_link']}>
                        <NavLink to="/companies" className={({isActive})=> isActive ? 'active' : undefined}>Companies</NavLink>
                    </li>
                    <li className={styles['navbar_link']}>
                        <BaseButton 
                            link
                            to="/messages"
                            mode='flat'
                            className={({isActive})=> isActive ? 'active' : undefined}
                        >
                            Messages
                        </BaseButton>
                    </li>
                    <li className={styles['navbar_link']}>
                        <BaseButton 
                            link
                            to="/" 
                            mode='flat'
                            className={({isActive})=> isActive ? 'active' : undefined}
                        >
                            Sign in
                        </BaseButton>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TheHeader;