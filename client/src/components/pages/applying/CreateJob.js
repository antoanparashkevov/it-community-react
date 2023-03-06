import styles from './CreatePoster.module.scss';

//components
import CreateJobForm from "../../applying/CreateJobForm";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";
import React from "react";

const CreateJob = () => {
    return (
        <section className={styles['create_poster_wrapper']}>
            <BaseCard className={styles['create_poster_container']}>
                <h1 className={styles['create_poster_header']}>
                    Post a job
                </h1>
                <SeparationLine max-width='300px' />
                <CreateJobForm />
            </BaseCard>
        </section>
    )
}

export default CreateJob;