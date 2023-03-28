import React from "react";
import ReactDOM from "react-dom";
import styles from './BaseSpinnerAlt.module.scss';
import { Backdrop } from "./BaseDialog";

const BaseSpinnerAlt = () => {
    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(
                    <Backdrop show />, 
                    document.getElementById('backdrop-root')
                )
            }
            <div className={styles['base_spinner_alt_root']}></div>,
        </React.Fragment> 
    )
}

export default BaseSpinnerAlt;