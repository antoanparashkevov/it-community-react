import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";

//UI components
import { DeleteButton, EditButton } from "../UI/BaseButton";

//hooks
import useFormatDate from "../../hooks/use-format-date";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const JobItem = ({ job, hideCompanyLogoWidth, forProfile, onDelete }) => {
    const { formattedDate } = useFormatDate(job.date, 'D.MS');
    const { width: windowWidth } = useWindowDimensions();
    
    const SalaryBadge = () => {
        if( job.salary && !isNaN(job.salary) ) {
            return (
                <div className={styles['company_info_salary_wrapper']}>
                    <span>{ job.salary }$</span>
                </div>
            )
        }
    }
    
    return (
            <Link to={ job['id'] } className={styles['poster_list_item']} style={ { pointerEvents: forProfile ? 'none' : 'pointer' } }>
                { windowWidth > (hideCompanyLogoWidth ? hideCompanyLogoWidth : 500) &&  
                    <div className={styles['left_company_logo']}>
                        <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                    </div>
                }
                <div className={styles['right_company_info']}>
                    <header className={styles['company_info_header']}>
                        <h1 className={styles['company_info_name']}>{ job.jobName }</h1>
                        <time className={styles['company_info_date']}>{ formattedDate }</time>
                    </header>
                    <section className={styles['company_info_additional_info']}>
                        <div className={styles['company_info_city_wrapper']}>
                            <address className={styles['company_info_city']}>{ job.city } city</address>
                        </div>
                        <SalaryBadge />
                        <div className={styles['company_info_right_arrow']}>
                            <img src="https://dev.bg/wp-content/themes/jobsdevbg/images/arrow-right-black.svg" alt="right_arrow"/>
                        </div>
                        { forProfile &&
                            <div className={styles['job_actions']}>
                                <EditButton className={styles['job_actions_edit']}>Edit</EditButton>
                                <DeleteButton className={styles['job_actions_delete']} onClick={() => onDelete({ toDelete: true, jobId: job._id })}>Delete</DeleteButton>
                            </div>
                        }
                    </section>
                    
                </div>
            </Link>
    )    
}

export default JobItem

