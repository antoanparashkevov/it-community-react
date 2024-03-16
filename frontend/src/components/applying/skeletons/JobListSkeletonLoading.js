import styles from './JobListSkeletonLoading.module.scss';
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const JobListSkeletonLoading = ( {rows} ) => {
    const { width: windowWidth} = useWindowDimensions();
    let defaultRows = rows || [ 1,2,3,4,5 ];
    
    return (
        <div className={styles['posters_list_skeleton_loading_root']}>
            {
                windowWidth > 744 ?
                    <div className={styles['sidebar_skeleton_loading_container']}></div>
                    :
                    null
            }
            <div className={styles['posters_list_skeleton_loading_container']}>
                {
                    windowWidth <= 744 ?
                        <div className={styles['filters_btn_loading_container']}></div>
                        :
                        null
                }
                {
                    defaultRows.map(n => {
                        return (
                            <div className={styles['event_container']} key={n}></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default JobListSkeletonLoading;