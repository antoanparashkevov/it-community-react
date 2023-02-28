import { useEffect, useState } from "react";
import styles from './CategoriesFilter.module.css'

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

//context
import { useContext } from "react";
import FilterContext from "../../../store/filter-context";

const CategoriesFilter = ({onSaveCriteria}) => {
    let filterCtx = useContext(FilterContext)
    
    const [isExpanded, setIsExpanded] = useState(true)
    const [categoriesFilter, setCategoriesFilter] = useState({ 
        frontend: {
            id: 'frontend',
            type: 'categories',
            isChecked: filterCtx.isChecked
        },
        backend: {
            id: 'backend',
            type: 'categories',
            isChecked: filterCtx.isChecked
        },
        qa: {
            id: 'qa',
            type: 'categories',
            isChecked: filterCtx.isChecked
        },
        infrastructure: {
            id: 'infrastructure',
            type: 'categories',
            isChecked: filterCtx.isChecked
        }
    })
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
        setCategoriesFilter( (prevState) => {
            return {
                ...prevState,
                [data.id]: data
            }
        })
    }
    
    useEffect( () => {
        onSaveCriteria(categoriesFilter)
    }, [ categoriesFilter ])
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title={'Selected Categories'} onExpanded={checkIsExpanded} />
            {isExpanded && <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='frontend'>Frontend</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'frontend'} name='categories' id='frontend' onTriggerCheckbox={checkboxHandler} />
                </div>
                <div className={styles['form_control']}>
                    <Label for='backend'>Backend</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'backend'} name='categories' id='backend' onTriggerCheckbox={checkboxHandler}/>
                </div>
                <div className={styles['form_control']}>
                    <Label for='qa'>QA</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'qa'} name='categories' id='qa' onTriggerCheckbox={checkboxHandler}/>
                </div>
                <div className={styles['form_control']}>
                    <Label for='infrastructure'>Infrastructure</Label>
                    <CustomCheckbox isChecked={filterCtx.isChecked} value={'infrastructure'} name='categories' id='infrastructure' onTriggerCheckbox={checkboxHandler}/>
                </div>
            </div>}
        </FilterContentWrapper>
    )
}

export default CategoriesFilter