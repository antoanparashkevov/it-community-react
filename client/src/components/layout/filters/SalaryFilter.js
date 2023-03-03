import styles from './SalaryFilter.module.css'

//components
import BaseSlider from "../../UI/BaseSlider";

//UI components
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";
import { useEffect, useState } from "react";

//context
import { useContext } from "react";
import FilterContext from "../../../store/filter-context";

const SalaryFilter = ( {onSaveCriteria} ) => {
    let filterCtx = useContext(FilterContext)
    const [isExpanded, setIsExpanded] = useState(true)
    const [isSliderChecked, setIsSliderChecked] = useState(filterCtx.isChecked)
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const handleSlider = (data) => {
        setIsSliderChecked(data)
    }
    
    useEffect( ( ) => {
        onSaveCriteria(isSliderChecked)
    }, [isSliderChecked])
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='salary' onExpanded={checkIsExpanded} hideArrow></StyledFilterHeaderIconWrapper>
            {isExpanded && <div className={styles['sidebar_salary_slider_wrapper']}>
                <BaseSlider onTriggerSlider={handleSlider} isChecked={filterCtx.isChecked}/>
            </div>}
        </FilterContentWrapper>
        
    )
}

export default SalaryFilter;