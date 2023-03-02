import styles from './Messages.module.scss';

//components
import MessageItem from "../../messages/MessageItem";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";

const Messages = () => {
    let messages = [
        {
            fullName : 'Antoan Parashkevov',
            email : 'antoanparashkevov@gmail.com',
            message : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aut autem culpa cumque eligendi et facilis fugit ipsam magni maiores nesciunt numquam quod quos recusandae sequi sint totam veritatis.Lorem ipsum dolor sit amet'
        },
        {
            fullName : 'Antoan Parashkevov',
            email : 'antoanparashkevov@gmail.com',
            message : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aut autem culpa cumque eligendi et facilis fugit ipsam magni maiores nesciunt numquam quod quos recusandae sequi sint totam veritatis.Lorem ipsum dolor sit amet'
        },
        {
            fullName : 'Antoan Parashkevov',
            email : 'antoanparashkevov@gmail.com',
            message : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aut autem culpa cumque eligendi et facilis fugit ipsam magni maiores nesciunt numquam quod quos recusandae sequi sint totam veritatis.Lorem ipsum dolor sit amet'
        },
        {
            fullName : 'Antoan Parashkevov',
            email : 'antoanparashkevov@gmail.com',
            message : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aut autem culpa cumque eligendi et facilis fugit ipsam magni maiores nesciunt numquam quod quos recusandae sequi sint totam veritatis.Lorem ipsum dolor sit amet'
        },
        
    ]
    return (
        <section className={styles['messages_container']}>
            <BaseCard className={styles['messages_wrapper']}>
                <h1 className={styles['messages_title']}>Incoming messages</h1>
                <SeparationLine />
                <ul role='list' className={styles['messages_list']}>
                    { messages.map((m, index) => {
                        return <MessageItem message={ m } key={ index }/>
                    }) }
                </ul>
            </BaseCard>
        </section>
    )
}

export default Messages