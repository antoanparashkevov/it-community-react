import styles from './SalaryFilter.module.css'

//components
import BaseSlider from "../../UI/BaseSlider";

//UI components
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";
import { useState } from "react";

const SalaryFilter = () => {
    const [isExpanded, setIsExpanded] = useState(true)

    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='salary' onExpanded={checkIsExpanded} hideArrow></StyledFilterHeaderIconWrapper>
            {isExpanded && <div className={styles['sidebar_salary_slider_wrapper']}>
                <BaseSlider/>
            </div>}
        </FilterContentWrapper>
        
    )
}

export default SalaryFilter;