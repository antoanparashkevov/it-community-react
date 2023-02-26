import styles from "./SubcategoryBadge.module.css";
import React from "react";

//UI components
import { Badge } from "../UI/BaseBadge";

const SubcategoryBadge = ({subcategory}) => {
    return (
        <Badge $mode='multiple_items'>
            <span className={styles['homepage_category_subcategory_title']}>{ subcategory.title }</span>
            <Badge $mode='one_item_small' bgColor='#DBE4C7' className={styles['homepage_category_subcategory_counter_wrapper']}>
                <h1 className={styles['homepage_category_subcategory_counter']}>{ subcategory.counter }</h1>
            </Badge>
        </Badge>
    )
}

export default SubcategoryBadge