import styles from "./BoardItem.module.css";
import { RoundedLink } from "../UI/BaseLinks";
import React from "react";

//components
import SubcategoryBadge from "./SubcategoryBadge";

//UI components
import { CounterBadge } from "../UI/BaseBadge";

const BoardItem = ({category}) => {
    
    return ( <article className={styles['homepage_category']}>

        <section className={styles['homepage_category_header']}>

            <div className={styles['homepage_category_title_wrapper']}>
                <h1 className={styles['homepage_category_title']}>{ category.title }</h1>
            </div>

            <CounterBadge $mode='one_item' className={styles['homepage_category_main_counter']}>
                <h1 className={styles['homepage_category_counter']}>{ category.counter }</h1>
            </CounterBadge>
        </section>

        <section className={styles['homepage_category_main']}>

            <div className={styles['homepage_category_main_wrapper']}>
                {category['subCategories'].map((subcategory, index)=> 
                    <SubcategoryBadge key={index} subcategory={subcategory}/>
                )}
            </div>

            <div className={styles['homepage_category_show_all_btn_wrapper']}>
                <RoundedLink
                    to={ `posters?category=${category.code}&page=1` }
                >
                    Show all
                </RoundedLink>
            </div>
        </section>
    </article>)
}

export default BoardItem;