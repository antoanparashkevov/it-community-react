import styles from './Sidebar.module.css'

//import UI components
import SeparationLine from "../../UI/SeparationLine";

//import filter components
import CategoriesFilter from "./CategoriesFilter";
import SeniorityFilter from "./SeniorityFilter";
import SalaryFilter from "./SalaryFilter";
import WorkTypeFilter from "./WorkTypeFilter";

const Sidebar = () => {
   return ( <aside className={styles['sidebar']}>
        <div className={styles['sidebar_filters']}>
            <CategoriesFilter />
            <SeparationLine/>
            <SeniorityFilter />
            <SeparationLine/>
            <SalaryFilter />
            <SeparationLine/>
            <WorkTypeFilter />
            <SeparationLine/>
        </div>
    </aside>
   )
}

export default Sidebar;