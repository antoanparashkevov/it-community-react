import React, { useEffect } from 'react'

//components
import TheHeader from "../layout/TheHeader";
import PageContent from "../UI/PageContent";
import { FooterWrapper, MainWrapper } from "../Root";
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
    let message;
    
    if(errorResponse.status === 404) {
        message = errorResponse.data.message
    } else if (errorResponse.status === 500) {
        message = 'Internal server error!'
    }
    
    
    return (
        <React.Fragment>
            <header>
                <TheHeader/>
            </header>
            
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