import React from "react";
import { Outlet } from "react-router-dom";

const AdminRootLayout = () => {
    return (
        <React.Fragment>
            <h1>admin root lay</h1>
            <Outlet />
        </React.Fragment>
    )
}

export default AdminRootLayout;