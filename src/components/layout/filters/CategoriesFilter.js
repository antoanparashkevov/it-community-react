import { useState } from "react";
import styles from './CategoriesFilter.module.css'

//import UI components
import CustomCheckbox from "../../UI/CustomCheckbox";
import Label from "../../UI/Label";
import { FilterContentWrapper } from "./FilterContentWrapper";
import { StyledFilterHeaderIconWrapper } from "./FilterHeaderIconWrapper";

const CategoriesFilter = () => {
    const [isExpanded, setIsExpanded] = useState(true)
    
    const checkIsExpanded = (data) =>{
        setIsExpanded(data);
    }
    
    return (
        <FilterContentWrapper>
            <StyledFilterHeaderIconWrapper title={'Selected Categories'} onExpanded={checkIsExpanded} />
            {isExpanded && <div className={styles['categories_form_controls']}>
                <div className={styles['form_control']}>
                    <Label for='frontend'>Frontend</Label>
                    <CustomCheckbox isChecked value={'frontend'} name='frontend' id='frontend' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='backend'>Backend</Label>
                    <CustomCheckbox isChecked value={'backend'} name='backend' id='backend' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='qa'>QA</Label>
                    <CustomCheckbox isChecked value={'qa'} name='qa' id='qa' />
                </div>
                <div className={styles['form_control']}>
                    <Label for='infrastructure'>Infrastructure</Label>
                    <CustomCheckbox isChecked value={'infrastructure'} name='infrastructure' id='infrastructure' />
                </div>
            </div>}
        </FilterContentWrapper>
    )
}

export default CategoriesFilter