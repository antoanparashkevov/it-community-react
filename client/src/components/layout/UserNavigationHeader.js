import styles from './UserNavigationHeader.module.scss';
import { NavigationLink, NavigationLinkAsButton } from "../UI/BaseLinks";
import React from "react";

const UserNavigationHeader = () => {
    return (
        <ul role='list' className={styles['user_links']}>
            <li className={styles['navbar_link']}>
                <NavigationLink to="posters" className={({isActive})=> isActive ? 'active' : undefined}>Job Ads</NavigationLink>
            </li>
            <li className={styles['navbar_link']}>
                <NavigationLink to="companies" className={({isActive})=> isActive ? 'active' : undefined}>Companies</NavigationLink>
            </li>
            <li className={styles['navbar_link']}>
                <NavigationLinkAsButton
                    to="create"
                    className={({isActive})=> isActive ? 'active' : undefined}
                >
                    Create
                </NavigationLinkAsButton>
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
                    to="auth?mode=login"
                    className={({isActive})=> isActive ? 'active' : undefined}
                >
                    Sign in
                </NavigationLinkAsButton>
            </li>
        </ul>
    )
}

export default UserNavigationHeader;