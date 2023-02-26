import styles from './SeniorityFilter.module.css'
import { useState } from "react";

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

const SeniorityFilter = () => {
    const [isExpanded, setIsExpanded] = useState(true)

    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='Seniority level' onExpanded={checkIsExpanded} />
            {isExpanded &&  <div className={styles['categories_form_controls']}>
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
            </div>}
        </FilterContentWrapper>
    )
}

export default SeniorityFilter;