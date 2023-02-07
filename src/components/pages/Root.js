import React from "react";
import { Outlet } from 'react-router-dom'

//Components
import TheHeader from "../layout/TheHeader";

const Root = ()=> {
    const mainStyles = () => {
        return {
            backgroundColor: '#F2F2F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
    
    return (
        <React.Fragment>
            <TheHeader/>
            <main style={mainStyles()}>
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export default Root;