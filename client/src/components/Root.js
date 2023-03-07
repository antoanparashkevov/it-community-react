import React, { useState } from "react";
import { Outlet } from 'react-router-dom'
import styled from "styled-components";

//Components
import TheHeader from "./layout/TheHeader";
import Footer from "./layout/Footer";

//context
import AuthContext from "../store/auth-context";

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
`

export const FooterWrapper = styled.footer`
        display: flex;
        height: 270px;
        background-color: var(--footer-bg-color);
`

const RootLayout = ()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(true)
    const [userName, setUserName] = useState('Antoan')
    
    
    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn,
                isAdmin,
                userName
            }}
        >
            <HeaderWrapper>
                <TheHeader/>
            </HeaderWrapper>
            
            <MainWrapper>
                <Outlet />
            </MainWrapper>
            
            <FooterWrapper>
                <Footer/>
            </FooterWrapper>
        </AuthContext.Provider>
    )
}

export default RootLayout;