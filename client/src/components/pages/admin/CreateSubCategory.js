import { useRouteLoaderData } from "react-router-dom";

//UI components
import FormPageContent from "../../UI/FormPageContent";
import SubCategoryForm from "../../admin/SubCategoryForm";

const CreateSubCategory = () => {
    const categories = useRouteLoaderData('admin')
    //TODO use defer
    return (
        <FormPageContent title='Create a sub category'>
            <SubCategoryForm categories={categories} />
        </FormPageContent>
    )   
}

export default CreateSubCategory