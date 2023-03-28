import React from "react";

//components
import JobForm from "../../applying/JobForm";

//UI components
import FormPageContent from "../../UI/FormPageContent";

const CreateJob = () => {
    return (
        <FormPageContent title='Post a Job'>
            <JobForm />
        </FormPageContent>
    )
}

export default CreateJob;