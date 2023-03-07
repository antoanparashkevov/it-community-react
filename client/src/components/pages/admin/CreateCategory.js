import styles from './CreateCategory.module.scss';
import { useState } from "react";

//components
import CategoryForm from "../../admin/CategoryForm";

//UI components
import FormPageContent from "../../UI/FormPageContent";
import BaseSpinner from "../../UI/BaseSpinner";

//hooks
import useHttp from "../../../hooks/use-http";

const CreateCategory = () => {
    const {sendRequest: postRequest, isLoading, error} = useHttp();
    const [postedData, setPostedData] = useState(false);
    
    const handleSuccessfulReq = () => {
        setPostedData(true)
    }
    
    const handleFormSubmission = async (formData) => {
        setPostedData(false)
        console.log('formData >>> ', formData)
        
        await postRequest('/categoryData/categories','POST', handleSuccessfulReq, formData)
    }

    console.log(error)
    return (
        <FormPageContent title='Create a category'>
            {isLoading && <BaseSpinner />}
            <CategoryForm onSaveData={handleFormSubmission}/>
        </FormPageContent>
    )
}

export default CreateCategory;