import React from "react";
import ReactDom from 'react-dom';
import styles from './BaseDialog.module.scss';

//UI components
import { RoundedButton } from "./BaseButton";
import { getAuthToken } from "../../util/auth";

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

const ModalOverlay = ({ children, title, fixed, tryClose, activateMoreActions, show, crud }) => {
    let token = getAuthToken();
    
    return (
        <React.Fragment>
            { show && <dialog open className={styles['dialog']}>
                <header className={styles['dialog_header']}>
                    <h2>{title}</h2>
                </header>
                <section className={styles['dialog_section']}>{children}</section>
                { fixed === false &&
                    <React.Fragment>
                        { token !== 'EXPIRED' && token && 
                            <menu className={styles['dialog_menu']}>
                                <RoundedButton onClick={tryClose}>Close</RoundedButton>
                            </menu>
                        }
                        { activateMoreActions && crud &&
                            <menu className={styles['dialog_menu']}>
                                <RoundedButton>Delete</RoundedButton>
                                <RoundedButton>Edit</RoundedButton>
                            </menu>
                        }
                    </React.Fragment>
                }
                { token === 'EXPIRED' || !token &&
                    <menu className={styles['dialog_menu']}>
                        <RoundedButton onClick={() => window.location.reload()}>Reload</RoundedButton>
                    </menu>
                }
                
            </dialog> }
        </React.Fragment>
    )
}

const BaseDialog = ({ title, children, fixed, activateMoreActions, onCloseDialog, show, crud }) => {
    
    const tryClose = () => {
        onCloseDialog(show = false)
    }
    
    return (
        <React.Fragment>
            {ReactDom.createPortal(<Backdrop tryClose={tryClose} show={show} />, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay
                title={title}
                activateMoreActions={activateMoreActions}
                fixed={fixed}
                show={show}
                tryClose={tryClose}
                crud={crud}
                children={children}
            />,
            document.getElementById('overlay-root')
            )}
        </React.Fragment>        
    )
}

export default BaseDialog;