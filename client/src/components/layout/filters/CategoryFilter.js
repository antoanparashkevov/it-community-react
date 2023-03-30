import { useEffect, useState } from "react";
import styles from './CategoryFilter.module.css'

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

//context
import { useContext } from "react";
import CategoryContext from "../../../store/category-context";

const CategoryFilter = ({onSaveCriteria, fullScreen}) => {
    let categoryCtx = useContext(CategoryContext)

    const [fetchedCategories, setFetchedCategories] = useState(categoryCtx.categories);
    
    const [isExpanded, setIsExpanded] = useState(true)
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
       setFetchedCategories((prevState) => {
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
        onSaveCriteria(fetchedCategories)
    }, [ fetchedCategories ])
    
    return (
        <FilterContentWrapper className={`${fullScreen ? styles['categories_wrapper_full'] : ''}`}>
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
                            <CustomCheckbox isChecked={c.isChecked} value={c.id} name={c.type} id={c.id} onTriggerCheckbox={checkboxHandler} />
                        </div>
                    )
                })}
            </div>}
        </FilterContentWrapper>
    )
}

export default CategoryFilter

