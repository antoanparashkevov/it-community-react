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
            <CategoriesFilter />
            <SeparationLine/>
            <SeniorityFilter />
            <SeparationLine/>
            <WorkTypeFilter />
            <SeparationLine/>
            <SalaryFilter />
    </aside>
   )
}

export default Sidebar;