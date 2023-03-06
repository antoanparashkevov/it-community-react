import styles from './DataSelectorWrapper.module.scss';
import React, { useState } from "react";

//UI components
import Arrow from "./BaseArrow";

const DataSelectorWrapper = ( { initialPlaceholderValue, selectorData, closeOnHover } ) => {
    const [isSelectorClicked, setIsSelectorClicked] = useState(false);
    
    const expandCollapseSelector = () => {
        console.log('expand/collapse functionality triggered')
        setIsSelectorClicked( (prevState) => {
            return !prevState;
        })
    }
    
    const switchData = () => {
        console.log('switch data triggered!')
    }
    
    const hoverToClose = () => {
        
        if( closeOnHover ) {
            setIsSelectorClicked(false)
        }
    }
    
    return (
        <div 
            className={`${styles['data_selector_root']} ${isSelectorClicked ? styles['data_selector_opened'] : ''}`}
            onMouseLeave={hoverToClose}
        >
            
            <div
                className={styles['data_selector_container']}
                onClick={expandCollapseSelector}
                onKeyUp={expandCollapseSelector}
            >
                <span className={styles['data_selector_text']}>{initialPlaceholderValue}</span>
                <Arrow $rotate={isSelectorClicked} width='10px' height='5px'/>
            </div>

            {isSelectorClicked &&
                <ul className={styles['data_selector_list']} role='list'>
                    {selectorData.map( (i) => {
                        return (
                            <li 
                                className={styles['data_selector_list_item']}
                                onClick={switchData}
                                key={i.code}
                            >
                                    {i.displayName}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default DataSelectorWrapper;