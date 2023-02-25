import styles from './PostersList.module.css'

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useLoaderData } from "react-router-dom";

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
    
    const response = await fetch('https://swapi.dev/api/people/1')

    if( !response.ok ) {
        // return {
        //     isError: true,
        //     message: 'Could not fetch the data!'
        // };
        throw new Error('Could not fetch the data!')//the Error component will be triggered
    } else {
        return response;
    }
}