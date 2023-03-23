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
import { useLoaderData } from "react-router-dom";

const CategoriesFilter = ({onSaveCriteria}) => {
    let filterCtx = useContext(FilterContext)
    const [fetchedCategories, setFetchedCategories] = useState(useLoaderData());
    
    const [isExpanded, setIsExpanded] = useState(true)
    
    useEffect( () => {
        setFetchedCategories((prevState) => {
            prevState = prevState.map(c => {
                return {
                    ...c,
                    isChecked: filterCtx.isChecked
                }
            })
            return prevState;
        })
        
    }, [])
    
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    const checkboxHandler = (data) => {
       setFetchedCategories((prevState)=>{
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
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title={'Selected Categories'} onExpanded={checkIsExpanded} />
            {isExpanded && <div className={styles['categories_form_controls']}>
                { fetchedCategories.map( (c, i) => {
                    return (
                        <div className={styles['form_control']} key={i}>
                            <Label for='frontend'>{ c.title }</Label>
                            <CustomCheckbox isChecked={filterCtx.isChecked} value={c.id} name={c.type} id={c.id} onTriggerCheckbox={checkboxHandler} />
                        </div>
                    )
                })}
            </div>}
        </FilterContentWrapper>
    )
}

export default CategoriesFilter

export const formatCategoryData = (data) => {
    return data.items.map( c => {
        return {
            id: c.code,
            title: c.title,
            type: 'categories',
        }
    })
}