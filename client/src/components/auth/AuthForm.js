import styles from './AuthForm.module.scss';
import { useState } from "react";
import { Link } from "react-router-dom";

//UI components
import { Input } from "../layout/Input";
import { OutlineButton, Button } from "../UI/BaseButton";
import Label from "../UI/Label";

//hooks
import useInput from "../../hooks/use-input";

const AuthForm = ( { authMode } ) => {
    let formIsValid;
    
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
    
    formIsValid = emailInputIsValid && passwordInputIsValid

    const formSubmissionHandler = (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        console.log('email >>> ', enteredEmail);
        console.log('password >>> ', enteredPassword);

        resetEmailInput();
        resetPasswordInput();
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }
    
    const submitButtonCaption = authMode === 'login' ? 'Login' : 'Sign up'
    const switchButtonCaption = authMode === 'login' ? 'Sign up instead' : 'Login instead'
    
    return (
        <form className={ styles['apply_form'] } onSubmit={ formSubmissionHandler }>
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
    )
}

export default AuthForm;