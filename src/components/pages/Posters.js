import styles from './Posters.module.css'
import { Link } from "react-router-dom";

//components
import BaseButton from "../UI/BaseButton";
import BaseCard from "../UI/BaseCard";

const Posters = () => {
    let posters = [1,2,3,4]
    return (
        <section className={styles['posters_container']}>
            <BaseCard>
                <aside className={styles['posters_filters']}>
                    ASIDE
                </aside>
            </BaseCard>
            <div className={styles['posters_wrapper']}>
                <BaseCard className={styles['posters_search_bar']}>
                    <input type="search" placeholder='Search...'/>
                    <BaseButton link={false} type='button' mode='outline'>Search</BaseButton>
                </BaseCard>
                <BaseCard className={styles['posters_list_container']}>
                    <div className={styles['posters_list_wrapper']}>
                        <div className={styles['posters_list_loop']}>
                            { posters.map( (item, index) => 
                               <Link to='/' className={styles['poster_list_item']} key={index}>
                                   <div className={styles['left_company_logo']}>LOGO</div>
                                   <div className={styles['right_company_info']}>INFO</div>
                               </Link>
                            ) }
                        </div>
                    </div>
                </BaseCard>
            </div>
        </section>
    )
}

export default Posters