import styles from './WorkTypeFilter.module.css'
import { useEffect, useState } from "react";

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

//context
import { useContext } from "react";
import FilterContext from "../../../store/filter-context";
import filterContext from "../../../store/filter-context";
const WorkTypeFilter = ({ onSaveCriteria }) => {
    let filterCtx = useContext(filterContext)
    const [isExpanded, setIsExpanded] = useState(true)
    const [workTypeFilter, setWorkTypeFilter] = useState({
        office: {
            isChecked: filterCtx.isChecked,
            id: 'office',
            type: 'work_type'
        },
        home: {
            isChecked: filterCtx.isChecked,
            id: 'home',
            type: 'work_type'
        },
        hybrid: {
            isChecked: filterCtx.isChecked,
            id: 'hybrid',
            type: 'work_type'
        }
    })
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
        setWorkTypeFilter( (prevState) => {
            return {
                ...prevState,
                [data.id]: data
            }
        })
    }
    
    useEffect( () => {
        onSaveCriteria(workTypeFilter)
    }, [ workTypeFilter ])

    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='Work type' onExpanded={checkIsExpanded} />
            {isExpanded && <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='office'>Office</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'office'} name='work_type' id='office' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='home'>Home</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'home'} name='work_type' id='home' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='hybrid'>Hybrid</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'hybrid'} name='work_type' id='hybrid' onTriggerCheckbox={checkboxHandler} />
                </div>
            </div>}
        </FilterContentWrapper>
    )
}

export default WorkTypeFilter