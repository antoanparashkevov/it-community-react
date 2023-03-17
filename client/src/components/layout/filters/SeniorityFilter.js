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

const SeniorityFilter = ({onSaveCriteria}) => {
    const filterCtx = useContext(FilterContext)
    
    const [isExpanded, setIsExpanded] = useState(true)
    const [seniorityFilter, setSeniorityFilter] = useState({ 
        intern: {
            isChecked: filterCtx.isChecked,
            id: 'intern',
            type: 'seniority'
        },
        junior: {
            isChecked: filterCtx.isChecked,
            id: 'junior',
            type: 'seniority'
        },
        senior: {
            isChecked: filterCtx.isChecked,
            id: 'senior',
            type: 'seniority'
        },
        team_lead: {
            isChecked: filterCtx.isChecked,
            id: 'team_lead',
            type: 'seniority'
        }
    })

    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }


    const checkboxHandler = (data) => {
        setSeniorityFilter( (prevState) => {
            return {
                ...prevState,
                [data.id]: data
            }
        })
    }

    useEffect( () => {
        onSaveCriteria(seniorityFilter)
    }, [seniorityFilter])
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='Seniority level' onExpanded={checkIsExpanded} />
            {isExpanded &&  <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='internship'>Internship</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'intern'} name='seniority' id='intern' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='junior'>Junior</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'junior'} name='seniority' id='junior' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='senior'>Senior</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'senior'} name='seniority' id='senior' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='team_lead'>Team Lead</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'team_lead'} name='seniority' id='team_lead' onTriggerCheckbox={checkboxHandler} />
                </div>
            </div>}
        </FilterContentWrapper>
    )
}

export default SeniorityFilter;