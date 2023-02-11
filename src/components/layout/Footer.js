import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div className={styles['footer']}>
            <header className={styles['footer_header']}>
                <span className={styles['footer_header_circle']}></span>
                <h1>IT-COMMUNITY</h1>
            </header>
            <section className={styles['footer_column']}>
                <span className={styles['bar']}></span>
                <div className={styles['footer_column_content']}>
                    <h1>FOR US</h1>
                </div>
            </section>
            <section className={styles['footer_column']}>
                <span className={styles['bar']}></span>
                <div className={styles['footer_column_content']}>
                    <h1>JOBS</h1>
                </div>
            </section>
            <section className={styles['footer_column']}>
                <span className={styles['bar']}></span>
                <div className={styles['footer_column_content']}>
                    <h1>FOLLOW US</h1>
                    <div className={styles['footer_column_media_icons']}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer;