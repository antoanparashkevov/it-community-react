import styles from './UserNavigationHeader.module.scss';
import React from "react";
import { Form, useRouteLoaderData } from 'react-router-dom';

//UI components
import { NavigationLink, NavigationLinkAsButton } from "../UI/BaseLinks";

const UserNavigationHeader = ( { onNavMode } ) => {
    const user = useRouteLoaderData('root');
    
    const changeNavMode = () => {
        onNavMode('admin')
    }
    
    return (
        <ul role='list' className={styles['user_links']}>
            <li className={styles['navbar_link']}>
                <NavigationLink to="posters?page=1" className={({isActive})=> isActive ? 'active' : undefined}>Job Ads</NavigationLink>
            </li>
            {user && user.userData && user.userData.roles.includes('company') &&
                <React.Fragment>
                    <li className={styles['navbar_link']}>
                        <NavigationLink to="profile" className={({isActive})=> isActive ? 'active' : undefined}>Profile</NavigationLink>
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
                </React.Fragment>
            }
            { !user || !user.token &&
                <li className={styles['navbar_link']}>
                    <NavigationLinkAsButton
                        to="auth?mode=login"
                        className={({isActive})=> isActive ? 'active' : undefined}
                    >
                        Sign in
                    </NavigationLinkAsButton>
                </li>
            }
            { user && user.token &&
                <Form method='post' action='/logout'>
                    <li className={styles['navbar_link']} >
                        <NavigationLinkAsButton as='button' className={styles['logout_btn']}>
                            Logout
                        </NavigationLinkAsButton>
                    </li>
                </Form>
            }
            {
                user && user.token && user.userData.roles.includes('admin') &&
                <li className={styles['navbar_link']}>
                    <NavigationLinkAsButton as='button' className={styles['logout_btn']} onClick={changeNavMode}>
                        Admin Nav
                    </NavigationLinkAsButton>
                </li>
            }
        </ul>
    )
}

export default UserNavigationHeader;