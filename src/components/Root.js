import React from "react";
import { Outlet, useNavigation } from 'react-router-dom'
import styled from "styled-components";

//Components
import TheHeader from "./layout/TheHeader";
import Footer from "./layout/Footer";

export const MainWrapper = styled.main`
        background-color: var(--main-bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
`

export const FooterWrapper = styled.footer`
        display: flex;
        height: 270px;
        background-color: var(--footer-bg-color);
`

const Root = ()=> {
    const navigation = useNavigation()
    
    return (
        <React.Fragment>
            <header>
                <TheHeader/>
            </header>
            
            <MainWrapper>
                {navigation.state === 'loading' && <p>Loading...</p>}
                <Outlet />
            </MainWrapper>
            
            <FooterWrapper>
                <Footer/>
            </FooterWrapper>
        </React.Fragment>
    )
}

export default Root;