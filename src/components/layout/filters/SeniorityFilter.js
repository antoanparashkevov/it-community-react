import styles from './SeniorityFilter.module.css'

//import UI components
import Arrow from "../../UI/BaseArrow";
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";

const SeniorityFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <div className={styles['sidebar_categories_header_and_icon']}>
                <label htmlFor="categories" className={styles['categories_filter_label']}>Seniority level</label>
                <Arrow $rotate />
            </div>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='internship'>Internship</Label>
                    <CustomCheckbox isChecked value={'internship'} name='internship' id='internship' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='junior'>Junior</Label>
                    <CustomCheckbox isChecked value={'junior'} name='junior' id='junior' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='senior'>Senior</Label>
                    <CustomCheckbox isChecked value={'senior'} name='senior' id='senior' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='team_lead'>Team Lead</Label>
                    <CustomCheckbox isChecked value={'team_lead'} name='team_lead' id='team_lead' />
                </div>
            </div>
        </div>
    )
}

export default SeniorityFilter;