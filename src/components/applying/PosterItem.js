import { Link } from "react-router-dom";
import styles from "../applying/PosterItem.module.css";

const PosterItem = (props) => {
    return (
            <Link to='/' className={styles['poster_list_item']}>
                {/*TODO ON SMALL VIEW TO HIDE THE COMPANY LOGO*/}
                <div className={styles['left_company_logo']}>
                    <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                </div>
                <div className={styles['right_company_info']}>
                    <header className={styles['company_info_header']}>
                        <h1 className={styles['company_info_name']}>Full-Stack Developer</h1>
                        <time className={styles['company_info_date']}>10.Feb</time>
                    </header>
                    <section className={styles['company_info_additional_info']}>
                        <div className={styles['company_info_city_wrapper']}>
                            <address className={styles['company_info_city']}>Sofia city</address>
                        </div>
                        <div className={styles['company_info_salary_wrapper']}>
                            <span>1200$</span>
                        </div>
                        <div className={styles['company_info_right_arrow']}>
                            <img src="https://dev.bg/wp-content/themes/jobsdevbg/images/arrow-right-black.svg" alt="right_arrow"/>
                        </div>
                    </section>
                </div>
            </Link>
    )    
}

export default PosterItem

