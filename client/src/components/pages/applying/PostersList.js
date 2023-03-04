import styles from './PostersList.module.css'
import React, { useEffect, useReducer, useState } from "react";

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { json, useLoaderData } from "react-router-dom";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import PosterItem from "../../applying/PosterItem";

//UI components
import NoDataAvailable from "../../UI/NoDataAvailable";

const PostersList = () => {
    const { width: windowWidth } = useWindowDimensions()
    let [filteredData, setFilteredData] = useState({});
    // const posters = useLoaderData();
    const [posters, setPosters] = useState([
        {
            jobName: 'Full-Stack Developer',
            workType: ['office', 'hybrid'],
            date: '15-02-2022',
            category: ['backend', 'infrastructure'],
            subCat: ['.NET', 'Vue'],
            seniority: 'senior',
            salary: 2000,
            location:  {
                country: 'Bulgaria',
                city: 'Sofia'
            }
        },
    ])
    
    const onFilterDataHandler = (data) => {
        setFilteredData(data)
    }
    
    const categoryFilter = (job) => {
        let toReturn = true;
        if( filteredData && Object.keys(filteredData).length > 0 ) {
            
            if ( job.category && job.category.length > 0 ) {
                
                for(let category of job.category) {
                    toReturn = filteredData['categories'][category].isChecked
                    
                    if( toReturn === false ) {
                        break;
                    }
                }
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
            <BaseCard hide={windowWidth <= 744} className={styles['aside_wrapper']}>
                <Sidebar onSaveFiltersData={onFilterDataHandler} />
            </BaseCard>
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
        </section>
    )
}

export default PostersList;


export const loader = async () => {
    
    const response = await fetch('https://swapi.dev/api/people/1')

    if( !response.ok ) {
        //the Error component will be triggered
        
        // return {
        //     isError: true,
        //     message: 'Could not fetch the data!'
        // };
        
        
        // throw new Response(JSON.stringify({message: 'Page not found!'}), {
        //     status: 500
        // })
        
        /*
        * JSON utility function will automatically convert our object to JSON and parse it to the place where we use this Response
        * */
        throw json(
            {message: 'Page not found!'},
            { status : 404 }
            )
        
    } else {
        return response;
    }
}