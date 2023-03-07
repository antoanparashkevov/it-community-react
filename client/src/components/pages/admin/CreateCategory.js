import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

//components
import CategoryForm from "../../admin/CategoryForm";

//UI components
import FormPageContent from "../../UI/FormPageContent";
import BaseSpinner from "../../UI/BaseSpinner";

//hooks
import useHttp from "../../../hooks/use-http";


const CreateCategory = () => {
    const {sendRequest: postRequest, isLoading, error} = useHttp();
    
    const [categories, setCategories] = useState(useRouteLoaderData('admin'))
    
    
    useEffect(() => {
        console.log('categories', categories)
    }, [])
    
    const handleFormSubmission = async (formData) => {
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