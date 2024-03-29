import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";

import emptyProfileLogo from '../../assets/images/profile_image.webp';


//hooks
import useFormatDate from "../../hooks/use-format-date";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const JobItem = ({ job, hideCompanyLogoWidth, children, editURL }) => {
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
        <Link to={ editURL ? editURL : job['id'] } className={styles['poster_list_item']}>
            { windowWidth > (hideCompanyLogoWidth ? hideCompanyLogoWidth : 500) &&  
                <div className={styles['left_company_logo']}>
                    <img src={emptyProfileLogo} alt="Company Logo"/>
                </div>
            }
            <div className={styles['right_company_info']}>
                <header className={styles['company_info_header']}>
                    <h1 className={styles['company_info_name']}>{ job.jobName }</h1>
                    <time className={styles['company_info_date']}>{ formattedDate }</time>
                </header>
                <section className={styles['company_info_additional_info']}>
                    <div className={styles['company_info_city_wrapper']}>
                        <address>{ job.city } city</address>
                    </div>
                    <SalaryBadge />
                    <div className={styles['company_info_right_arrow']}>
                        <img src="https://dev.bg/wp-content/themes/jobsdevbg/images/arrow-right-black.svg" alt="right_arrow"/>
                    </div>
                    <div className={styles['company_actions']}>
                        {children}
                    </div>
                </section>
            </div>
        </Link>
    )    
}

export default JobItem

