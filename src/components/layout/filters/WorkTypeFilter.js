import styles from './WorkTypeFilter.module.css'

//import UI components
import Arrow from "../../UI/BaseArrow";
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";

const WorkTypeFilter = () => {
    return (
        <div className={styles['sidebar_categories_filter']}>
            <div className={styles['sidebar_categories_header_and_icon']}>
                <label htmlFor="categories" className={styles['categories_filter_label']}>Work type</label>
                <Arrow $rotate />
            </div>
            <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='office'>Office</Label>
                    <CustomCheckbox isChecked value={'office'} name='office' id='office' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='home'>Home</Label>
                    <CustomCheckbox isChecked value={'home'} name='home' id='home' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='hybrid'>Hybrid</Label>
                    <CustomCheckbox isChecked value={'hybrid'} name='hybrid' id='hybrid' />
                </div>
            </div>
        </div>
    )
}

export default WorkTypeFilter