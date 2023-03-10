import { useRouteLoaderData } from "react-router-dom";
import styles from './JobForm.module.scss';
import React, { useCallback, useEffect, useState } from "react";

//UI components
import { RoundedButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";
import { TextArea } from "../UI/TextArea";
import DataSelectorWrapper from "../UI/DataSelectorWrapper";
import Label from "../UI/Label";
import CustomCheckbox from "../UI/CustomCheckbox";
import BaseDialog from "../UI/BaseDialog";
import BaseSpinner from "../UI/BaseSpinner";

//hooks
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

const JobForm = () => {
    const { isLoading, error, resetError, sendRequest } = useHttp();
    
    let isDefaultCheckboxChecked = true;
    let formIsValid;

    /* WORK TYPE START */
    const orderedWorkTypeListData = [
        {
            code: 'hybrid',
            title : 'Hybrid',
        },
        {
          code: 'office',
          title : 'Office'  
        },
        {
            code: 'remote',
            title : 'Remote'
        }
    ]
    
    const [placeholderWorkTypeValue, setPlaceholderWorkTypeValue] = useState(orderedWorkTypeListData[0].title)
    const [selectedWorkType, setSelectedWorkType] = useState({
        title: orderedWorkTypeListData[0].title,
        code: orderedWorkTypeListData[0].title
    })
    
    const handleWorkTypeChange = (dataObject) => {
        setPlaceholderWorkTypeValue(dataObject.value);
        setSelectedWorkType({ 
            title: dataObject.value,
            code: dataObject.valueCode
        })
    }

    /* WORK TYPE END */
    
    /* CATEGORIES START */
    
    const [orderedCategoryListData, setOrderedCategoryListData] = useState(useRouteLoaderData('create-job'))
    
    const [placeholderCategoryValue, setPlaceholderCategoryValue] = useState(orderedCategoryListData[0].title)
    
    const [selectedCategoryType, setSelectedCategoryType] = useState({
        title: orderedCategoryListData[0].title,
        code: orderedCategoryListData[0].code
    })
    
    const handleCategoryChange = (dataObject) => {
        setPlaceholderCategoryValue(dataObject.value);
        setSelectedCategoryType({
            title: dataObject.value,
            code: dataObject.valueCode
        })
    }

    /* CATEGORIES END */
    
    /* SUBCATEGORIES START */
    
    const [subCategories, setSubCategories] = useState(null)
    
    const fetchSubCategories = useCallback( async () => {
        await sendRequest('/categoryData/categories?where=categoryType%3D' + selectedCategoryType.code, 'GET', formatSubCategories)//%22 means ", %3D means = 
    },[selectedCategoryType])

    
    const formatSubCategories = (data) => {
        const subCategories = data.subCategories.map( s => {
            return {
                title: s.title,
                code: s.code
            }
        })
         setSubCategories(subCategories)
        
        if( subCategories ) {
            setSubCategoryCheckbox([])
            subCategories.forEach( c => {
                setSubCategoryCheckbox( prevState =>  {
                    const subCategoryCheckbox = {
                        isChecked: isDefaultCheckboxChecked,
                        id: c.code
                    }
                    // const duplicatedSubCategoryIndex = prevState.findIndex( c => c.id === subCategoryCheckbox.id)
                    // if( duplicatedSubCategoryIndex !== -1) {
                    //     prevState = prevState.splice(duplicatedSubCategoryIndex, 1)
                    // }
                    return [...prevState, subCategoryCheckbox]
                })
            })
        }
    }
    useEffect(() => {
        fetchSubCategories()
    }, [selectedCategoryType])
    
    const [subCategoryCheckbox, setSubCategoryCheckbox] = useState([])

    const subCategoryCheckboxHandler = (data) => {

        setSubCategoryCheckbox((prevState) => {

            if(prevState.length > 0) {
                prevState = prevState.filter(c => c.id !== data.id)
            }

            return [...prevState, data]
        })
    }

    /* SUBCATEGORIES END */
    
    /* SENIORITY START */
    
    const orderedSeniorityData = [
        {
            title: 'Mid Level',
            code: 'mid_level',
        },
        {
            title: 'Junior',
            code: 'junior'
        },
        {
            title: 'Intern',
            code: 'intern'
        },
        {
            title: 'Senior',
            code: 'senior'
        }
    ] 
    
    const [placeholderSeniorityValue, setPlaceholderSeniorityValue] = useState(orderedSeniorityData[0].title)
    
    const [selectedSeniorityType, setSelectedSeniorityType] = useState(orderedSeniorityData[0])
    
    const handleSeniorityChange = (dataObject) => {
        setPlaceholderSeniorityValue(dataObject.value)
        setSelectedSeniorityType({
            title: dataObject.value,
            code: dataObject.valueCode
        })
    }
    
    /* SENIORITY END */
    
    const {
        value : enteredJobName,
        isValid: enteredJobNameIsValid,
        hasError: jobNameInputHasError,
        reset : resetJobNameInput,
        valueChangeHandler : jobNameInputChangeHandler,
        inputBlurHandler: jobNameInputBlurHandler
    } = useInput(value => value.trim() !== '')
    
    const {
        value : enteredSalary,
        isValid: enteredSalaryIsValid,
        hasError: salaryInputHasError,
        reset : resetSalaryInput,
        valueChangeHandler : salaryInputChangeHandler,
        inputBlurHandler: salaryInputBlurHandler
    } = useInput(value => value);

    const {
        value : enteredDesc,
        isValid: enteredDescIsValid,
        hasError: descInputHasError,
        reset : resetDescInput,
        valueChangeHandler : descInputChangeHandler,
        inputBlurHandler: descInputBlurHandler
    } = useInput(value => value.trim() !== '' && value.trim().length > 20)
    
    const {
        value : enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        reset : resetCityInput,
        valueChangeHandler : cityInputChangeHandler,
        inputBlurHandler: cityInputBlurHandler
    } = useInput(value => value.trim() !== '')


    formIsValid = enteredJobNameIsValid && enteredSalaryIsValid && enteredDescIsValid && enteredCityIsValid;

    const formSubmissionHandler = (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        console.log('Entered job Name >>> ', enteredJobName);
        console.log('selectedWorkType >>>', selectedWorkType);
        console.log('selectedCategoryType >>>', selectedCategoryType);
        console.log('subCategoryCheckbox >>>', subCategoryCheckbox);
        console.log('subCategories >>>', subCategories);
        console.log('selectedSeniorityType >>>', selectedSeniorityType);
        console.log('Entered salary >>> ', enteredSalary);
        console.log('Entered desc >>> ', enteredDesc);
        
        //clearing the form
        if( !error ) {
            resetJobNameInput();
            resetSalaryInput();
            resetDescInput();
            resetCityInput();
        }
        
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    return (
        <React.Fragment>
            {error && <BaseDialog show={!!error} fixed={false} onCloseDialog={resetError} title='An error occurred during fetching categories/subcategories!'>{error}</BaseDialog>}
            {isLoading && <BaseSpinner />}
            <form onSubmit={ formSubmissionHandler } className={ styles['apply_form'] }>

                <div className={ formControlClasses(jobNameInputHasError) }>

                    {jobNameInputHasError && <p>Please enter a valid non-empty job name!</p>}
                    <Label for="job_name">Job name*</Label>
                    <Input
                        id='job_name'
                        name='job_name'
                        onChange={ jobNameInputChangeHandler }
                        onBlur={ jobNameInputBlurHandler }
                        value={ enteredJobName }
                    />
                </div>

                <div className={styles['form-control']}>
                    <Label for="work_type">Work type*</Label>
                    <DataSelectorWrapper
                        closeOnHover
                        selectorData={orderedWorkTypeListData}
                        initialPlaceholderValue={placeholderWorkTypeValue}
                        name={selectedWorkType.code}
                        onResubForNewData={handleWorkTypeChange}
                    />
                </div>

                <div className={styles['form-control']}>
                    <Label for="category_type">Category type*</Label>
                    <DataSelectorWrapper
                        closeOnHover
                        selectorData={orderedCategoryListData}
                        initialPlaceholderValue={placeholderCategoryValue}
                        onResubForNewData={handleCategoryChange}
                    />
                </div>


                {isLoading && <BaseSpinner />}
                { subCategories && <div className={styles['form-control']}>

                    <Label for="subcategory_type">Choose sub categories (at least one*)</Label>

                    <div className={styles['form_control_subcategory_wrapper']}>

                        {subCategories.map( (sub_cat, index ) =>
                            <div className={styles['form_control_subcategory']} key={index}>
                                <Label for={sub_cat.code}>{ sub_cat.title }</Label>
                                <CustomCheckbox
                                    isChecked={isDefaultCheckboxChecked}
                                    value={sub_cat.code}
                                    id={sub_cat.code}
                                    name={sub_cat.category}
                                    onTriggerCheckbox={subCategoryCheckboxHandler}
                                />
                            </div>
                        )}
                    </div>
                </div> }

                <div className={styles['form-control']}>
                    <Label for="seniority">Seniority*</Label>
                    <DataSelectorWrapper
                        selectorData={orderedSeniorityData}
                        initialPlaceholderValue={placeholderSeniorityValue}
                        onResubForNewData={handleSeniorityChange}
                        closeOnHover
                    />
                </div>

                <div className={ styles['form-control'] }>

                    <Label for="salary">Salary</Label>
                    <Input
                        typeCat='number'
                        id='salary'
                        name='salary'
                        onChange={ salaryInputChangeHandler }
                        onBlur={ salaryInputBlurHandler }
                        value={ enteredSalary }
                    />
                </div>

                <div className={ formControlClasses(cityInputHasError) }>

                    {cityInputHasError && <p>Please enter a valid non-empty city which is located in Bulgaria!</p>}
                    <Label for="city">City in Bulgaria*</Label>
                    <Input
                        id='city'
                        name='city'
                        onChange={ cityInputChangeHandler }
                        onBlur={ cityInputBlurHandler }
                        value={ enteredCity }
                    />
                </div>

                <div className={ formControlClasses(descInputHasError) }>

                    {descInputHasError && <p>Please enter a valid non-empty description with at least 20 characters!</p>}
                    <Label for="desc">Job description*</Label>
                    <TextArea
                        id='desc'
                        name='desc'
                        onChange={ descInputChangeHandler }
                        onBlur={ descInputBlurHandler }
                        value={ enteredDesc }
                    />
                </div>
                <div className={ styles['form-actions'] }>

                    <RoundedButton
                        type='submit'
                        disabled={ !formIsValid }
                    >
                        Create
                    </RoundedButton>
                </div>
            </form>
        </React.Fragment>
    )
}


export default JobForm;

export const formatCategoryData = (data) => {
    return data.map( c => {
        return {
            title: c.title,
            code: c.code
        }
    })
}