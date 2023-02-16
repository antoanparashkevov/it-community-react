import styles from './CategoriesFilter.module.css'

const CategoriesFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <label htmlFor="categories" className={styles['categories_filter_label']}>Active filters</label>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <label htmlFor="frontend">Frontend</label>
                    <input type="checkbox" id='frontend' name='frontend' value='frontend' defaultChecked={true}/>
                    <span className={styles['checkmark']}></span>
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