import styles from './CreateJob.module.scss';
import React from "react";

//components
import CreateJobForm from "../../applying/CreateJobForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";
import FormPageContent from "../../UI/FormPageContent";

const CreateJob = () => {
    return (
        <FormPageContent title='Post a Job'>
            <CreateJobForm />
        </FormPageContent>
    )
}

export default CreateJob;