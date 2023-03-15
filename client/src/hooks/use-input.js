import { useState } from "react";


const useInput = (validateInputHandler) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    
    const valueIsValid = validateInputHandler(inputValue);
    const hasError = !valueIsValid && isTouched;
    
    const valueChangeHandler = (event) => {
        setInputValue(event.target.value);
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
        inputBlurHandler
    }
}

export default useInput;