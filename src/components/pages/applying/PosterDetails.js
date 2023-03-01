import styles from './PosterDetails.module.scss'
import { json, Link, useParams, useRouteLoaderData } from "react-router-dom";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import { SquareButton } from "../../UI/BaseButton";
import { RemoteBadge, WorkCategoryBadge1, WorkCategoryBadge2, WorkCategoryBadge3 } from "../../UI/BaseBadge";
import { useEffect, useState } from "react";

const PosterDetails = () => {
    //every param segment
    const paramsObject = useParams();
    const [job, setJob] = useState({
        jobName: 'Full-Stack Developer',
        workType: ['office', 'remote'],
        date: '15-02-2022',
        category: ['FullStack', 'Frontend'],
        subCat: ['.NET', 'Vue'],
        seniority: 'senior',
        salary: 2000,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aut autem culpa\n' +
            '                            cumque eligendi et facilis fugit ipsam magni maiores nesciunt numquam quod quos recusandae\n' +
            '                            sequi sint totam veritatis.Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
            '                            Asperiores blanditiis debitis dignissimos dolores ea eligendi enim eos ex illo, laborum,\n' +
            '                            nesciunt odio quod quos reiciendis repudiandae similique temporibus ullam. Commodi.',
        location:  {
        country: 'Bulgaria',
            city: 'Sofia'
        }
    })
    const [company, setCompany] = useState({
        name: 'Onthill',
        desc: 'Lorem ipsum dolor sit amet.',
        foundationYear: 2022,
        employees: 102
    })
    const data = useRouteLoaderData('poster-details');
    
    
    useEffect( () => {
        console.log('Data from Poster Details component >>> ', data)
    }, [])
    
    return (
        <section className={`${styles['job_details_wrapper']} container`}>
            <header className={styles['job_item_wrapper']}>
                <BaseCard className={styles['job_item_container']}>
                    <div className={styles['job_item_header_applying_btn']}>
                        <h1 className={styles['job_item_header_title']}>{ job.jobName }</h1>
                        <SquareButton as={Link} to='apply'>Apply now</SquareButton>
                    </div>
                    <div className={styles['job_item_work_type_badges']}>
                        {job.workType.map((type, index)=> {
                            return (
                                <RemoteBadge $mode='one_item' className={styles['remote_badge']} key={index}>{ type }</RemoteBadge>
                            )
                        })}
                    </div>
                </BaseCard>
            </header>
            
            <div className={styles['job_info_wrapper']}>
                
                <BaseCard className={styles['job_info_badge_wrapper']}>
                    {job.subCat.map((category, index) => 
                        <WorkCategoryBadge1 $mode='one_item' key={index}>{category}</WorkCategoryBadge1>
                    )}
                </BaseCard>
                
                <BaseCard className={styles['job_info_desc_wrapper']}>
                        <p>{job.desc}</p>
                </BaseCard>
            </div>
            
            <aside className={styles['sidebar_wrapper']}>
                <BaseCard className={styles['sidebar_container']}>
                    <div className={styles['sidebar_company_logo']}>
                        <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                    </div>
                    <div className={styles['sidebar_company_title']}>
                        <p className={styles['sidebar_company_desc_para']}>{ company.name }</p>
                    </div>
                    <div className={styles['sidebar_company_desc']}>
                        <p className={styles['sidebar_company_desc_para']}>{ company.desc }</p>
                    </div>
                </BaseCard>
            </aside>
        </section>
    )
}

export default PosterDetails;

export const loader = async ({request, params}) => {
    const response = await fetch('https://swapi.dev/api/people/' + params['posterId'])
    
    if( !response.ok ) {
        throw json( 
            { message: 'Could not fetch the poster details!' },
            { status: 500 }    
        )
    } else {
        const data = await response.json();
        return data.name;
    }
}