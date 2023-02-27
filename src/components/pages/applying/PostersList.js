import styles from './PostersList.module.css'
import { useEffect, useState } from "react";

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { json, useLoaderData } from "react-router-dom";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import PosterItem from "../../applying/PosterItem";


const PostersList = () => {
    const { width: windowWidth } = useWindowDimensions()
    // const posters = useLoaderData();
    const [posters, setPosters] = useState([
        {
            jobName: 'Full-Stack Developer',
            workType: 'office',
            date: '15-02-2022',
            category: ['FullStack', 'Frontend'],
            subCat: ['.NET', 'Vue'],
            seniority: 'senior',
            salary: 2000,
            location:  {
                country: 'Bulgaria',
                city: 'Sofia'
            }
        }
    ])
    
    const filtersDataHandler = (data) => {
        console.log('All filters Data >>> ', data)
    }
    
    // if (posters.isError) {
    //     return <p>Error occurred! {posters.message}</p>
    // }
    
    useEffect( () => {
        // console.log('Posters >>> ', posters)
    }, [])
    
    return (
        <section className={`${styles['posters_container']} container`}>
            {/*TODO set hide prop dynamically*/}
            <BaseCard hide={windowWidth <= 744} className={styles['aside_wrapper']}>
                <Sidebar onSaveFiltersData={filtersDataHandler} />
            </BaseCard>
            <div className={styles['posters_list_wrapper']}>
                { posters.map( (job, index) => 
                  <PosterItem key={index} job={job}/>
                ) }
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