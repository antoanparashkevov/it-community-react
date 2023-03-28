import styles from './AdminNavigationHeader.module.scss';
import { NavigationLinkAsButton } from "../UI/BaseLinks";
import React, { useContext } from "react";
import { Form } from "react-router-dom";

//context
import AuthContext from "../../store/auth-context";

const AdminNavigationHeader = ( { onNavMode } ) => {
    const authData = useContext(AuthContext)
    
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
            { authData && authData.token && authData.userData.roles.includes('admin') && 
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