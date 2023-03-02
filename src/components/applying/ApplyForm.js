import styles from './ApplyForm.module.css';
import { useState, useRef } from "react";

//UI components
import { FlatButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";
import { TextArea } from "../UI/TextArea";

const ApplyForm = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const nameInputIsInvalid = !enteredNameIsValid === false && enteredNameTouched === true;
    
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
    const nameEmailIsInvalid = !enteredEmailIsValid === false && enteredEmailTouched === true;


    const enteredMessage = useRef();
    
    const nameInputChangeHandler = (event) => {
        //event param - event object describing the event
        setEnteredName(event.target.value);

        if(event.target.value.trim() !== '') {
            setEnteredNameIsValid(true);
        }
    }

    const nameInputBlurHandler = (event) => {
        setEnteredNameTouched(true);
        
        if(enteredName.trim() === '') {
            setEnteredNameIsValid(false)
        }
    }
    
    const emailInputChangeHandler = (event) => {
        //event param - event object describing the event
        setEnteredEmail(event.target.value);
    }
    
    const formSubmissionHandler = (event) => {
        //event param - event object describing the event
        
        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();
        
        setEnteredNameTouched(true);
        setEnteredEmailTouched(true);
        
        console.log('Entered name >>> ', enteredName)
        console.log('Entered email >>> ', enteredEmail)
        console.log('Entered message >>> ', enteredMessage.current['value'])
        
        //clearing the form
        setEnteredName('');
        setEnteredEmail('');
        enteredMessage.current.value = '';
    }
    
    return (
        <form onSubmit={formSubmissionHandler} className={styles['apply_form']}>
            <div className={styles['form-control']}>
                
                <label htmlFor="name">Your name*</label>
                <Input
                    id='name' 
                    name='name' 
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
            </div>
            <div className={styles['form-control']}>
                
                <label htmlFor="email">Email*</label>
                <Input 
                    typeCat='email' 
                    id='email' 
                    name='email' 
                    onChange={emailInputChangeHandler}
                    value={enteredEmail}
                />
            </div>
            <div className={styles['form-control']}>
                
                <label htmlFor="msg">Your message</label>
                <TextArea 
                    id='msg' 
                    name='msg'
                    ref={enteredMessage}
                />
            </div>
            <div className={styles['form-actions']}>
                
                <FlatButton 
                    type='submit'
                    disabled={!formIsValid}
                >
                    Submit
                </FlatButton>
            </div>
        </form>
    )
}


export default ApplyForm;