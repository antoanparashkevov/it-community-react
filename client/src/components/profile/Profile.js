import React, { useState, Suspense } from "react";
import { useRouteLoaderData, Outlet, defer, Await, useNavigation } from "react-router-dom";
import styles from './Profile.module.scss';

//components
import JobItem from "../applying/JobItem";

//UI components
import { BaseCard } from "../UI/BaseCard";
import SeparationLine from "../UI/SeparationLine";
import BaseDialog from "../UI/BaseDialog";
import BaseSpinner from "../UI/BaseSpinner";
import { DeleteButton } from "../UI/BaseButton";

//hooks
import useHttp from "../../hooks/use-http";
import loader from "../../util/loader";
import BaseSpinnerAlt from "../UI/BaseSpinnerAlt";

//guard


const Profile = () => {
    const { profileData } = useRouteLoaderData('profile-info');
    
    const { isLoading, error, resetError, sendRequest } = useHttp();
    
    const [tryingToDelete, setTryingToDelete] = useState(false);
    const [jobId, setJobId] = useState(null);
    
    const navigation = useNavigation();
    
    const deleteAction = async (data) => {
        if( data === true && jobId ) {
            const response = await sendRequest('/jobData/jobs/' + jobId, 'DELETE');
            
            if( !error && !isLoading && response ) {
                window.location.reload();
            }
        }
    }
    
    const tryToDelete = (e, jobId) => {
        e.preventDefault();//stop propagation
        
        setTryingToDelete(true)
        setJobId(jobId)
    }
    
    return (
        <React.Fragment>
            { navigation.state === 'loading' && <BaseSpinnerAlt />}
            { isLoading && <BaseSpinner /> }
            { error && 
                <BaseDialog 
                    show={!!error} 
                    onCloseDialog={resetError} 
                    title='You cannot perform this action! Try again later!'
                    fixed={false}
                >
                    {error}
                </BaseDialog>
            }
            { tryingToDelete && 
                <BaseDialog 
                    show={tryingToDelete} 
                    title='Are you sure you want to delete this item?' 
                    deleteAction 
                    fixed={false} 
                    onDelete={deleteAction} 
                    onCloseDialog={ () => setTryingToDelete(false) }
                >
                    This action cannot be undone!
                </BaseDialog>
            }
            <Suspense fallback={<BaseSpinnerAlt />}>
                <Await resolve={profileData}>
                    {
                        (profileData) => (
                            <section className={`${styles['profile_root']} container`}>
                                <BaseCard>
                                    <div className={styles['profile_info_container']}>
                                        <div className={styles['profile_info_wrapper']}>
                                            <div className={styles['profile_info_company_name']}>
                                                <h2><em>Welcome, { profileData['userData'].companyName }</em></h2>
                                            </div>
                                            <div className={styles['profile_info_desc']}>
                                                <h3>Email: <i>{ profileData['userData'].email }</i></h3>
                                                <h3>Foundation Year: <i>{ profileData['userData'].foundationYear }</i></h3>
                                                <h3>Employees: <i>{ profileData['userData'].employees }</i></h3>
                                                <p><strong>Company description:</strong><i> { profileData['userData'].desc } </i></p>
                                            </div>
                                        </div>
                                        <SeparationLine degrees='90deg' max-width='100px' className={styles['separation_line']}/>
                                        <div className={styles['profile_info_image']}>
                                            <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                                        </div>
                                    </div>
                                </BaseCard>
                                <BaseCard style={ { padding: '1.5rem'} }>
                                    <div className={styles['profile_list_jobs_container']}>
                                        { profileData['jobs'] && profileData['jobs'].length > 0 && profileData['jobs'].map( (job, index) => (
                                            <JobItem
                                                key={index}
                                                job={job}
                                                hideCompanyLogoWidth={750}
                                                editURL={`${job._id}/edit`}
                                            >
                                                <DeleteButton className={styles['job_actions_delete']} onClick={(e) => tryToDelete(e, job._id)}>Delete</DeleteButton>
                                            </JobItem>
                                        ))}
                                        { profileData['jobs'] && profileData['jobs'].length === 0 && <h1>You don't have any jobs! Create one now!</h1> }
                                    </div>
                                    <Outlet />
                                </BaseCard>
                            </section>
                        )
                    }
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default Profile;

export const formatProfileData = (data) => {
    return data;
}

async function profileLoader () {
    return loader('/profileData/userInfo', formatProfileData)
}

export async function profileDefer() {
        return defer({
            profileData: profileLoader()//profileLoader() will return Promise which we will resolve with async/await in the Profile component
        })
}