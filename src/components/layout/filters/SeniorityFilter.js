import styles from './SeniorityFilter.module.css'
import Arrow from "../../UI/BaseArrow";

const SeniorityFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <div className={styles['sidebar_categories_header_and_icon']}>
                <label htmlFor="categories" className={styles['categories_filter_label']}>Seniority level</label>
                <Arrow $rotate />
            </div>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <label htmlFor="frontend">Internship</label>
                    <input type="checkbox" id='frontend' name='frontend' value='frontend' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="backend">Junior</label>
                    <input type="checkbox" id='backend' name='backend' value='backend' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="qa">Senior</label>
                    <input type="checkbox" id='qa' name='qa' value='qa' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="infrastructure">Team lead</label>
                    <input type="checkbox" id='infrastructure' value='infrastructure' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
            </div>
        </div>
    )
}

export default SeniorityFilter;