import React from 'react'

//components
import TheHeader from "../layout/TheHeader";
import PageContent from "../UI/PageContent";
import { FooterWrapper, MainWrapper, HeaderWrapper } from "../Root";
import Footer from "../layout/Footer";

//UI components
import { RoundedLink } from "../UI/BaseLinks";

//hooks
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    /*
    * if we return a Response as an error, the useRouteError hook will return an object with 'status' property and 'data' property
    * */
    const errorResponse = useRouteError();
    
    let title = 'An error occurred!';
    
    let message = 
        errorResponse.message ? 
            errorResponse.message : 
            errorResponse.data.message ? 
                errorResponse.data.message :
                'This is not a valid page!'
    
    return (
        <React.Fragment>
            <HeaderWrapper>
                <TheHeader/>
            </HeaderWrapper>
            
            <MainWrapper>
                <PageContent title={title}>
                    <p>{message}</p>
                    <RoundedLink to='/'>
                        Back to home
                    </RoundedLink>
                </PageContent>
            </MainWrapper>

            <FooterWrapper>
                <Footer/>
            </FooterWrapper>
        </React.Fragment>
    )
}

export default ErrorPage