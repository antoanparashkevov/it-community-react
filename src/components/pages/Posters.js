import styles from './Posters.module.css'
// import { AiOutlineSearch } from "react-icons/ai";
//components
import Sidebar from "../layout/filters/Sidebar";
import BaseCard from "../UI/BaseCard";
import PosterItem from "../applying/PosterItem";

const Posters = () => {
    let posters = [1,2,3,4]
    return (
        <section className={styles['posters_container']}>
            {/*TODO set hide prop dynamically*/}
            <BaseCard hide={false}>
                <Sidebar />
            </BaseCard>
            <div className={styles['posters_wrapper']}>
                <div className={styles['posters_list_wrapper']}>
                    { posters.map( (item, index) => 
                      <PosterItem key={index} />
                    ) }
                </div>
            </div>
        </section>
    )
}

export default Posters