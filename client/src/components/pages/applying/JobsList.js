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

const JobsList = () => {
    const { width: windowWidth } = useWindowDimensions()
    const { isLoading, error, resetError, sendRequest } = useHttp();
    
    let [filteredData, setFilteredData] = useState({});
    
    const [posters, setPosters] = useState([])
    
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
                setPosters(posters);
            } else {
                setPosters([])
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
    
    return (
        <section className={`${styles['posters_container']} container`}>
            {/*TODO PAGINATION*/}
            <BaseCard hide={windowWidth <= 744} className={styles['aside_wrapper']}>
                <Sidebar onSaveFiltersData={onFilterDataHandler} />
            </BaseCard>
            {error && <BaseDialog show={!!error} onCloseDialog={resetError} fixed={false} title='An error occurred during fetching the jobs!'>{error}</BaseDialog>}
            {isLoading ? 
                <JobListSkeletonLoading /> :
                <div className={styles['posters_list_wrapper']}>
                    { posters
                        .filter(categoryFilter)
                        .filter(workTypeFilter)
                        .filter(seniorityFilter)
                        .filter(salaryFilter).length > 0 ?
                        posters.map((job, index) => {
                            return <PosterItem key={ index } job={ job }/>
                        }) : <NoDataAvailable title='No Data Available' /> }
                </div>
            }
        </section>
    )
}

export default JobsList;