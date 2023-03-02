import styles from './Footer.module.css'
import { FaFacebookF, FaFigma } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    const iconStyles = { fontSize : '1.5rem', cursor : 'pointer' }
    
    const mediaIconLinkHandle = (type) => {
        if(type === 'facebook') {
            window.open(
            'https://www.facebook.com', '_blank'
            )
        } else if (type === 'figma') {
            window.open(
            'https://www.figma.com/file/tqyxHF9RfEQyLEMCzFDvhz/it-community?node-id=0%3A1&t=aMygcTotAwnmsg49-0', 
            '_blank'
            )
        }
    }
    
    return (
        <div className={ styles['footer'] }>
            <header className={ styles['footer_header'] }>
                <span className={ styles['footer_header_circle'] }></span>
                <h1>IT-COMMUNITY</h1>
            </header>
            <section className={ `${ styles['footer_column'] } ${ styles['footer_column_jobs'] }` }>
                <span className={ styles['bar'] }></span>
                <div className={ styles['footer_column_content'] }>
                    <h1>JOBS</h1>
                    <ul role='list' className={styles['footer_column_jobs']}>
                        <li>
                            <Link to='/posters'>
                                List Jobs
                            </Link>
                        </li>
                        <li>
                            <Link to='/companies'>
                                List Companies
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={ `${ styles['footer_column'] } ${ styles['footer_column_follow_us'] }` }>
                <span className={ styles['bar'] }></span>
                <div className={ styles['footer_column_content'] }>
                    <h1>FOLLOW US</h1>
                    <ul className={ styles['footer_column_media_icons'] } role='list'>
                        <li>
                            <FaFacebookF style={ iconStyles } onClick={mediaIconLinkHandle.bind(this, 'facebook')}/>
                        </li>
                        <li>
                            <FaFigma style={ iconStyles } onClick={mediaIconLinkHandle.bind(this, 'figma')}/>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Footer;