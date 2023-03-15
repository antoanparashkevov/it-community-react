import React, { useEffect } from "react";
import styles from './ApplyForm.module.css';
import { useNavigate, useParams } from "react-router-dom";

//UI components
import { RoundedButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";
import { TextArea } from "../UI/TextArea";
import Label from "../UI/Label";
import BaseDialog from "../UI/BaseDialog";
import BaseSpinner from "../UI/BaseSpinner";

//hooks
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

//utils
import { getAuthData } from "../../util/auth";

const ApplyForm = ( { initialEmailValue, companyId, onResolved }) => {
    let formIsValid;
    let response;
    
    const { isLoading, error, resetError, sendRequest, resolved } = useHttp();
    const navigate = useNavigate();
    const params = useParams();
    
    const {
        value : enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        reset : resetNameInput,
        valueChangeHandler : nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler
    } = useInput(value => value.trim() !== '')
    
    
    const {
        value : enteredEmail,
        initialValue: setInitialEmailValue,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        reset : resetEmailInput,
        valueChangeHandler : emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().includes('@'))
    
    useEffect( () => {
        if( initialEmailValue ) {
            setInitialEmailValue(initialEmailValue)
        }
    }, [])
    
    const {
        value : enteredMsg,
        isValid: enteredMsgIsValid,
        hasError: msgInputHasError,
        reset : resetMsgInput,
        valueChangeHandler : msgInputChangeHandler,
        inputBlurHandler: msgInputBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().length > 20 && value.trim().length <= 70)
    
    
    formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredMsgIsValid;
    
    const formSubmissionHandler = async (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        // console.log('Entered name >>> ', enteredName)
        // console.log('Entered email >>> ', enteredEmail)
        // console.log('Entered message >>> ', enteredMsg)
        
        await postMessage();
        
        if( response ) {
            //clearing the form
            resetNameInput();
            resetEmailInput();
            resetMsgInput();
            onResolved(resolved)
            navigate('/posters/' + params.posterId)
        }

        
    }
    
    const postMessage = async () => {
        const userData = getAuthData();
        
        if( userData && companyId ) {
            await sendRequest('/applicationData/applications', 'POST', (data) => response = data, {
                fullName: enteredName,
                email: enteredEmail,
                message: enteredMsg,
                userId: userData.userId,
                companyId
            })
        } else {
            navigate('/auth')
        }
    }
    
    const formControlClasses = (hasError) => {
       return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }
    
    return (
        <React.Fragment>
            { error &&
                <BaseDialog fixed={false} show={!!error} title='Something went wrong with sending your message!' onCloseDialog={resetError}>
                    {error}
                </BaseDialog>
            }
            {isLoading && <BaseSpinner />}
            <form onSubmit={ formSubmissionHandler } className={ styles['apply_form'] }>
                <div className={ formControlClasses(nameInputHasError) }>

                    {nameInputHasError && <p>Please enter a valid non-empty name!</p>}
                    <Label for="name">Your name*</Label>
                    <Input
                        id='name'
                        name='name'
                        onChange={ nameInputChangeHandler }
                        onBlur={ nameInputBlurHandler }
                        value={ enteredName }
                    />
                </div>
                <div className={ formControlClasses(emailInputHasError) }>

                    {emailInputHasError && <p>Please enter a valid non-empty email!</p> }
                    <Label for="email">Email*</Label>
                    <Input
                        typeCat='email'
                        id='email'
                        name='email'
                        onChange={ emailInputChangeHandler }
                        onBlur={ emailInputBlurHandler }
                        value={ enteredEmail }
                    />
                </div>
                <div className={ formControlClasses(msgInputHasError) }>

                    {msgInputHasError && <p>Please enter a valid non-empty message between 20 and 70 characters long!</p>}
                    <Label for="msg">Your message*</Label>
                    <TextArea
                        id='msg'
                        name='msg'
                        onChange={ msgInputChangeHandler }
                        onBlur={ msgInputBlurHandler }
                        value={ enteredMsg }
                    />
                </div>
                <div className={ styles['form-actions'] }>

                    <RoundedButton
                        type='submit'
                        disabled={ !formIsValid }
                    >
                        Submit
                    </RoundedButton>
                </div>
            </form>
        </React.Fragment>
    )
}


export default ApplyForm;