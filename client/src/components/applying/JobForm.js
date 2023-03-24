import { useNavigate } from "react-router-dom";
import styles from './JobForm.module.scss';
import React, { useEffect, useState } from "react";

//UI components
import { RoundedButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";
import { TextArea } from "../UI/TextArea";
import DataSelectorWrapper from "../UI/DataSelectorWrapper";
import Label from "../UI/Label";
import CustomCheckbox from "../UI/CustomCheckbox";
import BaseDialog from "../UI/BaseDialog";
import BaseSpinner from "../UI/BaseSpinner";
import SeparationLine from "../UI/SeparationLine";
import { CloseBar } from "../layout/TheHeader";

//hooks
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const JobForm = ({ job, className, isImported, onCloseEditForm }) => {
    const { isLoading, error, resetError, sendRequest } = useHttp();
    const navigate = useNavigate();
    const { width: windowWidth } = useWindowDimensions();
    
    let resp = null;
    
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
    
    const [orderedCategoryListData, setOrderedCategoryListData] = useState([])
    const [placeholderCategoryValue, setPlaceholderCategoryValue] = useState('')
    const [selectedCategoryType, setSelectedCategoryType] = useState(null)
    
    const fetchCategories = async () => {
       await sendRequest('/categoryData/categories', 'GET', formatCategoryData)
    }
    
    const formatCategoryData = (data) => {
        const modifiedData = data.items.map( c => {
            return {
                title: c.title,
                code: c.code
            }
        })
        
        if( isImported ) {
            setPlaceholderCategoryValue(job.category.title)
            setSelectedCategoryType(job.category)
        } else {
            setPlaceholderCategoryValue(modifiedData[0].title)
            setSelectedCategoryType({
                title: modifiedData[0].title,
                code: modifiedData[0].code
            })
        }
        
       

        setOrderedCategoryListData(modifiedData)
    }
    
    useEffect(() => {
        fetchCategories();
        
    }, [])
    
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
    
    const fetchSubCategories =  async () => {
        if( selectedCategoryType && Object.keys(selectedCategoryType).length > 0 ) {
            await sendRequest('/categoryData/categories?where=categoryType%3D' + selectedCategoryType.code, 'GET', formatSubCategories)//%22 means ", %3D means = 
        }
    }
    
    const formatSubCategories = (data) => {
        const subCategories = data.category.subCategories.map( s => {
            return {
                title: s.title,
                code: s.code,
                object_id: s._id
            }
        })
         setSubCategories(subCategories)
        
        if( subCategories ) {
            setSubCategoryCheckbox([])
            subCategories.forEach( c => {
                setSubCategoryCheckbox( prevState => {
                    const subCategoryCheckbox = {
                        isChecked: isDefaultCheckboxChecked,
                        id: c.code,
                        object_id: c.object_id
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
    
    const [placeholderSeniorityValue, setPlaceholderSeniorityValue] = useState(isImported ? job.seniority : orderedSeniorityData[0].title)
    
    const [selectedSeniorityType, setSelectedSeniorityType] = useState(
        isImported ?
            {
                title: job.seniority,
                code: job.seniority_code
            } :
            orderedSeniorityData[0]
    )
    
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
    } = useInput(
        value => value.trim() !== '' && value.trim().length >= 5 && value.trim().length <= 30,
        isImported ? job.jobName : null
    )
    
    const {
        value : enteredSalary,
        reset : resetSalaryInput,
        valueChangeHandler : salaryInputChangeHandler,
        inputBlurHandler: salaryInputBlurHandler
    } = useInput(
        value => value,
        isImported && job.salary ? job.salary : null
    );

    const {
        value : enteredDesc,
        isValid: enteredDescIsValid,
        hasError: descInputHasError,
        reset : resetDescInput,
        valueChangeHandler : descInputChangeHandler,
        inputBlurHandler: descInputBlurHandler
    } = useInput(
        value => value.trim() !== '' && value.trim().length > 20,
        isImported ? job.desc : null
    )
    
    const {
        value : enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        reset : resetCityInput,
        valueChangeHandler : cityInputChangeHandler,
        inputBlurHandler: cityInputBlurHandler
    } = useInput(
        value => value.trim() !== '',
        isImported ? job.city : null
    )


    formIsValid = enteredJobNameIsValid && enteredDescIsValid && enteredCityIsValid;

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
        
        await postJob();
        
        if ( error ) {
            return;
        }
        
        //clearing the form
        if( !error && resp ) {
            resetJobNameInput();
            resetSalaryInput();
            resetDescInput();
            resetCityInput();
            
            if ( isImported ) {
                navigate('/profile');
                window.location.reload();
            } else {
                navigate('/posters/' + resp._id);
            }
        }
        
    }
    
    const postJob = async () => {
        let selectedSubCategories = subCategoryCheckbox.filter( s => s.isChecked ).map( s =>  s.id )
        let selectedSubCategoriesObjectIds = subCategoryCheckbox.filter( s => s.isChecked).map( s => s.object_id )
        let selectedWorkTypes = workTypeCheckbox.filter( w_type => w_type.isChecked).map( w_type => w_type.id.charAt(0).toUpperCase() + w_type.id.slice(1))
        
        await sendRequest(`/jobData/jobs${isImported ? `/${job._id}` : ''}`,isImported ? 'PUT' : 'POST', (data) => resp = data, {
            jobName: enteredJobName,
            workType: selectedWorkTypes,
            categoryCode: selectedCategoryType.code,
            subCategories: isImported ? selectedSubCategoriesObjectIds : selectedSubCategories,
            seniority: selectedSeniorityType.title,
            salary: enteredSalary ? enteredSalary : null,
            desc: enteredDesc,
            city: enteredCity
        })
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    return (
        <React.Fragment>
            {error && <BaseDialog show={!!error} fixed={false} onCloseDialog={resetError} title='An error occurred during fetching categories or subcategories!'>{error}</BaseDialog>}
            {isLoading && <BaseSpinner />}
            {!isLoading && !error &&
                <React.Fragment>
                    {isImported && 
                        <React.Fragment>
                            {windowWidth <= 500 &&
                                <div className={styles['close_bar_btn_wrapper']} onClick={() => onCloseEditForm()}>
                                    <div className={styles['close_bar_btn']}>
                                        <CloseBar />
                                        <CloseBar />
                                    </div>
                                </div>
                            }
                            <header className={styles['job_form_heading']}>
                                <h1>Edit form</h1>
                            </header>
                            <SeparationLine max-width='400px' style={ { margin: '0 auto' } }></SeparationLine>
                        </React.Fragment>
                    }
                    <form onSubmit={ formSubmissionHandler } className={ `${styles['apply_form']} ${className}` }>

                        <div className={ formControlClasses(jobNameInputHasError) }>

                            {jobNameInputHasError && <p>Please enter a valid non-empty job name with maximum 30 characters!</p>}
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
                                        <Label for={w_type.code} className={isImported ? styles['form_label_workType_imported'] : styles['form_label_workType']}>{ w_type.title }</Label>
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
                            <p>Category type*</p>
                            <DataSelectorWrapper
                                closeOnHover
                                selectorData={orderedCategoryListData}
                                initialPlaceholderValue={placeholderCategoryValue}
                                onResubForNewData={handleCategoryChange}
                            />
                        </div>


                        {isLoading && <BaseSpinner />}
                        { subCategories && <div className={styles['form-control']}>

                            <span>Choose sub categories (at least one*)</span>

                            <div className={styles['form_control_subcategory_wrapper']}>

                                {subCategories.map( (sub_cat, index ) =>
                                    <div className={styles['form_control_subcategory']} key={index}>
                                        <Label for={sub_cat.code} activate_ellipsis={!!isImported} className={isImported ? styles['form_label_subcategory_imported'] : styles['form_label_subcategory']}>{ sub_cat.title }</Label>
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
                                { isImported ? 'Edit' : 'Create' }
                            </RoundedButton>
                        </div>
                    </form>
                </React.Fragment>
            }
        </React.Fragment>
    )
}


export default JobForm;
