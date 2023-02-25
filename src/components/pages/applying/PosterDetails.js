import styles from './PosterDetails.module.css'
import { useParams } from "react-router-dom";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import { SquareButton } from "../../UI/BaseButton";
import { RemoteBadge, WorkCategoryBadge1, WorkCategoryBadge2, WorkCategoryBadge3 } from "../../UI/BaseBadge";

const PosterDetails = () => {
    //every param segment
    const paramsObject = useParams();
    
    return (
        <section className={`${styles['job-details-wrapper']} container`}>
            <p>Poster id {paramsObject.posterId}</p>
            <header className={styles['job-item-wrapper']}>
                <BaseCard className={styles['job-item-container']}>
                    <div className={styles['job-item-header-applying-btn']}>
                        <h1 className={styles['job-item-header-title']}>Senior .NET</h1>
                        <SquareButton>Apply now</SquareButton>
                    </div>
                    <RemoteBadge $mode='one_item'>Remote</RemoteBadge>
                </BaseCard>
            </header>
            
            <div className={styles['job-info-wrapper']}>
                
                <BaseCard className={styles['job-info-badge-wrapper']}>
                        <WorkCategoryBadge1 $mode='one_item'>Badge 1</WorkCategoryBadge1>
                        <WorkCategoryBadge2 $mode='one_item'>Badge 2</WorkCategoryBadge2>
                        <WorkCategoryBadge3 $mode='one_item'>Badge 3</WorkCategoryBadge3>
                </BaseCard>
                
                <BaseCard className={styles['job-info-desc-wrapper']}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aut autem culpa
                            cumque eligendi et facilis fugit ipsam magni maiores nesciunt numquam quod quos recusandae
                            sequi sint totam veritatis.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Asperiores blanditiis debitis dignissimos dolores ea eligendi enim eos ex illo, laborum,
                            nesciunt odio quod quos reiciendis repudiandae similique temporibus ullam. Commodi.</p>
                </BaseCard>
            </div>
            
            <aside className={styles['sidebar-wrapper']}>
                <BaseCard className={styles['sidebar_container']}>
                    <div className={styles['sidebar_company_logo']}>
                        <img src="https://dev.bg/wp-content/uploads/2019/12/anthill_logo_rgb_dev_new-260x106.png" alt="Company Logo"/>
                    </div>
                    <div className={styles['sidebar_company_desc']}>
                        <p className={styles['sidebar_company_desc_para']}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad aliquid delectus
                            dignissimos dolorem doloremque doloribus eaque excepturi, exercitationem illum ipsa modi
                            necessitatibus numquam quas, quis quos, ratione similique ullam.</p>
                    </div>
                </BaseCard>
            </aside>
        </section>
    )
}

export default PosterDetails;