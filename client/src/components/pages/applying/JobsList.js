import styles from './JobsList.module.css'
import React, { useEffect, useState } from "react";

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useHttp from "../../../hooks/use-http";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import PosterItem from "../../applying/PosterItem";

//UI components
import NoDataAvailable from "../../UI/NoDataAvailable";
import BaseDialog from "../../UI/BaseDialog";
import JobListSkeletonLoading from "../../UI/JobListSkeletonLoading";

import Pagination from "../../applying/Pagination";

const JobsList = () => {
    const { width: windowWidth } = useWindowDimensions()
    const { isLoading, error, resetError, sendRequest } = useHttp();
    // TODO change the query param when we switch around different pages
    
    let [filteredData, setFilteredData] = useState({});
    
    const [jobs, setJobs] = useState([])
    
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);//starts from the first page
    const [jobsPerPage] = useState(5);//jobs per page (number)
    
    const indexOfLastJob = currentPage * jobsPerPage;//for ex, if we are on the second page, the last index of the job would be 10
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;//for ex, if we are on the second page, the last index of the job would be 10, 10 - 5 (jobs per page) = 5 
    
    
    const changeCurrentPage = (currentNumberPage) => {
        setCurrentPage(currentNumberPage)
    }
    
    useEffect( () => {
        const transformJobData = (response) => {
            const posters = response.jobs.map( j => {
                return {
                    id: j._id,
                    jobName: j.jobName,
                    workType: j.workType.map(w_type => w_type.toLowerCase()),
                    category: j.category.code,
                    subCat: j.subCategory.map( sub_cat => sub_cat.title),
                    seniority: j.seniority.toLowerCase().replace(' ', '_'),
                    salary: j.salary && !isNaN(j.salary) ? j.salary : null,
                    city: j.city,
                    date: j.date
                }
            })
            if( posters && posters.length > 0) {
                setJobs(posters);
            } else {
                setJobs([])
            }
        }

        sendRequest('/jobData/jobs', 'GET', transformJobData)
        
    }, [])
    
    const onFilterDataHandler = (data) => {
        setFilteredData(data)
    }
    
    const categoryFilter = (job) => {
        let toReturn = true;
        if( filteredData && Object.keys(filteredData).length > 0 ) {
            
            if ( job.category ) {
                toReturn = filteredData['categories'][job.category].isChecked
            }
        }
        return toReturn
    }
    
    const workTypeFilter = (job) => {
        let toReturn = true;
        if( filteredData && Object.keys(filteredData).length > 0 ) {
            
            if( job.workType && job.workType.length > 0 ) {
                
                for(let type of job.workType) {
                    toReturn = filteredData['workType'][type].isChecked
                    
                    if( toReturn === false ) {
                        break;
                    }
                }
            }
        }
        return toReturn
    }
    
    const seniorityFilter = (job) => {
        let toReturn = true;
        if( filteredData && Object.keys(filteredData).length > 0 ) {
            
            if( job.seniority ) {
                toReturn = filteredData['seniority'][job.seniority].isChecked
            }
        }
        return toReturn
    }
    
    const salaryFilter = (job) => {
        let toReturn = true;
        if( filteredData && Object.keys(filteredData).length > 0 ) {

            if( job.salary && !isNaN(job.salary) ) {
                toReturn = filteredData['salary']
            }
        }
        return toReturn
    }
    
    const jobsLength = jobs
        .filter(categoryFilter)
        .filter(workTypeFilter)
        .filter(seniorityFilter)
        .filter(salaryFilter).length
    
    const filteredJobs = jobs
        .filter(categoryFilter)
        .filter(workTypeFilter)
        .filter(seniorityFilter)
        .filter(salaryFilter)
    
    return (
        <section className={`${styles['posters_container']} container`}>
            <BaseCard hide={windowWidth <= 744} className={styles['aside_wrapper']}>
                <Sidebar onSaveFiltersData={onFilterDataHandler} />
            </BaseCard>
            {error && <BaseDialog show={!!error} onCloseDialog={resetError} fixed={false} title='An error occurred during fetching the jobs!'>{error}</BaseDialog>}
            {isLoading ? 
                <JobListSkeletonLoading /> :
                <div className={styles['posters_list_wrapper']}>
                    { jobsLength > 0 ? 
                        filteredJobs
                        .slice(indexOfFirstJob, indexOfLastJob)
                        .map((job, index) => (
                            <PosterItem key={ index } job={ job }/>
                        )) : <NoDataAvailable title='No Data Available' />
                    }
                    {
                       jobsLength > 0 && <Pagination totalJobs={jobsLength} jobsPerPage={jobsPerPage} onHandleCurrentPage={changeCurrentPage} />
                    }
                    
                </div>
            }
        </section>
    )
}

export default JobsList;