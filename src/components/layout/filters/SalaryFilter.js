import styles from './SalaryFilter.module.css'

//components
import BaseSlider from "../../UI/BaseSlider";

const SalaryFilter = () => {
    
    
    return (
        <div className={styles['sidebar_salary_filter']}>
            <div className={styles['sidebar_salary_header']}>
                <h3>Salary</h3>
            </div>
            <div className={styles['sidebar_salary_slider_wrapper']}>
                <BaseSlider/>
            </div>
        </div>
        
    )
}

export default SalaryFilter;