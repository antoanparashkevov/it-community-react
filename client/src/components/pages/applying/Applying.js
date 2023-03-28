import { Await, useRouteLoaderData } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import styles from './Applying.module.css'

//components
import ApplyForm from "../../applying/ApplyForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";

const Applying = () => {
    const { jobDetailsData } = useRouteLoaderData('poster-details')
    
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={jobDetailsData}>
                {
                    (data) => (
                        <BaseCard className={styles['applying_container']}>
                            <h1 className={styles['applying_header']}>Send a message</h1>
                            <SeparationLine max-width='300px' />
                            <ApplyForm initialEmailValue={data['userData'].userData.email ? data['userData'].userData.email : ''} companyId={data['jobItem'].company._id ? data['jobItem'].company._id : ''}/>
                        </BaseCard>
                    )
                }
            </Await>
        </Suspense>
    )
}

export default Applying;