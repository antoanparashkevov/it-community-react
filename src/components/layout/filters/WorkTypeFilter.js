import styles from './WorkTypeFilter.module.css'
import Arrow from "../../UI/BaseArrow";

const WorkTypeFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <div className={styles['sidebar_categories_header_and_icon']}>
                <label htmlFor="categories" className={styles['categories_filter_label']}>Work type</label>
                <Arrow rotate={true} />
            </div>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <label htmlFor="frontend">Office</label>
                    <input type="checkbox" id='frontend' name='frontend' value='frontend' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="backend">Home</label>
                    <input type="checkbox" id='backend' name='backend' value='backend' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="qa">Hybrid</label>
                    <input type="checkbox" id='qa' name='qa' value='qa' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
            </div>
        </div>
    )
}

export default WorkTypeFilter