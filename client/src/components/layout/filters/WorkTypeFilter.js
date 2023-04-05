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

//data
import { WorkTypeFilterData } from "../../../data/WorkTypeFilterData";

const WorkTypeFilter = ({ onSaveCriteria, fullScreen }) => {
    let filterCtx = useContext(FilterContext)
    const [isExpanded, setIsExpanded] = useState(true)
    const [workTypeFilter, setWorkTypeFilter] = useState(WorkTypeFilterData);
    
    
    useEffect( () => {
        setWorkTypeFilter(prevState => {
            const newState = prevState.map( w => {
                return {
                    ...w,
                    isChecked: filterCtx.isChecked
                }
            })
            
            return newState;
        })
    },[])
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
        setWorkTypeFilter( (prevState) => {
            const newState = prevState.map( c => {
                if( c.id === data.id ){
                    c.isChecked = data.isChecked
                }
                return c;
            })
            
            return newState;
        })
    }
    
    useEffect( () => {
        onSaveCriteria(workTypeFilter)
    }, [ workTypeFilter ])

    return (
        <FilterContentWrapper className={`${fullScreen ? styles['work_type_wrapper_full'] : ''}`}>
            <StyledFilterHeaderIconWrapper 
                title='Work type' 
                onExpanded={checkIsExpanded} 
                className={`${fullScreen ? styles['work_type_header_wrapper_full'] : ''}`}
            />
            {isExpanded && <div className={`${styles['categories_form_controls']} ${fullScreen ? styles['work_type_form_controls_full'] : ''}`}>
                {
                    workTypeFilter.map( w => {
                        return (
                            <div className={`${styles['form_control']} ${fullScreen ? styles['work_type_form_control_full'] : ''}`} key={w.id}>
                                <Label for={ w.id }>{ (w.id.charAt(0).toUpperCase() + w.id.slice(1)).replace('_', ' ') }</Label>
                                <CustomCheckbox 
                                    isChecked={filterCtx.isChecked} 
                                    value={ w.id } 
                                    name={ w.type } 
                                    id={ w.id } 
                                    onTriggerCheckbox={checkboxHandler}
                                />
                            </div>
                        )
                    })
                }
            </div>}
        </FilterContentWrapper>
    )
}

export default WorkTypeFilter