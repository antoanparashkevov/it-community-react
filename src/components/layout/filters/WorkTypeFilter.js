import styles from './WorkTypeFilter.module.css'
import { useState } from "react";

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

const WorkTypeFilter = () => {
    const [isExpanded, setIsExpanded] = useState(true)

    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }

    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='Work type' onExpanded={checkIsExpanded} />
            {isExpanded && <div className={styles['categories_form_controls']}>
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
            </div>}
        </FilterContentWrapper>
    )
}

export default WorkTypeFilter