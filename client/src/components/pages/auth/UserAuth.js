import styles from './UserAuth.module.scss'
import { useState } from "react";

//components
import AuthForm from "../../auth/AuthForm";
import CompanyForm from "../../auth/CompanyForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import BaseSlider from "../../UI/BaseSlider";

const UserAuth = () => {
    const [switchToCompany, setSwitchToCompany] = useState(false)
    
    const switchMode = (data) => {
        setSwitchToCompany(data)
    }
    
    let form;
    if( switchToCompany ) {
        form = <CompanyForm />
    } else {
        form = <AuthForm />
    }
    
    return (
        <section className={styles['auth_container']}>
            <BaseCard>
                <div className={styles['auth_mode']}>
                    <span style={ { fontWeight: switchToCompany ? '700' : 'normal'} }>As a company</span>
                    <BaseSlider onTriggerSlider={switchMode} isChecked={switchToCompany} />
                </div>
                {form}     
            </BaseCard>
        </section>
    )
}

export default UserAuth;