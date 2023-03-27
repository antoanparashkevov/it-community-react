import styles from './SeniorityFilter.module.css'
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
import { SeniorityFilterData } from "../../../data/SeniorityFilterData";

const SeniorityFilter = ({ onSaveCriteria, fullScreen }) => {
    const filterCtx = useContext(FilterContext)
    
    const [isExpanded, setIsExpanded] = useState(true)
    
    const [seniorityFilter, setSeniorityFilter] = useState(SeniorityFilterData)
    
    useEffect( () => {
        setSeniorityFilter((prevState) => {
            prevState = prevState.map( s => {
                return {
                    ...s,
                    isChecked : filterCtx.isChecked
                }
            })
            
            return prevState;
        })
    }, [])

    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
        setSeniorityFilter( (prevState) => {
            prevState = prevState.map( c => {
                if( c.id === data.id ){
                    c.isChecked = data.isChecked
                }
                return c;
            })

            return prevState;
        })
    }

    useEffect( () => {
        onSaveCriteria(seniorityFilter)
    }, [seniorityFilter])
    
    return (
        <FilterContentWrapper className={`${fullScreen ? styles['seniority_wrapper_full'] : ''}`}>
            <StyledFilterHeaderIconWrapper 
                title='Seniority level' 
                onExpanded={checkIsExpanded} 
                className={`${fullScreen ? styles['seniority_header_wrapper_full'] : ''}`} 
            />
            {isExpanded &&  <div className={`${styles['categories_form_controls']} ${fullScreen ? styles['seniority_form_controls_full'] : ''}`}>
                {
                    seniorityFilter.map( s => {
                        return (
                            <div className={`${styles['form_control']} ${styles['form_control_full']}`} key={ s.id }>
                                <Label for={ s.id }>{ (s.id.charAt(0).toUpperCase() + s.id.slice(1)).replace('_', ' ') }</Label>
                                <CustomCheckbox 
                                    isChecked={filterCtx.isChecked} 
                                    value={ s.id } 
                                    name={ s.type } 
                                    id={ s.id } 
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

export default SeniorityFilter;