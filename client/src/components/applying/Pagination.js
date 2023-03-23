import styles from './Pagination.module.scss';
import { useSearchParams } from "react-router-dom";

const Pagination = ( { jobsPerPage, totalJobs, onHandleCurrentPage } ) => {
    const pageNumbers = [];
    const [queryParams, setQueryParams] = useSearchParams()
    for( let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++ ) {
        pageNumbers.push(i);//if we have 11 jobs, and jobs per page are 5, we will push 1,2,3, because 11/5 = 2.2. Math ceil always round up
    }
    
    const changePage = (clickedPage) => {
        onHandleCurrentPage(clickedPage)

        window.scroll({
            top: 100,
            behavior: "smooth",
        });
        
        if ( queryParams.get('category') ) {
            setQueryParams(prev => {
                return {
                    ...prev,
                    category: queryParams.get('category'),
                    page: clickedPage
                }
            })
        } else {
            setQueryParams(prev => {
                return {
                    ...prev,
                    page: clickedPage
                }
            })
        }
        
        
    }
    
    
    return (
        <div className={styles['pagination_root']} id='pagination-root'>
            <ul className={styles['pagination_list']} role='list'>
                { pageNumbers.map( p => (
                    <li className={`${styles['pagination_item']} ${ Number(queryParams.get('page')) === p ? styles['pagination_item_active'] : ''}`} key={p} onClick={() => changePage(p)}>
                        <div>{p}</div>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default Pagination;