import { useEffect, useState } from "react";
import styles from './CategoryFilter.module.css'

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

//context
import { useContext } from "react";
import FilterContext from "../../../store/filter-context";
import { useLocation } from "react-router-dom";

const CategoryFilter = ({onSaveCriteria, fullScreen}) => {
    let filterCtx = useContext(FilterContext)
    const location = useLocation();

    const [fetchedCategories, setFetchedCategories] = useState(filterCtx.categories);
    
    const [isExpanded, setIsExpanded] = useState(true)
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
       setFetchedCategories((prevState) => {
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
        onSaveCriteria(fetchedCategories)
    }, [ fetchedCategories ])
    
    return (
        <FilterContentWrapper style={{display: `${location.search.includes('?category=') ? 'none' : 'block'}`}} className={`${fullScreen ? styles['categories_wrapper_full'] : ''}`}>
            <StyledFilterHeaderIconWrapper 
                title={'Selected Categories'} 
                onExpanded={checkIsExpanded} 
                className={`${fullScreen ? styles['categories_header_wrapper_full'] : ''}`}
            />
            {isExpanded && <div className={`${styles['categories_form_controls']} ${fullScreen ? styles['categories_form_controls_full'] : ''}`}>
                { fetchedCategories.map( (c, i) => {
                    return (
                        <div 
                            className={`
                                ${styles['form_control']} 
                                ${fullScreen ? styles['categories_form_control_full'] : ''}
                            `} 
                            key={i} 
                        >
                            <Label for='frontend'>{ c.title }</Label>
                            <CustomCheckbox isChecked={filterCtx.isChecked} value={c.id} name={c.type} id={c.id} onTriggerCheckbox={checkboxHandler} />
                        </div>
                    )
                })}
            </div>}
        </FilterContentWrapper>
    )
}

export default CategoryFilter

