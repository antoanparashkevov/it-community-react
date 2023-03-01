import { useRouteLoaderData } from "react-router-dom";
import React, { useEffect } from "react";
import styles from './Applying.module.css'

//components
import ApplyForm from "../../applying/ApplyForm";

const Applying = () => {
    const data = useRouteLoaderData('poster-details')
    
    useEffect( () => {
        console.log('Data from Applying component >>> ', data)
    }, [])
    
    return (
        <React.Fragment>
            <div className={styles['applying_container']}>
                <h1>Applying page</h1>
                <ApplyForm />
            </div>
        </React.Fragment>
    )
}

export default Applying;