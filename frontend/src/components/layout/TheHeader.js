import React, { useState, useContext }  from "react";
import styles from './TheHeader.module.css';
import styled from "styled-components";

//components
import AdminNavigationHeader from "../admin/AdminNavigationHeader";
import UserNavigationHeader from "./UserNavigationHeader";

//UI components
import { NavigationLink } from "../UI/BaseLinks";

//context
import AuthContext from "../../store/auth-context";

const HamburgerBar = styled.span`
        display: block;
        background-color: #CECECE;
        height: 3px;
        width: 40px;
        border-radius: 10px;
    `

export const CloseBar = styled(HamburgerBar)`
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
    
    const authData = useContext(AuthContext);
    
    const [adminNavigation, setAdminNavigation] = useState(false)

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

    const handleNavMode = (mode) => {
        if ( mode === 'user' ) {
            setAdminNavigation(false)
        } else {
            setAdminNavigation(true)
        }
    }

    const navigation = authData && authData.userData && authData.userData.roles.includes('admin') && adminNavigation === true ? <AdminNavigationHeader onNavMode={handleNavMode} /> : <UserNavigationHeader onNavMode={handleNavMode}/>
    
    return (
        <nav className={`${styles['navbar']} ${activateBar ? styles['navbar_mobile_height'] : ''}`}>
            <div className={styles['navbar_title']}>
                <NavigationLink to="/">IT-COMMUNITY{authData && authData.userData && authData.userData.roles.includes('admin') && adminNavigation === true ? '-ADMIN' : ''}</NavigationLink>
            </div>
            <div className={styles['toggle_buttons']} onClick={toggleNavbar}>
                {chooseButton()}
            </div>
            <div className={`${styles['navbar_links']} ${activateBar ? styles['activate_bar'] : ''}`}>
                {navigation}
            </div>
        </nav>
    )
}

export default TheHeader;