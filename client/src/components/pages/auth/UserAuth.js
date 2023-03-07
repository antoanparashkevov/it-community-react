import styles from './UserAuth.module.scss'
import React, { useState } from "react";

//components
import AuthForm from "../../auth/AuthForm";
import CompanyForm from "../../auth/CompanyForm";

//hooks
import useHttp from "../../../hooks/use-http";

//UI components
import BaseSlider from "../../UI/BaseSlider";
import FormPageContent from "../../UI/FormPageContent";
import BaseDialog from "../../UI/BaseDialog";
import BaseSpinner from "../../UI/BaseSpinner";

const UserAuth = () => {
    const [shouldCloseDialog, setShouldCloseDialog] = useState(true );
    const [switchToCompany, setSwitchToCompany] = useState(false)
    const { sendRequest, error, isLoading } = useHttp();
    
    const switchMode = (data) => {
        setSwitchToCompany(data)
    }
    
    const closeDialog = (data) => {
        setShouldCloseDialog(data); 
    }
    
    let form;
    if( switchToCompany ) {
        form = <CompanyForm />
    } else {
        form = <AuthForm />
    }
    
    return (
        <React.Fragment>
            
            {shouldCloseDialog && error && 
                <BaseDialog title='Basic title' fixed={false} onCloseDialog={closeDialog}>
                    {error}
                </BaseDialog>
            }
            {isLoading && <BaseSpinner />}
            <FormPageContent className={styles['auth_container']}>
                <div className={styles['auth_mode']}>
                    <span style={ { fontWeight: switchToCompany ? '700' : 'normal'} }>As a company</span>
                    <BaseSlider onTriggerSlider={switchMode} isChecked={switchToCompany} />
                </div>
                {form}
            </FormPageContent>
        </React.Fragment>
    )
}

export default UserAuth;