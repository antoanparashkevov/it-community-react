import styles from './ApplyForm.module.css';

//UI components
import { RoundedButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";
import { TextArea } from "../UI/TextArea";
import Label from "../UI/Label";

//hooks
import useInput from "../../hooks/use-input";

const ApplyForm = () => {
    let formIsValid;
    
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
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        reset : resetEmailInput,
        valueChangeHandler : emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().includes('@'))
    
    const {
        value : enteredMsg,
        isValid: enteredMsgIsValid,
        hasError: msgInputHasError,
        reset : resetMsgInput,
        valueChangeHandler : msgInputChangeHandler,
        inputBlurHandler: msgInputBlurHandler
    } = useInput(value => value.trim() !== '')
    
    
    formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredMsgIsValid;
    
    const formSubmissionHandler = (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        // console.log('Entered name >>> ', enteredName)
        // console.log('Entered email >>> ', enteredEmail)
        // console.log('Entered message >>> ', enteredMsg)

        //clearing the form
        resetNameInput();
        resetEmailInput();
        resetMsgInput();
    }

    const formControlClasses = (hasError) => {
       return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }
    
    return (
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

                {msgInputHasError && <p>Please enter a valid non-empty message!</p>}
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
    )
}


export default ApplyForm;