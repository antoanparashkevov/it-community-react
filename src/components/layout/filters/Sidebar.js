import styles from './Sidebar.module.css'
import BaseButton from "../../UI/BaseButton";
import SeparationLine from "../../UI/SeparationLine";

//import filters
import CategoriesFilter from "./CategoriesFilter";
import SeniorityFilter from "./SeniorityFilter";
import SalaryFilter from "./SalaryFilter";
import WorkTypeFilter from "./WorkTypeFilter";

const Sidebar = () => {
   return ( <aside className={styles['sidebar']}>
        <div className={styles['sidebar_wrapper']}>
            <BaseButton link={false} type='button' mode='square'>CLEAR</BaseButton>
            <div className={styles['sidebar_filters']}>
                <CategoriesFilter />
                <SeparationLine/>
                <SeniorityFilter />
                <SalaryFilter />
                <WorkTypeFilter />
            </div>
        </div>
    </aside>
   )
}

export default Sidebar;