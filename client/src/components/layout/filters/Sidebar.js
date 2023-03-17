import styles from './Sidebar.module.css'
import React, { useEffect, useReducer } from "react";

//import UI components
import SeparationLine from "../../UI/SeparationLine";

//import filter components
import CategoriesFilter from "./CategoriesFilter";
import SeniorityFilter from "./SeniorityFilter";
import SalaryFilter from "./SalaryFilter";
import WorkTypeFilter from "./WorkTypeFilter";

//context
import FilterContext from "../../../store/filter-context";
import { useSearchParams } from "react-router-dom";

//can be created outside the scope of this component function. It does not need to interact with anything inside the component function.
const filterDataReducer = (state, action) => {

    switch ( action.type ) {
        case 'CATEGORIES':
            return {
                ...state,
                categories : action.payload
            }
        case 'SENIORITY':
            return {
                ...state,
                seniority : action.payload
            }
        case 'WORK_TYPE':
            return {
                ...state,
                workType : action.payload
            }
        case 'SALARY':
            return {
                ...state,
                salary : action.payload
            }
        default:
            return {
                categories: {},
                seniority: {},
                workType: {},
                salary: null
            }
    }
}

const Sidebar = ({onSaveFiltersData}) => {
    let isByDefaultChecked = true;
    
    const [queryParams, setQueryParams] = useSearchParams();
    
    const [filterData, dispatchFilterData] = useReducer(filterDataReducer, {
        categories: [],
        seniority: [],
        workType: [],
        salary: null
    }, () => {})
    
    
    const getCategoriesCriteria = (data) => {
        dispatchFilterData({
            type: 'CATEGORIES',
            payload: data
        })
    }
    
    const getSeniorityCriteria = (data) => {
        dispatchFilterData({
            type: 'SENIORITY',
            payload: data
        })
    }
    
    const getWorkTypeCriteria = (data) => {
        dispatchFilterData({
            type: 'WORK_TYPE',
            payload: data
        })
    }
    
    const getSalaryCriteria = (data) => {
        dispatchFilterData({
            type: 'SALARY',
            payload: data
        })
    }
    
    useEffect( () => {
        onSaveFiltersData(filterData)
    }, [filterData])
    
   return (
       <FilterContext.Provider value={{
           isChecked : isByDefaultChecked
       }}>
       <aside className={styles['sidebar']}>
           { 
               !queryParams.get('category') &&
               <React.Fragment>
                   <CategoriesFilter onSaveCriteria={getCategoriesCriteria} />
                   <SeparationLine/>
               </React.Fragment>
           }
            <SeniorityFilter onSaveCriteria={getSeniorityCriteria} />
            <SeparationLine/>
            <WorkTypeFilter onSaveCriteria={getWorkTypeCriteria} />
            <SeparationLine/>
            <SalaryFilter onSaveCriteria={getSalaryCriteria} />
       </aside>
       </FilterContext.Provider>
   )
}

export default Sidebar;