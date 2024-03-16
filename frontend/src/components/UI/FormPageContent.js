import styles from './FormPageContent.module.scss'
import React from "react";

//UI components
import SeparationLine from "./SeparationLine";
import { BaseCard } from "./BaseCard";

const FormPageContent = ({ title, children, className }) => {
    return (
        <section className={`${styles['page_content_wrapper']} ${className}`}>
            <BaseCard className={styles['page_content_container']}>
                {title &&
                   <>
                       <h1 className={styles['page_content_header']}>
                           { title }
                       </h1>
                       <SeparationLine max-width='300px' />
                   </>}
                { children }
            </BaseCard>
        </section>
    )
}

export default FormPageContent