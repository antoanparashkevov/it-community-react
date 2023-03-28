import ReactDOM from "react-dom";
import React, { Suspense, useState } from "react";
import styles from './EditJob.module.scss';

//UI components
import { Backdrop } from "../../UI/BaseDialog";
import JobForm from "../../applying/JobForm";
import { Await, defer, useNavigate, useRouteLoaderData } from "react-router-dom";
import loader from "../../../util/loader";
import BaseSpinnerAlt from "../../UI/BaseSpinnerAlt";

const EditJob = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(true);
    
    const { job } = useRouteLoaderData('edit-job');

    const tryClose = () => {
        navigate('/profile')
        window.scroll({
            top: 100,
            behavior: 'smooth'
        })
        setShowForm(false)
    }
    
    return (
        <Suspense fallback={<BaseSpinnerAlt />}>
            <Await resolve={job}>
                {
                    (job) => (
                        <React.Fragment>
                            {
                                ReactDOM.createPortal(
                                    <Backdrop tryClose={tryClose} show={showForm} />,
                                    document.getElementById('backdrop-root'))
                            }
                            {
                                ReactDOM.createPortal(
                                    <section className={styles['edit_form_wrapper']}>
                                        <JobForm job={job['jobItem']} className={styles['edit_form']} isImported onCloseEditForm={tryClose}/>
                                    </section>,
                                    document.getElementById('overlay-root'))
                            }
                        </React.Fragment>
                    )
                }
            </Await>
        </Suspense>
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

async function jobEditLoader(params) {
    return loader('/jobData/jobs/' + params['posterId'], formatJobEditData, ['company'])
}

export function jobEditDefer(params) {
    return defer({
        job: jobEditLoader(params)
    })
}



