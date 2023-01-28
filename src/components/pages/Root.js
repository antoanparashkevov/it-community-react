import React from "react";
import { Outlet } from 'react-router-dom'

//Components
import TheHeader from "../UI/TheHeader";

const Root = ()=> {
    return (
        <React.Fragment>
            <TheHeader/>
            <Outlet />
        </React.Fragment>
    )
}

export default Root;