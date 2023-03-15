import styles from './JobListSkeletonLoading.module.scss';

const JobListSkeletonLoading = ( {rows} ) => {
    let defaultRows = rows || [ 1,2,3,4,5 ];
    
    return (
        <div className={styles['posters_list_skeleton_loading_root']}>
            <div className={styles['posters_list_skeleton_loading_container']}>
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