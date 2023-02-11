import React, {useState}  from "react";
import { NavLink } from "react-router-dom";
import styles from './TheHeader.module.css';
import BaseButton from "../UI/BaseButton";

const TheHeader = () => {
    let [activateBar, updateActivateBar] = useState(false)
    const toggleNavbar = () => {
        updateActivateBar((prevState)=> {
            return prevState === false
        })
    }
    
    return (
        <nav className={`${styles['navbar']} ${activateBar ? styles['navbar_mobile_height'] : undefined}`}>
            <div className={styles['navbar_title']}>
                <NavLink to="/">IT-COMMUNITY</NavLink>
            </div>
            <a href="javascript:void(0)" className={styles['toggle_buttons']} onClick={toggleNavbar}>
                <span className={styles['bar']}></span>
                <span className={styles['bar']}></span>
                <span className={styles['bar']}></span>
            </a>
            <div className={`${styles['navbar_links']} ${activateBar ? styles['activate_bar'] : undefined}`}>
                <ul>
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