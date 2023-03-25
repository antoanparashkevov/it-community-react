import styles from './JobsList.module.css'
import React, { useEffect, useState } from "react";

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useHttp from "../../../hooks/use-http";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import JobItem from "../../applying/JobItem";

//UI components
import NoDataAvailable from "../../UI/NoDataAvailable";
import BaseDialog from "../../UI/BaseDialog";
import JobListSkeletonLoading from "../../applying/skeletons/JobListSkeletonLoading";

import Pagination from "../../applying/Pagination";
import { useSearchParams } from "react-router-dom";

const JobsList = () => {
    // TODO on small view to display filters
    const { width: windowWidth } = useWindowDimensions()
    const { isLoading, error, resetError, sendRequest } = useHttp();
    
    const [queryParams, setQueryParams] = useSearchParams();
    
    useEffect( () => {
        window.scroll( { top: 100, behavior: 'smooth' } )
    }, [])

    useEffect(() => {
        // validation for the page query param
        if ( 
            Number(queryParams.get('page')) <= 0 ||
            isNaN(Number(queryParams.get('page')))
        ) {
            setQueryParams(prev => {
                return {
                    ...prev,
                    category: queryParams.get('category'),
                    page: '1'
                }
            })
        }
        
        setCurrentPage(Number(queryParams.get('page')))
    }, [queryParams])
    
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
        
        if( queryParams.get('category') && queryParams.get('category').length > 0) {
            sendRequest('/jobData/jobs?where=category%3D' + queryParams.get('category'), 'GET', transformJobData)//%3D means =
        } else {
            sendRequest('/jobData/jobs', 'GET', transformJobData)
        }
        
        
    }, [])
    
    const onFilterDataHandler = (data) => {
        setFilteredData(data)
    }

    const categoryFilter = (job) => {

        if ( !queryParams.get('category') || queryParams.get('category') && queryParams.get('category').length === 0 ) {
            let toReturn = true;
            if( filteredData && Object.keys(filteredData).length > 0 ) {
                
                const clickedCategory = filteredData['categories'].find( c => c.id === job.category)
                
                if ( job.category && filteredData['categories'] ) {
                    toReturn = clickedCategory.isChecked
                }
            }
            return toReturn
        }
        return true;
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
                (
                    <JobListSkeletonLoading />
                ) :
                (
                    <div className={styles['posters_list_wrapper']}>
                        { jobsLength > 0 ?
                            filteredJobs
                                .slice(indexOfFirstJob, indexOfLastJob)
                                .map((job, index) => (
                                    <JobItem key={ index } job={ job }/>
                                )) : <NoDataAvailable title='No Data Available' />
                        }
                        {
                            jobsLength > 0 && <Pagination totalJobs={jobsLength} jobsPerPage={jobsPerPage} onHandleCurrentPage={changeCurrentPage} />
                        }
                    </div>
                )
            }
        </section>
    )
}

export default JobsList;