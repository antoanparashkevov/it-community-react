import styles from './CreateJobForm.module.scss';

//UI components
import { RoundedButton } from "../UI/BaseButton";
import { Input } from "../layout/Input";
import { TextArea } from "../UI/TextArea";
import DataSelectorWrapper from "../UI/DataSelectorWrapper";

//hooks
import useInput from "../../hooks/use-input";

const CreateJobForm = () => {
    let formIsValid;

    const {
        value : enteredJobName,
        isValid: enteredJobNameIsValid,
        hasError: jobNameInputHasError,
        reset : resetJobNameInput,
        valueChangeHandler : jobNameInputChangeHandler,
        inputBlurHandler: jobNameInputBlurHandler
    } = useInput(value => value.trim() !== '')

    //TODO workType with dropdown selector
    const orderedWorkTypeListData = [
        {
            code: 'hybrid',
            displayName : 'Hybrid',
        },
        {
          code: 'office',
          displayName : 'Office'  
        },
        {
            code: 'remote',
            displayName : 'Remote'
        }
    ]
    const orderedCategoryListData = [
        {
            code: 'frontend',
            displayName : 'frontend',
        },
        {
          code: 'backend',
          displayName : 'backend'  
        },
        {
            code: 'qa',
            displayName : 'qa'
        }
    ] 
    
    const orderedSubCategoryListData = [
        {
            code: 'frontend',
            displayName : 'frontend',
        },
        {
          code: 'backend',
          displayName : 'backend'  
        },
        {
            code: 'qa',
            displayName : 'qa'
        }
    ]
    const {
        value : enteredSalary,
        isValid: enteredSalaryIsValid,
        hasError: salaryInputHasError,
        reset : resetSalaryInput,
        valueChangeHandler : salaryInputChangeHandler,
        inputBlurHandler: salaryInputBlurHandler
    } = useInput(value => !isNaN(value) && Number(value) > 0);

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

        console.log('Entered job Name >>> ', enteredJobName)
        console.log('Entered salary >>> ', enteredSalary)
        console.log('Entered desc >>> ', enteredDesc)

        //clearing the form
        resetJobNameInput();
        resetSalaryInput();
        resetDescInput();
        resetCityInput();
    }

    const formControlClasses = (hasError) => {
        return hasError ? `${styles['form-control']} invalid` : styles['form-control']
    }

    return (
        <form onSubmit={ formSubmissionHandler } className={ styles['apply_form'] }>
            <div className={ formControlClasses(jobNameInputHasError) }>

                {jobNameInputHasError && <p>Please enter a valid non-empty job name!</p>}
                <label htmlFor="job_name">Job name*</label>
                <Input
                    id='job_name'
                    name='job_name'
                    onChange={ jobNameInputChangeHandler }
                    onBlur={ jobNameInputBlurHandler }
                    value={ enteredJobName }
                />
            </div>
            
            <div className={styles['form-control']}>
                <label htmlFor="work_type">Work type*</label>
                <DataSelectorWrapper
                    selectorData={orderedWorkTypeListData}
                    initialPlaceholderValue={orderedWorkTypeListData[0].displayName}
                    closeOnHover
                />
            </div>
            
            <div className={styles['form-control']}>
                <label htmlFor="category_type">Category type*</label>
                <DataSelectorWrapper
                    selectorData={orderedCategoryListData}
                    initialPlaceholderValue={orderedCategoryListData[0].displayName}
                    closeOnHover
                />
            </div>
            
            <div className={styles['form-control']}>
                <label htmlFor="subcategory_type">Sub Category type*</label>
                <DataSelectorWrapper
                    selectorData={orderedSubCategoryListData}
                    initialPlaceholderValue={orderedSubCategoryListData[0].displayName}
                    closeOnHover
                />
            </div>
            
            <div className={styles['form-control']}>
                <label htmlFor="seniority">Seniority*</label>
                <DataSelectorWrapper
                    selectorData={orderedSubCategoryListData}
                    initialPlaceholderValue={orderedSubCategoryListData[0].displayName}
                    closeOnHover
                />
            </div>
            
            <div className={ formControlClasses(salaryInputHasError) }>

                {salaryInputHasError && <p>Please enter a valid non-negative salary</p> }
                <label htmlFor="salary">Salary</label>
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

                {cityInputHasError && <p>Please enter a valid non-empty description with at least 20 characters!</p>}
                <label htmlFor="city">City in Bulgaria*</label>
                <Input
                    id='city'
                    name='city'
                    onChange={ cityInputChangeHandler }
                    onBlur={ cityInputBlurHandler }
                    value={ enteredCity }
                />
            </div>
            
            <div className={ formControlClasses(descInputHasError) }>

                {descInputHasError && <p>Please enter a valid non-empty city which is located in Bulgaria!</p>}
                <label htmlFor="desc">Job description*</label>
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
    )
}


export default CreateJobForm;