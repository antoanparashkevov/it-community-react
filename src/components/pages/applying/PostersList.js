import styles from './PostersList.module.css'

//hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";

//components
import Sidebar from "../../layout/filters/Sidebar";
import { BaseCard } from "../../UI/BaseCard";
import PosterItem from "../../applying/PosterItem";

//UI components

const PostersList = () => {
    const { width: windowWidth } = useWindowDimensions()
    
    let posters = [1,2,3,4]
    
    return (
        <section className={`${styles['posters_container']} container`}>
            {/*TODO set hide prop dynamically*/}
            <BaseCard hide={windowWidth <= 744} className={styles['aside_wrapper']}>
                <Sidebar />
            </BaseCard>
            <div className={styles['posters_list_wrapper']}>
                { posters.map( (item, index) => 
                  <PosterItem key={index} />
                ) }
            </div>
        </section>
    )
}

export default PostersList