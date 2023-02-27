import { useEffect, useState } from "react";
import styles from './CategoriesFilter.module.css'

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

const CategoriesFilter = ({onSaveCriteria}) => {
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
            <StyledFilterHeaderIconWrapper title={'Selected Categories'} onExpanded={checkIsExpanded} />
            {isExpanded && <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='frontend'>Frontend</Label>
                    <CustomCheckbox isChecked value={'frontend'} name='categories' id='frontend' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='backend'>Backend</Label>
                    <CustomCheckbox isChecked value={'backend'} name='categories' id='backend' onTriggerCheckbox={checkboxHandler}/>
                </div>
                <div className={styles['form_control']}>
                    <Label for='qa'>QA</Label>
                    <CustomCheckbox isChecked value={'qa'} name='categories' id='qa' onTriggerCheckbox={checkboxHandler}/>
                </div>
                <div className={styles['form_control']}>
                    <Label for='infrastructure'>Infrastructure</Label>
                    <CustomCheckbox isChecked value={'infrastructure'} name='categories' id='infrastructure' onTriggerCheckbox={checkboxHandler}/>
                </div>
            </div>}
        </FilterContentWrapper>
    )
}

export default CategoriesFilter