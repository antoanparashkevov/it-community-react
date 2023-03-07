import styles from './CategoryForm.module.scss'
import { Form } from "react-router-dom";

//hooks
import useInput from "../../hooks/use-input";

//UI components
import { Input } from "../layout/Input";
import { RoundedButton } from "../UI/BaseButton";
import Label from "../UI/Label";

const CategoryForm = ({ children, style, onSaveData }) => {
    let formIsValid;

    const {
        value : enteredCategoryName,
        isValid : categoryNameInputIsValid,
        hasError : categoryNameInputHasError,
        reset : resetCategoryNameInput,
        valueChangeHandler : categoryNameChangeHandler,
        inputBlurHandler : categoryNameBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().length >= 5);
    

    formIsValid = categoryNameInputIsValid

    const formSubmissionHandler = (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();
        
        if( !formIsValid ) {
            return;
        }
        
        onSaveData({ title: enteredCategoryName })
        resetCategoryNameInput();
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    return (
        <Form method='post' className={ styles['category_form'] } style={style}>
            <div className={ formControlClasses(categoryNameInputHasError) }>

                {categoryNameInputHasError && <p>Please enter a valid non-empty category name and at least 5 characters long!</p>}
                <Label for="cat_name">Category name*</Label>
                <Input
                    typeCat='cat_name'
                    id='cat_name'
                    name='cat_name'
                    onChange={ categoryNameChangeHandler }
                    onBlur={ categoryNameBlurHandler }
                    value={ enteredCategoryName }
                />
            </div>

            {children}
            
            <div className={ styles['form-actions'] }>
                <RoundedButton
                    disabled={ !formIsValid }
                    type='submit'
                >
                    Create
                </RoundedButton>
            </div>
        </Form>
    )
}
    
export default CategoryForm;

//used in the action
export const transformCategoryFormData = (data) => {
    return {
        title: data.get('cat_name')
    }
}