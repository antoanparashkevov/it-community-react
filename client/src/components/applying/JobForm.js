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
    
    const [workTypeCheckbox, setWorkTypeCheckbox] = useState(
          [
              {
                  isChecked : isDefaultCheckboxChecked,
                  id: 'hybrid',
                  type: 'hybrid',
              },
              {
                  isChecked : isDefaultCheckboxChecked,
                  id: 'office',
                  type: 'office',
              },
              {
                  isChecked : isDefaultCheckboxChecked,
                  id: 'remote',
                  type: 'remote',
              },
          ]
    )

    const handleWorkTypeChange = (data) => {

        setWorkTypeCheckbox((prevState) => {

            if(prevState.length > 0) {
                prevState = prevState.filter(c => c.id !== data.id)
            }

            return [...prevState, data]
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
            title: 'Team Lead',
            code: 'team_lead',
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
    } = useInput(value => value.trim() !== '' && value.trim().length >= 5 && value.trim().length <= 30)
    
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

    const formSubmissionHandler = async (event) => {
        //event param - event object describing the event

        /*
            the default behaviour is if the form is submitted,
            a http req is sent to the server to the same address
        */
        event.preventDefault();

        // console.log('Entered job Name >>> ', enteredJobName);
        // console.log('workTypeCheckbox >>>', workTypeCheckbox);
        // console.log('selectedCategoryType >>>', selectedCategoryType);
        // console.log('subCategoryCheckbox >>>', subCategoryCheckbox);
        // console.log('subCategories >>>', subCategories);
        // console.log('selectedSeniorityType >>>', selectedSeniorityType);
        // console.log('Entered salary >>> ', enteredSalary);
        // console.log('Entered city', enteredCity)
        // console.log('Entered desc >>> ', enteredDesc);
        
        let selectedSubCategories = subCategoryCheckbox.filter( s => s.isChecked ).map( s =>  s.id )
        let selectedWorkTypes = workTypeCheckbox.filter( w_type => w_type.isChecked).map( w_type => w_type.id.charAt(0).toUpperCase() + w_type.id.slice(1))
        
        await sendRequest('/jobData/jobs','POST', (data) => data, {
            jobName: enteredJobName,
            workType: selectedWorkTypes,
            categoryCode: selectedCategoryType.code,
            subCategories: selectedSubCategories,
            seniority: selectedSeniorityType.title,
            salary: enteredSalary ? enteredSalary : null,
            desc: enteredDesc,
            city: enteredCity
        })
        
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
                    <div className={styles['form_control_work_type_wrapper']}>

                        {orderedWorkTypeListData.map( (w_type, index ) =>
                            <div className={styles['form_control_subcategory']} key={index}>
                                <Label for={w_type.code}>{ w_type.title }</Label>
                                <CustomCheckbox
                                    isChecked={isDefaultCheckboxChecked}
                                    value={w_type.code}
                                    id={w_type.code}
                                    name={w_type.code}
                                    onTriggerCheckbox={handleWorkTypeChange}
                                />
                            </div>
                        )}
                    </div>
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