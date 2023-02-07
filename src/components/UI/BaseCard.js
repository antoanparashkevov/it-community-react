import styles from './BaseCard.module.css'

const BaseCard = (props) => {
    return (<div className={styles.card}>{ props.children }</div>)
}

export default BaseCard;