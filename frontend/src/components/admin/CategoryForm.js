import styles from './CategoryForm.module.scss';
import React, { useState, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

//hooks
import useInput from "../../hooks/use-input";

//UI components
import { Input } from "../layout/Input";
import { RoundedButton } from "../UI/BaseButton";
import Label from "../UI/Label";
import BaseDialog from "../UI/BaseDialog";

const CategoryForm = () => {
    const navigation = useNavigation();
    let error = useActionData();
    const [showDialog, setShowDialog] = useState(false);
    
    let formIsValid;
    
    useEffect( () => {
        if (error) {
            setShowDialog(true)
        }
    }, [error])
    
    const {
        value : enteredCategoryName,
        isValid : categoryNameInputIsValid,
        hasError : categoryNameInputHasError,
        valueChangeHandler : categoryNameChangeHandler,
        inputBlurHandler : categoryNameBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().length >= 5);
    

    formIsValid = categoryNameInputIsValid

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    const handleError = () => {
        setShowDialog(!showDialog)
        error = null;
    }
    
    return (
       <React.Fragment>
           { error && showDialog === true &&
               <BaseDialog 
                   show={!!error && showDialog === true} 
                   onCloseDialog={handleError} 
                   title='Unable to create a category because of an error!' 
                   fixed={false}
               >
                   {error.message}
               </BaseDialog>}
           {/*this Form built-in component automatically trigger the action function*/}
           <Form method='post' className={ styles['category_form'] }>
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
               <div className={ styles['form-actions'] }>
                   <RoundedButton
                       disabled={ !formIsValid || navigation.state === 'submitting' }
                       type='submit'
                   >
                       { navigation.state === 'submitting' ? 'Submitting...' : 'Create' }
                   </RoundedButton>
               </div>
           </Form>
       </React.Fragment>
    )
}
    
export default CategoryForm;

//used in the action
export const transformCategoryFormData = (data) => {
    return {
        title: data.get('cat_name')
    }
}