import { Outlet } from "react-router-dom";
import styles from './AdminRootLayout.module.scss';

//context
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const AdminRootLayout = () => {
    const authCtx = useContext(AuthContext);
    
    return (
        <section className={`${styles['admin_root_container']} container`}>
            <h1 className={styles['admin_root_header']}>Welcome to the Admin Panel, {authCtx.userName}</h1>
            <Outlet className={styles['admin_root_content']}/>
        </section>
    )
}

export default AdminRootLayout;