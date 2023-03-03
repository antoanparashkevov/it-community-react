import { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerHeight: height, innerWidth: width } = window;
    
    return {
        height,
        width
    }
}

export default function useWindowDimensions() {
    const [windowDimensionsObject, setWindowDimensionsObject] = useState(getWindowDimensions())
    
    useEffect( () => {
        function handleResize( ) {
            setWindowDimensionsObject(getWindowDimensions())
        }
        
        window.addEventListener('resize', handleResize)
        
        //cleanup function
        return () => window.removeEventListener('resize', handleResize)
        
    }, [])
    
    return windowDimensionsObject;
        
}