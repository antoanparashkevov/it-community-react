import styles from './SubCategoryForm.module.scss'
import { Form } from "react-router-dom";

//hooks
import useInput from "../../hooks/use-input";

//UI components
import { Input } from "../layout/Input";
import { RoundedButton } from "../UI/BaseButton";
import Label from "../UI/Label";
import DataSelectorWrapper from "../UI/DataSelectorWrapper";

const SubCategoryForm = ({ categories }) => {
    let formIsValid;

    const {
        value : enteredSubCategoryName,
        isValid : subCategoryNameInputIsValid,
        hasError : subCategoryNameInputHasError,
        reset : resetSubCategoryNameInput,
        valueChangeHandler : subCategoryNameChangeHandler,
        inputBlurHandler : subCategoryNameBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().length >= 3);


    formIsValid = subCategoryNameInputIsValid

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    return (
        <Form method='post' className={ styles['category_form'] }>
            <div className={ formControlClasses(subCategoryNameInputHasError) }>

                {subCategoryNameInputHasError && <p>Please enter a valid non-empty sub category name and at least 3 characters long!</p>}
                <Label for="subcat_name">Category name*</Label>
                <Input
                    typeCat='subcat_name'
                    id='subcat_name'
                    name='subcat_name'
                    onChange={ subCategoryNameChangeHandler }
                    onBlur={ subCategoryNameBlurHandler }
                    value={ enteredSubCategoryName }
                />
            </div>

            <div className={ styles['form-control'] }>
                <Label for='category'>Choose a category</Label>
                <DataSelectorWrapper 
                    closeOnHover 
                    selectorData={categories}
                    initialPlaceholderValue={categories[0].title}
                />
            </div>

            
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

export default SubCategoryForm;

//used in the action
export const transformCategoryFormData = (data) => {
    return {
        title: data.get('cat_name')
    }
}