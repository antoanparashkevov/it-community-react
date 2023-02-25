import { useState, useCallback } from "react";

const host =  'https://swapi.dev/api/';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const sendRequest = useCallback(async (url, method, applyData = () => { return null }, data = {}) => {
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
    
    function get(url, transformDataFunction) {
        return sendRequest(url, 'GET', transformDataFunction);
    }
    
    function post(url, applyData, data) {
        return sendRequest(url,'POST', applyData, data)
    }
    
    function put(url, applyData) {
        return sendRequest(url,'PUT', applyData);
    }
    
    function del(url, applyData) {
        return sendRequest(url,'DELETE', applyData);
    }
    
    return {
        isLoading,
        error,
        get,
        post,
        put,
        del
    }
};

export default useHttp;