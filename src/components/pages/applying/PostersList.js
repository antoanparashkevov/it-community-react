import styles from './PostersList.module.css'

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { json, useLoaderData } from "react-router-dom";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import PosterItem from "../../applying/PosterItem";
import { useEffect } from "react";

//UI components

const PostersList = () => {
    const { width: windowWidth } = useWindowDimensions()
    const posters = useLoaderData();
    
    // if (posters.isError) {
    //     return <p>Error occurred! {posters.message}</p>
    // }
    
    useEffect( () => {
        console.log('Posters >>> ', posters)
    }, [])
    
    
    let postersArray = [1,2,3,4]
    
    return (
        <section className={`${styles['posters_container']} container`}>
            {/*TODO set hide prop dynamically*/}
            <BaseCard hide={windowWidth <= 744} className={styles['aside_wrapper']}>
                <Sidebar />
            </BaseCard>
            <div className={styles['posters_list_wrapper']}>
                { postersArray.map( (item, index) => 
                  <PosterItem key={index} />
                ) }
            </div>
        </section>
    )
}

export default PostersList;


export async function getPosters() {
    
    const response = await fetch('https://swpi.dev/api/people/1')

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