import React, { useContext } from "react";
import { Form } from 'react-router-dom';
import styles from './UserNavigationHeader.module.scss';

//UI components
import { NavigationLink, NavigationLinkAsButton } from "../UI/BaseLinks";

//context
import AuthContext from "../../store/auth-context";

const UserNavigationHeader = ( { onNavMode } ) => {
    const authData = useContext(AuthContext)
    
    const changeNavMode = () => {
        onNavMode('admin')
    }
    
    return (
        <ul role='list' className={styles['user_links']}>
            <li className={styles['navbar_link']}>
                <NavigationLink to="posters?page=1" className={({isActive})=> isActive ? 'active' : ''}>Job Ads</NavigationLink>
            </li>
            {authData && authData.userData && (authData.userData.roles && authData.userData.roles.includes('company')) &&
                <React.Fragment>
                    <li className={styles['navbar_link']}>
                        <NavigationLink to="profile" className={({isActive})=> isActive ? 'active' : ''}>Profile</NavigationLink>
                    </li>
                    <li className={styles['navbar_link']}>
                        <NavigationLinkAsButton
                            to="create"
                            className={({isActive})=> isActive ? 'active' : ''}
                        >
                            Create
                        </NavigationLinkAsButton>
                    </li>
                    <li className={styles['navbar_link']}>
                        <NavigationLinkAsButton
                            to="messages"
                            className={({isActive})=> isActive ? 'active' : ''}
                        >
                            Messages
                        </NavigationLinkAsButton>
                    </li>
                </React.Fragment>
            }
            { !authData || 
                (
                    !authData.token &&
                    <li className={styles['navbar_link']}>
                        <NavigationLinkAsButton
                            to="auth?mode=login"
                            className={({isActive})=> isActive ? 'active' : ''}
                        >
                            Sign in
                        </NavigationLinkAsButton>
                    </li>
                )
            }
            { authData && authData.token &&
                <Form method='post' action='/logout'>
                    <li className={styles['navbar_link']} >
                        <NavigationLinkAsButton as='button' className={styles['logout_btn']}>
                            Logout
                        </NavigationLinkAsButton>
                    </li>
                </Form>
            }
            {
                authData && authData.token && (authData.userData.roles && authData.userData.roles.includes('admin')) &&
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