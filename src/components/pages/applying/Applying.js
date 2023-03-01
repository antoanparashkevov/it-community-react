import { useRouteLoaderData } from "react-router-dom";
import React, { useEffect } from "react";
import styles from './Applying.module.css'

//components
import ApplyForm from "../../applying/ApplyForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";

const Applying = () => {
    const data = useRouteLoaderData('poster-details')
    
    useEffect( () => {
        console.log('Data from Applying component >>> ', data)
    }, []);
    
    return (
        <BaseCard className={styles['applying_container']}>
            <h1 className={styles['applying_header']}>Send a message</h1>
            <SeparationLine max-width='300px' />
            <ApplyForm />
        </BaseCard>
    )
}

export default Applying;