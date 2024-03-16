import { Await, Navigate, useLocation, useRouteLoaderData } from "react-router-dom";
import React, { Suspense } from "react";
import styles from './Applying.module.css'

//components
import ApplyForm from "../../applying/ApplyForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";
import { getAuthToken } from "../../../util/auth";

//layouts
import Fallback from "../../layout/Fallback";

const Applying = () => {
    const { jobDetailsData } = useRouteLoaderData('poster-details')
    const location = useLocation();
    let token = getAuthToken();
    
    if( !token ) {
        return <Navigate to='/auth?mode=login' replace state={ {from: location} } relative />
    }
    
    return (
        <Suspense fallback={<Fallback />}>
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