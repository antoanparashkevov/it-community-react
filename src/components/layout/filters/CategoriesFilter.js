import styles from './CategoriesFilter.module.css'

//import UI components
import Arrow from "../../UI/BaseArrow";
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";

const CategoriesFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <div className={styles['sidebar_categories_header_and_icon']}>
                <h1 className={styles['categories_filter_header']}>Selected categories</h1>
                <Arrow $rotate />
            </div>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='frontend'>Frontend</Label>
                    <CustomCheckbox isChecked value={'frontend'} name='frontend' id='frontend' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='backend'>Backend</Label>
                    <CustomCheckbox isChecked value={'backend'} name='backend' id='backend' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='qa'>QA</Label>
                    <CustomCheckbox isChecked value={'qa'} name='qa' id='qa' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='infrastructure'>Infrastructure</Label>
                    <CustomCheckbox isChecked value={'infrastructure'} name='infrastructure' id='infrastructure' />
                </div>
            </div>
        </div>
    )
}

export default CategoriesFilter