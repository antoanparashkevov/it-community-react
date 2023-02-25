import { useRouteLoaderData } from "react-router-dom";
import React, { useEffect } from "react";

//components
import ApplyForm from "../../applying/ApplyForm";

const Applying = () => {
    const data = useRouteLoaderData('poster-details')
    
    useEffect( () => {
        console.log('Data from Applying component >>> ', data)
    }, [])
    
    return (
        <React.Fragment>
            <h1>Applying page</h1>
            <ApplyForm />
        </React.Fragment>
    )
}

export default Applying;