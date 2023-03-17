import styles from './Pagination.module.scss';
import { useState } from "react";

const Pagination = ( { jobsPerPage, totalJobs, onHandleCurrentPage } ) => {
    const pageNumbers = [];
    const [clickedPage, setClickedPage] = useState(1)
    
    for( let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++ ) {
        pageNumbers.push(i);//if we have 11 jobs, and jobs per page are 5, we will push 1,2,3, because 11/5 = 2.2. Math ceil always round up
    }
    
    const changePage = (clickedPage) => {
        setClickedPage(clickedPage);
        onHandleCurrentPage(clickedPage)
    }
    
    return (
        <div className={styles['pagination_root']}>
            <ul className={styles['pagination_list']} role='list'>
                { pageNumbers.map( p => (
                    <li className={`${styles['pagination_item']} ${clickedPage === p ? styles['pagination_item_active'] : ''}`} key={p} onClick={() => changePage(p)}>
                        <div>{p}</div>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default Pagination;