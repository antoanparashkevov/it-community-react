import { useState } from "react";


const useInput = (validateInputHandler, initialValue) => {
    const [inputValue, setInputValue] = useState(initialValue ? initialValue : '');
    const [isTouched, setIsTouched] = useState(false);
    
    const valueIsValid = validateInputHandler(inputValue);
    const hasError = !valueIsValid && isTouched;
    
    const valueChangeHandler = (event) => {
        setInputValue(event.target.value);
    }
    
    const logoChangeHandler = (event) => {
        setInputValue(event.target.files[0]);
    }
    
    const inputBlurHandler = () => {
        setIsTouched(true);
    }
    
    const reset = () => {
        setInputValue('')
        setIsTouched(false);
    }
    
    const setInitialValue = (value) => {
        setInputValue(value)
    }
    
    return {
        initialValue: setInitialValue,
        value: inputValue,
        isValid: valueIsValid,
        hasError,
        reset,
        valueChangeHandler,
        logoChangeHandler,
        inputBlurHandler
    }
}

export default useInput;