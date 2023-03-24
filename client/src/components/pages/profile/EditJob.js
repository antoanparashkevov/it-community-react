import ReactDOM from "react-dom";
import React, { useState } from "react";
import styles from './EditJob.module.scss';

//UI components
import { Backdrop } from "../../UI/BaseDialog";
import JobForm from "../../applying/JobForm";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const EditJob = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(true);
    
    const job = useRouteLoaderData('edit-job');
    
    const tryClose = () => {
        navigate('/profile')
        setShowForm(false)
    }
    
    return (
        // TODO fix the edit form styles
        <React.Fragment>
            {
                ReactDOM.createPortal(
                    <Backdrop tryClose={tryClose} show={showForm} />,
                    document.getElementById('backdrop-root'))
            }
            {
                ReactDOM.createPortal(
                    <section className={styles['edit_form_wrapper']}>
                        <JobForm job={job.jobItem} className={styles['edit_form']} isImported/>
                    </section>,
                    document.getElementById('overlay-root'))
            }
        </React.Fragment>
    )
}

export default EditJob;

export const formatJobEditData = (data) => {
    return {
        jobItem: {
            jobName: data.jobItem.jobName,
            date: data.jobItem.date,
            category: data.jobItem.category,
            subCat: data.jobItem.subCategory.map( sub_cat => sub_cat.title),
            workType: data.jobItem.workType,
            seniority: data.jobItem.seniority,
            seniority_code: data.jobItem.seniority_code,
            salary: data.jobItem.salary && !isNaN(data.jobItem.salary) ? data.jobItem.salary : null,
            desc: data.jobItem.desc,
            city: data.jobItem.city,
            company: data.jobItem.companyId,
            _id: data.jobItem._id
        },
        userData: data.user

    }
}