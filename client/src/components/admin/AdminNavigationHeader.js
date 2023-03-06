import styles from './AdminNavigationHeader.module.scss';
import { NavigationLink, NavigationLinkAsButton } from "../UI/BaseLinks";
import React from "react";

const AdminNavigationHeader = () => {
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
        </ul>
    )
}

export default AdminNavigationHeader;