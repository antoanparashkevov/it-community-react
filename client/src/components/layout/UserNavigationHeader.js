import styles from './UserNavigationHeader.module.scss';
import React from "react";
import { Form, Link } from 'react-router-dom';

//UI components
import { NavigationLink, NavigationLinkAsButton } from "../UI/BaseLinks";

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
            <Form method='post' action='/logout'>
                <li className={styles['navbar_link']} >
                    <NavigationLinkAsButton as='button' className={styles['logout_btn']}>
                        Logout
                    </NavigationLinkAsButton>
                </li>
            </Form>
        </ul>
    )
}

export default UserNavigationHeader;