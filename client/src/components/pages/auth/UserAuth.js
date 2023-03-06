import styles from './UserAuth.module.scss'
import { useState } from "react";

//components
import AuthForm from "../../auth/AuthForm";
import CompanyForm from "../../auth/CompanyForm";

//UI components
import BaseSlider from "../../UI/BaseSlider";
import FormPageContent from "../../UI/FormPageContent";

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
        <FormPageContent className={styles['auth_container']}>
            <div className={styles['auth_mode']}>
                <span style={ { fontWeight: switchToCompany ? '700' : 'normal'} }>As a company</span>
                <BaseSlider onTriggerSlider={switchMode} isChecked={switchToCompany} />
            </div>
            {form}
        </FormPageContent>
    )
}

export default UserAuth;