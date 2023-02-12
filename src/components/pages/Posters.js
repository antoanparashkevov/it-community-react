import styles from './Posters.module.css'
import { AiOutlineSearch } from "react-icons/ai";
//components
import Sidebar from "../layout/filters/Sidebar";
import BaseCard from "../UI/BaseCard";
import PosterItem from "../applying/PosterItem";

const Posters = () => {
    let posters = [1,2,3,4]
    return (
        <section className={styles['posters_container']}>
            <BaseCard className={styles['posters_filters_wrapper']}>
                <Sidebar />
            </BaseCard>
            <div className={styles['posters_wrapper']}>
                <BaseCard className={styles['posters_list_container']}>
                    <div className={styles['posters_search_wrapper']}>
                        <AiOutlineSearch />
                        <input
                            type="text"
                            id='search'
                            name='search'
                            placeholder='Search for jobs...'
                            className={styles['posters_search_input']}
                        />
                    </div>
                    <div className={styles['posters_list_wrapper']}>
                        <div className={styles['posters_list_loop']}>
                            { posters.map( (item, index) => 
                              <PosterItem key={index} />
                            ) }
                        </div>
                    </div>
                </BaseCard>
            </div>
        </section>
    )
}

export default Posters