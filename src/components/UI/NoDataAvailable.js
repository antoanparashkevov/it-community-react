import styles from './NoDataAvailable.module.scss'

const NoDataAvailable = ({children}) => {
    return (
        <div className={styles['no_data_available_container']}>
            <h1 className={styles['no_data_available_message']}>{children}</h1>
        </div>
    )      
}

export default NoDataAvailable;
