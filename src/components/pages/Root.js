import React from "react";
import { Outlet } from 'react-router-dom'

//Components
import TheHeader from "../layout/TheHeader";
import Footer from "../layout/Footer";

const Root = ()=> {
    const mainStyles = () => {
        return {
            backgroundColor: '#F2F2F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
    
    const footerStyles = () => {
        return {
            'height': '270px',
            'backgroundColor': '#EBEBEB',
            'display': 'flex',
        }
    }
    
    return (
        <React.Fragment>
            <header>
                <TheHeader/>
            </header>
            <main style={mainStyles()}>
                <Outlet />
            </main>
            <footer style={footerStyles()}>
                <Footer/>
            </footer>
        </React.Fragment>
    )
}

export default Root;