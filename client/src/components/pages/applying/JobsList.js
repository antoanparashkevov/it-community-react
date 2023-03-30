import styles from './JobsList.module.css'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useHttp from "../../../hooks/use-http";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import JobItem from "../../applying/JobItem";
import Pagination from "../../applying/Pagination";

//UI components
import NoDataAvailable from "../../UI/NoDataAvailable";
import BaseDialog from "../../UI/BaseDialog";
import JobListSkeletonLoading from "../../applying/skeletons/JobListSkeletonLoading";
import { OutlineButton } from "../../UI/BaseButton";

//context
import FilterContext from "../../../store/filter-context";

const JobsList = () => {
    let isByDefaultFiltersChecked = true;
    
    const { width: windowWidth } = useWindowDimensions();
    const { isLoading, error, resetError, sendRequest } = useHttp();
    
    const [queryParams, setQueryParams] = useSearchParams();
    const [showFilterSection, setShowFilterSection] = useState(false);
    const [filteredData, setFilteredData] = useState({});
    const [jobs, setJobs] = useState([])
    const [categories, setCategories] = useState([]);
    
    useEffect( () => {
        window.scroll( { top: 100, behavior: 'smooth' } )

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

            const formattedCategories = response.categories.map( c => {
                return {
                    id: c.code,
                    title: c.title,
                    type: 'categories',
                    isChecked: true
                }
            })
            
            if( formattedCategories && formattedCategories.length > 0 ) {
                setCategories(formattedCategories)
            } else {
                setCategories([])
            }
            
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
    }, [queryParams.get('category')])
    
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
    
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);//starts from the first page
    const [jobsPerPage] = useState(5);//jobs per page (number)
    
    const indexOfLastJob = currentPage * jobsPerPage;//for ex, if we are on the second page, the last index of the job would be 10
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;//for ex, if we are on the second page, the last index of the job would be 10, 10 - 5 (jobs per page) = 5 
    
    
    const changeCurrentPage = (currentNumberPage) => {
        setCurrentPage(currentNumberPage)
    }

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
                    toReturn = filteredData['workType'].find( c => c.id === type).isChecked
                    
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
            
            const clickedSeniority = filteredData['seniority'].find( c => c.id === job.seniority)
            
            if( job.seniority && filteredData['seniority'] ) {
                toReturn = clickedSeniority.isChecked
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
            <React.Fragment>
                {error ? <BaseDialog show={!!error} onCloseDialog={resetError} fixed={false} title='An error occurred during fetching the jobs!'>{error}</BaseDialog> : null }
                {
                    isLoading ?
                        (
                            <JobListSkeletonLoading />
                        ) :
                        (
                            <FilterContext.Provider
                                value={{
                                    categories : categories,
                                    hasData : categories.length > 0,
                                    isChecked : isByDefaultFiltersChecked
                                }}
                            >
                                <section className={`${styles['posters_container']} container`}>
                                    <BaseCard hide={ windowWidth <= 744 && showFilterSection === false } className={`${styles['aside_wrapper']} ${showFilterSection && windowWidth <= 744 ? styles['aside_wrapper_full'] : ''}`}>
                                        <Sidebar onSaveFiltersData={onFilterDataHandler} fullScreen={showFilterSection && windowWidth <= 744 } onCloseSidebar={() => setShowFilterSection(false)}/>
                                    </BaseCard>
                                    {
                                        windowWidth <= 744 &&
                                        <OutlineButton className={styles['posters_filter_btn']} onClick={() => setShowFilterSection(true)}>
                                            Filters
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11.627" height="10.565" viewBox="0 0 11.627 10.565">
                                                <path id="Icon_feather-filter" data-name="Icon feather-filter" d="M13.627,4.5H3L7.251,9.527V13l2.125,1.063V9.527Z" transform="translate(-2.5 -4)" fill="none" stroke="#374ffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                            </svg>
                                        </OutlineButton>
                                    }
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
                                </section>
                            </FilterContext.Provider>
                        )
                }
            </React.Fragment>
    )
}

export default JobsList;