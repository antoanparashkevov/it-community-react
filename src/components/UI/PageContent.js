import React from "react";
import styles from './PageContent.module.css'

const PageContent = ({ title, children }) => {
    return (
        <React.Fragment>
            <section className={styles['content']}>
                <h1>{title}</h1>
                {children}
            </section>    
        </React.Fragment>
    )
} 

export default PageContent