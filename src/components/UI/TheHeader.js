import React  from "react";
import { NavLink } from "react-router-dom";
import styles from './TheHeader.module.css';

const TheHeader = () => {
    
    return (
        <React.Fragment>
            <header className={styles['header_wrapper']}>
                <div className={styles['header_title']}>
                    <NavLink to="/">IT-COMMUNITY</NavLink>
                </div>
                <nav className={styles['navbar_wrapper']}>
                    <ul>
                        <li className={styles['navbar_link']}>
                            <NavLink to="/posters" className={({isActive})=> isActive ? 'active' : undefined}>Posters</NavLink>
                        </li>
                        <li className={styles['navbar_link']}>
                        <NavLink to="/companies" className={({isActive})=> isActive ? 'active' : undefined}>Companies</NavLink>
                        </li>
                        <li className={styles['navbar_link']}>
                        <NavLink to="/messages" className={({isActive})=> isActive ? 'active' : undefined}>Messages</NavLink>
                        </li>
                        <li className={styles['navbar_link']}>
                        <NavLink to="/" className={({isActive})=> isActive ? 'active' : undefined}>Sign in</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default TheHeader;