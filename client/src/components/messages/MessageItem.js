import styles from './MessageItem.module.css'

const MessageItem = ({message}) => {
    const emailLink = () => {
        return 'mailto:' + message.email
    }
    return (
        <li className={styles['message_item']}>
            <header className={styles['message_header']}>
                <h1>{message.fullName}</h1>
            </header>
            <div className={styles['message_content']}>
                <div className={styles['message_mail']}>
                    <a href={emailLink()}>{message.email}</a>
                </div>
                <div className={styles['message_msg']}>
                    {message.message}
                </div>
            </div>
        </li>
    )
}

export default MessageItem;