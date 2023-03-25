import styles from './JobDetails.module.scss'
import { Link, Outlet, useRouteLoaderData, useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import { SquareButton } from "../../UI/BaseButton";
import { RemoteBadge, WorkCategoryBadge1 } from "../../UI/BaseBadge";

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const JobDetails = () => {
    const { width: windowWidth } = useWindowDimensions()
    const location = useLocation();
    const data = useRouteLoaderData('poster-details');
    //TODO use defer
    
    const [isApplyFormVisible, setIsApplyFormVisible] = useState(false);
    const [applyButtonLink, setApplyButtonLink] = useState('apply');
    
    let job = data;
    
   let company = data.jobItem.company;
    
    
    useEffect( () => {

        if ( location.pathname.includes('apply') ) {
            setIsApplyFormVisible(true)
            setApplyButtonLink('')
        } else {
            setApplyButtonLink('apply')
            setIsApplyFormVisible(false)
        }
        
    }, [applyButtonLink, isApplyFormVisible, location])
    
    return (
        <React.Fragment>
            <section className={`${styles['job_details_applying_wrapper']} container`}>
                <section className={`${styles['job_details_wrapper']} container ${isApplyFormVisible ? styles['job_details_wrapper_apply_form_is_visible'] : ''}`}>
                    <header className={styles['job_item_wrapper']}>
                        <BaseCard className={styles['job_item_container']}>
                            <div className={styles['job_item_header_applying_btn']}>
                                <h1 className={styles['job_item_header_title']}>{ job.jobItem.jobName }</h1>
                                {job.userData.userData.hasData === true && job.userData.userData.roles.includes('user') && <SquareButton as={Link} to={applyButtonLink} onClick={() => window.scroll({ top: 120, behavior: 'smooth' })}>Apply now</SquareButton>}
                            </div>
                            <div className={styles['job_item_work_type_badges']}>
                                {job.jobItem.workType.map((type, index)=> {
                                    return (
                                        <RemoteBadge $mode='one_item' className={styles['remote_badge']} key={index}>{ type }</RemoteBadge>
                                    )
                                })}
                            </div>
                        </BaseCard>
                    </header>

                    <div className={`${styles['job_info_wrapper']} ${isApplyFormVisible ? styles['job_info_wrapper_apply_form_is_visible'] : ''}`}>

                        <BaseCard className={styles['job_info_badge_wrapper']}>
                            {job.jobItem.subCat.map((category, index) =>
                                <WorkCategoryBadge1 $mode='one_item' key={index}>{category}</WorkCategoryBadge1>
                            )}
                        </BaseCard>

                        <BaseCard className={styles['job_info_desc_wrapper']}>
                            <p>{job.jobItem.desc}</p>
                        </BaseCard>
                    </div>

                    <aside className={`${styles['sidebar_wrapper']} ${isApplyFormVisible ? styles['sidebar_wrapper_apply_form_is_visible'] : ''}`}>
                        <BaseCard className={styles['sidebar_container']}>
                            <div className={styles['sidebar_company_logo']}>
                                <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                            </div>
                            <div className={styles['sidebar_company_title']}>
                                <p className={styles['sidebar_company_desc_para']}>{ company.companyName }</p>
                            </div>
                            <div className={styles['sidebar_company_desc']}>
                                <p className={styles['sidebar_company_desc_para']}>{ company.desc }</p>
                            </div>
                        </BaseCard>
                    </aside>
                </section>
                {isApplyFormVisible &&
                    ( 
                        <section className={`${styles['applying_wrapper']} ${windowWidth <= 740 ? 'container' : ''}`}>
                            <Outlet />
                        </section>
                    )
                }
            </section>
        </React.Fragment>
    )
}

export default JobDetails;

export const formatJobDetailsData = (data) => {
    return {
        jobItem: {
            jobName: data.jobItem.jobName,
            date: data.jobItem.date,
            category: data.jobItem.category.title,
            subCat: data.jobItem.subCategory.map( sub_cat => sub_cat.title),
            workType: data.jobItem.workType,
            seniority: data.jobItem.seniority,
            salary: data.jobItem.salary && !isNaN(data.jobItem.salary) ? data.jobItem.salary : null,
            desc: data.jobItem.desc,
            city: data.jobItem.city,
            company: data.jobItem.companyId
        },
        userData: data.user
        
    }
}