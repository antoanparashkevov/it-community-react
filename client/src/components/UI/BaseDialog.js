import React from "react";
import ReactDom from 'react-dom';
import styles from './BaseDialog.module.scss';

//UI components
import { DeleteButton, RoundedButton } from "./BaseButton";
import { getAuthToken } from "../../util/auth";

export const Backdrop = ({ tryClose, show }) => {
    return (
        <React.Fragment>
            { show && <div
                onClick={tryClose}
                className={styles['backdrop']}
            ></div> }
        </React.Fragment>
    )
}

const ModalOverlay = ({ children, title, fixed, tryClose, show, deleteAction, onDelete }) => {
    let token = getAuthToken();
    
    return (
        <React.Fragment>
            { show && <dialog open className={styles['dialog']}>
                <header className={styles['dialog_header']}>
                    <h2>{title}</h2>
                </header>
                <section className={styles['dialog_section']}>{children}</section>
                { fixed === false && token !== 'EXPIRED' && 
                    <menu className={styles['dialog_menu']}>
                        <RoundedButton onClick={tryClose}>Close</RoundedButton>
                        { deleteAction &&
                            <DeleteButton onClick={() => onDelete(true)}>Delete</DeleteButton>
                        }
                    </menu>
                }
                { token === 'EXPIRED' &&
                    <menu className={styles['dialog_menu']}>
                        <RoundedButton onClick={() => window.location.reload()}>Reload</RoundedButton>
                    </menu>
                }
                
            </dialog> }
        </React.Fragment>
    )
}

const BaseDialog = ({ title, children, fixed, onCloseDialog, show, deleteAction, onDelete }) => {
    
    const tryClose = () => {
        onCloseDialog(show = false)
    }
    
    const handleDeleteAction = (data) => {
        onDelete(data)
    }
    
    return (
        <React.Fragment>
            {ReactDom.createPortal(<Backdrop tryClose={tryClose} show={show} />, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay
                title={title}
                fixed={fixed}
                show={show}
                onDelete={handleDeleteAction}
                tryClose={tryClose}
                deleteAction={deleteAction}
                children={children}
            />,
            document.getElementById('overlay-root')
            )}
        </React.Fragment>        
    )
}

export default BaseDialog;