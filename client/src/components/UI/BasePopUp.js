import { createPortal } from "react-dom";
import styles from './BasePopUp.module.scss';
import React from "react";


const PopUpContainer = ({ children}) => {
    return (
        <div className={styles['pop_up_root']}>
            <span>{children}</span>
        </div>
    )
}


const BasePopUp = ({children}) => {
    return (
        <React.Fragment>
            { createPortal(
                <PopUpContainer
                    children={children}
                    
                />,
                document.getElementById('overlay-root')
            ) }
        </React.Fragment>
    )
}

export default BasePopUp;