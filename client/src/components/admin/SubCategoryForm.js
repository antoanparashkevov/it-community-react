import React, { useEffect, useState } from "react";
import styles from './SubCategoryForm.module.scss'
import { Form, useActionData, useNavigation } from "react-router-dom";

//hooks
import useInput from "../../hooks/use-input";

//UI components
import { Input } from "../layout/Input";
import { RoundedButton } from "../UI/BaseButton";
import Label from "../UI/Label";
import DataSelectorWrapper from "../UI/DataSelectorWrapper";
import BaseDialog from "../UI/BaseDialog";

const SubCategoryForm = ({ categories }) => {
    const navigation = useNavigation();
    const error = useActionData();
    
    const [placeholderValue, setPlaceholderValue] = useState(categories[0].title || '')
    const [selectedCategory, setSelectedCategory] = useState({ 
        title: categories[0].title,
        code: categories[0].code
    });
    
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
    
    const handleCategoryChange = (dataObject) => {
        setPlaceholderValue(dataObject.value)
        setSelectedCategory({
            title: dataObject.value,
            code: dataObject.valueCode
        })
    }
    
    useEffect( () => {
        console.log('selectedCategory', selectedCategory)
    }, [selectedCategory])

    return (
        <React.Fragment>
            {error && <BaseDialog title='Validation error' fixed={false}>{error.message}</BaseDialog>}
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
                        initialPlaceholderValue={placeholderValue}
                        onResubForNewData={handleCategoryChange}
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

export default SubCategoryForm;

//used in the action
export const transformSubCategoryFormData = (data) => {
    return {
        title: data.get('subcat_name'),
        // TODO - > mainCategory: 
    }
}