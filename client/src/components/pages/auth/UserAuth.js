import styles from './UserAuth.module.scss'
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

//components
import AuthForm from "../../auth/AuthForm";
import CompanyForm from "../../auth/CompanyForm";

//UI components
import BaseSlider from "../../UI/BaseSlider";
import FormPageContent from "../../UI/FormPageContent";

const UserAuth = () => {
    const [switchToCompany, setSwitchToCompany] = useState(false)
    
    const [queryParams, setQueryParams] = useSearchParams();//useSearchParams basically means Query Params :)

    const [authMode, setAuthMode] = useState(null)
    
    //TODO fix the query param change
    useEffect( () => {
        //validation for the mode query param
        if (queryParams.get('mode') !== 'login' || queryParams.get('mode') !== 'signup') {
            setAuthMode('login')
            setQueryParams((prevState)=> {
                return {
                    ...prevState,
                    mode: 'login'
                }
            })
        }

        setAuthMode(queryParams.get('mode'))
        
    }, [queryParams, authMode])

    const switchMode = (data) => {
        setSwitchToCompany(data)
    }
    
    let form;
    if( switchToCompany ) {
        form = <CompanyForm authMode={authMode} />
    } else {
        form = <AuthForm authMode={authMode}/>
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