import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import styles from './Sidebar.module.css'

//import UI components
import SeparationLine from "../../UI/SeparationLine";
import { CloseBar } from "../TheHeader";

//import filter components
import CategoryFilter from "./CategoryFilter";
import SeniorityFilter from "./SeniorityFilter";
import SalaryFilter from "./SalaryFilter";
import WorkTypeFilter from "./WorkTypeFilter";

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

const Sidebar = ({onSaveFiltersData, onCloseSidebar, fullScreen}) => {
    const location = useLocation();
    
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
       <aside className={`${styles['sidebar']} ${fullScreen ? styles['sidebar_full'] : ''}`}>
           { fullScreen &&
               <div className={styles['close_bar_btn_wrapper']} onClick={() => onCloseSidebar()}>
                   <div className={styles['close_bar_btn']}>
                       <CloseBar />
                       <CloseBar />
                   </div>
               </div>
           }
            <CategoryFilter onSaveCriteria={getCategoriesCriteria} fullScreen={fullScreen} />
           {
               location.search.includes('?category=') === false ?
                    <SeparationLine/> :
                    null
           }
            <SeniorityFilter onSaveCriteria={getSeniorityCriteria} fullScreen={fullScreen} />
            <SeparationLine/>
            <WorkTypeFilter onSaveCriteria={getWorkTypeCriteria} fullScreen={fullScreen} />
            <SeparationLine/>
            <SalaryFilter onSaveCriteria={getSalaryCriteria} fullScreen={fullScreen} />
       </aside>
   )
}

export default Sidebar;