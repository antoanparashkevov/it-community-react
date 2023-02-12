import styles from './CategoriesFilter.module.css'

const CategoriesFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <label htmlFor="categories">Categories</label>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <label htmlFor="frontend">Frontend</label>
                    <input type="checkbox" id='frontend' name='frontend' value='frontend'/>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="backend">Backend</label>
                    <input type="checkbox" id='backend' name='backend' value='backend'/>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="qa">Quality Assurance</label>
                    <input type="checkbox" id='qa' name='qa' value='qa'/>
                </div>
                <div className={styles['form_control']}>
                    <label htmlFor="infrastructure">Infrastructure</label>
                    <input type="checkbox" id='infrastructure' value='infrastructure'/>
                </div>
            </div>
        </div>
    )
}

export default CategoriesFilter