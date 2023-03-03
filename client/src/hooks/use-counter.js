import { useState, useEffect } from "react";


// must rule is to start the function with the keyword 'use'
const useCounter = (startingValue) => {
    const [counter, setCounter] = useState(startingValue);
    
    
    useEffect( () => {
        const interval = setInterval( () => {
            setCounter((prevState) => prevState + 1)
        }, 1000)
        
        
        return () => clearInterval(interval)
    }, [])
    
    return counter;
}


export default useCounter;