import React from "react";
import { Outlet } from 'react-router-dom'

//Components
import TheHeader from "../UI/TheHeader";

const Root = ()=> {
    return (
        <React.Fragment>
            <TheHeader/>
            <main style={ {'background-color': '#F2F2F2', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center'} }>
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export default Root;