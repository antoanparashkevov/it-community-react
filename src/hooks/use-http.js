import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('dsa')
    
    const sendRequest = useCallback(async (requestConfig, applyData = () => { return null }) => {
        setIsLoading(true);
        setError(null)
        
       try {
           const response = await fetch(
               requestConfig.url, {
                   method: requestConfig.method ? requestConfig.method : 'GET',
                   headers: requestConfig.headers ? requestConfig.headers : {},
                   body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
               }
           )

           if( !response.ok ) {
               throw new Error("Request failed! Try again later!");
           }

           const data = await response.json();
           console.log('Data from use-http >>> ', data)
           
           if( applyData ) {
               applyData(data);
           }

       } catch ( error ) {
            setError(error.message || 'Something went wrong!');
       }
        setIsLoading(false)
    }, [])
    
    return {
        isLoading,
        error,
        sendRequest
    }
};

export default useHttp;