import styles from "./SubcategoryBadge.module.css";
import React from "react";

const SubcategoryBadge = () => {
    return (
        <div className={styles['homepage_category_subcategory_wrapper']}>

            <span className={styles['homepage_category_subcategory_title']}>Java</span>

            <div className={styles['homepage_category_subcategory_counter_wrapper']}>
                <h1 className={styles['homepage_category_subcategory_counter']}>1234</h1>
            </div>
        </div>
    )
}

export default SubcategoryBadge