import styles from './Posters.module.css'

//components
import BaseButton from "../UI/BaseButton";
import BaseCard from "../UI/BaseCard";
import PosterItem from "../applying/PosterItem";

const Posters = () => {
    let posters = [1,2,3,4]
    return (
        <section className={styles['posters_container']}>
            <BaseCard className={styles['posters_filters_wrapper']}>
                <aside className={styles['posters_filters']}>
                    ASIDE
                </aside>
            </BaseCard>
            <div className={styles['posters_wrapper']}>
                <BaseCard className={styles['posters_search_bar']}>
                    <input type="search" placeholder='Search...'/>
                    <BaseButton link={false} type='button' mode='square'>Search</BaseButton>
                </BaseCard>
                <BaseCard className={styles['posters_list_container']}>
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