import React, {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";

//components
import JobForm from "../../applying/JobForm";

//UI components
import FormPageContent from "../../UI/FormPageContent";

//context
import AuthContext from "../../../store/auth-context";

const CreateJob = () => {
    const authData = useContext(AuthContext);
    const location = useLocation();

    if (
        (
            authData && authData.userData.hasData === false
        ) ||
        (
            authData.userData.hasData === true && authData.userData.roles.includes('company') === false
        )
    ) {
        return <Navigate to='/auth?mode=login' replace state={ { from: location } }></Navigate>
    }
    
    return (
        <FormPageContent title='Post a Job'>
            <JobForm />
        </FormPageContent>
    )
}

export default CreateJob;