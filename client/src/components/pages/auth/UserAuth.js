import styles from './UserAuth.module.scss'
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

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
    const [switchToCompany, setSwitchToCompany] = useState(false)
    const { isLoading, error, resetError, sendRequest } = useHttp();
    
    const [queryParams] = useSearchParams();//useSearchParams basically means Query Params :)
    
    const [authMode, setAuthMode] = useState(null)
    
    useEffect( () => {
        setAuthMode(queryParams.get('mode'))
    }, [queryParams, authMode])

    console.log('query param >>> ', queryParams.get('mode'))
    
    const switchMode = (data) => {
        setSwitchToCompany(data)
    }
    
    const closeDialog = (data) => {
        resetError();
    }
    
    let form;
    if( switchToCompany ) {
        form = <CompanyForm authMode={authMode} />
    } else {
        form = <AuthForm authMode={authMode}/>
    }
    
    return (
        <React.Fragment>
            { error && 
                <BaseDialog show={!!error} title='Basic title' fixed={false} onCloseDialog={closeDialog}>
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