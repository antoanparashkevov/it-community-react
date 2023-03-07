import styles from './CompanyForm.module.scss';
import { useState } from "react";

//UI components
import { Input } from "../layout/Input";
import { OutlineButton, Button } from "../UI/BaseButton";
import Label from "../UI/Label";

//hooks
import useInput from "../../hooks/use-input";
import { TextArea } from "../UI/TextArea";

const CompanyForm = () => {
    let formIsValid;

    const [authMode, setAuthMode] = useState('login')

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
    } = useInput(value => value.trim() !== '' && value.length >= 20 && value.length <= 70);
    
    const {
        value : enteredFoundationYear,
        isValid : foundationYearInputIsValid,
        hasError : foundationYearInputHasError,
        reset : resetFoundationYearInput,
        valueChangeHandler : foundationYearChangeHandler,
        inputBlurHandler : foundationYearBlurHandler
    } = useInput(value => {
        let year  = value.split('-')[0];
        
        if( year ) {
            return !(Number(year) < 1900 || Number(year) > new Date().getFullYear());
        }
        
    });
    
    formIsValid = emailInputIsValid && passwordInputIsValid && companyNameInputIsValid && descriptionInputIsValid && foundationYearInputIsValid

    const formSubmissionHandler = (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        console.log('email >>> ', enteredEmail);
        console.log('password >>> ', enteredPassword);
        console.log('companyName >>> ', enteredCompanyName);
        console.log('description >>> ', enteredDescription);
        console.log('foundationYear >>> ', enteredFoundationYear);

        resetEmailInput();
        resetPasswordInput();
        resetCompanyNameInput();
        resetDescriptionInput();
        resetFoundationYearInput();
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    const switchAuthMode = () => {
        setAuthMode((prevState) => {
            if(prevState === 'login') {
                return 'signup'
            }
            return 'login'
        })
    }

    const submitButtonCaption = authMode === 'login' ? 'Login' : 'Sign up as company'
    const switchButtonCaption = authMode === 'login' ? 'Sign up instead' : 'Login instead'

    return (
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

                {descriptionInputHasError && <p>Please enter a non-empty description and it should be between 20 and 70 characters!</p>}
                <Label for="desc">Description*</Label>
                <TextArea
                    id='desc'
                    name='desc'
                    onChange={ descriptionChangeHandler }
                    onBlur={ descriptionBlurHandler }
                    value={ enteredDescription }
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
                    onClick={switchAuthMode}
                >
                    { switchButtonCaption }
                </OutlineButton>
            </div>
        </form>
    )
}

export default CompanyForm;