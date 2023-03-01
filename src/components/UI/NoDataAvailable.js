import styles from './NoDataAvailable.module.scss'

const NoDataAvailable = ({title}) => {
    return (
        <div className={styles['no_data_available_container']}>
            <h1 className={styles['no_data_available_message']}>{title}</h1>
        </div>
    )      
}

export default NoDataAvailable;
