import { useRouteLoaderData } from "react-router-dom";
import { useEffect } from "react";

const Applying = () => {
    const data = useRouteLoaderData('poster-details')
    
    useEffect( () => {
        console.log('Data from Applying component >>> ', data)
    }, [])
    
    return (
        <h1>Applying page</h1>
    )
}

export default Applying;