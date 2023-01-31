import React from "react";
import { Outlet } from 'react-router-dom'

//Components
import TheHeader from "../UI/TheHeader";

const Root = ()=> {
    return (
        <React.Fragment>
            <TheHeader/>
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export default Root;