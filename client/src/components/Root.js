import React, { useEffect, useRef, useState } from "react";
import { Outlet, useSubmit } from 'react-router-dom'
import styled from "styled-components";

//Components
import TheHeader from "./layout/TheHeader";
import Footer from "./layout/Footer";
import { calculateExpirationDate, getAuthToken } from "../util/auth";
import styles from "./pages/applying/Board.module.css";

export const HeaderWrapper = styled.header`
    width: 100%;
`

export const MainWrapper = styled.main`
        background-color: var(--main-bg-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        position: relative;
`

export const FooterWrapper = styled.footer`
        display: flex;
        height: 270px;
        background-color: var(--footer-bg-color);
`

const LinearGradient = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100%;
    background-image: linear-gradient(
            90deg,
            rgb(77, 118, 255, 0) 0%,
            rgb(77, 118, 255, 0.2) 20%,
            rgb(77, 118, 255, 0.3) 65%,
            rgb(77, 118, 255, 0)
    );
`

const RootLayout = () => {
    const token = getAuthToken()
    const submit = useSubmit();
    
    
    useEffect(() => {
        if( !token ) {//it should be null if you are not authenticated.
            return;
        }
        
        if ( token === 'EXPIRED' ) {
            submit(null, {
                action: '/logout',
                method: 'POST'
            })
        }

        let tokenDuration = calculateExpirationDate();
        
        if( tokenDuration && tokenDuration > 0 ) {
            setTimeout( () => {
                submit(null, {
                    action: '/logout',
                    method: 'POST'
                })
            }, tokenDuration)//1h
        }
        
    }, [token, submit])
    
    return (
        <React.Fragment>
            <HeaderWrapper>
                <TheHeader/>
            </HeaderWrapper>

            <MainWrapper>
                {
                    window.location.pathname === '/' &&
                    <LinearGradient />
                }
                <Outlet  />
            </MainWrapper>

            <FooterWrapper>
                <Footer/>
            </FooterWrapper>
        </React.Fragment>
    )
}

export default RootLayout;