import styles from './UserAuth.module.scss'

//components
import AuthForm from "../../auth/AuthForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";

const UserAuth = () => {
    return (
        <section className={styles['auth_container']}>
            <BaseCard>
                <AuthForm />                 
            </BaseCard>
        </section>
    )
}

export default UserAuth;