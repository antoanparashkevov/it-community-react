import { Link } from "react-router-dom";
import styles from "../applying/PosterItem.module.css";

const PosterItem = (props) => {
    return (
        <Link to='/' className={styles['poster_list_item']}>
            <div className={styles['left_company_logo']}>
                <img width='60' height='60' src="https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/60b5e3f25f9a6_json_image_1622533106.webp" alt="Logo"/>
            </div>
            <div className={styles['right_company_info']}>
                <header className={styles['company_info_header']}>
                    <h1 className={styles['company_info_name']}>Full-Stack Developer</h1>
                    <time className={styles['company_info_date']}>10.Feb</time>
                </header>
                <section className={styles['company_info_additional_info']}>
                    <div className={styles['company_info_city_wrapper']}>
                        <address className={styles['company_info_city']}>Sofia city</address>
                    </div>
                    <div className={styles['company_info_country_wrapper']}>
                        <span>1200$</span>
                    </div>
                {/*    TODO ADD RIGHT ARROW */}
                </section>
            </div>
        </Link>
    )    
}

export default PosterItem

