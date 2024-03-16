import styles from './Messages.module.scss';
import React, { useContext, useEffect, useState } from "react";

//components
import MessageItem from "../../messages/MessageItem";

//UI components
import { BaseCard } from "../../UI/BaseCard";
import SeparationLine from "../../UI/SeparationLine";

//hooks
import useHttp from "../../../hooks/use-http";
import BaseDialog from "../../UI/BaseDialog";
import BaseSpinner from "../../UI/BaseSpinner";

//context
import AuthContext from "../../../store/auth-context";
import {Navigate, useLocation} from "react-router-dom";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const authData = useContext(AuthContext);
    const location = useLocation();
    const { isLoading, error, resetError, sendRequest } = useHttp()

    const fetchMessages = async () => {
        await sendRequest(`/applicationData/applications/${authData.userData._id}`, 'GET', handleResponse);
    }

    useEffect( () => {
        fetchMessages()
    }, []);

    const handleResponse = (data) => {
        setMessages(data.applicationItems);
    }
    
    if (
        (
            authData && authData.userData.hasData === false
        ) ||
        (
            authData.userData.hasData === true && authData.userData.roles.includes('company') === false
        )
    ) {
        return <Navigate to='/auth?mode=login' replace state={ { from: location } }></Navigate>
    }
    
    return (
        <AuthContext.Consumer>
            {
                (ctx) => {
                    return (
                        <React.Fragment>
                            {error &&
                                <BaseDialog fixed={false} show={!!error} title='Something went wrong with the authentication process' onCloseDialog={resetError}>
                                    {error}
                                </BaseDialog>
                            }
                            <section className={styles['messages_container']}>
                                <BaseCard className={styles['messages_wrapper']}>
                                    <h1 className={styles['messages_title']}>Incoming messages</h1>
                                    <SeparationLine />
                            {
                                isLoading ?
                                    <BaseSpinner />
                                    :
                                        <ul role='list' className={styles['messages_list']}>
                                            { messages && messages.length > 0 && messages.map((m, index) => {
                                                return <MessageItem message={ m } key={ index }/>
                                            }) }
                                            { messages && messages.length === 0 && <h1>You don't have any messages!</h1> }
                                        </ul>
                            }
                                </BaseCard>
                            </section>
                        </React.Fragment>
                    )
                }
            }
        </AuthContext.Consumer>
       
    )
}

export default Messages