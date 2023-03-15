import styles from './CompanyForm.module.scss';
import React, { useCallback, useMemo, useState } from "react";

//UI components
import { Input } from "../layout/Input";
import { OutlineButton, Button } from "../UI/BaseButton";
import Label from "../UI/Label";

//hooks
import useInput from "../../hooks/use-input";
import { TextArea } from "../UI/TextArea";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import BaseDialog from "../UI/BaseDialog";
import BaseSpinner from "../UI/BaseSpinner";
import { handleAuthentication } from "../../util/auth";

const CompanyForm = ( { authMode } ) => {
    let formIsValid;
    let authResponse;
    
    const { isLoading, error, resetError, setAdditionalErrors, sendRequest: postRequest } = useHttp();
    const navigate = useNavigate();
    
    const {
        value : enteredEmail,
        isValid : emailInputIsValid,
        hasError : emailInputHasError,
        reset : resetEmailInput,
        valueChangeHandler : emailChangeHandler,
        inputBlurHandler : emailBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().includes('@'));

    const {
        value : enteredPassword,
        isValid : passwordInputIsValid,
        hasError : passwordInputHasError,
        reset : resetPasswordInput,
        valueChangeHandler : passwordChangeHandler,
        inputBlurHandler : passwordBlurHandler
    } = useInput(value => value.trim() !== '');
    
    const {
        value : enteredCompanyName,
        isValid : companyNameInputIsValid,
        hasError : companyNameInputHasError,
        reset : resetCompanyNameInput,
        valueChangeHandler : companyNameChangeHandler,
        inputBlurHandler : companyNameBlurHandler
    } = useInput(value => value.trim() !== '' && value.length >= 5 && value.length <= 30);
    
    const {
        value : enteredDescription,
        isValid : descriptionInputIsValid,
        hasError : descriptionInputHasError,
        reset : resetDescriptionInput,
        valueChangeHandler : descriptionChangeHandler,
        inputBlurHandler : descriptionBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().length >= 40 && value.trim().length <= 70);
    
    const {
        value : enteredFoundationYear,
        isValid : foundationYearInputIsValid,
        hasError : foundationYearInputHasError,
        reset : resetFoundationYearInput,
        valueChangeHandler : foundationYearChangeHandler,
        inputBlurHandler : foundationYearBlurHandler
    } = useInput(value => {
        let year  = value.split('-')[0];
         //TODO enhance the check 
        if( year ) {
            return !(Number(year) < 1900 || Number(year) > new Date().getFullYear());
        }
        
    });
    
    const {
        value : enteredEmployees,
        isValid : employeesInputIsValid,
        hasError : employeesInputHasError,
        reset : resetEmployeesInput,
        valueChangeHandler : employeesChangeHandler,
        inputBlurHandler : employeesBlurHandler
    } = useInput( value => !isNaN(value) && Number(value) >= 1 );
    
    if( authMode === 'signup') {
        formIsValid = emailInputIsValid && passwordInputIsValid && companyNameInputIsValid && descriptionInputIsValid && foundationYearInputIsValid && employeesInputIsValid
    } else if ( authMode === 'login' ) {
        formIsValid = emailInputIsValid && passwordInputIsValid
    }

    const formSubmissionHandler = async (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        if(authMode !== 'login' || authMode !== 'signup') {
            setAdditionalErrors('Invalid authentication mode!')
        }

        // console.log('email >>> ', enteredEmail);
        // console.log('password >>> ', enteredPassword);
        // console.log('companyName >>> ', enteredCompanyName);
        // console.log('description >>> ', enteredDescription);
        // console.log('foundationYear >>> ', enteredFoundationYear);
        // console.log('employees >>> ', enteredEmployees);
        
        await authRequest();

        if( typeof error !== 'undefined' && error === null) { 
            handleAuthentication(authResponse.email, authResponse._id, authResponse.accessToken)
            resetEmailInput();
            resetPasswordInput();
            resetCompanyNameInput();
            resetDescriptionInput();
            resetFoundationYearInput();
            resetEmployeesInput();
            navigate('/')
        }
      
    }

   

    const authRequest = async () => {
        let fieldsToPost;
        
        if( authMode === 'login' ) {
            fieldsToPost = {
                email: enteredEmail,
                password: enteredPassword,
            }
        } else if ( authMode === 'signup' ) {
            fieldsToPost = {
                email: enteredEmail,
                password: enteredPassword,
                companyName: enteredCompanyName,
                desc: enteredDescription,
                employees: Number(enteredEmployees),
                foundationYear: Number(enteredFoundationYear.split('-')[0])
            }
        }
        
        await postRequest(`/authData/${authMode}_company` , 'POST', (data) => authResponse = data, {
           ...fieldsToPost
        })

    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    const submitButtonCaption = authMode === 'login' ? 'Login' : 'Sign up as company'
    const switchButtonCaption = authMode === 'login' ? 'Sign up instead' : 'Login instead'
    

    return (
        <React.Fragment>
            {error &&
                <BaseDialog fixed={false} show={!!error} title='Something went wrong with the authentication process' onCloseDialog={resetError}>
                    {error}
                </BaseDialog>
            }
            {isLoading && <BaseSpinner />}
            <form className={ styles['apply_company_form'] } onSubmit={ formSubmissionHandler }>
                <div className={ formControlClasses(emailInputHasError) }>

                    {emailInputHasError && <p>Please enter a valid non-empty name!</p>}
                    <Label for="email">Email*</Label>
                    <Input
                        typeCat='email'
                        id='email'
                        name='email'
                        onChange={ emailChangeHandler }
                        onBlur={ emailBlurHandler }
                        value={ enteredEmail }
                    />
                </div>
                <div className={ formControlClasses(passwordInputHasError) }>

                    {passwordInputHasError && <p>Please enter a non-empty password!</p>}
                    <Label for="pass">Password*</Label>
                    <Input
                        typeCat='password'
                        id='pass'
                        name='pass'
                        onChange={ passwordChangeHandler }
                        onBlur={ passwordBlurHandler }
                        value={ enteredPassword }
                    />
                </div>
                {authMode === 'signup' && 
                    <React.Fragment>
                        <div className={ formControlClasses(companyNameInputHasError) }>

                            {companyNameInputHasError && <p>Please enter a non-empty company name and company name between 5 and 30 characters!</p>}
                            <Label for="company_name">Company Name*</Label>
                            <Input
                                id='company_name'
                                name='company_name'
                                onChange={ companyNameChangeHandler }
                                onBlur={ companyNameBlurHandler }
                                value={ enteredCompanyName }
                            />
                        </div>
                        <div className={ formControlClasses(descriptionInputHasError) }>

                            {descriptionInputHasError && <p>Please enter a non-empty description and it should be between 40 and 70 characters!</p>}
                            <Label for="desc">Description*</Label>
                            <TextArea
                                id='desc'
                                name='desc'
                                onChange={ descriptionChangeHandler }
                                onBlur={ descriptionBlurHandler }
                                value={ enteredDescription }
                            />
                        </div>
                        <div className={ formControlClasses(employeesInputHasError) }>

                            {employeesInputHasError && <p>The Employees field must contain a non-negative value</p>}
                            <Label for="employees">Employees*</Label>
                            <Input
                                id='employees'
                                name='employees'
                                typeCat='number'
                                onChange={ employeesChangeHandler }
                                onBlur={ employeesBlurHandler }
                                value={ enteredEmployees }
                            />
                        </div>
                        <div className={ formControlClasses(foundationYearInputHasError) }>

                            {foundationYearInputHasError && <p>Please enter a valid year!</p>}
                            <Label for="date">Date*</Label>
                            <Input
                                typeCat='date'
                                id='date'
                                name='date'
                                onChange={ foundationYearChangeHandler }
                                onBlur={ foundationYearBlurHandler }
                                value={ enteredFoundationYear }
                            />
                        </div>
                    </React.Fragment>
                }
                <div className={ styles['form-actions'] }>
                    <Button
                        className={ styles['form-main-btn'] }
                        disabled={ !formIsValid }
                        type='submit'
                    >
                        { submitButtonCaption }
                    </Button>
                    <OutlineButton
                        className={ styles['form-second-btn'] }
                        type='button'
                        as={Link}
                        to={`?mode=${authMode === 'login' ? 'signup' : 'login'}`}
                    >
                        { switchButtonCaption }
                    </OutlineButton>
                </div>
            </form>
        </React.Fragment>
    )
}

export default CompanyForm;