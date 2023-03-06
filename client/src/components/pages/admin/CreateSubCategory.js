
//UI components
import FormPageContent from "../../UI/FormPageContent";
import CategoryForm from "../../admin/CategoryForm";
import DataSelectorWrapper from "../../UI/DataSelectorWrapper";

const CreateSubCategory = () => {
    const categories = [
        {
            code: 'frontend',
            displayName: 'Frontend'
        }
    ]
    return (
        <FormPageContent title='Create a sub category'>
            <CategoryForm>
                <DataSelectorWrapper closeOnHover selectorData={categories} initialPlaceholderValue={categories[0].displayName}/>
            </CategoryForm>
        </FormPageContent>
    )   
}

export default CreateSubCategory