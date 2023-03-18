import React from "react";
import styles from './Profile.module.scss';

//components
import JobItem from "../../applying/JobItem";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";
import { useRouteLoaderData } from "react-router-dom";

const Profile = () => {
    const profileInfo = useRouteLoaderData('profile-info');
    const userData = profileInfo.userData;
    const jobs = profileInfo.jobs;
    
    
    return (
        <React.Fragment>
            <section className={`${styles['profile_root']} container`}>
                <BaseCard>
                    <div className={styles['profile_info_container']}>
                        <div className={styles['profile_info_wrapper']}>
                            <div className={styles['profile_info_company_name']}>
                                <h2><em>Welcome, { userData.companyName }</em></h2>
                            </div>
                            <div className={styles['profile_info_desc']}>
                                <h3>Email: <i>{ userData.email }</i></h3>
                                <h3>Foundation Year: <i>{ userData.foundationYear }</i></h3>
                                <h3>Employees: <i>{ userData.employees }</i></h3>
                                <p><strong>Company description:</strong><i> { userData.desc } </i></p>
                            </div>
                        </div>
                        <SeparationLine degrees='90deg' max-width='100px' className={styles['separation_line']}/>
                        <div className={styles['profile_info_image']}>
                            <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                        </div>
                    </div>
                </BaseCard>
                <BaseCard>
                    <div className={styles['profile_list_jobs_container']}>
                        { jobs && jobs.length > 0 && jobs.map( (job, index) => (
                            <JobItem key={index} job={job} />
                        ))}
                    </div>
                </BaseCard>
            </section>
        </React.Fragment>
    )
}

export default Profile;

export const formatProfileData = (data) => {
    return data;
}