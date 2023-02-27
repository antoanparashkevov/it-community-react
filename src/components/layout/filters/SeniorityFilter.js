import styles from './SeniorityFilter.module.css'
import { useEffect, useState } from "react";

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

const SeniorityFilter = ({onSaveCriteria}) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const [currentFilterCriteria, setCurrentFilterCriteria] = useState([])

    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }


    const checkboxHandler = (data) => {

        setCurrentFilterCriteria((prevState) => {
            let sameElIndex = prevState.findIndex(el => el.id === data.id)
            if( sameElIndex !== -1 ) {
                prevState = prevState.splice(sameElIndex, 1);
            }
            return [...prevState, data]
        })

    }

    useEffect( () => {
        onSaveCriteria(currentFilterCriteria)
    }, [currentFilterCriteria])
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title='Seniority level' onExpanded={checkIsExpanded} />
            {isExpanded &&  <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='internship'>Internship</Label>
                    <CustomCheckbox isChecked value={'internship'} name='seniority' id='internship' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='junior'>Junior</Label>
                    <CustomCheckbox isChecked value={'junior'} name='seniority' id='junior' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='senior'>Senior</Label>
                    <CustomCheckbox isChecked value={'senior'} name='seniority' id='senior' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='team_lead'>Team Lead</Label>
                    <CustomCheckbox isChecked value={'team_lead'} name='seniority' id='team_lead' onTriggerCheckbox={checkboxHandler} />
                </div>
            </div>}
        </FilterContentWrapper>
    )
}

export default SeniorityFilter;