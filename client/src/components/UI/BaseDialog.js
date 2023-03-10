import React from "react";
import ReactDom from 'react-dom';
import styles from './BaseDialog.module.scss';

//UI components
import { RoundedButton } from "./BaseButton";

const Backdrop = ({ tryClose, show }) => {
    return (
        <React.Fragment>
            { show && <div
                onClick={tryClose}
                className={styles['backdrop']}
            ></div> }
        </React.Fragment>
    )
}

const ModalOverlay = ({ children, title, fixed, tryClose, activateMoreActions, show }) => {
    return (
        <React.Fragment>
            { show && <dialog open className={styles['dialog']}>
                <header className={styles['dialog_header']}>
                    <h2>{title}</h2>
                </header>
                <section className={styles['dialog_section']}>{children}</section>
                { fixed === false && <menu className={styles['dialog_menu']}>
                    <RoundedButton onClick={tryClose}>Close</RoundedButton>
                </menu> }
                { fixed === false && activateMoreActions &&
                    <menu className={styles['dialog_menu']}>
                        {/*TODO add modes to the Basic Button component and use them here*/}
                        <RoundedButton>Delete</RoundedButton>
                        <RoundedButton>Edit</RoundedButton>
                    </menu>
                }
            </dialog> }
        </React.Fragment>
    )
}

const BaseDialog = ({ title, children, fixed, activateMoreActions, onCloseDialog, show }) => {
    
    const tryClose = () => {
        onCloseDialog(show = false)
    }
    
    return (
        <React.Fragment>
            {ReactDom.createPortal(<Backdrop tryClose={tryClose} show={show} />, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay
                title={title}
                fixed={fixed}
                activateMoreActions={activateMoreActions}
                tryClose={tryClose}
                show={show}
                children={children}
            />,
            document.getElementById('overlay-root')
            )}
        </React.Fragment>        
    )
}

export default BaseDialog;