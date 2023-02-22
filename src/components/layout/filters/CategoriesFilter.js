import styles from './CategoriesFilter.module.css'
import CustomCheckbox from "../../UI/CustomCheckbox";

//import UI components
import Arrow from "../../UI/BaseArrow";

const CategoriesFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <div className={styles['sidebar_categories_header_and_icon']}>
                <label htmlFor="categories" className={styles['categories_filter_label']}>Selected categories</label>
                <Arrow $rotate />
            </div>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <label htmlFor="frontend">Frontend</label>
                    <CustomCheckbox isChecked value={'frontend'} name='frontend' id='frontend' />
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="backend">Backend</label>
                    <input type="checkbox" id='backend' name='backend' value='backend' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="qa">Quality Assurance</label>
                    <input type="checkbox" id='qa' name='qa' value='qa' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="infrastructure">Infrastructure</label>
                    <input type="checkbox" id='infrastructure' value='infrastructure' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
                </div>
            </div>
        </div>
    )
}

export default CategoriesFilter