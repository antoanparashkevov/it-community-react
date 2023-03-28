import { Outlet } from "react-router-dom";
import styles from './AdminRootLayout.module.scss';
import { useContext } from "react";

//context
import AuthContext from "../../store/auth-context";


const AdminRootLayout = () => {
    const authData = useContext(AuthContext)
    
    return (
        <section className={`${styles['admin_root_container']} container`}>
            <h1 className={styles['admin_root_header']}>Welcome to the Admin Panel, {authData && authData.userData.email}</h1>
            <Outlet className={styles['admin_root_content']}/>
        </section>
    )
}

export default AdminRootLayout;