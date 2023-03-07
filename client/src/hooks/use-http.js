import { useState, useCallback } from "react";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const sendRequest = useCallback(async (url, method, applyData, data) => {
        console.log('METHOD', method)
        console.log('HOST', host)
        console.log('URL', url)
        console.log('Data to POST >>> ', data)
        
        setIsLoading(true);
        setError(null);
    
        const options = {
            method: method,
            headers: {}
        }
        
        if( Object.keys(data).length > 0 ) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data)
        }
        
       try {
           const response = await fetch(
               host + url,
               options
           )

           if( response.ok === false ) {
               
               if( response.status === 401 ) {
                   //todo util func
               }
               const error = await response.json()
               throw new Error(error.message)
           }
           
           if( response.status === 204 ) {
               return response;
           } else {
               
               if( applyData ) {
                    const data = await response.json()
                    applyData(data)
               } else {
                   return data
               }
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