import React from "react";
import ReactDom from 'react-dom';
import styles from './BaseDialog.module.scss';

//UI components
import { RoundedButton } from "./BaseButton";

const Backdrop = ({ tryClose }) => {
    return <div
        onClick={tryClose}
        className={styles['backdrop']}
    ></div>
}

const ModalOverlay = ({ children, title, fixed, tryClose, activateMoreActions }) => {
    //TODO fix the close dialog
    return (
        <dialog open className={styles['dialog']}>
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
        </dialog>
    )
}

const BaseDialog = ({ title, children, fixed, activateMoreActions, onCloseDialog }) => {
    
    const tryClose = () => {
        onCloseDialog(false)
    }
    
    return (
        <React.Fragment>
            {ReactDom.createPortal(<Backdrop tryClose={tryClose} />, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay
                title={title}
                fixed={fixed}
                activateMoreActions={activateMoreActions}
                tryClose={tryClose}
                children={children}
            />,
            document.getElementById('overlay-root')
            )}
        </React.Fragment>        
    )
}

export default BaseDialog;