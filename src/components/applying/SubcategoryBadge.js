import styles from "./SubcategoryBadge.module.css";
import React from "react";

//UI components
import { Badge } from "../UI/BaseBadge";

const SubcategoryBadge = () => {
    return (
        <Badge $mode='multiple_items'>
            <span className={styles['homepage_category_subcategory_title']}>Java</span>
            <Badge $mode='one_item_small' bgColor='#DBE4C7' className={styles['homepage_category_subcategory_counter_wrapper']}>
                <h1 className={styles['homepage_category_subcategory_counter']}>1234</h1>
            </Badge>
        </Badge>
    )
}

export default SubcategoryBadge