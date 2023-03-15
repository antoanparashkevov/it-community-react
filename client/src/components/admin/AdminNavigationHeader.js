import styles from './AdminNavigationHeader.module.scss';
import { NavigationLinkAsButton } from "../UI/BaseLinks";
import React from "react";
import { Form, useRouteLoaderData } from "react-router-dom";

const AdminNavigationHeader = ( { onNavMode } ) => {
    const user = useRouteLoaderData('root')
    
    const changeNavMode = () => {
        onNavMode('user')
    }
    return (
        <ul role='list' className={styles['admin_links']}>
            <li className={styles['navbar_link']}>
                <NavigationLinkAsButton
                    to="admin/category"
                    className={({isActive})=> isActive ? 'active' : undefined}
                >
                    Category
                </NavigationLinkAsButton>
            </li>
            <li className={styles['navbar_link']}>
                <NavigationLinkAsButton
                    to="admin/subcategory"
                    className={({isActive})=> isActive ? 'active' : undefined}
                >
                    Subcategory
                </NavigationLinkAsButton>
            </li>
            <Form method='post' action='/logout'>
                <li className={styles['navbar_link']} >
                    <NavigationLinkAsButton as='button' className={styles['logout_btn']}>
                        Logout
                    </NavigationLinkAsButton>
                </li>
            </Form>
            { user && user.token && user.userData.roles.includes('admin') && 
                <li className={styles['navbar_link']} >
                    <NavigationLinkAsButton as='button' className={styles['switch_btn']} onClick={changeNavMode}>
                        User Nav
                    </NavigationLinkAsButton>
                </li>
            }
        </ul>
    )
}

export default AdminNavigationHeader;