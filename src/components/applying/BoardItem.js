import styles from "./BoardItem.module.css";
import { RoundedLink } from "../UI/BaseLinks";
import React from "react";

//components
import SubcategoryBadge from "./SubcategoryBadge";

const BoardItem = () => {
    let array = [1,2,3,4]
    
    
    return ( <article className={styles['homepage_category']}>

        <section className={styles['homepage_category_header']}>

            <div className={styles['homepage_category_title_wrapper']}>
                <h1 className={styles['homepage_category_title']}>BACKEND DEVELOPMENT</h1>
            </div>

            <div className={styles['homepage_category_counter_wrapper']}>
                <h1 className={styles['homepage_category_counter']}>1234</h1>
            </div>
        </section>

        <section className={styles['homepage_category_main']}>

            <div className={styles['homepage_category_main_wrapper']}>
                {array.map((item, index)=> 
                    <SubcategoryBadge key={index}/>
                )}
            </div>

            <div className={styles['homepage_category_show_all_btn_wrapper']}>
                <RoundedLink
                    to='/posters'
                >
                    Show all
                </RoundedLink>
            </div>
        </section>
    </article>)
}

export default BoardItem;