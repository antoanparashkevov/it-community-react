import styles from './DataSelectorWrapper.module.scss';
import React, { useState } from "react";

//UI components
import Arrow from "./BaseArrow";

const DataSelectorWrapper = ( { initialPlaceholderValue, selectorData, closeOnHover, onResubForNewData } ) => {
    const [isSelectorClicked, setIsSelectorClicked] = useState(false);
    
    const expandCollapseSelector = () => {
        
        setIsSelectorClicked( (prevState) => {
            return !prevState;
        })
    }
    
    const switchData = ( code, value) => {
        setIsSelectorClicked((prevState) => !prevState);
        
        onResubForNewData({
            valueCode: code,
            value
        })
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
                    {selectorData.map( (valueObject) => {
                        return (
                            <li 
                                className={`
                                    ${styles['data_selector_list_item']} 
                                    ${initialPlaceholderValue === valueObject.title ? styles['selected_item'] : ''}
                                `}
                                onClick={switchData.bind(this, valueObject.code, valueObject.title)}
                                key={valueObject.code}
                            >
                                    {valueObject.title}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default DataSelectorWrapper;