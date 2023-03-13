import { Outlet, useRouteLoaderData } from "react-router-dom";
import styles from './AdminRootLayout.module.scss';


const AdminRootLayout = () => {
    const userData = useRouteLoaderData('root');
    
    return (
        <section className={`${styles['admin_root_container']} container`}>
            <h1 className={styles['admin_root_header']}>Welcome to the Admin Panel, {userData && userData.email}</h1>
            <Outlet className={styles['admin_root_content']}/>
        </section>
    )
}

export default AdminRootLayout;