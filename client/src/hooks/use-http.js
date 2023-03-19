import { useState, useCallback } from "react";
import { getAuthToken } from "../util/auth";
import { useSubmit } from "react-router-dom";

const host =  process.env.REACT_APP_DEFAULT_URL || 'http://localhost:3030';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [resolved, setResolved] = useState(false)
    const submit = useSubmit();
    const token = getAuthToken();
    
    const sendRequest = useCallback(async (url, method = 'GET', applyData, data = {}) => {
        
        // console.log('METHOD', method)
        // console.log('HOST', host)
        // console.log('URL', url)
        // console.log('Data to POST >>> ', data)
        
        
        setResolved(false);
        setIsLoading(true);
        setError(null);
    
        const options = {
            method: method,
            headers: {}
        }
        
        if ( token ) {
            options.headers['X-Authorization'] = token;
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
                   submit(null, {
                       action: '/logout',
                       method: 'POST'
                   })
                   window.location.reload();
                   return;
               }
               
               const error = await response.json()
               throw new Error(error.message)
           } else {
               setResolved(true);
           }
           
           if( response.status === 204 ) {//for logout case, the server returns response without body
               setIsLoading(false);
                return response;
           } 
               
           if( applyData ) {
                const data = await response.json()
                applyData(data)
           } else {
               return data
           }
           
       } catch ( error ) {
            
            setError(error.message || 'Something went wrong!');
       }
        setIsLoading(false)
    }, [])
    
    const resetError = () => {
        setError(null)
    }
    
    const setAdditionalErrors = (error) => {
        setError(error)
    }

    if( resolved ) {
        setTimeout( () => {
            setResolved(false);
        }, 4000)
    }
    
    return {
        isLoading,
        error,
        resetError,
        setAdditionalErrors,
        resolved,
        sendRequest
    }
};

export default useHttp;