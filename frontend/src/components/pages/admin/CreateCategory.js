//components
import CategoryForm from "../../admin/CategoryForm";

//UI components
import FormPageContent from "../../UI/FormPageContent";

const CreateCategory = () => {
    return (
        <FormPageContent title='Create a category'>
            <CategoryForm/>
        </FormPageContent>
    )
}

export default CreateCategory;