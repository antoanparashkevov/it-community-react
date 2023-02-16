import React from "react";
import { Outlet } from 'react-router-dom'
import styled from "styled-components";

//Components
import TheHeader from "./layout/TheHeader";
import Footer from "./layout/Footer";

const MainWrapper = styled.main`
        background-color: #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
`

const FooterWrapper = styled.footer`
        display: flex;
        height: 270px;
        background-color: #EBEBEB;
`

const Root = ()=> {
    
    return (
        <React.Fragment>
            <header>
                <TheHeader/>
            </header>
            
            <MainWrapper>
                <Outlet />
            </MainWrapper>
            
            <FooterWrapper>
                <Footer/>
            </FooterWrapper>
        </React.Fragment>
    )
}

export default Root;