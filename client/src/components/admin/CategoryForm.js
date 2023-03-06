import styles from './CategoryForm.module.scss'

//hooks
import useInput from "../../hooks/use-input";

//UI components
import { Input } from "../layout/Input";
import { RoundedButton } from "../UI/BaseButton";
import Label from "../UI/Label";

const CategoryForm = ({ children, style }) => {
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

        console.log('category name >>> ', enteredCategoryName);

        resetCategoryNameInput();
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    return (
        <form className={ styles['category_form'] } onSubmit={ formSubmissionHandler } style={style}>
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
        </form>
    )
}
    
export default CategoryForm;