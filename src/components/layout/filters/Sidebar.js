import styles from './Sidebar.module.css'
import { useEffect, useState } from "react";

//import UI components
import SeparationLine from "../../UI/SeparationLine";

//import filter components
import CategoriesFilter from "./CategoriesFilter";
import SeniorityFilter from "./SeniorityFilter";
import SalaryFilter from "./SalaryFilter";
import WorkTypeFilter from "./WorkTypeFilter";

const Sidebar = ({onSaveFiltersData}) => {
    let [allFilterCriteria, setAllFilterCriteria] = useState({
        categories : [],
        seniority: {},
        workType: {},
        salary: true
    })
    
    
    const getCategoriesCriteria = (data) => {
        setAllFilterCriteria(Object.assign({}, allFilterCriteria, {categories : data}))
    }
    
    const getSeniorityCriteria = (data) => {
        setAllFilterCriteria(Object.assign({}, allFilterCriteria, {seniority : data}))
    }
    
    useEffect( () => {
       onSaveFiltersData(allFilterCriteria)
    }, [allFilterCriteria])
    
   return (
       <aside className={styles['sidebar']}>
            <CategoriesFilter onSaveCriteria={getCategoriesCriteria} />
            <SeparationLine/>
            <SeniorityFilter onSaveCriteria={getSeniorityCriteria} />
            <SeparationLine/>
            <WorkTypeFilter />
            <SeparationLine/>
            <SalaryFilter />
       </aside>
   )
}

export default Sidebar;